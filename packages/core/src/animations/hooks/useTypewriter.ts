import { useState, useEffect, useRef, useCallback } from 'react';
import { TypewriterConfig } from '../types';

interface UseTypewriterReturn {
  displayText: string;
  isComplete: boolean;
  isTyping: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const useTypewriter = (
  text: string | string[],
  config: TypewriterConfig = {}
): UseTypewriterReturn => {
  const {
    speed = 50,
    deleteSpeed = 30,
    pauseAfterComplete = 1500,
    repeat = false,
    showCursor = true,
    cursor = '|'
  } = config;

  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [arrayIndex, setArrayIndex] = useState(0);
  
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isPausedRef = useRef(false);
  const currentSpeedRef = useRef(speed);

  const textArray = Array.isArray(text) ? text : [text];
  const currentText = textArray[arrayIndex] || '';

  const typeNext = useCallback(() => {
    if (isPausedRef.current) return;

    if (!isDeleting) {
      // Typing forward
      if (currentIndex < currentText.length) {
        setDisplayText(currentText.substring(0, currentIndex + 1));
        setCurrentIndex(prev => prev + 1);
        setIsTyping(true);
        
        timeoutRef.current = setTimeout(typeNext, currentSpeedRef.current);
      } else {
        // Finished typing current text
        setIsTyping(false);
        setIsComplete(textArray.length === 1 || arrayIndex === textArray.length - 1);
        
        if (textArray.length > 1) {
          // Multiple texts - pause then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            typeNext();
          }, pauseAfterComplete);
        } else if (repeat) {
          // Single text with repeat - pause then restart
          timeoutRef.current = setTimeout(() => {
            setCurrentIndex(0);
            setDisplayText('');
            typeNext();
          }, pauseAfterComplete);
        }
      }
    } else {
      // Deleting backward
      if (currentIndex > 0) {
        setDisplayText(currentText.substring(0, currentIndex - 1));
        setCurrentIndex(prev => prev - 1);
        setIsTyping(true);
        
        timeoutRef.current = setTimeout(typeNext, deleteSpeed);
      } else {
        // Finished deleting
        setIsDeleting(false);
        setIsTyping(false);
        
        // Move to next text in array
        const nextArrayIndex = (arrayIndex + 1) % textArray.length;
        setArrayIndex(nextArrayIndex);
        
        // If we've cycled through all texts and no repeat, mark complete
        if (nextArrayIndex === 0 && !repeat) {
          setIsComplete(true);
        } else {
          // Start typing next text
          timeoutRef.current = setTimeout(typeNext, speed);
        }
      }
    }
  }, [
    currentText, 
    currentIndex, 
    isDeleting, 
    arrayIndex, 
    textArray, 
    deleteSpeed, 
    pauseAfterComplete,
    repeat,
    speed
  ]);

  const start = useCallback(() => {
    isPausedRef.current = false;
    setIsTyping(true);
    typeNext();
  }, [typeNext]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    setIsTyping(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const resume = useCallback(() => {
    if (isPausedRef.current) {
      isPausedRef.current = false;
      setIsTyping(true);
      typeNext();
    }
  }, [typeNext]);

  const reset = useCallback(() => {
    isPausedRef.current = true;
    setIsTyping(false);
    setIsComplete(false);
    setDisplayText('');
    setCurrentIndex(0);
    setIsDeleting(false);
    setArrayIndex(0);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const setSpeed = useCallback((newSpeed: number) => {
    currentSpeedRef.current = newSpeed;
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Auto-start effect
  useEffect(() => {
    if (text && !isTyping && !isComplete && currentIndex === 0 && displayText === '') {
      start();
    }
  }, [text, isTyping, isComplete, currentIndex, displayText, start]);

  return {
    displayText: showCursor && isTyping ? `${displayText}${cursor}` : displayText,
    isComplete,
    isTyping,
    start,
    pause,
    resume,
    reset,
    setSpeed
  };
};