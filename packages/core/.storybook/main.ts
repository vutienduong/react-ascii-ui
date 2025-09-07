import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-viewport'
  ],
  "framework": {
    "name": '@storybook/react-vite',
    "options": {}
  },
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "typescript": {
    "check": false
  }
};
export default config;