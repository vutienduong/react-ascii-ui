export interface SoundEffect {
  frequency: number;
  duration: number;
  type: 'sine' | 'square' | 'sawtooth' | 'triangle';
  volume?: number;
  fadeOut?: boolean;
}

export interface BeepSequence {
  effects: SoundEffect[];
  interval?: number;
}

export interface AsciiSoundContextValue {
  audioContext: AudioContext | null;
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
  isEnabled: boolean;
  setIsEnabled: (enabled: boolean) => void;
  playBeep: (effect: SoundEffect) => void;
  playSequence: (sequence: BeepSequence) => void;
  playPreset: (presetName: keyof typeof soundPresets) => void;
}

export const soundPresets = {
  // Terminal sounds
  keyPress: {
    frequency: 800,
    duration: 50,
    type: 'square' as const,
    volume: 0.1
  },
  enter: {
    frequency: 600,
    duration: 100,
    type: 'sine' as const,
    volume: 0.2
  },
  backspace: {
    frequency: 400,
    duration: 80,
    type: 'square' as const,
    volume: 0.15
  },
  
  // UI interaction sounds
  buttonClick: {
    frequency: 1000,
    duration: 50,
    type: 'square' as const,
    volume: 0.1
  },
  buttonHover: {
    frequency: 1200,
    duration: 30,
    type: 'sine' as const,
    volume: 0.05
  },
  tabSwitch: {
    frequency: 800,
    duration: 100,
    type: 'triangle' as const,
    volume: 0.1
  },
  modalOpen: {
    frequency: 600,
    duration: 200,
    type: 'sine' as const,
    volume: 0.15,
    fadeOut: true
  },
  modalClose: {
    frequency: 400,
    duration: 150,
    type: 'sine' as const,
    volume: 0.12,
    fadeOut: true
  },
  
  // Data/form sounds
  formSubmit: {
    frequency: 1200,
    duration: 200,
    type: 'sine' as const,
    volume: 0.2
  },
  formError: {
    frequency: 300,
    duration: 300,
    type: 'sawtooth' as const,
    volume: 0.2
  },
  uploadComplete: {
    frequency: 1000,
    duration: 150,
    type: 'sine' as const,
    volume: 0.15
  },
  
  // Game sounds
  gameStart: {
    effects: [
      { frequency: 440, duration: 200, type: 'square' as const, volume: 0.2 },
      { frequency: 554, duration: 200, type: 'square' as const, volume: 0.2 },
      { frequency: 659, duration: 400, type: 'square' as const, volume: 0.2 }
    ],
    interval: 100
  } as BeepSequence,
  gameOver: {
    effects: [
      { frequency: 659, duration: 200, type: 'sawtooth' as const, volume: 0.2 },
      { frequency: 554, duration: 200, type: 'sawtooth' as const, volume: 0.2 },
      { frequency: 440, duration: 400, type: 'sawtooth' as const, volume: 0.2 }
    ],
    interval: 100
  } as BeepSequence,
  
  // System sounds
  notification: {
    frequency: 800,
    duration: 100,
    type: 'sine' as const,
    volume: 0.15
  },
  alert: {
    frequency: 1000,
    duration: 500,
    type: 'square' as const,
    volume: 0.25
  },
  success: {
    effects: [
      { frequency: 523, duration: 100, type: 'sine' as const, volume: 0.15 },
      { frequency: 659, duration: 100, type: 'sine' as const, volume: 0.15 },
      { frequency: 784, duration: 200, type: 'sine' as const, volume: 0.15 }
    ],
    interval: 50
  } as BeepSequence,
  
  // Retro computer sounds
  bootUp: {
    effects: [
      { frequency: 200, duration: 100, type: 'square' as const, volume: 0.1 },
      { frequency: 400, duration: 100, type: 'square' as const, volume: 0.1 },
      { frequency: 600, duration: 100, type: 'square' as const, volume: 0.1 },
      { frequency: 800, duration: 200, type: 'sine' as const, volume: 0.15 }
    ],
    interval: 50
  } as BeepSequence,
  staticNoise: {
    frequency: 1000,
    duration: 200,
    type: 'sawtooth' as const,
    volume: 0.05
  }
};