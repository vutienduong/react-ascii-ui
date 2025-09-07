import type { Meta, StoryObj } from '@storybook/react';
import { AsciiMatrixRain } from '../animations/components/AsciiMatrixRain';
import React from 'react';

const meta = {
  title: 'Animations/AsciiMatrixRain',
  component: AsciiMatrixRain,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Matrix-style character rain animation with customizable density and effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: { type: 'range', min: 20, max: 100, step: 10 },
      description: 'Number of columns'
    },
    height: {
      control: { type: 'range', min: 10, max: 30, step: 5 },
      description: 'Number of rows'
    },
    config: {
      control: 'object',
      description: 'Matrix rain configuration'
    },
    color: {
      control: 'color',
      description: 'Rain color'
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color'
    }
  },
} satisfies Meta<typeof AsciiMatrixRain>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 60,
    height: 15,
  },
};

export const Dense: Story = {
  args: {
    width: 60,
    height: 15,
    config: {
      density: 0.15,
      speed: 100
    },
  },
};

export const Sparse: Story = {
  args: {
    width: 60,
    height: 15,
    config: {
      density: 0.05,
      speed: 200
    },
  },
};

export const FastRain: Story = {
  args: {
    width: 60,
    height: 15,
    config: {
      density: 0.1,
      speed: 50
    },
  },
};

export const SlowRain: Story = {
  args: {
    width: 60,
    height: 15,
    config: {
      density: 0.08,
      speed: 300
    },
  },
};

export const WithoutFade: Story = {
  args: {
    width: 60,
    height: 15,
    config: {
      density: 0.1,
      fadeEffect: false
    },
  },
};

export const CustomColor: Story = {
  args: {
    width: 60,
    height: 15,
    color: '#00ffff',
    backgroundColor: '#001a1a',
    config: {
      density: 0.12
    },
  },
};

export const SmallRain: Story = {
  args: {
    width: 30,
    height: 10,
    config: {
      density: 0.15,
      speed: 150
    },
  },
};

export const WideRain: Story = {
  render: () => 
    React.createElement('div', { 
      style: { 
        width: '100%', 
        height: '300px', 
        overflow: 'hidden',
        border: '1px solid #333'
      } 
    },
      React.createElement(AsciiMatrixRain, {
        width: 100,
        height: 20,
        config: {
          density: 0.08,
          speed: 120,
          fadeEffect: true
        }
      })
    )
};