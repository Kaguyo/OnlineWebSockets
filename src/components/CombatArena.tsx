// src/components/CombatArena.tsx
import React from 'react';

interface CombatArenaProps {
  onGameOver: () => void;
}

const CombatArena: React.FC<CombatArenaProps> = ({ onGameOver }) => {


  const handleDefeat = () => {

    onGameOver();
  };

  return (
    <div className="combat-arena">
      <h3>⚔️ Combat In Progress! ⚔️</h3>
      <p>Player Health: 100</p>
      <p>Enemy Health: 50</p>
      
      <button onClick={handleDefeat}>
        Simulate Defeat (Go to Game Over)
      </button>
    </div>
  );
};

export default CombatArena;