// src/components/GameOverScreen.tsx
import React from 'react';

interface GameOverScreenProps {
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ onRestart }) => {
  return (
    <div className="game-over-screen">
      <h1>GAME OVER</h1>
      <p>Better luck next time, hero.</p>
      <button onClick={onRestart}>
        Return to Main Menu
      </button>
    </div>
  );
};

export default GameOverScreen;