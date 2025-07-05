'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Button } from '@/components/Button';
import { QuizCard } from '@/components/QuizCard';
import { VideoCard } from '@/components/VideoCard';
import { mockVideos, mockQuizzes } from '@/data/mockData';
import { useAppStore } from '@/stores/appStore';
import { formatTime } from '@/lib/speechUtils';
import {
    PlayIcon,
    PauseIcon,
    HomeIcon,
    ArrowLeftIcon,
    SparklesIcon,
    ClockIcon,
    TagIcon,
    EyeIcon
} from '@heroicons/react/24/solid';

export default function VideoPlayerPage() {
    const router = useRouter();
    const params = useParams();
    const videoId = params.id as string;
    const { markVideoComplete, getCompletedVideos } = useAppStore();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [hasWatched, setHasWatched] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const video = mockVideos.find(v => v.id === videoId);
    const completedVideos = getCompletedVideos();
    const isCompleted = completedVideos.includes(videoId);

    useEffect(() => {
        if (!video) {
            router.push('/videos');
            return;
        }

        // Mark as watched when 80% of video is watched
        if (currentTime >= video.duration * 0.8 && !hasWatched) {
            setHasWatched(true);
            markVideoComplete(videoId);
            setShowSuggestions(true);
        }

        // Cleanup interval on unmount
        return () => {
            if ((window as any).videoInterval) {
                clearInterval((window as any).videoInterval);
                (window as any).videoInterval = null;
            }
        };
    }, [video, currentTime, hasWatched, markVideoComplete, videoId, router]);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);

        // Simulate video progress when playing
        if (!isPlaying) {
            const interval = setInterval(() => {
                setCurrentTime(prev => {
                    if (prev >= (video?.duration || 0)) {
                        clearInterval(interval);
                        setIsPlaying(false);
                        return video?.duration || 0;
                    }
                    return prev + 1;
                });
            }, 1000);

            // Store interval reference to clear it later
            (window as any).videoInterval = interval;
        } else {
            // Clear the interval when pausing
            if ((window as any).videoInterval) {
                clearInterval((window as any).videoInterval);
                (window as any).videoInterval = null;
            }
        }
    };

    const handleGoBack = () => {
        router.back();
    };

    const handleGoHome = () => {
        router.push('/');
    };

    const handleStartQuiz = (quizId: string) => {
        router.push(`/quiz/${quizId}`);
    };

    const handleWatchVideo = (newVideoId: string) => {
        router.push(`/videos/${newVideoId}`);
    };

    if (!video) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-4xl mb-4">📹</div>
                    <h2 className="text-xl font-bold text-gray-600 mb-2">Video not found</h2>
                    <p className="text-gray-500 mb-6">Let's get you back to the videos!</p>
                    <Button variant="primary" onClick={() => router.push('/videos')}>
                        Browse Videos
                    </Button>
                </div>
            </div>
        );
    }

    // Get related content
    const relatedQuizzes = mockQuizzes.filter(quiz =>
        video.relatedQuizzes.includes(quiz.id)
    );

    const relatedVideos = mockVideos
        .filter(v => v.id !== videoId && (
            v.category === video.category ||
            v.ageGroup === video.ageGroup ||
            v.tags.some(tag => video.tags.includes(tag))
        ))
        .slice(0, 3);

    const progress = video.duration > 0 ? (currentTime / video.duration) * 100 : 0;

    return (
        <div className="min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGoBack}
                    icon={<ArrowLeftIcon className="h-4 w-4" />}
                >
                    Back
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleGoHome}
                    icon={<HomeIcon className="h-4 w-4" />}
                >
                    Home
                </Button>
            </div>

            {/* Video Player */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                {/* Video Container */}
                <div className="relative aspect-video bg-black">
                    {!isPlaying ? (
                        // Thumbnail with play button when not playing
                        <div className="relative w-full h-full">
                            <img
                                src={video.thumbnailUrl}
                                alt={video.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to placeholder if thumbnail fails to load
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />

                            {/* Fallback placeholder (hidden by default) */}
                            <div className="absolute inset-0 hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <div className="text-6xl mb-4">📹</div>
                                    <h2 className="text-2xl font-bold mb-2">{video.title}</h2>
                                    <p className="text-blue-100">{video.description}</p>
                                </div>
                            </div>

                            {/* Play button overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={handlePlayPause}
                                    className="bg-white/90 hover:bg-white rounded-full p-6 transform hover:scale-110 transition-transform duration-200 shadow-lg"
                                >
                                    <PlayIcon className="h-12 w-12 text-gray-800" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        // YouTube iframe when playing
                        <div className="relative w-full h-full">
                            <iframe
                                src={video.videoUrl}
                                title={video.title}
                                className="w-full h-full"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {/* Video Info Overlay - only show when not playing */}
                    {!isPlaying && (
                        <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-black/50 text-white p-3 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold">
                                        {formatTime(currentTime)} / {formatTime(video.duration)}
                                    </span>
                                    {isCompleted && (
                                        <div className="flex items-center space-x-1">
                                            <EyeIcon className="h-4 w-4" />
                                            <span className="text-xs">Watched</span>
                                        </div>
                                    )}
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-white/30 rounded-full h-2">
                                    <div
                                        className="bg-white h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Video Info */}
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
                            <p className="text-gray-600 mb-4">{video.description}</p>
                        </div>
                    </div>

                    {/* Video Meta */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-gray-500">
                            <ClockIcon className="h-4 w-4" />
                            <span className="text-sm">{formatTime(video.duration)}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <span className="text-sm">Category: {video.category}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                            <span className="text-sm">Age: {video.ageGroup}</span>
                        </div>
                    </div>

                    {/* Tags */}
                    {video.tags.length > 0 && (
                        <div className="flex items-center space-x-2 mb-4">
                            <TagIcon className="h-4 w-4 text-gray-400" />
                            <div className="flex flex-wrap gap-2">
                                {video.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Completion Celebration */}
            {showSuggestions && (
                <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-2xl p-6 mb-6 text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <h3 className="text-xl font-bold mb-2">Great job watching the video!</h3>
                    <p className="text-green-100 mb-4">Ready to test what you learned?</p>

                    {relatedQuizzes.length > 0 && (
                        <Button
                            variant="secondary"
                            size="lg"
                            onClick={() => handleStartQuiz(relatedQuizzes[0].id)}
                            icon={<SparklesIcon className="h-5 w-5" />}
                        >
                            Take Related Quiz
                        </Button>
                    )}
                </div>
            )}

            {/* Related Quizzes */}
            {relatedQuizzes.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="text-2xl">🎯</div>
                        <h3 className="text-xl font-bold text-gray-800">Test Your Knowledge</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {relatedQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz.id}
                                quiz={quiz}
                                onStartQuiz={handleStartQuiz}
                                className="transform hover:scale-105 transition-transform duration-200"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
                <div className="mb-8">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="text-2xl">📺</div>
                        <h3 className="text-xl font-bold text-gray-800">You Might Also Like</h3>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {relatedVideos.map((relatedVideo) => (
                            <VideoCard
                                key={relatedVideo.id}
                                video={relatedVideo}
                                onPlayVideo={handleWatchVideo}
                                isWatched={completedVideos.includes(relatedVideo.id)}
                                className="transform hover:scale-105 transition-transform duration-200"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Navigation */}
            <div className="flex justify-center space-x-4">
                <Button
                    variant="outline"
                    onClick={() => router.push('/videos')}
                >
                    Browse More Videos
                </Button>
                <Button
                    variant="primary"
                    onClick={() => router.push('/quizzes')}
                >
                    Take a Quiz
                </Button>
            </div>

            {/* Floating Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-4 w-3 h-3 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute bottom-32 right-8 w-2 h-2 bg-blue-300 rounded-full animate-pulse opacity-70"></div>
            </div>
        </div>
    );
} 