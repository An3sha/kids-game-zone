const sounds = {
  success: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3'
};

export const playSound = (type: keyof typeof sounds) => {
  new Audio(sounds[type]).play();
};