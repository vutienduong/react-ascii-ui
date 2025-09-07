import { AsciiTheme, ThemeName } from './types';
import { classicTheme } from './classic';
import { cyberpunkTheme } from './cyberpunk';
import { matrixTheme } from './matrix';
import { retroTheme } from './retro';
import { neonTheme } from './neon';
import { terminalTheme } from './terminal';
import { minimalTheme } from './minimal';

export * from './types';

export const themes: Record<ThemeName, AsciiTheme> = {
  classic: classicTheme,
  cyberpunk: cyberpunkTheme,
  matrix: matrixTheme,
  retro: retroTheme,
  neon: neonTheme,
  terminal: terminalTheme,
  minimal: minimalTheme,
  hacker: matrixTheme, // Alias for matrix theme
};

export const getTheme = (name: ThemeName): AsciiTheme => {
  return themes[name] || themes.classic;
};

export const getAllThemes = (): AsciiTheme[] => {
  return Object.values(themes);
};

export const getThemeNames = (): ThemeName[] => {
  return Object.keys(themes) as ThemeName[];
};

// Default theme
export const defaultTheme = themes.classic;