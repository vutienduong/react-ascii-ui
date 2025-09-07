import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';

interface AsciiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const AsciiCard: React.FC<AsciiCardProps> = ({ 
  title,
  children, 
  className = "", 
  ...props 
}) => {
  const { theme } = useAsciiTheme();
  
  return (
    <div
      {...props}
      className={`
        font-mono border p-4 
        ${className}
      `}
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        ...props.style
      }}
    >
      {title && (
        <div 
          className="mb-2 font-bold border-b border-dashed pb-2"
          style={{
            borderBottomColor: theme.colors.border,
            color: theme.colors.primary
          }}
        >
          {title}
        </div>
      )}
      {children}
    </div>
  );
};