import { AsciiTheme } from './types';

export const neonTheme: AsciiTheme = {
  name: 'neon',
  description: 'Vibrant neon lights with electric blue and pink accents',
  colors: {
    primary: '#00d4ff',      // Electric blue
    secondary: '#ff1493',    // Deep pink
    success: '#00ff7f',      // Spring green
    warning: '#ffa500',      // Orange
    error: '#ff006e',        // Neon pink
    info: '#00bfff',         // Deep sky blue
    background: '#0a0a0f',   // Very dark blue
    surface: '#1a1a2e',      // Dark blue-purple
    text: '#ffffff',         // White
    textSecondary: '#00d4ff', // Electric blue
    border: '#00d4ff',       // Electric blue
    accent: '#ff1493',       // Deep pink
  },
  characters: {
    // Box drawing - neon style
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

    // UI elements - neon inspired
    bulletPoint: '◉',
    arrow: '⟶',
    arrowUp: '⤴',
    arrowDown: '⤵',
    arrowLeft: '⟵',
    arrowRight: '⟶',
    checkmark: '✦',
    cross: '✧',
    radioSelected: '◉',
    radioUnselected: '○',
    expand: '⊕',
    collapse: '⊖',

    // Progress - glowing
    progressFilled: '▰',
    progressEmpty: '▱',
    loadingSpinner: ['◢', '◣', '◤', '◥'],

    // Brackets - neon
    bracketLeft: '⟪',
    bracketRight: '⟫',
    separator: '◈',
    divider: '▬',
  },
  typography: {
    fontFamily: '"Roboto Mono", "SF Mono", "Monaco", monospace',
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
      normal: '300',
      bold: '500',
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
  borderRadius: '4px',
  shadows: {
    sm: '0 0 8px rgba(0, 212, 255, 0.4)',
    md: '0 0 16px rgba(0, 212, 255, 0.5)',
    lg: '0 0 24px rgba(0, 212, 255, 0.6)',
  },
};