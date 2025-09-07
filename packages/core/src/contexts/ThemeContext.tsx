import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AsciiTheme, ThemeName } from '../themes/types';
import { getTheme, defaultTheme } from '../themes';

interface ThemeContextValue {
  theme: AsciiTheme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface AsciiThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeName;
}

export const AsciiThemeProvider: React.FC<AsciiThemeProviderProps> = ({
  children,
  initialTheme = 'classic',
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(initialTheme);
  const theme = getTheme(themeName);

  const setTheme = (newThemeName: ThemeName) => {
    setThemeName(newThemeName);
  };

  const toggleTheme = () => {
    const themes: ThemeName[] = ['classic', 'cyberpunk', 'matrix', 'retro', 'neon', 'terminal', 'minimal'];
    const currentIndex = themes.indexOf(themeName);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Apply theme CSS variables to the document root
  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply color variables
    root.style.setProperty('--ascii-primary', theme.colors.primary);
    root.style.setProperty('--ascii-secondary', theme.colors.secondary);
    root.style.setProperty('--ascii-success', theme.colors.success);
    root.style.setProperty('--ascii-warning', theme.colors.warning);
    root.style.setProperty('--ascii-error', theme.colors.error);
    root.style.setProperty('--ascii-info', theme.colors.info);
    root.style.setProperty('--ascii-background', theme.colors.background);
    root.style.setProperty('--ascii-surface', theme.colors.surface);
    root.style.setProperty('--ascii-text', theme.colors.text);
    root.style.setProperty('--ascii-text-secondary', theme.colors.textSecondary);
    root.style.setProperty('--ascii-border', theme.colors.border);
    root.style.setProperty('--ascii-accent', theme.colors.accent);

    // Apply typography variables
    root.style.setProperty('--ascii-font-family', theme.typography.fontFamily);
    root.style.setProperty('--ascii-font-size-base', theme.typography.fontSize.base);
    root.style.setProperty('--ascii-line-height', theme.typography.lineHeight);

    // Apply spacing variables
    root.style.setProperty('--ascii-spacing-xs', theme.spacing.xs);
    root.style.setProperty('--ascii-spacing-sm', theme.spacing.sm);
    root.style.setProperty('--ascii-spacing-md', theme.spacing.md);
    root.style.setProperty('--ascii-spacing-lg', theme.spacing.lg);
    root.style.setProperty('--ascii-spacing-xl', theme.spacing.xl);

    // Apply border radius
    root.style.setProperty('--ascii-border-radius', theme.borderRadius);

    // Apply shadows
    root.style.setProperty('--ascii-shadow-sm', theme.shadows.sm);
    root.style.setProperty('--ascii-shadow-md', theme.shadows.md);
    root.style.setProperty('--ascii-shadow-lg', theme.shadows.lg);

    return () => {
      // Cleanup is optional since we're just setting CSS variables
    };
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    themeName,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useAsciiTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return default theme values for backward compatibility
    return {
      theme: defaultTheme,
      themeName: 'classic',
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }
  return context;
};

// Hook to get theme-specific characters
export const useThemeCharacters = () => {
  const { theme } = useAsciiTheme();
  return theme.characters;
};

// Hook to get theme-specific colors
export const useThemeColors = () => {
  const { theme } = useAsciiTheme();
  return theme.colors;
};