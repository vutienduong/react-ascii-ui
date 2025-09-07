import { AsciiTheme } from './types';

export const cyberpunkTheme: AsciiTheme = {
  name: 'cyberpunk',
  description: 'Futuristic neon aesthetic with angular elements',
  colors: {
    primary: '#ff00ff',      // Magenta/Pink
    secondary: '#00ffff',    // Cyan
    success: '#00ff41',      // Bright green
    warning: '#ffaa00',      // Orange
    error: '#ff0040',        // Hot pink
    info: '#00d4ff',         // Electric blue
    background: '#0a0a0a',   // Deep black
    surface: '#1a0a1a',      // Dark magenta tint
    text: '#ffffff',         // White
    textSecondary: '#ff00ff', // Magenta
    border: '#ff00ff',       // Magenta
    accent: '#00ffff',       // Cyan
  },
  characters: {
    // Box drawing - angular style
    boxTopLeft: '╔',
    boxTopRight: '╗',
    boxBottomLeft: '╚',
    boxBottomRight: '╝',
    boxHorizontal: '═',
    boxVertical: '║',
    boxCross: '╬',
    boxTeeTop: '╦',
    boxTeeBottom: '╩',
    boxTeeLeft: '╠',
    boxTeeRight: '╣',

    // UI elements - cyberpunk style
    bulletPoint: '◆',
    arrow: '►',
    arrowUp: '▲',
    arrowDown: '▼',
    arrowLeft: '◄',
    arrowRight: '►',
    checkmark: '◉',
    cross: '◈',
    radioSelected: '◉',
    radioUnselected: '◯',
    expand: '▸',
    collapse: '▾',

    // Progress - futuristic
    progressFilled: '▰',
    progressEmpty: '▱',
    loadingSpinner: ['◐', '◓', '◑', '◒'],

    // Brackets - angular
    bracketLeft: '◀',
    bracketRight: '▶',
    separator: '◦',
    divider: '▬',
  },
  typography: {
    fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
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
    lineHeight: '1.4',
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
    sm: '0 0 4px rgba(255, 0, 255, 0.3)',
    md: '0 0 8px rgba(255, 0, 255, 0.4)',
    lg: '0 0 16px rgba(255, 0, 255, 0.5)',
  },
};