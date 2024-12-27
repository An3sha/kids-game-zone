import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shape } from './Shape';
import { PlayCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { showSuccessEffect, showErrorEffect } from '../utils/effects';

const shapes = [
  { type: 'circle', color: 'bg-red-400' },
  { type: 'square', color: 'bg-blue-400' },
  { type: 'triangle', color: 'bg-green-400' },
  { type: 'star', color: 'bg-yellow-400' },
];

export const GameBoard: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [currentShape, setCurrentShape] = useState(shapes[0]);
  const [shuffledShapes, setShuffledShapes] = useState(shapes);

  const shuffleShapes = () => {
    setShuffledShapes([...shapes].sort(() => Math.random() - 0.5));
    setCurrentShape(shapes[Math.floor(Math.random() * shapes.length)]);
  };

  const handleShapeClick = (shape: typeof shapes[0]) => {
    if (shape.type === currentShape.type) {
      showSuccessEffect();
      setScore(score + 1);
      shuffleShapes();
    } else {
      showErrorEffect();
    }
  };

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    shuffleShapes();
  };

  const resetGame = () => {
    setIsPlaying(false);
    setScore(0);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {!isPlaying ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-neutral-800 mb-8">Shape Matching Game</h1>
            <Button 
              onClick={startGame}
              variant="purple"
              size="large"
              icon={<PlayCircle size={24} />}
            >
              Start Game
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center">
              <div className="text-xl font-semibold">Score: {score}</div>
              <Button
                onClick={resetGame}
                variant="pink"
                size="medium"
                icon={<RefreshCw size={20} />}
              >
                Reset
              </Button>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-xl text-center mb-4">Find this shape:</h3>
              <div className="flex justify-center mb-8">
                <Shape type={currentShape.type} color={currentShape.color} isTarget />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {shuffledShapes.map((shape, index) => (
                  <div key={index} className="flex justify-center">
                    <Shape
                      type={shape.type}
                      color={shape.color}
                      onClick={() => handleShapeClick(shape)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};