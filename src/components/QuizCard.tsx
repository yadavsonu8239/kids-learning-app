import React from 'react';
import { Quiz } from '@/types';
import { Button } from './Button';
import { PlayIcon, ClockIcon, StarIcon } from '@heroicons/react/24/solid';

interface QuizCardProps {
    quiz: Quiz;
    onStartQuiz: (quizId: string) => void;
    isCompleted?: boolean;
    userScore?: number;
    className?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
    quiz,
    onStartQuiz,
    isCompleted = false,
    userScore,
    className = ''
}) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'hard':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getAgeGroupColor = (ageGroup: string) => {
        switch (ageGroup) {
            case 'pre-birth':
                return 'bg-pink-100 text-pink-800';
            case '0-2':
                return 'bg-blue-100 text-blue-800';
            case '3-5':
                return 'bg-green-100 text-green-800';
            case '6-10':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const renderStars = (score: number) => {
        const totalStars = 5;
        const filledStars = Math.round((score / 100) * totalStars);

        return (
            <div className="flex items-center space-x-1">
                {Array.from({ length: totalStars }).map((_, index) => (
                    <StarIcon
                        key={index}
                        className={`h-4 w-4 ${index < filledStars ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                    />
                ))}
                <span className="text-sm text-gray-600 ml-1">{score}%</span>
            </div>
        );
    };

    return (
        <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-102 ${className}`}>
            {/* Header with icon and completion status */}
            <div className="relative">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="text-4xl">{quiz.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold">{quiz.title}</h3>
                                <p className="text-purple-100 text-sm">{quiz.category}</p>
                            </div>
                        </div>
                        {isCompleted && (
                            <div className="bg-green-500 rounded-full p-2">
                                <StarIcon className="h-5 w-5 text-white" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Difficulty and Age Group badges */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAgeGroupColor(quiz.ageGroup)}`}>
                        {quiz.ageGroup}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {quiz.description}
                </p>

                {/* Quiz stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm">{quiz.questions.length} questions</span>
                    </div>

                    {isCompleted && userScore !== undefined && (
                        <div className="flex items-center space-x-2">
                            {renderStars(userScore)}
                        </div>
                    )}
                </div>

                {/* Action button */}
                <Button
                    onClick={() => onStartQuiz(quiz.id)}
                    variant={isCompleted ? "secondary" : "fun"}
                    size="lg"
                    className="w-full group-hover:scale-105 transition-transform duration-200"
                    icon={<PlayIcon className="h-5 w-5" />}
                >
                    {isCompleted ? 'Play Again' : 'Start Quiz'}
                </Button>
            </div>

            {/* Fun animations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-50"></div>
            </div>
        </div>
    );
}; 