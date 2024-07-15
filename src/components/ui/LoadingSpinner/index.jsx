import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'blue', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-8 h-8 border-4',
    large: 'w-12 h-12 border-4',
  };

  const colorClasses = {
    blue: 'border-blue-500',
    red: 'border-red-500',
    green: 'border-green-500',
    gray: 'border-gray-500',
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
    >
      <div
        className={`border-t-transparent border-solid ${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-4 border-r-4 border-l-4 rounded-full animate-spin`}
      />
    </div>
  );
};

export default LoadingSpinner;

