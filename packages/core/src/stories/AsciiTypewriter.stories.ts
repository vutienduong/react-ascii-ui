import type { Meta, StoryObj } from '@storybook/react';
import { AsciiTypewriter, AsciiTypewriterMulti } from '../animations/components/AsciiTypewriter';

const meta = {
  title: 'Animations/AsciiTypewriter',
  component: AsciiTypewriter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated typewriter effect with customizable speed and behavior.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'Text to animate (string or array for cycling)'
    },
    config: {
      control: 'object',
      description: 'Typewriter configuration options'
    },
    autoStart: {
      control: 'boolean',
      description: 'Start animation automatically'
    }
  },
} satisfies Meta<typeof AsciiTypewriter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'Hello, World!',
  },
};

export const FastTyping: Story = {
  args: {
    text: 'Fast typing animation',
    config: {
      speed: 30,
    },
  },
};

export const SlowTyping: Story = {
  args: {
    text: 'Slow... typing... animation...',
    config: {
      speed: 150,
    },
  },
};

export const WithoutCursor: Story = {
  args: {
    text: 'No cursor shown',
    config: {
      showCursor: false,
    },
  },
};

export const CustomCursor: Story = {
  args: {
    text: 'Custom cursor character',
    config: {
      cursor: '_',
    },
  },
};

export const CyclingText: Story = {
  args: {
    text: [
      'Welcome to ASCII UI',
      'Terminal aesthetics',
      'React components',
      'Built for developers'
    ],
    config: {
      speed: 60,
      deleteSpeed: 40,
      pauseAfterComplete: 2000,
      repeat: true
    },
  },
};

export const CodeEffect: Story = {
  args: {
    text: 'console.log("Hello, World!");',
    config: {
      speed: 80,
      showCursor: true,
      cursor: '|'
    },
  },
};

export const TerminalPrompt: Story = {
  args: {
    text: '$ npm install react-ascii-ui',
    config: {
      speed: 50,
      cursor: '_'
    },
  },
};