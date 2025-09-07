import React from 'react';
import { 
  AsciiThemeProvider, 
  AsciiThemeSwitcher, 
  AsciiCard, 
  AsciiBadge, 
  AsciiButton, 
  AsciiInput, 
  AsciiAlert,
  useAsciiTheme 
} from 'react-ascii-ui';

const ThemeDemo: React.FC = () => {
  const { theme, themeName } = useAsciiTheme();

  return (
    <div className="space-y-6">
      <AsciiCard title="Theme Switcher">
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 font-bold">Dropdown Variant</h3>
            <AsciiThemeSwitcher variant="dropdown" />
          </div>
          
          <div>
            <h3 className="mb-2 font-bold">Buttons Variant</h3>
            <AsciiThemeSwitcher variant="buttons" />
          </div>
          
          <div>
            <h3 className="mb-2 font-bold">Cycle Variant</h3>
            <AsciiThemeSwitcher variant="cycle" />
          </div>
        </div>
      </AsciiCard>

      <AsciiCard title="Component Showcase">
        <div className="space-y-4">
          <div>
            <h4 className="mb-2">Buttons & Badges</h4>
            <div className="flex flex-wrap gap-2 items-center">
              <AsciiButton>Click Me</AsciiButton>
              <AsciiBadge color="primary">Primary</AsciiBadge>
              <AsciiBadge color="success">Success</AsciiBadge>
              <AsciiBadge color="warning">Warning</AsciiBadge>
              <AsciiBadge color="error">Error</AsciiBadge>
            </div>
          </div>

          <div>
            <h4 className="mb-2">Input Field</h4>
            <AsciiInput placeholder="Type something..." />
          </div>

          <div>
            <h4 className="mb-2">Alerts</h4>
            <div className="space-y-2">
              <AsciiAlert variant="info" title="Information">
                This is an informational message using theme colors.
              </AsciiAlert>
              <AsciiAlert variant="success" title="Success">
                Operation completed successfully!
              </AsciiAlert>
              <AsciiAlert variant="warning" title="Warning">
                Please check your input.
              </AsciiAlert>
              <AsciiAlert variant="error" title="Error">
                Something went wrong.
              </AsciiAlert>
            </div>
          </div>
        </div>
      </AsciiCard>

      <AsciiCard title="Theme Information">
        <div className="space-y-2 font-mono text-sm">
          <div>
            <span style={{ color: theme.colors.textSecondary }}>Current Theme:</span>{' '}
            <span style={{ color: theme.colors.primary }}>{themeName}</span>
          </div>
          <div>
            <span style={{ color: theme.colors.textSecondary }}>Description:</span>{' '}
            <span>{theme.description}</span>
          </div>
          <div>
            <span style={{ color: theme.colors.textSecondary }}>Font Family:</span>{' '}
            <span>{theme.typography.fontFamily}</span>
          </div>
          
          <div className="mt-4">
            <h5 style={{ color: theme.colors.primary }} className="mb-2">Color Palette:</h5>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {Object.entries(theme.colors).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 border"
                    style={{ 
                      backgroundColor: value, 
                      borderColor: theme.colors.border 
                    }}
                  />
                  <span style={{ color: theme.colors.textSecondary }}>
                    {key}: {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h5 style={{ color: theme.colors.primary }} className="mb-2">Special Characters:</h5>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {Object.entries(theme.characters).map(([key, value]) => {
                if (Array.isArray(value)) return null; // Skip spinner array
                return (
                  <div key={key} className="flex items-center gap-2">
                    <span style={{ color: theme.colors.primary }}>
                      {value as string}
                    </span>
                    <span style={{ color: theme.colors.textSecondary }} className="text-xs">
                      {key}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AsciiCard>
    </div>
  );
};

export default function ThemesPage() {
  return (
    <AsciiThemeProvider initialTheme="classic">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ASCII Theme System</h1>
          <p className="text-lg opacity-80">
            Experience different ASCII aesthetics with our comprehensive theme system. 
            Switch between themes and see how components adapt to different visual styles.
          </p>
        </div>
        
        <ThemeDemo />
      </div>
    </AsciiThemeProvider>
  );
}