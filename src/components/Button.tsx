import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'outline' | 'ghost' | 'fun';
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
    animation?: 'none' | 'bounce' | 'pulse' | 'wiggle';
    icon?: React.ReactNode;
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({
        className = '',
        variant = 'default',
        size = 'md',
        animation = 'none',
        children,
        icon,
        isLoading,
        disabled,
        ...props
    }, ref) => {

        const getVariantClasses = () => {
            switch (variant) {
                case 'primary':
                    return 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-105';
                case 'secondary':
                    return 'bg-green-500 text-white hover:bg-green-600 hover:scale-105';
                case 'danger':
                    return 'bg-red-500 text-white hover:bg-red-600 hover:scale-105';
                case 'warning':
                    return 'bg-yellow-500 text-white hover:bg-yellow-600 hover:scale-105';
                case 'outline':
                    return 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50 hover:scale-105';
                case 'ghost':
                    return 'text-gray-700 hover:bg-gray-100 hover:scale-105';
                case 'fun':
                    return 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg';
                default:
                    return 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105';
            }
        };

        const getSizeClasses = () => {
            switch (size) {
                case 'sm':
                    return 'h-10 px-4 text-sm';
                case 'lg':
                    return 'h-16 px-8 text-lg';
                case 'xl':
                    return 'h-20 px-10 text-xl';
                case 'icon':
                    return 'h-12 w-12';
                default:
                    return 'h-12 px-6 text-base';
            }
        };

        const getAnimationClasses = () => {
            switch (animation) {
                case 'bounce':
                    return 'animate-bounce';
                case 'pulse':
                    return 'animate-pulse';
                case 'wiggle':
                    return 'hover:animate-wiggle';
                default:
                    return '';
            }
        };

        const baseClasses = 'inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
        const variantClasses = getVariantClasses();
        const sizeClasses = getSizeClasses();
        const animationClasses = getAnimationClasses();

        return (
            <button
                className={`${baseClasses} ${variantClasses} ${sizeClasses} ${animationClasses} ${className}`}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                        Loading...
                    </div>
                ) : (
                    <>
                        {icon && <span className="mr-2">{icon}</span>}
                        {children}
                    </>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps }; 