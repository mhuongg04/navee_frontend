import React from 'react';

/**
 * @typedef {Object} LoadingSpinnerProps
 * @property {'sm' | 'md' | 'lg'} [size]
 * @property {'blue' | 'red' | 'green' | 'purple' | 'yellow'} [color]
 * @property {boolean} [showText]
 * @property {string} [text]
 * @property {string} [className]
 */

/**
 * @param {LoadingSpinnerProps} props
 */
const LoadingSpinner = ({
  size = 'md',
  color = 'blue',
  showText = true,
  text = 'Đang tải...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-4',
  };

  const colorClasses = {
    blue: 'border-t-blue-600',
    red: 'border-t-red-600',
    green: 'border-t-green-600',
    purple: 'border-t-purple-600',
    yellow: 'border-t-yellow-600',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-gray-200 rounded-full ${colorClasses[color]} animate-spin`}
        role="status"
        aria-label="loading"
      />
      {showText && <span className={`ml-3 ${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base'}`}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;