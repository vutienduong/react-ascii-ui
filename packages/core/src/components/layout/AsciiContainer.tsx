import React from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';

export interface AsciiContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'auto';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  border?: boolean | 'single' | 'double' | 'thick' | 'dashed';
  title?: string;
  centered?: boolean;
  fluid?: boolean;
  rounded?: boolean;
}

export const AsciiContainer: React.FC<AsciiContainerProps> = ({
  size = 'auto',
  padding = 'md',
  border = false,
  title,
  centered = false,
  fluid = false,
  rounded = false,
  className = '',
  style,
  children,
  ...props
}) => {
  const { theme } = useAsciiTheme();

  const getMaxWidth = (): string => {
    if (fluid) return '100%';
    
    const sizeMap = {
      xs: '480px',
      sm: '640px', 
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      full: '100%',
      auto: 'none',
    };
    
    return sizeMap[size];
  };

  const getPadding = (): string => {
    if (padding === 'none') return '0';
    
    const paddingMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    
    return paddingMap[padding] || theme.spacing.md;
  };

  const getBorderStyle = () => {
    if (!border) return {};

    const borderStyles = {
      single: {
        border: `1px solid ${theme.colors.border}`,
      },
      double: {
        border: `2px solid ${theme.colors.border}`,
      },
      thick: {
        border: `3px solid ${theme.colors.border}`,
      },
      dashed: {
        border: `1px dashed ${theme.colors.border}`,
      },
    };

    if (typeof border === 'boolean') {
      return borderStyles.single;
    }

    return borderStyles[border] || borderStyles.single;
  };

  const renderAsciiBorder = () => {
    if (!border || typeof border === 'boolean') return null;

    const chars = theme.characters;
    const borderChars = {
      single: {
        topLeft: chars.boxTopLeft,
        topRight: chars.boxTopRight,
        bottomLeft: chars.boxBottomLeft,
        bottomRight: chars.boxBottomRight,
        horizontal: chars.boxHorizontal,
        vertical: chars.boxVertical,
      },
      double: {
        topLeft: '╔',
        topRight: '╗',
        bottomLeft: '╚',
        bottomRight: '╝',
        horizontal: '═',
        vertical: '║',
      },
      thick: {
        topLeft: '┏',
        topRight: '┓',
        bottomLeft: '┗',
        bottomRight: '┛',
        horizontal: '━',
        vertical: '┃',
      },
      dashed: {
        topLeft: chars.boxTopLeft,
        topRight: chars.boxTopRight,
        bottomLeft: chars.boxBottomLeft,
        bottomRight: chars.boxBottomRight,
        horizontal: '┈',
        vertical: '┊',
      },
    };

    const currentChars = borderChars[border as keyof typeof borderChars] || borderChars.single;

    return (
      <div 
        className="absolute inset-0 pointer-events-none font-mono text-sm leading-none"
        style={{ color: theme.colors.border }}
      >
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 flex">
          <span>{currentChars.topLeft}</span>
          <div className="flex-1 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>{currentChars.horizontal}</span>
            ))}
          </div>
          <span>{currentChars.topRight}</span>
        </div>

        {/* Side borders */}
        <div className="absolute top-0 bottom-0 left-0 flex flex-col">
          <div className="flex-1 flex flex-col justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>{currentChars.vertical}</span>
            ))}
          </div>
        </div>

        <div className="absolute top-0 bottom-0 right-0 flex flex-col">
          <div className="flex-1 flex flex-col justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i}>{currentChars.vertical}</span>
            ))}
          </div>
        </div>

        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 flex">
          <span>{currentChars.bottomLeft}</span>
          <div className="flex-1 flex">
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}>{currentChars.horizontal}</span>
            ))}
          </div>
          <span>{currentChars.bottomRight}</span>
        </div>

        {/* Title */}
        {title && (
          <div 
            className="absolute top-0 left-4 px-2"
            style={{ 
              backgroundColor: theme.colors.background,
              color: theme.colors.primary,
              transform: 'translateY(-50%)'
            }}
          >
            {title}
          </div>
        )}
      </div>
    );
  };

  const containerStyles = {
    maxWidth: getMaxWidth(),
    margin: centered ? '0 auto' : undefined,
    padding: getPadding(),
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    position: 'relative' as const,
    borderRadius: rounded ? theme.borderRadius : undefined,
    ...getBorderStyle(),
    ...style,
  };

  return (
    <div
      {...props}
      className={`ascii-container ${className}`}
      style={containerStyles}
    >
      {border && typeof border === 'string' && renderAsciiBorder()}
      {children}
    </div>
  );
};