import React from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';

export interface AsciiGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  rows?: number | 'auto';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  justifyContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  autoFit?: boolean;
  minColumnWidth?: string;
}

export interface AsciiGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  rowSpan?: number;
  colStart?: number;
  colEnd?: number;
  rowStart?: number;
  rowEnd?: number;
  order?: number;
}

export const AsciiGrid: React.FC<AsciiGridProps> = ({
  columns = 12,
  gap = 'md',
  rows = 'auto',
  alignItems = 'stretch',
  justifyContent = 'start',
  autoFit = false,
  minColumnWidth = '200px',
  className = '',
  style,
  children,
  ...props
}) => {
  const { theme } = useAsciiTheme();

  const getGapValue = (gapSize: typeof gap): string => {
    if (typeof gapSize === 'number') return `${gapSize}px`;
    
    const gapMap = {
      xs: theme.spacing.xs,
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    
    return gapMap[gapSize] || theme.spacing.md;
  };

  const getGridTemplateColumns = (): string => {
    if (autoFit) {
      return `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`;
    }

    if (typeof columns === 'number') {
      return `repeat(${columns}, 1fr)`;
    }

    // Responsive columns - for now just use the largest available
    const responsiveColumns = columns.xl || columns.lg || columns.md || columns.sm || 12;
    return `repeat(${responsiveColumns}, 1fr)`;
  };

  const getGridTemplateRows = (): string => {
    if (rows === 'auto') return 'auto';
    return `repeat(${rows}, 1fr)`;
  };

  const getAlignItems = (): string => {
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
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

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: getGridTemplateColumns(),
    gridTemplateRows: getGridTemplateRows(),
    gap: getGapValue(gap),
    alignItems: getAlignItems(),
    justifyContent: getJustifyContent(),
    fontFamily: theme.typography.fontFamily,
    ...style,
  };

  return (
    <div
      {...props}
      className={`ascii-grid ${className}`}
      style={gridStyles}
    >
      {children}
    </div>
  );
};

export const AsciiGridItem: React.FC<AsciiGridItemProps> = ({
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  rowStart,
  rowEnd,
  order,
  className = '',
  style,
  children,
  ...props
}) => {
  const getGridColumn = (): string | undefined => {
    if (colStart && colEnd) {
      return `${colStart} / ${colEnd}`;
    }
    if (colStart) {
      return `${colStart} / span ${typeof colSpan === 'number' ? colSpan : 1}`;
    }
    if (typeof colSpan === 'number') {
      return `span ${colSpan}`;
    }
    if (typeof colSpan === 'object') {
      // For now, use the largest available span
      const span = colSpan.xl || colSpan.lg || colSpan.md || colSpan.sm || 1;
      return `span ${span}`;
    }
    return undefined;
  };

  const getGridRow = (): string | undefined => {
    if (rowStart && rowEnd) {
      return `${rowStart} / ${rowEnd}`;
    }
    if (rowStart) {
      return `${rowStart} / span ${rowSpan || 1}`;
    }
    if (rowSpan) {
      return `span ${rowSpan}`;
    }
    return undefined;
  };

  const gridItemStyles = {
    gridColumn: getGridColumn(),
    gridRow: getGridRow(),
    order: order,
    ...style,
  };

  return (
    <div
      {...props}
      className={`ascii-grid-item ${className}`}
      style={gridItemStyles}
    >
      {children}
    </div>
  );
};