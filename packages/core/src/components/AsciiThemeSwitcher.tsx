import React from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { ThemeName, getThemeNames } from '../themes';

interface AsciiThemeSwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dropdown' | 'buttons' | 'cycle';
  showPreview?: boolean;
}

export const AsciiThemeSwitcher: React.FC<AsciiThemeSwitcherProps> = ({
  variant = 'dropdown',
  showPreview = true,
  className = '',
  ...props
}) => {
  const { theme, themeName, setTheme, toggleTheme } = useAsciiTheme();
  const themeNames = getThemeNames().filter(name => name !== 'hacker'); // Remove alias

  const getThemeDescription = (name: ThemeName): string => {
    const descriptions: Record<ThemeName, string> = {
      classic: 'Classic green-on-black ASCII',
      cyberpunk: 'Futuristic neon aesthetics',
      matrix: 'Digital rain inspired',
      retro: 'Vintage amber terminal',
      neon: 'Vibrant electric colors',
      terminal: 'Modern terminal style',
      minimal: 'Clean minimalist design',
      hacker: 'Matrix themed',
    };
    return descriptions[name] || '';
  };

  if (variant === 'cycle') {
    return (
      <div
        {...props}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <button
          onClick={toggleTheme}
          className="font-mono px-3 py-1 border border-current hover:bg-current hover:text-black transition-colors"
          style={{
            color: theme.colors.primary,
            borderColor: theme.colors.primary,
            fontFamily: theme.typography.fontFamily,
          }}
        >
          {theme.characters.arrow} {theme.name.toUpperCase()}
        </button>
        {showPreview && (
          <span 
            className="text-xs opacity-60"
            style={{ color: theme.colors.textSecondary }}
          >
            {getThemeDescription(themeName)}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div
        {...props}
        className={`flex flex-wrap gap-2 ${className}`}
      >
        {themeNames.map((name) => (
          <button
            key={name}
            onClick={() => setTheme(name)}
            className={`
              font-mono px-2 py-1 text-xs border transition-colors
              ${themeName === name 
                ? 'bg-current text-black' 
                : 'hover:bg-current hover:text-black'
              }
            `}
            style={{
              color: theme.colors.primary,
              borderColor: theme.colors.primary,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {name.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Default: dropdown variant
  return (
    <div
      {...props}
      className={`inline-block ${className}`}
    >
      <select
        value={themeName}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        className="font-mono px-2 py-1 border bg-transparent"
        style={{
          color: theme.colors.text,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        {themeNames.map((name) => (
          <option 
            key={name} 
            value={name}
            style={{
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
            }}
          >
            {theme.characters.bracketLeft} {name.toUpperCase()} {theme.characters.bracketRight} - {getThemeDescription(name)}
          </option>
        ))}
      </select>
      
      {showPreview && (
        <div 
          className="mt-2 text-xs font-mono p-2 border"
          style={{
            color: theme.colors.textSecondary,
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: theme.colors.primary }}>
              {theme.characters.bulletPoint}
            </span>
            <span>Preview: {getThemeDescription(themeName)}</span>
          </div>
          <div className="mt-1 flex gap-1">
            <span style={{ color: theme.colors.success }}>{theme.characters.checkmark}</span>
            <span style={{ color: theme.colors.warning }}>{theme.characters.arrow}</span>
            <span style={{ color: theme.colors.error }}>{theme.characters.cross}</span>
            <span style={{ color: theme.colors.info }}>{theme.characters.bulletPoint}</span>
          </div>
        </div>
      )}
    </div>
  );
};