import type { Preview } from '@storybook/react-vite';
import { AsciiThemeProvider } from '../src/contexts/ThemeContext';
import React from 'react';

// Custom decorator to wrap all stories with theme provider
const withThemeProvider = (Story, context) => {
  const themeName = context.globals.theme || 'classic';
  
  return React.createElement(
    AsciiThemeProvider,
    { initialTheme: themeName },
    React.createElement('div', {
      style: {
        fontFamily: 'monospace',
        padding: '1rem',
        minHeight: '100vh'
      }
    }, React.createElement(Story))
  );
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
        { name: 'grey', value: '#333333' }
      ]
    }
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'ASCII UI Theme',
      defaultValue: 'classic',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'classic', title: 'Classic' },
          { value: 'cyberpunk', title: 'Cyberpunk' },
          { value: 'matrix', title: 'Matrix' },
          { value: 'retro', title: 'Retro' },
          { value: 'neon', title: 'Neon' },
          { value: 'terminal', title: 'Terminal' },
          { value: 'minimal', title: 'Minimal' }
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [withThemeProvider]
};

export default preview;