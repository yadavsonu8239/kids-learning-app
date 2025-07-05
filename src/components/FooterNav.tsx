"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
    HomeIcon,
    PlayIcon,
    FilmIcon,
    UserIcon
} from '@heroicons/react/24/outline';
import {
    HomeIcon as HomeIconSolid,
    PlayIcon as PlayIconSolid,
    FilmIcon as FilmIconSolid,
    UserIcon as UserIconSolid
} from '@heroicons/react/24/solid';

interface NavItemProps {
    icon: React.ReactNode;
    activeIcon: React.ReactNode;
    label: string;
    href: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
    icon,
    activeIcon,
    label,
    isActive,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={`
        flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200
        ${isActive
                    ? 'bg-purple-100 text-purple-600 scale-105'
                    : 'text-gray-500 hover:text-purple-500 hover:bg-purple-50'
                }
      `}
        >
            <div className={`mb-1 ${isActive ? 'animate-bounce' : ''}`}>
                {isActive ? activeIcon : icon}
            </div>
            <span className={`text-xs font-semibold ${isActive ? 'text-purple-600' : 'text-gray-500'}`}>
                {label}
            </span>
        </button>
    );
};

export const FooterNav: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        {
            icon: <HomeIcon className="h-6 w-6" />,
            activeIcon: <HomeIconSolid className="h-6 w-6" />,
            label: 'Home',
            href: '/'
        },
        {
            icon: <PlayIcon className="h-6 w-6" />,
            activeIcon: <PlayIconSolid className="h-6 w-6" />,
            label: 'Quizzes',
            href: '/quizzes'
        },
        {
            icon: <FilmIcon className="h-6 w-6" />,
            activeIcon: <FilmIconSolid className="h-6 w-6" />,
            label: 'Videos',
            href: '/videos'
        },
        {
            icon: <UserIcon className="h-6 w-6" />,
            activeIcon: <UserIconSolid className="h-6 w-6" />,
            label: 'Profile',
            href: '/settings'
        }
    ];

    const handleNavigation = (href: string) => {
        router.push(href);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
            <div className="flex items-center justify-around p-2 max-w-md mx-auto">
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        icon={item.icon}
                        activeIcon={item.activeIcon}
                        label={item.label}
                        href={item.href}
                        isActive={pathname === item.href}
                        onClick={() => handleNavigation(item.href)}
                    />
                ))}
            </div>

            {/* Fun decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-4 w-1 h-1 bg-purple-300 rounded-full animate-pulse"></div>
                <div className="absolute top-0 right-4 w-1 h-1 bg-blue-300 rounded-full animate-pulse delay-500"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-300 rounded-full animate-pulse delay-1000"></div>
            </div>
        </div>
    );
}; 