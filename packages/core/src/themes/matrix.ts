import { AsciiTheme } from './types';

export const matrixTheme: AsciiTheme = {
  name: 'matrix',
  description: 'Digital rain aesthetic with green-on-black styling',
  colors: {
    primary: '#00ff41',      // Matrix green
    secondary: '#008f11',    // Dark green
    success: '#00ff41',      // Matrix green
    warning: '#41ff00',      // Light green
    error: '#ff4141',        // Red (anomaly)
    info: '#00aa22',         // Medium green
    background: '#000000',   // Pure black
    surface: '#001100',      // Very dark green
    text: '#00ff41',         // Matrix green
    textSecondary: '#008f11', // Dark green
    border: '#00ff41',       // Matrix green
    accent: '#41ff00',       // Light green
  },
  characters: {
    // Box drawing - digital style
    boxTopLeft: '╭',
    boxTopRight: '╮',
    boxBottomLeft: '╰',
    boxBottomRight: '╯',
    boxHorizontal: '─',
    boxVertical: '│',
    boxCross: '┼',
    boxTeeTop: '┬',
    boxTeeBottom: '┴',
    boxTeeLeft: '├',
    boxTeeRight: '┤',

    // UI elements - matrix inspired
    bulletPoint: '※',
    arrow: '⇒',
    arrowUp: '⇡',
    arrowDown: '⇣',
    arrowLeft: '⇠',
    arrowRight: '⇢',
    checkmark: '✓',
    cross: '✕',
    radioSelected: '◉',
    radioUnselected: '○',
    expand: '⊞',
    collapse: '⊟',

    // Progress - digital
    progressFilled: '▓',
    progressEmpty: '░',
    loadingSpinner: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧'],

    // Brackets - matrix style
    bracketLeft: '⟨',
    bracketRight: '⟩',
    separator: '∙',
    divider: '⎯',
  },
  typography: {
    fontFamily: '"Source Code Pro", "Consolas", "Monaco", monospace',
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
      bold: '500',
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
  borderRadius: '0px',
  shadows: {
    sm: '0 0 2px rgba(0, 255, 65, 0.3)',
    md: '0 0 6px rgba(0, 255, 65, 0.4)',
    lg: '0 0 12px rgba(0, 255, 65, 0.5)',
  },
};