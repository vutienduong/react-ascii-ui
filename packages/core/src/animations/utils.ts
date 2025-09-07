import { AnimationConfig } from './types';

export const defaultAnimationConfig: AnimationConfig = {
  duration: 1000,
  delay: 0,
  repeat: false,
  direction: 'normal',
  easing: 'linear'
};

// Easing functions for animations
export const easingFunctions = {
  linear: (t: number) => t,
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
};

// Animation frame utility
export const useAnimationFrame = (callback: (deltaTime: number) => void, deps: any[] = []) => {
  const requestRef = React.useRef<number>();
  const previousTimeRef = React.useRef<number>();
  
  const animate = React.useCallback((time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, deps);

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

// Generate random ASCII characters
export const generateRandomChar = (charset?: string): string => {
  const defaultCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  const chars = charset || defaultCharset;
  return chars.charAt(Math.floor(Math.random() * chars.length));
};

// Generate matrix-style characters
export const matrixCharset = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// Glitch effect characters
export const glitchCharset = '█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟';

// Progress bar characters
export const progressChars = {
  filled: '█',
  empty: '░',
  partial: ['▏', '▎', '▍', '▌', '▋', '▊', '▉'],
};

// Spinner animations
export const spinnerFrames = {
  dots: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
  line: ['|', '/', '-', '\\'],
  arrow: ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'],
  bounce: ['⠁', '⠂', '⠄', '⠂'],
  pulse: ['●', '◐', '○', '◑'],
  binary: ['0', '1'],
  matrix: ['0', '1', 'x', '+', '-', '*'],
  classic: ['.  ', '.. ', '...', ' ..', '  .', '   '],
};

import React from 'react';