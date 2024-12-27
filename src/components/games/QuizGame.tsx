import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { QuizCard } from './quiz/QuizCard';
import { useQuizData } from '../../hooks/useQuizData';
import { playSound } from '../../utils/sound';

export const QuizGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const { questions, loading, error, refreshQuestions } = useQuizData();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      playSound('success');
      setScore(score + 1);
    } else {
      playSound('error');
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    refreshQuestions();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Oops! Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-purple-600">Score: {score}</h2>
        <button
          onClick={resetGame}
          className="bg-purple-500 text-white p-2 rounded-full"
        >
          <RefreshCw />
        </button>
      </div>

      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <QuizCard
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-purple-600 mb-4">Game Complete!</h3>
          <p className="text-xl mb-4">Your final score: {score}</p>
          <button
            onClick={resetGame}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg"
          >
            Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};