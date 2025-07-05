'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/Button';
import { Badge } from '@/components/ScoreStars';
import { useAppStore } from '@/stores/appStore';
import { badges } from '@/data/mockData';
import {
    UserIcon,
    CogIcon,
    TrophyIcon,
    StarIcon
} from '@heroicons/react/24/solid';

export default function SettingsPage() {
    const { user, setUser, updateUser, getTotalScore, getCompletedQuizzes, getCompletedVideos, getUserBadges } = useAppStore();
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAge(user.age.toString());
            setLanguage(user.language);
        }
    }, [user]);

    const handleCreateProfile = () => {
        if (name && age) {
            const ageNum = parseInt(age);
            let ageGroup: 'pre-birth' | '0-2' | '3-5' | '6-10' = '3-5';

            if (ageNum < 3) ageGroup = '0-2';
            else if (ageNum <= 5) ageGroup = '3-5';
            else if (ageNum <= 10) ageGroup = '6-10';

            const newUser = {
                id: Date.now().toString(),
                name,
                age: ageNum,
                ageGroup,
                language,
                completedQuizzes: [],
                completedVideos: [],
                totalScore: 0,
                badges: []
            };

            setUser(newUser);
            setIsEditing(false);
        }
    };

    const handleUpdateProfile = () => {
        if (name && age && user) {
            const ageNum = parseInt(age);
            let ageGroup: 'pre-birth' | '0-2' | '3-5' | '6-10' = '3-5';

            if (ageNum < 3) ageGroup = '0-2';
            else if (ageNum <= 5) ageGroup = '3-5';
            else if (ageNum <= 10) ageGroup = '6-10';

            updateUser({
                name,
                age: ageNum,
                ageGroup,
                language
            });
            setIsEditing(false);
        }
    };

    const totalScore = getTotalScore();
    const completedQuizzes = getCompletedQuizzes();
    const completedVideos = getCompletedVideos();
    const userBadges = getUserBadges();

    if (!user) {
        return (
            <div className="min-h-screen p-4 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">👋</div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h1>
                        <p className="text-gray-600">Let's set up your profile to get started</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                What's your name?
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                How old are you?
                            </label>
                            <select
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                            >
                                <option value="">Select your age</option>
                                {Array.from({ length: 15 }, (_, i) => i + 1).map(ageOption => (
                                    <option key={ageOption} value={ageOption}>
                                        {ageOption} year{ageOption > 1 ? 's' : ''} old
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Choose your language
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>

                        <Button
                            onClick={handleCreateProfile}
                            variant="fun"
                            size="lg"
                            className="w-full mt-6"
                            disabled={!name || !age}
                        >
                            Start Learning! 🚀
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {isEditing ? 'Edit Profile' : `Hi, ${user.name}! 👋`}
                </h1>
                <p className="text-gray-600">
                    {isEditing ? 'Update your information' : 'Manage your profile and view your progress'}
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <UserIcon className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-gray-600">{user.age} years old • {user.ageGroup}</p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                        icon={<CogIcon className="h-4 w-4" />}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                </div>

                {/* Edit Form */}
                {isEditing && (
                    <div className="space-y-4 mt-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
                            <select
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            >
                                {Array.from({ length: 15 }, (_, i) => i + 1).map(ageOption => (
                                    <option key={ageOption} value={ageOption}>
                                        {ageOption} year{ageOption > 1 ? 's' : ''} old
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as 'en' | 'es' | 'fr')}
                                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                            >
                                <option value="en">English</option>
                                <option value="es">Español</option>
                                <option value="fr">Français</option>
                            </select>
                        </div>

                        <Button
                            onClick={handleUpdateProfile}
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={!name || !age}
                        >
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-purple-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-purple-600">{totalScore}</div>
                    <div className="text-sm text-purple-700">Total Points</div>
                </div>
                <div className="bg-blue-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-blue-600">{completedQuizzes.length}</div>
                    <div className="text-sm text-blue-700">Quizzes Done</div>
                </div>
                <div className="bg-green-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-green-600">{completedVideos.length}</div>
                    <div className="text-sm text-green-700">Videos Watched</div>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold text-yellow-600">{userBadges.length}</div>
                    <div className="text-sm text-yellow-700">Badges Earned</div>
                </div>
            </div>

            {/* Badges Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                    <TrophyIcon className="h-6 w-6 text-yellow-500" />
                    <h3 className="text-xl font-bold text-gray-800">Achievements</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {badges.map((badge) => (
                        <Badge
                            key={badge.id}
                            icon={badge.icon}
                            name={badge.name}
                            description={badge.description}
                            earned={userBadges.includes(badge.id)}
                        />
                    ))}
                </div>

                {userBadges.length === 0 && (
                    <div className="text-center py-8">
                        <div className="text-4xl mb-2">🎯</div>
                        <p className="text-gray-600">Start completing quizzes and watching videos to earn badges!</p>
                    </div>
                )}
            </div>
        </div>
    );
} 