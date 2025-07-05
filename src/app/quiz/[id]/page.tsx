'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { mockQuizzes } from '@/data/mockData';
import { useAppStore } from '@/stores/appStore';
import { textToSpeech, speechToText, isAnswerCorrect } from '@/lib/speechUtils';
import {
    SpeakerWaveIcon,
    SpeakerXMarkIcon,
    MicrophoneIcon,
    StopIcon,
    ArrowRightIcon,
    ArrowLeftIcon,
    HomeIcon
} from '@heroicons/react/24/solid';
import { Quiz } from '@/types';

export default function QuizScreen() {
    const router = useRouter();
    const params = useParams();
    const quizId = params.id as string;
    const { setCurrentQuiz, addQuizResult, user } = useAppStore();

    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [voiceAnswer, setVoiceAnswer] = useState<string>('');
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [startTime, setStartTime] = useState<number>(Date.now());

    useEffect(() => {
        const foundQuiz = mockQuizzes.find(q => q.id === quizId);
        if (foundQuiz) {
            setQuiz(foundQuiz);
            setCurrentQuiz(foundQuiz);
            setStartTime(Date.now());
        } else {
            router.push('/quizzes');
        }
    }, [quizId, setCurrentQuiz, router]);

    const currentQuestion = quiz?.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === (quiz?.questions.length || 0) - 1;

    const handleSpeakQuestion = () => {
        if (!currentQuestion) return;

        if (isSpeaking) {
            textToSpeech?.stop();
            setIsSpeaking(false);
        } else {
            setIsSpeaking(true);
            textToSpeech?.speak(currentQuestion.text, {
                rate: 0.8,
                pitch: 1.2
            });

            // Reset speaking state after a reasonable time
            setTimeout(() => {
                setIsSpeaking(false);
            }, 5000);
        }
    };

    const handleStartListening = () => {
        if (!speechToText.isSupported()) {
            alert('Speech recognition is not supported in your browser');
            return;
        }

        setIsListening(true);
        setVoiceAnswer('');

        speechToText.startListening(
            (transcript, confidence) => {
                setVoiceAnswer(transcript);
                setIsListening(false);
                console.log('Voice answer:', transcript, 'Confidence:', confidence);
            },
            (error) => {
                console.error('Speech recognition error:', error);
                setIsListening(false);
                alert('Speech recognition failed. Please try again.');
            }
        );
    };

    const handleStopListening = () => {
        speechToText.stopListening();
        setIsListening(false);
    };

    const handleAnswer = (answer: string) => {
        if (!currentQuestion) return;

        const newAnswers = { ...answers, [currentQuestion.id]: answer };
        setAnswers(newAnswers);

        // Check if answer is correct
        const correct = currentQuestion.type === 'voice'
            ? isAnswerCorrect(answer, currentQuestion.correctAnswer)
            : answer === currentQuestion.correctAnswer;

        setIsCorrect(correct);
        setShowFeedback(true);

        // Auto-advance after showing feedback
        setTimeout(() => {
            if (isLastQuestion) {
                handleQuizComplete(newAnswers);
            } else {
                handleNextQuestion();
            }
        }, 3000);
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer('');
        setVoiceAnswer('');
        setShowFeedback(false);
        textToSpeech?.stop();
        setIsSpeaking(false);
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
            setSelectedAnswer('');
            setVoiceAnswer('');
            setShowFeedback(false);
            textToSpeech?.stop();
            setIsSpeaking(false);
        }
    };

    const handleQuizComplete = (finalAnswers: Record<string, string>) => {
        if (!quiz || !user) return;

        const totalQuestions = quiz.questions.length;
        let correctAnswers = 0;

        quiz.questions.forEach(question => {
            const userAnswer = finalAnswers[question.id] || '';
            const correct = question.type === 'voice'
                ? isAnswerCorrect(userAnswer, question.correctAnswer)
                : userAnswer === question.correctAnswer;

            if (correct) correctAnswers++;
        });

        const score = Math.round((correctAnswers / totalQuestions) * 100);
        const timeSpent = Date.now() - startTime;

        const result = {
            quizId: quiz.id,
            userId: user.id,
            score,
            totalQuestions,
            correctAnswers,
            completedAt: new Date(),
            timeSpent,
            answers: quiz.questions.map(q => ({
                questionId: q.id,
                userAnswer: finalAnswers[q.id] || '',
                isCorrect: q.type === 'voice'
                    ? isAnswerCorrect(finalAnswers[q.id] || '', q.correctAnswer)
                    : (finalAnswers[q.id] || '') === q.correctAnswer,
                timeSpent: 0 // Could track per question if needed
            }))
        };

        addQuizResult(result);
        router.push(`/quiz/${quiz.id}/result`);
    };

    const handleGoHome = () => {
        router.push('/');
    };

    if (!quiz || !currentQuestion) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading quiz...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-bold text-gray-800">{quiz.title}</h1>
                    <p className="text-sm text-gray-600">
                        Question {currentQuestionIndex + 1} of {quiz.questions.length}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGoHome}
                    icon={<HomeIcon className="h-4 w-4" />}
                >
                    Home
                </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            {currentQuestion.text}
                        </h2>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSpeakQuestion}
                        icon={isSpeaking ? <SpeakerXMarkIcon className="h-4 w-4" /> : <SpeakerWaveIcon className="h-4 w-4" />}
                    >
                        {isSpeaking ? 'Stop' : 'Listen'}
                    </Button>
                </div>

                {/* Multiple Choice Questions */}
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={showFeedback}
                                className={`
                  w-full p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-md
                  ${selectedAnswer === option
                                        ? 'border-purple-500 bg-purple-50 hover:bg-purple-100'
                                        : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                    }
                  ${showFeedback && option === currentQuestion.correctAnswer
                                        ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                        : showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer
                                            ? 'border-red-500 bg-red-50 hover:bg-red-100'
                                            : ''
                                    }
                  disabled:cursor-not-allowed disabled:opacity-75
                `}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${selectedAnswer === option ? 'border-purple-500 bg-purple-500 text-white' : 'border-gray-300 text-gray-700'}
                  `}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className={`font-medium ${showFeedback && option === currentQuestion.correctAnswer
                                        ? 'text-green-700'
                                        : showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer
                                            ? 'text-red-700'
                                            : selectedAnswer === option
                                                ? 'text-purple-700'
                                                : 'text-gray-800'
                                        }`}>{option}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* Voice Questions */}
                {currentQuestion.type === 'voice' && (
                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="text-4xl mb-2">🎤</div>
                                <p className="text-gray-600">Speak your answer!</p>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button
                                    variant={isListening ? "danger" : "primary"}
                                    size="lg"
                                    onClick={isListening ? handleStopListening : handleStartListening}
                                    icon={isListening ? <StopIcon className="h-6 w-6" /> : <MicrophoneIcon className="h-6 w-6" />}
                                    className={isListening ? "animate-pulse" : ""}
                                >
                                    {isListening ? 'Stop Recording' : 'Start Recording'}
                                </Button>
                            </div>
                        </div>

                        {/* Voice Answer Display */}
                        {voiceAnswer && (
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-gray-700">Your answer:</span>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => handleAnswer(voiceAnswer)}
                                        disabled={showFeedback}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <p className="text-gray-800 italic">&quot;{voiceAnswer}&quot;</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Feedback */}
            {showFeedback && (
                <div className={`
          bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4
          ${isCorrect ? 'border-green-500' : 'border-red-500'}
        `}>
                    <div className="flex items-center space-x-3 mb-3">
                        <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${isCorrect ? 'bg-green-500' : 'bg-red-500'}
            `}>
                            <span className="text-white font-bold">
                                {isCorrect ? '✓' : '✗'}
                            </span>
                        </div>
                        <h3 className={`
              font-bold text-lg
              ${isCorrect ? 'text-green-700' : 'text-red-700'}
            `}>
                            {isCorrect ? 'Correct! 🎉' : 'Not quite! 🤔'}
                        </h3>
                    </div>

                    {currentQuestion.explanation && (
                        <p className="text-gray-600 mb-4">
                            {currentQuestion.explanation}
                        </p>
                    )}

                    <div className="text-sm text-gray-500">
                        {isLastQuestion ? 'Quiz completing...' : 'Moving to next question...'}
                    </div>
                </div>
            )}

            {/* Navigation (only show if not showing feedback) */}
            {!showFeedback && (
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        icon={<ArrowLeftIcon className="h-4 w-4" />}
                    >
                        Previous
                    </Button>

                    <div className="flex space-x-2">
                        {currentQuestion.type === 'multiple-choice' && selectedAnswer && (
                            <Button
                                variant="primary"
                                onClick={() => handleAnswer(selectedAnswer)}
                                icon={<ArrowRightIcon className="h-4 w-4" />}
                            >
                                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                            </Button>
                        )}
                    </div>
                </div>
            )}

            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute bottom-32 right-8 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
            </div>
        </div>
    );
} 