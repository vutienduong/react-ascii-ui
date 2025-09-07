import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';

export const AsciiInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className = "", style, ...props }) => {
  const { theme } = useAsciiTheme();
  
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