import { AsciiTheme } from './types';

export const minimalTheme: AsciiTheme = {
  name: 'minimal',
  description: 'Clean minimalist design with subtle ASCII elements',
  colors: {
    primary: '#000000',      // Black
    secondary: '#666666',    // Dark gray
    success: '#22c55e',      // Green
    warning: '#f59e0b',      // Amber
    error: '#ef4444',        // Red
    errorBackground: '#330000',       // Dark red
    info: '#3b82f6',         // Blue
    background: '#ffffff',   // White
    surface: '#f8f9fa',      // Very light gray
    text: '#000000',         // Black
    textSecondary: '#6b7280', // Medium gray
    muted: '#666666',              // Medium gray
    border: '#d1d5db',       // Light gray
    accent: '#1f2937',       // Dark gray
  },
  characters: {
    // Box drawing - minimal lines
    boxTopLeft: '┌',
    boxTopRight: '┐',
    boxBottomLeft: '└',
    boxBottomRight: '┘',
    boxHorizontal: '─',
    boxVertical: '│',
    boxCross: '┼',
    boxTeeTop: '┬',
    boxTeeBottom: '┴',
    boxTeeLeft: '├',
    boxTeeRight: '┤',

    // UI elements - minimal
    bulletPoint: '·',
    arrow: '→',
    arrowUp: '↑',
    arrowDown: '↓',
    arrowLeft: '←',
    arrowRight: '→',
    checkmark: '✓',
    cross: '×',
    radioSelected: '●',
    radioUnselected: '○',
    expand: '+',
    collapse: '−',

    // Progress - clean
    progressFilled: '▬',
    progressEmpty: '─',
    loadingSpinner: ['.  ', '.. ', '...', ' ..', '  .', '   '],

    // Brackets - minimal
    bracketLeft: '(',
    bracketRight: ')',
    separator: '·',
    divider: '─',
  },
  typography: {
    fontFamily: '"SF Mono", "Monaco", "Inconsolata", monospace',
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    fontWeight: {
      normal: '400',
      bold: '600',
    },
    lineHeight: '1.6',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: '2px',
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
};