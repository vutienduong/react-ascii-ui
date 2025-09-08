import { SoundEffect, BeepSequence } from './types';

let audioContextInstance: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  
  if (!audioContextInstance) {
    try {
      // @ts-ignore - Handle different browser implementations
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioContextInstance = new AudioContextClass();
      }
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
      return null;
    }
  }
  
  return audioContextInstance;
};

export const resumeAudioContext = async (): Promise<void> => {
  const context = getAudioContext();
  if (context && context.state === 'suspended') {
    try {
      await context.resume();
    } catch (error) {
      console.warn('Failed to resume audio context:', error);
    }
  }
};

export const playBeep = async (effect: SoundEffect, masterVolume = 1): Promise<void> => {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  try {
    await resumeAudioContext();

    // Create oscillator for the tone
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure oscillator
    oscillator.frequency.setValueAtTime(effect.frequency, audioContext.currentTime);
    oscillator.type = effect.type;

    // Configure volume
    const volume = (effect.volume || 1) * masterVolume;
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

    // Handle fade out
    if (effect.fadeOut) {
      const fadeTime = effect.duration * 0.7; // Start fade at 70% of duration
      gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + fadeTime / 1000);
    } else {
      // Smooth start and end to avoid clicks
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + effect.duration / 1000);
    }

    // Start and stop the oscillator
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + effect.duration / 1000);

  } catch (error) {
    console.warn('Failed to play sound effect:', error);
  }
};

export const playSequence = async (sequence: BeepSequence, masterVolume = 1): Promise<void> => {
  if (!sequence.effects || sequence.effects.length === 0) return;

  for (let i = 0; i < sequence.effects.length; i++) {
    const effect = sequence.effects[i];
    
    // Play the current effect
    playBeep(effect, masterVolume);
    
    // Wait before playing the next effect
    if (i < sequence.effects.length - 1 && sequence.interval) {
      await new Promise(resolve => setTimeout(resolve, sequence.interval));
    }
  }
};

export const generateWhiteNoise = (audioContext: AudioContext, duration: number, volume = 0.1): AudioBuffer => {
  const sampleRate = audioContext.sampleRate;
  const length = sampleRate * duration;
  const buffer = audioContext.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * volume;
  }

  return buffer;
};

export const playWhiteNoise = async (duration: number, volume = 0.1, masterVolume = 1): Promise<void> => {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  try {
    await resumeAudioContext();

    const buffer = generateWhiteNoise(audioContext, duration / 1000, volume * masterVolume);
    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(1, audioContext.currentTime);
    source.start(audioContext.currentTime);

  } catch (error) {
    console.warn('Failed to play white noise:', error);
  }
};

export const createSweepEffect = async (
  startFreq: number, 
  endFreq: number, 
  duration: number, 
  type: OscillatorType = 'sine',
  volume = 0.1,
  masterVolume = 1
): Promise<void> => {
  const audioContext = getAudioContext();
  if (!audioContext) return;

  try {
    await resumeAudioContext();

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = type;
    
    // Frequency sweep
    oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration / 1000);

    // Volume envelope
    const finalVolume = volume * masterVolume;
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(finalVolume, audioContext.currentTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);

  } catch (error) {
    console.warn('Failed to play sweep effect:', error);
  }
};

// Preset sound generators
export const soundGenerators = {
  dial: () => createSweepEffect(800, 400, 300, 'sawtooth', 0.1),
  powerUp: () => createSweepEffect(200, 800, 500, 'square', 0.15),
  powerDown: () => createSweepEffect(800, 200, 800, 'square', 0.15),
  error: () => playBeep({ frequency: 150, duration: 1000, type: 'sawtooth', volume: 0.2 }),
  coin: () => playSequence({
    effects: [
      { frequency: 988, duration: 100, type: 'square', volume: 0.15 },
      { frequency: 1319, duration: 300, type: 'square', volume: 0.15 }
    ],
    interval: 0
  }),
  laser: () => createSweepEffect(1000, 200, 150, 'sawtooth', 0.1)
};