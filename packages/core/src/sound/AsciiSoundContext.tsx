import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { AsciiSoundContextValue, SoundEffect, BeepSequence, soundPresets } from './types';
import { getAudioContext, playBeep, playSequence, resumeAudioContext } from './utils';

const AsciiSoundContext = createContext<AsciiSoundContextValue | null>(null);

export interface AsciiSoundProviderProps {
  children: ReactNode;
  defaultVolume?: number;
  defaultEnabled?: boolean;
  autoResume?: boolean;
}

export const AsciiSoundProvider: React.FC<AsciiSoundProviderProps> = ({
  children,
  defaultVolume = 0.5,
  defaultEnabled = true,
  autoResume = true,
}) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [masterVolume, setMasterVolume] = useState(defaultVolume);
  const [isEnabled, setIsEnabled] = useState(defaultEnabled);

  useEffect(() => {
    const context = getAudioContext();
    setAudioContext(context);

    // Set up user interaction listener to resume audio context
    if (autoResume && context) {
      const resumeOnInteraction = () => {
        resumeAudioContext();
        // Remove listeners after first interaction
        document.removeEventListener('click', resumeOnInteraction);
        document.removeEventListener('keydown', resumeOnInteraction);
        document.removeEventListener('touchstart', resumeOnInteraction);
      };

      document.addEventListener('click', resumeOnInteraction);
      document.addEventListener('keydown', resumeOnInteraction);
      document.addEventListener('touchstart', resumeOnInteraction);

      return () => {
        document.removeEventListener('click', resumeOnInteraction);
        document.removeEventListener('keydown', resumeOnInteraction);
        document.removeEventListener('touchstart', resumeOnInteraction);
      };
    }
  }, [autoResume]);

  const handlePlayBeep = useCallback(async (effect: SoundEffect) => {
    if (!isEnabled || masterVolume === 0) return;
    await playBeep(effect, masterVolume);
  }, [isEnabled, masterVolume]);

  const handlePlaySequence = useCallback(async (sequence: BeepSequence) => {
    if (!isEnabled || masterVolume === 0) return;
    await playSequence(sequence, masterVolume);
  }, [isEnabled, masterVolume]);

  const handlePlayPreset = useCallback(async (presetName: keyof typeof soundPresets) => {
    if (!isEnabled || masterVolume === 0) return;
    
    const preset = soundPresets[presetName];
    if ('effects' in preset) {
      // It's a BeepSequence
      await handlePlaySequence(preset as BeepSequence);
    } else {
      // It's a SoundEffect
      await handlePlayBeep(preset as SoundEffect);
    }
  }, [isEnabled, masterVolume, handlePlayBeep, handlePlaySequence]);

  const contextValue: AsciiSoundContextValue = {
    audioContext,
    masterVolume,
    setMasterVolume,
    isEnabled,
    setIsEnabled,
    playBeep: handlePlayBeep,
    playSequence: handlePlaySequence,
    playPreset: handlePlayPreset,
  };

  return (
    <AsciiSoundContext.Provider value={contextValue}>
      {children}
    </AsciiSoundContext.Provider>
  );
};

export const useAsciiSound = (): AsciiSoundContextValue => {
  const context = useContext(AsciiSoundContext);
  
  if (!context) {
    // Return a no-op implementation when used outside provider
    return {
      audioContext: null,
      masterVolume: 0,
      setMasterVolume: () => {},
      isEnabled: false,
      setIsEnabled: () => {},
      playBeep: () => {},
      playSequence: () => {},
      playPreset: () => {},
    };
  }
  
  return context;
};