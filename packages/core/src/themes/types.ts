export interface AsciiThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  errorBackground: string;
  info: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  muted: string;
  border: string;
  accent: string;
}

export interface AsciiThemeCharacters {
  // Box drawing characters
  boxTopLeft: string;
  boxTopRight: string;
  boxBottomLeft: string;
  boxBottomRight: string;
  boxHorizontal: string;
  boxVertical: string;
  boxCross: string;
  boxTeeTop: string;
  boxTeeBottom: string;
  boxTeeLeft: string;
  boxTeeRight: string;

  // UI elements
  bulletPoint: string;
  arrow: string;
  arrowUp: string;
  arrowDown: string;
  arrowLeft: string;
  arrowRight: string;
  checkmark: string;
  cross: string;
  radioSelected: string;
  radioUnselected: string;
  expand: string;
  collapse: string;

  // Progress indicators
  progressFilled: string;
  progressEmpty: string;
  loadingSpinner: string[];

  // Brackets and separators
  bracketLeft: string;
  bracketRight: string;
  separator: string;
  divider: string;
}

export interface AsciiThemeTypography {
  fontFamily: string;
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
  };
  fontWeight: {
    normal: string;
    bold: string;
  };
  lineHeight: string;
}

export interface AsciiThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
}

export interface AsciiTheme {
  name: string;
  description: string;
  colors: AsciiThemeColors;
  characters: AsciiThemeCharacters;
  typography: AsciiThemeTypography;
  spacing: AsciiThemeSpacing;
  borderRadius: string;
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

export type ThemeName = 
  | 'classic' 
  | 'cyberpunk' 
  | 'matrix' 
  | 'retro' 
  | 'terminal' 
  | 'neon' 
  | 'minimal' 
  | 'hacker';