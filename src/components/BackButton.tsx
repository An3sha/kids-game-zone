import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface BackButtonProps {
  onClick: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <Button
    onClick={onClick}
    variant="blue"
    size="medium"
    icon={<ArrowLeft size={20} />}
    className="mb-8"
  >
    Back to Games
  </Button>
);