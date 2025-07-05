'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { PlayIcon, FilmIcon, TrophyIcon } from '@heroicons/react/24/solid';
import { useAppStore } from '@/stores/appStore';

export default function HomePage() {
  const router = useRouter();
  const { user, getTotalScore, getCompletedQuizzes, getCompletedVideos } = useAppStore();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    // Hide welcome animation after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleQuizzesClick = () => {
    router.push('/quizzes');
  };

  const handleVideosClick = () => {
    router.push('/videos');
  };

  const totalScore = getTotalScore();
  const completedQuizzes = getCompletedQuizzes().length;
  const completedVideos = getCompletedVideos().length;

  return (
    <div className="min-h-screen p-4 flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <div className={`transition-all duration-1000 ${showWelcome ? 'scale-110 animate-bounce' : 'scale-100'}`}>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {' '}Kids Learning!
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Fun learning with quizzes and videos! 🎉
          </p>
        </div>
      </div>

      {/* User Stats (if user exists) */}
      {user && (
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Hi, {user.name}! 👋
              </h2>
              <p className="text-gray-600">Keep up the great work!</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="h-6 w-6 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-600">{totalScore}</span>
              </div>
              <p className="text-sm text-gray-500">Total Points</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{completedQuizzes}</div>
              <p className="text-sm text-gray-500">Quizzes Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedVideos}</div>
              <p className="text-sm text-gray-500">Videos Watched</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Action Buttons */}
      <div className="flex-1 flex flex-col space-y-6 max-w-md mx-auto w-full">
        {/* Quizzes Button */}
        <div className="group">
          <Button
            onClick={handleQuizzesClick}
            variant="fun"
            size="xl"
            className="w-full h-32 flex-col space-y-4 text-2xl font-bold group-hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            <div className="flex items-center justify-center space-x-4">
              <PlayIcon className="h-12 w-12 group-hover:animate-bounce" />
              <span>Play Quizzes</span>
            </div>
            <p className="text-base font-normal opacity-90">
              Test your knowledge with fun questions!
            </p>
          </Button>
        </div>

        {/* Videos Button */}
        <div className="group">
          <Button
            onClick={handleVideosClick}
            variant="primary"
            size="xl"
            className="w-full h-32 flex-col space-y-4 text-2xl font-bold group-hover:scale-105 transition-transform duration-300 shadow-2xl"
          >
            <div className="flex items-center justify-center space-x-4">
              <FilmIcon className="h-12 w-12 group-hover:animate-bounce" />
              <span>Watch Videos</span>
            </div>
            <p className="text-base font-normal opacity-90">
              Learn with exciting educational videos!
            </p>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
          Learning Progress
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-purple-50 rounded-xl">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-sm font-semibold text-purple-700">
              {completedQuizzes} Quizzes
            </div>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <div className="text-2xl mb-1">📺</div>
            <div className="text-sm font-semibold text-blue-700">
              {completedVideos} Videos
            </div>
          </div>
          <div className="p-3 bg-yellow-50 rounded-xl">
            <div className="text-2xl mb-1">⭐</div>
            <div className="text-sm font-semibold text-yellow-700">
              {totalScore} Points
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-4 w-4 h-4 bg-yellow-300 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-32 right-8 w-3 h-3 bg-pink-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-32 left-8 w-2 h-2 bg-blue-300 rounded-full animate-ping opacity-50"></div>
        <div className="absolute bottom-40 right-4 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-60"></div>
      </div>
    </div>
  );
}
