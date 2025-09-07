import React from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';

export interface AsciiBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  wrap?: boolean | 'reverse';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'between' | 'around';
  flex?: string | number;
  grow?: number;
  shrink?: number;
  basis?: string;
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
  margin?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
}

export const AsciiBox: React.FC<AsciiBoxProps> = ({
  direction = 'row',
  wrap = false,
  gap = 0,
  alignItems = 'stretch',
  justifyContent = 'start',
  alignContent = 'stretch',
  flex,
  grow,
  shrink,
  basis,
  padding = 'none',
  margin = 'none',
  className = '',
  style,
  children,
  ...props
}) => {
  const { theme } = useAsciiTheme();

  const getSpacingValue = (spacing: string): string => {
    if (spacing === 'none') return '0';
    
    const spacingMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    
    return spacingMap[spacing as keyof typeof spacingMap] || '0';
  };

  const getGapValue = (): string => {
    if (typeof gap === 'number') return `${gap}px`;
    return getSpacingValue(gap);
  };

  const getFlexWrap = (): 'nowrap' | 'wrap' | 'wrap-reverse' => {
    if (!wrap) return 'nowrap';
    if (wrap === 'reverse') return 'wrap-reverse';
    return 'wrap';
  };

  const getAlignItems = (): string => {
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      baseline: 'baseline',
    };
    return alignMap[alignItems];
  };

  const getJustifyContent = (): string => {
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    return justifyMap[justifyContent];
  };

  const getAlignContent = (): string => {
    const alignContentMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
      between: 'space-between',
      around: 'space-around',
    };
    return alignContentMap[alignContent];
  };

  const getFlexValue = (): string | number | undefined => {
    if (flex !== undefined) return flex;
    if (grow !== undefined && shrink !== undefined && basis !== undefined) {
      return `${grow} ${shrink} ${basis}`;
    }
    if (grow !== undefined || shrink !== undefined || basis !== undefined) {
      return `${grow || 0} ${shrink || 1} ${basis || 'auto'}`;
    }
    return undefined;
  };

  const boxStyles = {
    display: 'flex',
    flexDirection: direction,
    flexWrap: getFlexWrap(),
    gap: getGapValue(),
    alignItems: getAlignItems(),
    justifyContent: getJustifyContent(),
    alignContent: getAlignContent(),
    flex: getFlexValue(),
    padding: getSpacingValue(padding),
    margin: getSpacingValue(margin),
    fontFamily: theme.typography.fontFamily,
    ...style,
  };

  return (
    <div
      {...props}
      className={`ascii-box ${className}`}
      style={boxStyles}
    >
      {children}
    </div>
  );
};

// Utility components for common patterns
export const AsciiStack: React.FC<Omit<AsciiBoxProps, 'direction'>> = (props) => (
  <AsciiBox direction="column" {...props} />
);

export const AsciiInline: React.FC<Omit<AsciiBoxProps, 'direction'>> = (props) => (
  <AsciiBox direction="row" {...props} />
);

export const AsciiCenter: React.FC<AsciiBoxProps> = (props) => (
  <AsciiBox 
    alignItems="center" 
    justifyContent="center" 
    {...props} 
  />
);

export const AsciiSpacer: React.FC<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number }> = ({ 
  size = 'md' 
}) => {
  const { theme } = useAsciiTheme();
  
  const getSize = (): string => {
    if (typeof size === 'number') return `${size}px`;
    
    const sizeMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    
    return sizeMap[size];
  };

  return (
    <div 
      className="ascii-spacer" 
      style={{ 
        minHeight: getSize(),
        minWidth: getSize(),
      }} 
    />
  );
};