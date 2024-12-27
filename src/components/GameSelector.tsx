import React from 'react';
import { motion } from 'framer-motion';
import { initAudio } from '../utils/audio';
import { games } from '../data/games';
import { animations } from '../data/animations';

interface GameSelectorProps {
  onSelectGame: (gameId: string) => void;
}

export const GameSelector: React.FC<GameSelectorProps> = ({ onSelectGame }) => {
  const handleGameSelect = async (gameId: string) => {
    await initAudio();
    onSelectGame(gameId);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <motion.div 
        variants={animations.container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {games.map((game) => (
          <motion.button
            key={game.id}
            variants={animations.card}
            onClick={() => handleGameSelect(game.id)}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`relative overflow-hidden rounded-2xl p-6 text-left bg-gradient-to-br ${game.gradient} ${game.shadow} shadow-xl`}
          >
            <div className="text-white/90 mb-4">
              <game.IconComponent size={32} />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">
              {game.title}
            </h2>
            <p className="text-white/80 text-sm">
              {game.description}
            </p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};