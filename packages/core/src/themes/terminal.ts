import { AsciiTheme } from './types';

export const terminalTheme: AsciiTheme = {
  name: 'terminal',
  description: 'Modern terminal emulator with sharp contrasts',
  colors: {
    primary: '#ffffff',      // White
    secondary: '#888888',    // Gray
    success: '#4ade80',      // Green
    warning: '#fbbf24',      // Amber
    error: '#ef4444',        // Red
    errorBackground: '#330000',       // Dark red
    info: '#60a5fa',         // Blue
    background: '#000000',   // Black
    surface: '#1f1f1f',      // Dark gray
    text: '#ffffff',         // White
    textSecondary: '#a3a3a3', // Light gray
    muted: '#666666',              // Medium gray
    border: '#404040',       // Medium gray
    accent: '#10b981',       // Emerald
  },
  characters: {
    // Box drawing - clean terminal
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

    // UI elements - terminal style
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
    expand: '▶',
    collapse: '▼',

    // Progress - terminal blocks
    progressFilled: '█',
    progressEmpty: '─',
    loadingSpinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'],

    // Brackets - terminal
    bracketLeft: '[',
    bracketRight: ']',
    separator: '│',
    divider: '─',
  },
  typography: {
    fontFamily: '"Ubuntu Mono", "Consolas", "Courier New", monospace',
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