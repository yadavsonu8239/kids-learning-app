'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { CelebrationStars, ScoreStars, Badge } from '@/components/ScoreStars';
import { mockQuizzes } from '@/data/mockData';
import { useAppStore } from '@/stores/appStore';
import {
    TrophyIcon,
    ArrowPathIcon,
    HomeIcon,
    VideoCameraIcon,
    SparklesIcon,
    CheckCircleIcon
} from '@heroicons/react/24/solid';

export default function QuizResultPage() {
    const router = useRouter();
    const params = useParams();
    const quizId = params.id as string;
    const { quizResults, user, getUserBadges } = useAppStore();

    const [showCelebration, setShowCelebration] = useState(true);
    const [newBadges, setNewBadges] = useState<string[]>([]);

    const quiz = mockQuizzes.find(q => q.id === quizId);
    const latestResult = quizResults
        .filter(r => r.quizId === quizId)
        .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())[0];

    useEffect(() => {
        // Check for newly earned badges
        const currentBadges = getUserBadges();
        // In a real app, you'd track which badges were just earned
        // For now, we'll just show celebration for any badges
        if (currentBadges.length > 0) {
            setNewBadges(currentBadges.slice(-1)); // Show the most recent badge
        }

        // Hide celebration after 5 seconds
        const timer = setTimeout(() => {
            setShowCelebration(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [getUserBadges]);

    const handleTryAgain = () => {
        router.push(`/quiz/${quizId}`);
    };

    const handleGoHome = () => {
        router.push('/');
    };

    const handleViewQuizzes = () => {
        router.push('/quizzes');
    };

    const handleWatchRelatedVideos = () => {
        router.push('/videos');
    };

    const getScoreMessage = (score: number) => {
        if (score >= 90) return { message: 'Outstanding! 🌟', color: 'text-green-600', bg: 'bg-green-50' };
        if (score >= 80) return { message: 'Excellent work! 🎉', color: 'text-blue-600', bg: 'bg-blue-50' };
        if (score >= 70) return { message: 'Great job! 👏', color: 'text-yellow-600', bg: 'bg-yellow-50' };
        if (score >= 60) return { message: 'Good effort! 💪', color: 'text-orange-600', bg: 'bg-orange-50' };
        return { message: 'Keep practicing! 📚', color: 'text-red-600', bg: 'bg-red-50' };
    };

    if (!quiz || !latestResult) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">🤔</div>
                    <h2 className="text-xl font-bold text-gray-600 mb-2">Quiz results not found</h2>
                    <p className="text-gray-500 mb-6">Let's get you back to the quizzes!</p>
                    <Button variant="primary" onClick={handleViewQuizzes}>
                        View Quizzes
                    </Button>
                </div>
            </div>
        );
    }

    const scoreInfo = getScoreMessage(latestResult.score);

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Celebration Modal */}
            {showCelebration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
                        <CelebrationStars
                            score={latestResult.score}
                            onAnimationComplete={() => setShowCelebration(false)}
                        />
                        <div className="mt-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                Quiz Complete! 🎉
                            </h2>
                            <p className="text-gray-600">
                                {user?.name}, you did an amazing job!
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
                <div className="text-6xl mb-4">
                    {latestResult.score >= 80 ? '🏆' : latestResult.score >= 60 ? '🎯' : '📚'}
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {quiz.title} Results
                </h1>
                <p className="text-gray-600">Here's how you did!</p>
            </div>

            {/* Score Card */}
            <div className={`bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 ${latestResult.score >= 80 ? 'border-green-500' :
                    latestResult.score >= 60 ? 'border-yellow-500' : 'border-blue-500'
                }`}>
                <div className="text-center">
                    <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold mb-4 ${scoreInfo.bg} ${scoreInfo.color}`}>
                        <SparklesIcon className="h-5 w-5 mr-2" />
                        {scoreInfo.message}
                    </div>

                    <ScoreStars
                        score={latestResult.score}
                        size="xl"
                        animate={true}
                        className="mb-6"
                    />

                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600">{latestResult.score}%</div>
                            <div className="text-sm text-gray-600">Your Score</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600">{latestResult.correctAnswers}</div>
                            <div className="text-sm text-gray-600">Correct Answers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600">{latestResult.totalQuestions}</div>
                            <div className="text-sm text-gray-600">Total Questions</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Question Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Question Breakdown</h3>
                <div className="space-y-3">
                    {latestResult.answers.map((answer, index) => {
                        const question = quiz.questions.find(q => q.id === answer.questionId);
                        return (
                            <div
                                key={answer.questionId}
                                className={`p-4 rounded-xl border-l-4 ${answer.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-sm font-semibold text-gray-600">
                                                Question {index + 1}
                                            </span>
                                            {answer.isCorrect ? (
                                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                                    <span className="text-white text-xs font-bold">✗</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-800 mb-2">{question?.text}</p>
                                        <div className="text-sm">
                                            <div className={answer.isCorrect ? 'text-green-700' : 'text-red-700'}>
                                                Your answer: {answer.userAnswer || 'No answer'}
                                            </div>
                                            {!answer.isCorrect && question && (
                                                <div className="text-green-700 mt-1">
                                                    Correct answer: {question.correctAnswer}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* New Badges */}
            {newBadges.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="text-center">
                        <TrophyIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-4">New Badge Earned! 🎉</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {newBadges.map((badgeId) => (
                                <div key={badgeId} className="animate-bounce">
                                    <Badge
                                        icon="🏆"
                                        name="Achievement Unlocked!"
                                        description="Keep up the great work!"
                                        earned={true}
                                        animate={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        onClick={handleTryAgain}
                        variant="primary"
                        size="lg"
                        className="w-full"
                        icon={<ArrowPathIcon className="h-5 w-5" />}
                    >
                        Try Again
                    </Button>
                    <Button
                        onClick={handleWatchRelatedVideos}
                        variant="secondary"
                        size="lg"
                        className="w-full"
                        icon={<VideoCameraIcon className="h-5 w-5" />}
                    >
                        Watch Videos
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                        onClick={handleViewQuizzes}
                        variant="outline"
                        size="lg"
                        className="w-full"
                    >
                        More Quizzes
                    </Button>
                    <Button
                        onClick={handleGoHome}
                        variant="ghost"
                        size="lg"
                        className="w-full"
                        icon={<HomeIcon className="h-5 w-5" />}
                    >
                        Go Home
                    </Button>
                </div>
            </div>

            {/* Floating celebration elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {latestResult.score >= 80 && (
                    <>
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute animate-bounce"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2000}ms`,
                                    animationDuration: `${1000 + Math.random() * 1000}ms`,
                                }}
                            >
                                <span className="text-2xl opacity-70">
                                    {['🎉', '🌟', '✨', '🎊', '💫'][Math.floor(Math.random() * 5)]}
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
} 