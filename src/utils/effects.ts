import confetti from 'canvas-confetti';
import { playSound, initAudio } from './audio';

let isAudioInitialized = false;

const initializeAudioIfNeeded = async () => {
  if (!isAudioInitialized) {
    await initAudio();
    isAudioInitialized = true;
  }
};

export const showSuccessEffect = async () => {
  await initializeAudioIfNeeded();
  playSound('success');
  
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#60A5FA', '#34D399', '#F472B6']
  });
};

export const showErrorEffect = async () => {
  await initializeAudioIfNeeded();
  playSound('error');
};

export const showPopEffect = async () => {
  await initializeAudioIfNeeded();
  playSound('pop');
};