import React, { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface ScoreStarsProps {
    score: number; // 0-100
    totalStars?: number;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showScore?: boolean;
    animate?: boolean;
    className?: string;
}

export const ScoreStars: React.FC<ScoreStarsProps> = ({
    score,
    totalStars = 5,
    size = 'md',
    showScore = true,
    animate = false,
    className = ''
}) => {
    const [animatedStars, setAnimatedStars] = useState<number[]>([]);
    const filledStars = Math.round((score / 100) * totalStars);

    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return 'h-4 w-4';
            case 'md':
                return 'h-6 w-6';
            case 'lg':
                return 'h-8 w-8';
            case 'xl':
                return 'h-10 w-10';
            default:
                return 'h-6 w-6';
        }
    };

    const getScoreText = () => {
        if (score >= 90) return 'Excellent!';
        if (score >= 80) return 'Great Job!';
        if (score >= 70) return 'Good Work!';
        if (score >= 60) return 'Keep Going!';
        return 'Try Again!';
    };

    const getScoreColor = () => {
        if (score >= 90) return 'text-green-600';
        if (score >= 80) return 'text-blue-600';
        if (score >= 70) return 'text-yellow-600';
        if (score >= 60) return 'text-orange-600';
        return 'text-red-600';
    };

    useEffect(() => {
        if (animate) {
            // Animate stars appearing one by one
            const timer = setTimeout(() => {
                const newAnimatedStars: number[] = [];
                for (let i = 0; i < filledStars; i++) {
                    setTimeout(() => {
                        newAnimatedStars.push(i);
                        setAnimatedStars([...newAnimatedStars]);
                    }, i * 200);
                }
            }, 300);

            return () => clearTimeout(timer);
        }
    }, [animate, filledStars]);

    return (
        <div className={`flex flex-col items-center space-y-2 ${className}`}>
            {/* Stars */}
            <div className="flex items-center space-x-1">
                {Array.from({ length: totalStars }).map((_, index) => {
                    const isFilled = index < filledStars;
                    const shouldAnimate = animate && animatedStars.includes(index);

                    return (
                        <div
                            key={index}
                            className={`transition-all duration-300 ${shouldAnimate ? 'animate-bounce' : ''
                                }`}
                        >
                            {isFilled ? (
                                <StarIcon
                                    className={`${getSizeClasses()} text-yellow-400 drop-shadow-sm ${shouldAnimate ? 'animate-pulse' : ''
                                        }`}
                                />
                            ) : (
                                <StarOutlineIcon
                                    className={`${getSizeClasses()} text-gray-300`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Score display */}
            {showScore && (
                <div className="text-center">
                    <div className={`font-bold ${getScoreColor()}`}>
                        {getScoreText()}
                    </div>
                    <div className="text-sm text-gray-600">
                        {score}% ({filledStars}/{totalStars} stars)
                    </div>
                </div>
            )}
        </div>
    );
};

// Celebration Stars component for quiz completion
interface CelebrationStarsProps {
    score: number;
    onAnimationComplete?: () => void;
    className?: string;
}

export const CelebrationStars: React.FC<CelebrationStarsProps> = ({
    score,
    onAnimationComplete,
    className = ''
}) => {
    const [showCelebration, setShowCelebration] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowCelebration(true);

            // Call onAnimationComplete after celebration
            if (onAnimationComplete) {
                setTimeout(onAnimationComplete, 2000);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [onAnimationComplete]);

    return (
        <div className={`relative ${className}`}>
            <ScoreStars
                score={score}
                size="xl"
                animate={true}
                className="relative z-10"
            />

            {/* Celebration effects */}
            {showCelebration && (
                <div className="absolute inset-0 pointer-events-none">
                    {/* Confetti stars */}
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div
                            key={index}
                            className="absolute animate-bounce"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 1000}ms`,
                                animationDuration: `${1000 + Math.random() * 1000}ms`,
                            }}
                        >
                            <StarIcon className="h-4 w-4 text-yellow-400 opacity-70" />
                        </div>
                    ))}

                    {/* Sparkles */}
                    {Array.from({ length: 15 }).map((_, index) => (
                        <div
                            key={`sparkle-${index}`}
                            className="absolute animate-ping"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2000}ms`,
                            }}
                        >
                            <div className="h-2 w-2 bg-yellow-400 rounded-full"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Badge component for achievements
interface BadgeProps {
    icon: string;
    name: string;
    description: string;
    earned: boolean;
    animate?: boolean;
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
    icon,
    name,
    description,
    earned,
    animate = false,
    className = ''
}) => {
    return (
        <div
            className={`
        relative p-4 rounded-xl border-2 transition-all duration-300
        ${earned
                    ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }
        ${animate ? 'animate-pulse' : ''}
        ${className}
      `}
        >
            <div className="text-center">
                <div className={`text-3xl mb-2 ${earned ? 'animate-bounce' : ''}`}>
                    {icon}
                </div>
                <h3 className={`font-bold ${earned ? 'text-yellow-800' : 'text-gray-500'}`}>
                    {name}
                </h3>
                <p className={`text-sm ${earned ? 'text-yellow-700' : 'text-gray-400'}`}>
                    {description}
                </p>
            </div>

            {earned && (
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                    <StarIcon className="h-4 w-4 text-white" />
                </div>
            )}
        </div>
    );
}; 