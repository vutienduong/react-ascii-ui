import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';

export const AsciiButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = "", ...props }) => {
  const { theme } = useAsciiTheme();
  
  return (
    <button
      {...props}
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