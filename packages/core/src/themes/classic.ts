import { AsciiTheme } from './types';

export const classicTheme: AsciiTheme = {
  name: 'classic',
  description: 'Traditional ASCII art styling with clean lines',
  colors: {
    primary: '#00ff00',      // Classic green
    secondary: '#00ffff',    // Cyan
    success: '#00ff00',      // Green
    warning: '#ffff00',      // Yellow
    error: '#ff0000',        // Red
    info: '#00ffff',         // Cyan
    background: '#000000',   // Black
    surface: '#111111',      // Dark gray
    text: '#ffffff',         // White
    textSecondary: '#cccccc', // Light gray
    border: '#ffffff',       // White
    accent: '#00ff00',       // Green
  },
  characters: {
    // Box drawing
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

    // UI elements
    bulletPoint: '•',
    arrow: '→',
    arrowUp: '↑',
    arrowDown: '↓',
    arrowLeft: '←',
    arrowRight: '→',
    checkmark: '✓',
    cross: '✗',
    radioSelected: '●',
    radioUnselected: '○',
    expand: '+',
    collapse: '-',

    // Progress
    progressFilled: '█',
    progressEmpty: '░',
    loadingSpinner: ['|', '/', '-', '\\'],

    // Brackets
    bracketLeft: '[',
    bracketRight: ']',
    separator: '|',
    divider: '─',
  },
  typography: {
    fontFamily: '"Courier New", "Monaco", "Menlo", monospace',
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
      bold: '700',
    },
    lineHeight: '1.5',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },
  borderRadius: '0px',
  shadows: {
    sm: 'none',
    md: 'none',
    lg: 'none',
  },
};