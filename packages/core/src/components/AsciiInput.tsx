import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';
import { useTerminalSounds } from '../sound/hooks';

export const AsciiInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className = "", style, onKeyDown, ...props }) => {
  const { theme } = useAsciiTheme();
  const { playKeyPress, playEnter, playBackspace } = useTerminalSounds();
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      playEnter();
    } else if (e.key === 'Backspace') {
      playBackspace();
    } else if (e.key.length === 1) {
      // Only play sound for printable characters
      playKeyPress();
    }
    onKeyDown?.(e);
  };
  
  return (
    <span 
      className="font-mono inline-flex items-center"
      style={{
        color: theme.colors.border,
        fontFamily: theme.typography.fontFamily
      }}
    >
      <span className="select-none">{theme.characters.bracketLeft}</span>
      <input
        {...props}
        onKeyDown={handleKeyDown}
        className={`
          font-mono bg-transparent border-none outline-none px-1 w-40
          ${className}
        `}
        style={{
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily,
          backgroundColor: 'transparent',
          ...style
        }}
      />
      <span className="select-none">{theme.characters.bracketRight}</span>
    </span>
  );
};