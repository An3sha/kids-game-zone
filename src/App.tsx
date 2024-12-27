import React, { useState } from 'react';
import { GameSelector } from './components/GameSelector';
import { GameBoard } from './components/GameBoard';
import { AnimalGame } from './components/games/AnimalGame';
import { NumberGame } from './components/games/NumberGame';
import { BackButton } from './components/BackButton';

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (selectedGame) {
      case 'shapes':
        return <GameBoard />;
      case 'animals':
        return <AnimalGame />;
      case 'numbers':
        return <NumberGame />;
      default:
        return <GameSelector onSelectGame={setSelectedGame} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 p-8">
      {selectedGame && (
        <BackButton onClick={() => setSelectedGame(null)} />
      )}
      <div className="max-w-4xl mx-auto">
        {renderGame()}
      </div>
    </div>
  );
}

export default App;