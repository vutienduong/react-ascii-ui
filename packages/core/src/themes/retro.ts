import { AsciiTheme } from './types';

export const retroTheme: AsciiTheme = {
  name: 'retro',
  description: 'Vintage computer terminal with amber phosphor styling',
  colors: {
    primary: '#ffb000',      // Amber
    secondary: '#ff8800',    // Orange
    success: '#88ff00',      // Light green
    warning: '#ffff00',      // Yellow
    error: '#ff4400',        // Red-orange
    errorBackground: '#330000',       // Dark red
    info: '#00aaff',         // Blue
    background: '#1a0f00',   // Dark amber background
    surface: '#2a1500',      // Darker amber
    text: '#ffb000',         // Amber
    textSecondary: '#cc8800', // Dark amber
    muted: '#666666',              // Medium gray
    border: '#ffb000',       // Amber
    accent: '#ff8800',       // Orange
  },
  characters: {
    // Box drawing - retro style
    boxTopLeft: '+',
    boxTopRight: '+',
    boxBottomLeft: '+',
    boxBottomRight: '+',
    boxHorizontal: '-',
    boxVertical: '|',
    boxCross: '+',
    boxTeeTop: '+',
    boxTeeBottom: '+',
    boxTeeLeft: '+',
    boxTeeRight: '+',

    // UI elements - vintage
    bulletPoint: '*',
    arrow: '>',
    arrowUp: '^',
    arrowDown: 'v',
    arrowLeft: '<',
    arrowRight: '>',
    checkmark: 'X',
    cross: 'X',
    radioSelected: '*',
    radioUnselected: 'o',
    expand: '+',
    collapse: '-',

    // Progress - simple blocks
    progressFilled: '#',
    progressEmpty: '.',
    loadingSpinner: ['-', '\\', '|', '/'],

    // Brackets - simple
    bracketLeft: '[',
    bracketRight: ']',
    separator: '|',
    divider: '-',
  },
  typography: {
    fontFamily: '"IBM Plex Mono", "Courier", "monospace"',
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
    lineHeight: '1.8',
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
    sm: '0 0 3px rgba(255, 176, 0, 0.4)',
    md: '0 0 6px rgba(255, 176, 0, 0.5)',
    lg: '0 0 12px rgba(255, 176, 0, 0.6)',
  },
};