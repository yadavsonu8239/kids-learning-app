import React from 'react';
import { ageGroups } from '@/data/mockData';

interface AgeFilterBarProps {
    selectedAgeGroups: string[];
    onAgeGroupChange: (ageGroups: string[]) => void;
    className?: string;
}

export const AgeFilterBar: React.FC<AgeFilterBarProps> = ({
    selectedAgeGroups,
    onAgeGroupChange,
    className = ''
}) => {
    const handleAgeGroupToggle = (ageGroupId: string) => {
        if (selectedAgeGroups.includes(ageGroupId)) {
            // Remove from selection
            onAgeGroupChange(selectedAgeGroups.filter(id => id !== ageGroupId));
        } else {
            // Add to selection
            onAgeGroupChange([...selectedAgeGroups, ageGroupId]);
        }
    };

    const handleClearAll = () => {
        onAgeGroupChange([]);
    };

    const handleSelectAll = () => {
        onAgeGroupChange(ageGroups.map(group => group.id));
    };

    return (
        <div className={`bg-white rounded-xl p-4 shadow-md ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Age Groups</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Clear All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        onClick={handleSelectAll}
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                        Select All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {ageGroups.map((group) => {
                    const isSelected = selectedAgeGroups.includes(group.id);

                    return (
                        <button
                            key={group.id}
                            onClick={() => handleAgeGroupToggle(group.id)}
                            className={`
                p-3 rounded-xl border-2 transition-all duration-200 text-left
                ${isSelected
                                    ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                                    : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25'
                                }
              `}
                        >
                            <div className="flex items-center space-x-2">
                                <div className="text-2xl">{group.icon}</div>
                                <div>
                                    <div className={`font-semibold text-sm ${isSelected ? 'text-purple-700' : 'text-gray-700'
                                        }`}>
                                        {group.name}
                                    </div>
                                    <div className={`text-xs ${isSelected ? 'text-purple-600' : 'text-gray-500'
                                        }`}>
                                        {group.id === 'pre-birth' && 'Prenatal'}
                                        {group.id === '0-2' && 'Toddlers'}
                                        {group.id === '3-5' && 'Preschool'}
                                        {group.id === '6-10' && 'School Age'}
                                    </div>
                                </div>
                            </div>

                            {/* Selection indicator */}
                            {isSelected && (
                                <div className="absolute -top-1 -right-1 bg-purple-500 rounded-full p-1">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Show selected count */}
            {selectedAgeGroups.length > 0 && (
                <div className="mt-4 text-center">
                    <span className="text-sm text-purple-600 font-semibold">
                        {selectedAgeGroups.length} age group{selectedAgeGroups.length !== 1 ? 's' : ''} selected
                    </span>
                </div>
            )}
        </div>
    );
};

// Category Filter component (similar to age filter)
interface CategoryFilterBarProps {
    categories: Array<{ id: string; name: string; icon: string; color: string }>;
    selectedCategories: string[];
    onCategoryChange: (categories: string[]) => void;
    className?: string;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
    categories,
    selectedCategories,
    onCategoryChange,
    className = ''
}) => {
    const handleCategoryToggle = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            onCategoryChange(selectedCategories.filter(id => id !== categoryId));
        } else {
            onCategoryChange([...selectedCategories, categoryId]);
        }
    };

    const handleClearAll = () => {
        onCategoryChange([]);
    };

    const handleSelectAll = () => {
        onCategoryChange(categories.map(cat => cat.id));
    };

    return (
        <div className={`bg-white rounded-xl p-4 shadow-md ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Categories</h3>
                <div className="flex space-x-2">
                    <button
                        onClick={handleClearAll}
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        Clear All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                        onClick={handleSelectAll}
                        className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                        Select All
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                    const isSelected = selectedCategories.includes(category.id);

                    return (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryToggle(category.id)}
                            className={`
                px-4 py-2 rounded-full border-2 transition-all duration-200 flex items-center space-x-2
                ${isSelected
                                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-md scale-105'
                                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-purple-300 hover:bg-purple-25'
                                }
              `}
                        >
                            <span className="text-lg">{category.icon}</span>
                            <span className="font-semibold text-sm">{category.name}</span>

                            {isSelected && (
                                <div className="bg-purple-500 rounded-full p-1">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {selectedCategories.length > 0 && (
                <div className="mt-4 text-center">
                    <span className="text-sm text-purple-600 font-semibold">
                        {selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'} selected
                    </span>
                </div>
            )}
        </div>
    );
}; 