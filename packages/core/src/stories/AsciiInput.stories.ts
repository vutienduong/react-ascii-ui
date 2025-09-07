import type { Meta, StoryObj } from '@storybook/react';
import { AsciiInput } from '../components/AsciiInput';

const meta = {
  title: 'Components/AsciiInput',
  component: AsciiInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'ASCII-styled input field with bracketed styling and theme-aware colors.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    value: {
      control: 'text',
      description: 'Input value'
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input'
    },
    onChange: { 
      action: 'changed',
      description: 'Change handler'
    },
    onFocus: { 
      action: 'focused',
      description: 'Focus handler'
    },
    onBlur: { 
      action: 'blurred',
      description: 'Blur handler'
    }
  },
} satisfies Meta<typeof AsciiInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Sample text',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    value: 'Disabled input',
    disabled: true,
  },
};

export const LongPlaceholder: Story = {
  args: {
    placeholder: 'This is a longer placeholder text...',
  },
};

export const NumericInput: Story = {
  args: {
    type: 'number',
    placeholder: '42',
  },
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};