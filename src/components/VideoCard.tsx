import React from 'react';
import Image from 'next/image';
import { Video } from '@/types';
import { Button } from './Button';
import { PlayIcon, ClockIcon, EyeIcon } from '@heroicons/react/24/solid';
import { formatTime } from '@/lib/speechUtils';

interface VideoCardProps {
    video: Video;
    onPlayVideo: (videoId: string) => void;
    isWatched?: boolean;
    className?: string;
}

export const VideoCard: React.FC<VideoCardProps> = ({
    video,
    onPlayVideo,
    isWatched = false,
    className = ''
}) => {
    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'DIY':
                return 'bg-red-100 text-red-800';
            case 'Brain Dev':
                return 'bg-indigo-100 text-indigo-800';
            case 'Inventions':
                return 'bg-amber-100 text-amber-800';
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

    return (
        <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-102 ${className}`}>
            {/* Thumbnail container */}
            <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden relative">
                    {/* Actual video thumbnail */}
                    <Image
                        src={video.thumbnailUrl}
                        alt={video.title}
                        fill
                        className="object-cover"
                        onError={(e) => {
                            // Fallback to placeholder if thumbnail fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                    />

                    {/* Fallback placeholder (hidden by default) */}
                    <div className="absolute inset-0 hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <div className="text-white text-center">
                            <div className="text-4xl mb-2">📹</div>
                            <p className="text-sm opacity-90">Video Preview</p>
                        </div>
                    </div>

                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={() => onPlayVideo(video.id)}
                            className="bg-white/90 hover:bg-white rounded-full p-4 transform hover:scale-110 transition-transform duration-200 shadow-lg"
                        >
                            <PlayIcon className="h-8 w-8 text-gray-800" />
                        </button>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-semibold">
                        {formatTime(video.duration)}
                    </div>

                    {/* Watched indicator */}
                    {isWatched && (
                        <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                            <EyeIcon className="h-4 w-4 text-white" />
                        </div>
                    )}
                </div>

                {/* Category and Age Group badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(video.category)}`}>
                        {video.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getAgeGroupColor(video.ageGroup)}`}>
                        {video.ageGroup}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {video.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {video.description}
                </p>

                {/* Video stats */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                        <ClockIcon className="h-4 w-4" />
                        <span className="text-sm">{formatTime(video.duration)}</span>
                    </div>

                    {video.relatedQuizzes.length > 0 && (
                        <div className="flex items-center space-x-1">
                            <span className="text-xs text-purple-600 font-semibold">
                                +{video.relatedQuizzes.length} quiz{video.relatedQuizzes.length > 1 ? 'es' : ''}
                            </span>
                        </div>
                    )}
                </div>

                {/* Tags */}
                {video.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {video.tags.slice(0, 3).map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Action button */}
                <Button
                    onClick={() => onPlayVideo(video.id)}
                    variant={isWatched ? "secondary" : "primary"}
                    size="lg"
                    className="w-full group-hover:scale-105 transition-transform duration-200"
                    icon={<PlayIcon className="h-5 w-5" />}
                >
                    {isWatched ? 'Watch Again' : 'Watch Now'}
                </Button>
            </div>

            {/* Fun animations */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-4 right-8 w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute bottom-8 left-4 w-3 h-3 bg-blue-300 rounded-full animate-bounce opacity-40"></div>
            </div>
        </div>
    );
}; 