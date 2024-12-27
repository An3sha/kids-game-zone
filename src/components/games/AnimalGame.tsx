import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '../Button';
import { showSuccessEffect, showErrorEffect } from '../../utils/effects';

const animals = [
  { id: 'lion', name: 'Lion', habitat: 'savanna', image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop' },
  { id: 'penguin', name: 'Penguin', habitat: 'arctic', image: 'https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=300&h=300&fit=crop' },
  { id: 'monkey', name: 'Monkey', habitat: 'jungle', image: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=300&h=300&fit=crop' },
  { id: 'fish', name: 'Fish', habitat: 'ocean', image: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=300&h=300&fit=crop' },
];

const habitats = [
  { id: 'savanna', name: 'Savanna', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=300&h=300&fit=crop' },
  { id: 'arctic', name: 'Arctic', image: 'https://images.unsplash.com/photo-1476067897447-d0c5df27b5df?w=300&h=300&fit=crop' },
  { id: 'jungle', name: 'Jungle', image: 'https://images.unsplash.com/photo-1536147116438-62679a5e01f2?w=300&h=300&fit=crop' },
  { id: 'ocean', name: 'Ocean', image: 'https://images.unsplash.com/photo-1564053489984-317bbd824340?w=300&h=300&fit=crop' },
];

export const AnimalGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
  const [shuffledHabitats, setShuffledHabitats] = useState(habitats);

  const shuffleGame = () => {
    const newAnimal = animals[Math.floor(Math.random() * animals.length)];
    setCurrentAnimal(newAnimal);
    setShuffledHabitats([...habitats].sort(() => Math.random() - 0.5));
  };

  const handleHabitatClick = (habitatId: string) => {
    if (habitatId === currentAnimal.habitat) {
      showSuccessEffect();
      setScore(score + 1);
      shuffleGame();
    } else {
      showErrorEffect();
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold">Score: {score}</div>
        <Button
          onClick={() => {
            setScore(0);
            shuffleGame();
          }}
          variant="pink"
          size="medium"
          icon={<RefreshCw size={20} />}
        >
          Reset
        </Button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl text-center mb-4">Where does the {currentAnimal.name} live?</h3>
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <img 
            src={currentAnimal.image} 
            alt={currentAnimal.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-pink-100"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {shuffledHabitats.map((habitat) => (
            <motion.button
              key={habitat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleHabitatClick(habitat.id)}
              className="relative overflow-hidden rounded-lg aspect-video group"
            >
              <img 
                src={habitat.image} 
                alt={habitat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white font-semibold text-lg">
                {habitat.name}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};