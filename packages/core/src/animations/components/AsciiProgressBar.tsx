import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../hooks/useAnimation';
import { progressChars } from '../utils';

interface AsciiProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; // 0-100
  width?: number;
  animated?: boolean;
  animationSpeed?: number;
  showPercentage?: boolean;
  label?: string;
  variant?: 'filled' | 'gradient' | 'pulse';
}

export const AsciiAnimatedProgressBar: React.FC<AsciiProgressBarProps> = ({
  value = 0,
  width = 30,
  animated = false,
  animationSpeed = 100,
  showPercentage = true,
  label,
  variant = 'filled',
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);
  
  const { progress, start } = useAnimation({
    duration: animationSpeed * Math.abs(value - displayValue),
    easing: 'ease-out'
  });

  useEffect(() => {
    if (animated && value !== displayValue) {
      start();
    }
  }, [value, animated, displayValue, start]);

  useEffect(() => {
    if (animated) {
      const targetValue = displayValue + (value - displayValue) * progress;
      setDisplayValue(targetValue);
    } else {
      setDisplayValue(value);
    }
  }, [progress, value, displayValue, animated]);

  const renderProgressBar = () => {
    const normalizedValue = Math.max(0, Math.min(100, displayValue));
    const filledWidth = Math.floor((normalizedValue / 100) * width);
    const emptyWidth = width - filledWidth;
    
    let progressBar = '';
    
    if (variant === 'pulse') {
      // Pulsing effect
      const pulseChar = Math.floor(Date.now() / 200) % 2 === 0 ? '█' : '▓';
      progressBar = pulseChar.repeat(filledWidth) + progressChars.empty.repeat(emptyWidth);
    } else if (variant === 'gradient') {
      // Gradient effect using different density characters
      for (let i = 0; i < width; i++) {
        const position = i / width;
        const intensity = normalizedValue / 100;
        
        if (position <= intensity) {
          if (position > intensity - 0.1) {
            progressBar += '▓'; // Semi-filled
          } else if (position > intensity - 0.2) {
            progressBar += '▒'; // Quarter-filled
          } else {
            progressBar += '█'; // Full
          }
        } else {
          progressBar += progressChars.empty;
        }
      }
    } else {
      // Default filled
      progressBar = progressChars.filled.repeat(filledWidth) + progressChars.empty.repeat(emptyWidth);
    }
    
    return progressBar;
  };

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        color: theme.colors.primary,
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      {label && (
        <div style={{ color: theme.colors.text, marginBottom: '4px' }}>
          {label}
        </div>
      )}
      <div className="flex items-center gap-2">
        <span style={{ color: theme.colors.border }}>
          {theme.characters.bracketLeft}
        </span>
        <span style={{ color: theme.colors.primary }}>
          {renderProgressBar()}
        </span>
        <span style={{ color: theme.colors.border }}>
          {theme.characters.bracketRight}
        </span>
        {showPercentage && (
          <span style={{ color: theme.colors.textSecondary, fontSize: '0.875em' }}>
            {Math.round(displayValue)}%
          </span>
        )}
      </div>
    </div>
  );
};