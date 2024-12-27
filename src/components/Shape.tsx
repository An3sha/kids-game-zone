import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Shape.css';

type ShapeProps = {
  type: 'circle' | 'square' | 'triangle' | 'star';
  color: string;
  isTarget?: boolean;
  onDragEnd?: () => void;
  onClick?: () => void;
};

export const Shape: React.FC<ShapeProps> = ({ 
  type, 
  color, 
  isTarget, 
  onDragEnd, 
  onClick 
}) => {
  return (
    <motion.div
      className={`shape ${type} ${color}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      drag={!isTarget}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={onDragEnd}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
};