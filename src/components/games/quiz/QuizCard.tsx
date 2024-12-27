import React from 'react';
import { motion } from 'framer-motion';
import type { Question } from '../../../types/quiz';

type QuizCardProps = {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
};

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer }) => {
  const options = [
    { text: question.title.split(' ')[0], correct: true },
    { text: 'Something else', correct: false },
    { text: 'Another option', correct: false },
  ].sort(() => Math.random() - 0.5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-xl shadow-xl"
    >
      <div className="mb-6">
        <img
          src={question.thumbnailUrl}
          alt="Quiz"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <h3 className="text-xl font-bold text-center text-purple-600">
          What do you see in this image?
        </h3>
      </div>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-left text-purple-700 font-medium"
            onClick={() => onAnswer(option.correct)}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};