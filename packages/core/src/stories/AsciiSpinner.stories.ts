import type { Meta, StoryObj } from '@storybook/react';
import { AsciiSpinner } from '../animations/components/AsciiSpinner';
import { spinnerFrames } from '../animations/utils';

const meta = {
  title: 'Animations/AsciiSpinner',
  component: AsciiSpinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Animated ASCII spinner with multiple variants and customizable speed.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.keys(spinnerFrames),
      description: 'Spinner animation variant'
    },
    speed: {
      control: { type: 'range', min: 50, max: 500, step: 50 },
      description: 'Animation speed in milliseconds'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Spinner size'
    },
    color: {
      control: 'color',
      description: 'Custom spinner color'
    }
  },
} satisfies Meta<typeof AsciiSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'dots',
  },
};

export const Dots: Story = {
  args: {
    variant: 'dots',
    speed: 150,
  },
};

export const Line: Story = {
  args: {
    variant: 'line',
    speed: 200,
  },
};

export const Arrow: Story = {
  args: {
    variant: 'arrow',
    speed: 150,
  },
};

export const Binary: Story = {
  args: {
    variant: 'binary',
    speed: 300,
  },
};

export const Matrix: Story = {
  args: {
    variant: 'matrix',
    speed: 250,
  },
};

export const FastSpinner: Story = {
  args: {
    variant: 'pulse',
    speed: 100,
  },
};

export const SlowSpinner: Story = {
  args: {
    variant: 'classic',
    speed: 400,
  },
};

export const SmallSize: Story = {
  args: {
    variant: 'dots',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'dots',
    size: 'lg',
  },
};

export const CustomColor: Story = {
  args: {
    variant: 'dots',
    color: '#ff00ff',
  },
};