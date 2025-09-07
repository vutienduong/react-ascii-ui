import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { LoadingSpinnerConfig } from '../types';
import { spinnerFrames } from '../utils';

interface AsciiSpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof spinnerFrames;
  speed?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  config?: LoadingSpinnerConfig;
}

export const AsciiSpinner: React.FC<AsciiSpinnerProps> = ({
  variant = 'dots',
  speed = 150,
  size = 'md',
  color,
  config,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [frameIndex, setFrameIndex] = useState(0);
  
  const frames = config?.frames || spinnerFrames[variant] || spinnerFrames.dots;
  const animationSpeed = config?.duration ? config.duration / frames.length : speed;

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex(prevIndex => (prevIndex + 1) % frames.length);
    }, animationSpeed);

    return () => clearInterval(interval);
  }, [frames.length, animationSpeed]);

  const getSizeStyle = (size: string) => {
    switch (size) {
      case 'sm': return { fontSize: '0.875rem' };
      case 'lg': return { fontSize: '1.25rem' };
      case 'md':
      default: return { fontSize: '1rem' };
    }
  };

  const currentFrame = frames[frameIndex];

  return (
    <span
      {...props}
      className={`inline-block font-mono ${className}`}
      style={{
        color: color || theme.colors.primary,
        fontFamily: theme.typography.fontFamily,
        ...getSizeStyle(size),
        ...style
      }}
    >
      {currentFrame}
    </span>
  );
};