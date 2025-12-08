// src/components/LoadingScreen.tsx
import React from 'react';

interface LoadingScreenProps {
  // Add props if needed, e.g., to show loading progress
}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div className="loading-screen">
      <h1>Loading Game Data...</h1>
      <p>Please wait.</p>
    </div>
  );
};

export default LoadingScreen;