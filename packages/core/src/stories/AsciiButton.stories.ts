import type { Meta, StoryObj } from '@storybook/react';
import { AsciiButton } from '../components/AsciiButton';

const meta = {
  title: 'Components/AsciiButton',
  component: AsciiButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ASCII-styled button component with theme-aware bracketed text and hover effects.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: {
      control: 'boolean',
      description: 'Disable the button'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    },
    children: {
      control: 'text',
      description: 'Button content'
    }
  },
} satisfies Meta<typeof AsciiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a longer button text',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Custom Styled',
    className: 'bg-blue-600 text-white px-4 py-2',
  },
};

export const Interactive: Story = {
  args: {
    children: 'Interactive Button',
    onClick: () => alert('Button clicked!'),
  },
};