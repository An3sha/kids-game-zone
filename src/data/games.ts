import { Shapes, Hash, Cat } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  IconComponent: LucideIcon;
  gradient: string;
  shadow: string;
}

export const games: Game[] = [
  {
    id: 'shapes',
    title: 'Shape Matching',
    description: 'Match shapes and colors in this fun memory game!',
    IconComponent: Shapes,
    gradient: 'from-purple-500 to-indigo-500',
    shadow: 'shadow-purple-200/50'
  },
  {
    id: 'animals',
    title: 'Animal Habitats',
    description: 'Help cute animals find their perfect homes!',
    IconComponent: Cat,
    gradient: 'from-pink-500 to-rose-500',
    shadow: 'shadow-pink-200/50'
  },
  {
    id: 'numbers',
    title: 'Number Fun',
    description: 'Learn counting with colorful numbers and puzzles!',
    IconComponent: Hash,
    gradient: 'from-orange-400 to-pink-400',
    shadow: 'shadow-orange-200/50'
  }
];