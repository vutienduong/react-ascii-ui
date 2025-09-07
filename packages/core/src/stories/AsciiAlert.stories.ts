import type { Meta, StoryObj } from '@storybook/react';
import { AsciiAlert } from '../components/AsciiAlert';
import React from 'react';

const meta = {
  title: 'Components/AsciiAlert',
  component: AsciiAlert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ASCII-styled alert component with theme colors and icon variants for different message types.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert type and color'
    },
    title: {
      control: 'text',
      description: 'Optional alert title'
    },
    children: {
      control: 'text',
      description: 'Alert message content'
    }
  },
} satisfies Meta<typeof AsciiAlert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Operation completed successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Please check your input before proceeding.',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
};

export const WithTitle: Story = {
  args: {
    variant: 'warning',
    title: 'Important Notice',
    children: 'Your session will expire in 5 minutes. Please save your work.',
  },
};

export const LongMessage: Story = {
  args: {
    variant: 'info',
    title: 'System Update',
    children: 'The system will undergo scheduled maintenance tonight from 2:00 AM to 4:00 AM UTC. During this time, some services may be temporarily unavailable. We apologize for any inconvenience.',
  },
};

export const AllVariants: Story = {
  render: () => 
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' } },
      React.createElement(AsciiAlert, { variant: 'info', title: 'Information' }, 'This is an info alert'),
      React.createElement(AsciiAlert, { variant: 'success', title: 'Success' }, 'Operation completed successfully'),
      React.createElement(AsciiAlert, { variant: 'warning', title: 'Warning' }, 'Please review before continuing'),
      React.createElement(AsciiAlert, { variant: 'error', title: 'Error' }, 'Something went wrong')
    )
};