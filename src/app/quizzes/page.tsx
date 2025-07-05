'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizCard } from '@/components/QuizCard';
import { AgeFilterBar, CategoryFilterBar } from '@/components/AgeFilterBar';
import { Button } from '@/components/Button';
import { mockQuizzes, quizCategories } from '@/data/mockData';
import { useAppStore } from '@/stores/appStore';
import { FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function QuizzesPage() {
    const router = useRouter();
    const { getCompletedQuizzes, quizResults } = useAppStore();
    const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    const completedQuizzes = getCompletedQuizzes();

    const handleStartQuiz = (quizId: string) => {
        router.push(`/quiz/${quizId}`);
    };

    const filteredQuizzes = mockQuizzes.filter(quiz => {
        const ageGroupMatch = selectedAgeGroups.length === 0 || selectedAgeGroups.includes(quiz.ageGroup);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat =>
            quiz.category.toLowerCase().includes(cat.toLowerCase())
        );
        return ageGroupMatch && categoryMatch;
    });

    const getQuizScore = (quizId: string) => {
        const result = quizResults.find(r => r.quizId === quizId);
        return result ? Math.round((result.correctAnswers / result.totalQuestions) * 100) : 0;
    };

    const clearFilters = () => {
        setSelectedAgeGroups([]);
        setSelectedCategories([]);
    };

    const hasActiveFilters = selectedAgeGroups.length > 0 || selectedCategories.length > 0;

    return (
        <div className="min-h-screen p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">🎯 Fun Quizzes</h1>
                        <p className="text-gray-600">Test your knowledge with interactive quizzes!</p>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowFilters(!showFilters)}
                        icon={showFilters ? <XMarkIcon className="h-4 w-4" /> : <FunnelIcon className="h-4 w-4" />}
                    >
                        {showFilters ? 'Hide' : 'Filters'}
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-100 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-purple-600">{completedQuizzes.length}</div>
                        <div className="text-sm text-purple-700">Completed</div>
                    </div>
                    <div className="bg-blue-100 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-blue-600">{mockQuizzes.length}</div>
                        <div className="text-sm text-blue-700">Total Available</div>
                    </div>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="space-y-4 mb-6">
                        <AgeFilterBar
                            selectedAgeGroups={selectedAgeGroups}
                            onAgeGroupChange={setSelectedAgeGroups}
                        />
                        <CategoryFilterBar
                            categories={quizCategories}
                            selectedCategories={selectedCategories}
                            onCategoryChange={setSelectedCategories}
                        />
                        {hasActiveFilters && (
                            <div className="flex justify-center">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                >
                                    Clear All Filters
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {/* Filter Summary */}
                {hasActiveFilters && (
                    <div className="bg-yellow-50 p-3 rounded-lg mb-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-800">
                                Showing {filteredQuizzes.length} of {mockQuizzes.length} quizzes
                            </span>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-yellow-600 hover:text-yellow-800"
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Quiz Cards */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredQuizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onStartQuiz={handleStartQuiz}
                        isCompleted={completedQuizzes.includes(quiz.id)}
                        userScore={getQuizScore(quiz.id)}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredQuizzes.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🤔</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                        No quizzes found
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Try adjusting your filters or check back later for new quizzes!
                    </p>
                    {hasActiveFilters && (
                        <Button
                            variant="primary"
                            onClick={clearFilters}
                        >
                            Clear Filters
                        </Button>
                    )}
                </div>
            )}

            {/* Floating decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-24 left-6 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-40 right-8 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute bottom-32 left-12 w-4 h-4 bg-blue-300 rounded-full animate-ping opacity-50"></div>
            </div>
        </div>
    );
} 