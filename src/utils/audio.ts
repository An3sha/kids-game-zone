const SOUNDS = {
  success: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  pop: 'https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3'
} as const;

let audioContext: AudioContext | null = null;
const audioBuffers = new Map<string, AudioBuffer>();

export const initAudio = async () => {
  if (audioContext) return;
  
  audioContext = new AudioContext();
  
  await Promise.all(
    Object.entries(SOUNDS).map(async ([key, url]) => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext!.decodeAudioData(arrayBuffer);
        audioBuffers.set(key, audioBuffer);
      } catch (error) {
        console.warn(`Failed to load sound: ${key}`, error);
      }
    })
  );
};

export const playSound = (type: keyof typeof SOUNDS) => {
  if (!audioContext || !audioBuffers.has(type)) return;

  try {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffers.get(type)!;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (error) {
    console.warn(`Failed to play sound: ${type}`, error);
  }
};