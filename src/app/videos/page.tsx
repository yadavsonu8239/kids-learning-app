'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { VideoCard } from '@/components/VideoCard';
import { AgeFilterBar, CategoryFilterBar } from '@/components/AgeFilterBar';
import { Button } from '@/components/Button';
import { mockVideos, videoCategories } from '@/data/mockData';
import { useAppStore } from '@/stores/appStore';
import { FunnelIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function VideosPage() {
    const router = useRouter();
    const { getCompletedVideos } = useAppStore();
    const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const completedVideos = getCompletedVideos();

    const handlePlayVideo = (videoId: string) => {
        router.push(`/videos/${videoId}`);
    };

    const filteredVideos = mockVideos.filter(video => {
        const ageGroupMatch = selectedAgeGroups.length === 0 || selectedAgeGroups.includes(video.ageGroup);
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.some(cat =>
            cat.toLowerCase() === video.category.toLowerCase()
        );
        const searchMatch = searchQuery === '' ||
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        return ageGroupMatch && categoryMatch && searchMatch;
    });

    const clearFilters = () => {
        setSelectedAgeGroups([]);
        setSelectedCategories([]);
        setSearchQuery('');
    };

    const hasActiveFilters = selectedAgeGroups.length > 0 || selectedCategories.length > 0 || searchQuery !== '';

    // Group videos by category for better organization
    const videosByCategory = filteredVideos.reduce((acc, video) => {
        if (!acc[video.category]) {
            acc[video.category] = [];
        }
        acc[video.category].push(video);
        return acc;
    }, {} as Record<string, typeof mockVideos>);

    return (
        <div className="min-h-screen p-4">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">📺 Educational Videos</h1>
                        <p className="text-gray-600">Learn with fun and engaging videos!</p>
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

                {/* Search Bar */}
                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-lg"
                        placeholder="Search videos..."
                    />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-100 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-blue-600">{completedVideos.length}</div>
                        <div className="text-sm text-blue-700">Watched</div>
                    </div>
                    <div className="bg-purple-100 p-4 rounded-xl text-center">
                        <div className="text-2xl font-bold text-purple-600">{mockVideos.length}</div>
                        <div className="text-sm text-purple-700">Total Available</div>
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
                            categories={videoCategories}
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
                                Showing {filteredVideos.length} of {mockVideos.length} videos
                                {searchQuery && ` for "${searchQuery}"`}
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

            {/* Category Sections */}
            {Object.keys(videosByCategory).length > 0 ? (
                <div className="space-y-8">
                    {Object.entries(videosByCategory).map(([category, videos]) => (
                        <div key={category}>
                            {/* Category Header */}
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="text-3xl">
                                    {videoCategories.find(cat => cat.name === category)?.icon || '📹'}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800">{category}</h2>
                                    <p className="text-gray-600">{videos.length} video{videos.length !== 1 ? 's' : ''}</p>
                                </div>
                            </div>

                            {/* Videos Grid */}
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {videos.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        video={video}
                                        onPlayVideo={handlePlayVideo}
                                        isWatched={completedVideos.includes(video.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                        {searchQuery ? 'No videos found' : 'No videos available'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                        {searchQuery
                            ? `Try a different search term or adjust your filters.`
                            : 'Try adjusting your filters to see available videos!'
                        }
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

            {/* Quick Category Navigation */}
            {!hasActiveFilters && (
                <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Quick Categories</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {videoCategories.map((category) => {
                            const categoryVideos = mockVideos.filter(v => v.category === category.name);
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategories([category.id])}
                                    className="p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-center group"
                                >
                                    <div className="text-3xl mb-2 group-hover:animate-bounce">{category.icon}</div>
                                    <div className="font-semibold text-gray-800">{category.name}</div>
                                    <div className="text-sm text-gray-500">{categoryVideos.length} videos</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Floating decorations */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-24 left-6 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-40 right-8 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute bottom-32 left-12 w-4 h-4 bg-pink-300 rounded-full animate-ping opacity-50"></div>
            </div>
        </div>
    );
} 