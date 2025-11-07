
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="w-16 h-16 border-4 border-t-pink-500 border-r-pink-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      <p className="text-pink-400 font-semibold">Generating Image...</p>
    </div>
  );
};

export default LoadingSpinner;
