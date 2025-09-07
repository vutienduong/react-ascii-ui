import React from "react";
import { useAsciiTheme } from '../contexts/ThemeContext';

interface AsciiAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export const AsciiAlert: React.FC<AsciiAlertProps> = ({ 
  variant = 'info',
  title,
  children, 
  className = "", 
  ...props 
}) => {
  const { theme } = useAsciiTheme();

  const getIcon = (variant: string) => {
    switch (variant) {
      case 'error': return `(${theme.characters.cross})`;
      case 'warning': return `(${theme.characters.arrow})`;
      case 'success': return `(${theme.characters.checkmark})`;
      case 'info': 
      default: return `(${theme.characters.bulletPoint})`;
    }
  };

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case 'error': return theme.colors.error;
      case 'warning': return theme.colors.warning;
      case 'success': return theme.colors.success;
      case 'info':
      default: return theme.colors.info;
    }
  };

  const variantColor = getVariantColor(variant);

  return (
    <div
      {...props}
      className={`
        font-mono border-l-2 pl-3 py-2 
        ${className}
      `}
      style={{
        color: variantColor,
        borderLeftColor: variantColor,
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.colors.surface,
        ...props.style
      }}
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 select-none">
          {getIcon(variant)}
        </span>
        <div className="flex-1">
          {title && (
            <div className="font-bold mb-1">
              {title}
            </div>
          )}
          <div style={{ color: theme.colors.text }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};