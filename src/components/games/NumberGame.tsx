import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { Button } from '../Button';
import { showSuccessEffect, showErrorEffect } from '../../utils/effects';

const numberColors = [
  'bg-gradient-to-br from-pink-400 to-red-400',
  'bg-gradient-to-br from-orange-400 to-amber-400',
  'bg-gradient-to-br from-green-400 to-emerald-400',
  'bg-gradient-to-br from-cyan-400 to-blue-400',
  'bg-gradient-to-br from-indigo-400 to-violet-400',
  'bg-gradient-to-br from-purple-400 to-fuchsia-400',
  'bg-gradient-to-br from-rose-400 to-pink-400',
  'bg-gradient-to-br from-amber-400 to-yellow-400',
  'bg-gradient-to-br from-teal-400 to-cyan-400',
  'bg-gradient-to-br from-blue-400 to-indigo-400',
];

const numbers = Array.from({ length: 10 }, (_, i) => ({
  value: i + 1,
  color: numberColors[i]
}));

export const NumberGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [targetNumber, setTargetNumber] = useState(numbers[0]);
  const [shuffledNumbers, setShuffledNumbers] = useState(numbers);

  const shuffleGame = () => {
    const newTarget = numbers[Math.floor(Math.random() * numbers.length)];
    setTargetNumber(newTarget);
    setShuffledNumbers([...numbers].sort(() => Math.random() - 0.5));
  };

  const handleNumberClick = (number: typeof numbers[0]) => {
    if (number.value === targetNumber.value) {
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
          variant="orange"
          size="medium"
          icon={<RefreshCw size={20} />}
        >
          Reset
        </Button>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h3 className="text-xl text-center mb-4">Find the number:</h3>
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <div className={`w-32 h-32 ${targetNumber.color} rounded-xl flex items-center justify-center text-8xl font-bold text-white shadow-lg`}>
            {targetNumber.value}
          </div>
        </motion.div>

        <div className="grid grid-cols-5 gap-4">
          {shuffledNumbers.map((number) => (
            <motion.button
              key={number.value}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`${number.color} w-full h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white shadow-md hover:shadow-lg transition-shadow`}
              onClick={() => handleNumberClick(number)}
            >
              {number.value}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};