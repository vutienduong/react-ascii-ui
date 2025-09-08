import { useCallback, useRef, useEffect } from 'react';
import { useAsciiSound } from './AsciiSoundContext';
import { soundPresets } from './types';

// Hook for button sound effects
export const useButtonSounds = () => {
  const { playPreset } = useAsciiSound();

  const playClick = useCallback(() => {
    playPreset('buttonClick');
  }, [playPreset]);

  const playHover = useCallback(() => {
    playPreset('buttonHover');
  }, [playPreset]);

  return { playClick, playHover };
};

// Hook for terminal typing sounds
export const useTerminalSounds = () => {
  const { playPreset } = useAsciiSound();

  const playKeyPress = useCallback(() => {
    playPreset('keyPress');
  }, [playPreset]);

  const playEnter = useCallback(() => {
    playPreset('enter');
  }, [playPreset]);

  const playBackspace = useCallback(() => {
    playPreset('backspace');
  }, [playPreset]);

  return { playKeyPress, playEnter, playBackspace };
};

// Hook for form sounds
export const useFormSounds = () => {
  const { playPreset } = useAsciiSound();

  const playSubmit = useCallback(() => {
    playPreset('formSubmit');
  }, [playPreset]);

  const playError = useCallback(() => {
    playPreset('formError');
  }, [playPreset]);

  const playSuccess = useCallback(() => {
    playPreset('success');
  }, [playPreset]);

  return { playSubmit, playError, playSuccess };
};

// Hook for modal sounds
export const useModalSounds = () => {
  const { playPreset } = useAsciiSound();

  const playOpen = useCallback(() => {
    playPreset('modalOpen');
  }, [playPreset]);

  const playClose = useCallback(() => {
    playPreset('modalClose');
  }, [playPreset]);

  return { playOpen, playClose };
};

// Hook for system notification sounds
export const useSystemSounds = () => {
  const { playPreset } = useAsciiSound();

  const playNotification = useCallback(() => {
    playPreset('notification');
  }, [playPreset]);

  const playAlert = useCallback(() => {
    playPreset('alert');
  }, [playPreset]);

  const playBootUp = useCallback(() => {
    playPreset('bootUp');
  }, [playPreset]);

  return { playNotification, playAlert, playBootUp };
};

// Hook for game sounds
export const useGameSounds = () => {
  const { playPreset } = useAsciiSound();

  const playGameStart = useCallback(() => {
    playPreset('gameStart');
  }, [playPreset]);

  const playGameOver = useCallback(() => {
    playPreset('gameOver');
  }, [playPreset]);

  return { playGameStart, playGameOver };
};

// Hook for keyboard typing simulation
export const useTypingSounds = (enabled = true) => {
  const { playPreset } = useAsciiSound();
  const lastKeyTime = useRef<number>(0);
  const typingRate = useRef<number>(0);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const now = Date.now();
      
      // Calculate typing rate to vary sound
      if (lastKeyTime.current > 0) {
        const timeDiff = now - lastKeyTime.current;
        typingRate.current = Math.max(50, Math.min(200, timeDiff));
      }
      
      lastKeyTime.current = now;

      // Different sounds for different key types
      if (event.key === 'Enter') {
        playPreset('enter');
      } else if (event.key === 'Backspace') {
        playPreset('backspace');
      } else if (event.key.length === 1) {
        // Only play sound for printable characters
        playPreset('keyPress');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [enabled, playPreset]);

  const startTyping = useCallback(() => {
    lastKeyTime.current = 0;
    typingRate.current = 0;
  }, []);

  const stopTyping = useCallback(() => {
    lastKeyTime.current = 0;
  }, []);

  return { startTyping, stopTyping };
};

// Hook for ambient sounds
export const useAmbientSounds = () => {
  const { playBeep } = useAsciiSound();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAmbient = useCallback((type: 'static' | 'hum' = 'static') => {
    if (intervalRef.current) return;

    const playAmbientSound = () => {
      if (type === 'static') {
        playBeep({
          frequency: Math.random() * 1000 + 500,
          duration: Math.random() * 50 + 10,
          type: 'sawtooth',
          volume: 0.02
        });
      } else if (type === 'hum') {
        playBeep({
          frequency: 60 + Math.random() * 20,
          duration: 200,
          type: 'sine',
          volume: 0.01
        });
      }
    };

    // Play ambient sound at random intervals
    intervalRef.current = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance each interval
        playAmbientSound();
      }
    }, type === 'static' ? 200 : 1000);
  }, [playBeep]);

  const stopAmbient = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmbient();
    };
  }, [stopAmbient]);

  return { startAmbient, stopAmbient };
};

// Hook for sound-enabled components
export const useSoundEnabled = (soundType?: keyof typeof soundPresets) => {
  const { playPreset, isEnabled } = useAsciiSound();

  const playSound = useCallback(() => {
    if (soundType) {
      playPreset(soundType);
    }
  }, [soundType, playPreset]);

  return {
    playSound,
    soundEnabled: isEnabled,
  };
};