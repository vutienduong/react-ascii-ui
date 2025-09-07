import type { Meta, StoryObj } from '@storybook/react';
import { AsciiCard } from '../components/AsciiCard';
import React from 'react';

const meta = {
  title: 'Components/AsciiCard',
  component: AsciiCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ASCII-styled card component with optional title and theme-aware styling.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional card title'
    },
    children: {
      control: 'text',
      description: 'Card content'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
} satisfies Meta<typeof AsciiCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a basic ASCII card with some content inside.',
  },
};

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    children: 'This card has a title with a dashed border separator.',
  },
};

export const LongContent: Story = {
  args: {
    title: 'Terminal Output',
    children: `
> system status: operational
> memory usage: 64% 
> cpu load: 2.1, 1.8, 1.5
> network: connected
> last update: 2024-01-15 14:30:22
    `.trim(),
  },
};

export const NestedContent: Story = {
  render: () => 
    React.createElement(AsciiCard, { title: 'System Information' },
      React.createElement('div', { style: { fontFamily: 'monospace' } },
        React.createElement('div', { style: { marginBottom: '8px' } }, '┌─ Process Status ─┐'),
        React.createElement('div', { style: { marginBottom: '4px' } }, '│ API Server: ✓    │'),
        React.createElement('div', { style: { marginBottom: '4px' } }, '│ Database: ✓      │'),
        React.createElement('div', { style: { marginBottom: '8px' } }, '└──────────────────┘'),
        React.createElement('div', { style: { color: '#00ff00' } }, 'All systems operational')
      )
    )
};

export const WithCustomStyling: Story = {
  args: {
    title: 'Custom Styled Card',
    children: 'This card has custom styling applied.',
    className: 'border-2 border-dashed p-6',
  },
};