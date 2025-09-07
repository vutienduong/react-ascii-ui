import type { Meta, StoryObj } from '@storybook/react';
import { AsciiBadge } from '../components/AsciiBadge';

const meta = {
  title: 'Components/AsciiBadge',
  component: AsciiBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ASCII-styled badge component with theme colors and bracket variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['square', 'curly'],
      description: 'Bracket style variant'
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error'],
      description: 'Color theme'
    },
    children: {
      control: 'text',
      description: 'Badge content'
    }
  },
} satisfies Meta<typeof AsciiBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary',
    color: 'primary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    color: 'success',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    color: 'warning',
  },
};

export const Error: Story = {
  args: {
    children: 'Error',
    color: 'error',
  },
};

export const CurlyBrackets: Story = {
  args: {
    children: 'Curly',
    variant: 'curly',
    color: 'primary',
  },
};

export const AllColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
        <AsciiBadge color="default">Default</AsciiBadge>
        <AsciiBadge color="primary">Primary</AsciiBadge>
        <AsciiBadge color="success">Success</AsciiBadge>
        <AsciiBadge color="warning">Warning</AsciiBadge>
        <AsciiBadge color="error">Error</AsciiBadge>
      </div>
    `
  })
};