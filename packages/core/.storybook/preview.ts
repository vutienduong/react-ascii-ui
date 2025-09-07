import type { Preview } from '@storybook/react-vite';
import { AsciiThemeProvider } from '../src/contexts/ThemeContext';
import { getThemeNames } from '../src/themes';
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
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      description: {
        component: 'ASCII UI components with terminal aesthetics'
      }
    },
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
        items: getThemeNames().map(theme => ({
          value: theme,
          title: theme.charAt(0).toUpperCase() + theme.slice(1)
        })),
        dynamicTitle: true
      }
    }
  },
  decorators: [withThemeProvider]
};

export default preview;