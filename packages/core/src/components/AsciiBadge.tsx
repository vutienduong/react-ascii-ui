import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';

interface AsciiBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'square' | 'curly';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const AsciiBadge: React.FC<AsciiBadgeProps> = ({ 
  variant = 'square',
  color = 'default',
  children, 
  className = "", 
  ...props 
}) => {
  const { theme } = useAsciiTheme();

  const getBrackets = (variant: string) => {
    switch (variant) {
      case 'curly': return { left: '{', right: '}' };
      case 'square':
      default: return { left: theme.characters.bracketLeft, right: theme.characters.bracketRight };
    }
  };

  const getThemeColor = (color: string) => {
    switch (color) {
      case 'primary': return theme.colors.primary;
      case 'success': return theme.colors.success;
      case 'warning': return theme.colors.warning;
      case 'error': return theme.colors.error;
      case 'default':
      default: return theme.colors.text;
    }
  };

  const brackets = getBrackets(variant);
  const themeColor = getThemeColor(color);

  return (
    <span
      {...props}
      className={`
        font-mono text-xs font-bold inline-flex items-center
        ${className}
      `}
      style={{
        color: themeColor,
        fontFamily: theme.typography.fontFamily,
        ...props.style
      }}
    >
      <span className="select-none">{brackets.left}</span>
      <span className="px-1">{children}</span>
      <span className="select-none">{brackets.right}</span>
    </span>
  );
};