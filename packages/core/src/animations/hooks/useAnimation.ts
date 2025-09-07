import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimationConfig, AnimationState } from '../types';
import { defaultAnimationConfig, easingFunctions } from '../utils';

export interface UseAnimationReturn {
  state: AnimationState;
  progress: number;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
}

export const useAnimation = (
  config: AnimationConfig = defaultAnimationConfig
): UseAnimationReturn => {
  const [state, setState] = useState<AnimationState>('idle');
  const [progress, setProgress] = useState(0);
  
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number>();
  const repeatCountRef = useRef<number>(0);

  const finalConfig = { ...defaultAnimationConfig, ...config };

  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current - pausedTimeRef.current;
    const normalizedTime = Math.min(elapsed / (finalConfig.duration || 1000), 1);
    
    const easingFunction = easingFunctions[finalConfig.easing || 'linear'];
    const easedProgress = easingFunction(normalizedTime);
    
    // Apply direction
    let currentProgress = easedProgress;
    if (finalConfig.direction === 'reverse') {
      currentProgress = 1 - easedProgress;
    } else if (finalConfig.direction === 'alternate') {
      const isOddIteration = repeatCountRef.current % 2 === 1;
      currentProgress = isOddIteration ? 1 - easedProgress : easedProgress;
    }

    setProgress(currentProgress);

    if (normalizedTime >= 1) {
      // Animation completed
      const shouldRepeat = finalConfig.repeat === true || 
        (typeof finalConfig.repeat === 'number' && repeatCountRef.current < finalConfig.repeat);
      
      if (shouldRepeat) {
        repeatCountRef.current++;
        startTimeRef.current = timestamp;
        pausedTimeRef.current = 0;
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setState('completed');
      }
    } else {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [finalConfig]);

  const start = useCallback(() => {
    setState('running');
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
    repeatCountRef.current = 0;
    
    if (finalConfig.delay && finalConfig.delay > 0) {
      setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
      }, finalConfig.delay);
    } else {
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [animate, finalConfig.delay]);

  const pause = useCallback(() => {
    if (state === 'running' && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      setState('paused');
    }
  }, [state]);

  const resume = useCallback(() => {
    if (state === 'paused') {
      setState('running');
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [state, animate]);

  const stop = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setState('idle');
    setProgress(0);
    startTimeRef.current = 0;
    pausedTimeRef.current = 0;
    repeatCountRef.current = 0;
  }, []);

  const reset = useCallback(() => {
    stop();
    setProgress(0);
  }, [stop]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return {
    state,
    progress,
    start,
    pause,
    resume,
    stop,
    reset
  };
};