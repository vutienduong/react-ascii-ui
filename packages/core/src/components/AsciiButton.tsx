import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';
import { useButtonSounds } from '../sound/hooks';

export const AsciiButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = "", onClick, onMouseEnter, ...props }) => {
  const { theme } = useAsciiTheme();
  const { playClick, playHover } = useButtonSounds();
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playClick();
    onClick?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    playHover();
    onMouseEnter?.(e);
  };
  
  return (
    <button
      {...props}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`
        font-mono px-1 cursor-pointer outline-none
        focus-visible:outline focus-visible:outline-dashed hover:opacity-80 transition-opacity
        ${className}
      `}
      style={{
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        borderColor: theme.colors.border,
        ...props.style
      }}
    >
      {theme.characters.bracketLeft}{children}{theme.characters.bracketRight}
    </button>
  );
};