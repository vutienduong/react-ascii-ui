import type { Meta, StoryObj } from '@storybook/react';
import { AsciiForm, AsciiMultiStepForm, FormField, FormStep, createValidationRules } from '../components/forms';

// Sample form fields for single form
const contactFormFields: FormField[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    width: 'half',
    validation: [createValidationRules.required()],
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your last name',
    width: 'half',
    validation: [createValidationRules.required()],
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email address',
    validation: [
      createValidationRules.required(),
      createValidationRules.email(),
    ],
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'text',
    placeholder: '+1 (555) 123-4567',
    width: 'half',
    validation: [
      createValidationRules.pattern(
        /^\+?[\d\s\-\(\)]{10,}$/,
        'Please enter a valid phone number'
      ),
    ],
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Your company name',
    width: 'half',
  },
  {
    name: 'role',
    label: 'Role',
    type: 'select',
    options: [
      { value: 'developer', label: 'Developer' },
      { value: 'designer', label: 'Designer' },
      { value: 'manager', label: 'Manager' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'Tell us about your project or inquiry...',
    validation: [
      createValidationRules.required(),
      createValidationRules.minLength(10),
    ],
  },
  {
    name: 'newsletter',
    label: 'Subscribe to our newsletter',
    type: 'checkbox',
  },
];

// Sample multi-step form
const registrationSteps: FormStep[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    description: 'Tell us about yourself',
    fields: [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
        placeholder: 'John',
        width: 'half',
        validation: [createValidationRules.required()],
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
        placeholder: 'Doe',
        width: 'half',
        validation: [createValidationRules.required()],
      },
      {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        placeholder: 'john.doe@example.com',
        validation: [
          createValidationRules.required(),
          createValidationRules.email(),
        ],
      },
      {
        name: 'dateOfBirth',
        label: 'Date of Birth',
        type: 'text',
        placeholder: 'YYYY-MM-DD',
        validation: [
          createValidationRules.required(),
          createValidationRules.pattern(
            /^\d{4}-\d{2}-\d{2}$/,
            'Please enter date in YYYY-MM-DD format'
          ),
        ],
      },
    ],
  },
  {
    id: 'account',
    title: 'Account Setup',
    description: 'Create your account credentials',
    fields: [
      {
        name: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'johndoe',
        validation: [
          createValidationRules.required(),
          createValidationRules.minLength(3),
          createValidationRules.pattern(
            /^[a-zA-Z0-9_]+$/,
            'Username can only contain letters, numbers, and underscores'
          ),
        ],
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter a strong password',
        validation: [
          createValidationRules.required(),
          createValidationRules.minLength(8),
          createValidationRules.custom(
            (value) => /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value),
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
          ),
        ],
      },
      {
        name: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        validation: [createValidationRules.required()],
      },
    ],
    validation: (values) => {
      const errors: Record<string, string> = {};
      if (values.password !== values.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      return errors;
    },
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Customize your experience',
    fields: [
      {
        name: 'theme',
        label: 'Preferred Theme',
        type: 'radio',
        options: [
          { value: 'classic', label: 'Classic Terminal' },
          { value: 'cyberpunk', label: 'Cyberpunk' },
          { value: 'matrix', label: 'Matrix Green' },
          { value: 'neon', label: 'Neon' },
        ],
        validation: [createValidationRules.required()],
      },
      {
        name: 'notifications',
        label: 'Email Notifications',
        type: 'checkbox',
      },
      {
        name: 'bio',
        label: 'Bio (Optional)',
        type: 'textarea',
        placeholder: 'Tell us about yourself...',
        description: 'This will be visible on your profile',
        validation: [createValidationRules.maxLength(500)],
      },
    ],
  },
];

// Single Form Stories
const singleFormMeta: Meta<typeof AsciiForm> = {
  title: 'Forms/AsciiForm',
  component: AsciiForm,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    showReset: {
      control: 'boolean',
    },
  },
};

export default singleFormMeta;
type SingleFormStory = StoryObj<typeof AsciiForm>;

export const ContactForm: SingleFormStory = {
  args: {
    fields: contactFormFields,
    onSubmit: async (values) => {
      console.log('Form submitted:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Form submitted successfully!');
    },
    submitButtonText: 'Send Message',
    showReset: true,
  },
};

export const SimpleLoginForm: SingleFormStory = {
  args: {
    fields: [
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        validation: [createValidationRules.required(), createValidationRules.email()],
      },
      {
        name: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Enter your password',
        validation: [createValidationRules.required()],
      },
      {
        name: 'remember',
        label: 'Remember me',
        type: 'checkbox',
      },
    ],
    onSubmit: async (values) => {
      console.log('Login attempt:', values);
      await new Promise(resolve => setTimeout(resolve, 800));
      alert('Login successful!');
    },
    submitButtonText: 'Sign In',
    showReset: false,
  },
};

export const CompactForm: SingleFormStory = {
  args: {
    fields: [
      {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        width: 'third',
        validation: [createValidationRules.required()],
      },
      {
        name: 'email',
        label: 'Email',
        type: 'email',
        width: 'third',
        validation: [createValidationRules.required(), createValidationRules.email()],
      },
      {
        name: 'phone',
        label: 'Phone',
        type: 'text',
        width: 'third',
      },
    ],
    onSubmit: async (values) => {
      console.log('Compact form:', values);
      alert('Submitted!');
    },
    submitButtonText: 'Subscribe',
  },
};

// Multi-Step Form Stories
const multiStepFormMeta: Meta<typeof AsciiMultiStepForm> = {
  title: 'Forms/AsciiMultiStepForm',
  component: AsciiMultiStepForm,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  argTypes: {
    showProgress: {
      control: 'boolean',
    },
    allowSkipSteps: {
      control: 'boolean',
    },
  },
};

export const UserRegistration: StoryObj<typeof AsciiMultiStepForm> = {
  args: {
    steps: registrationSteps,
    onSubmit: async (values) => {
      console.log('Registration completed:', values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Registration completed successfully!');
    },
    onStepChange: (step, values) => {
      console.log(`Moved to step ${step + 1}:`, values);
    },
    showProgress: true,
    submitButtonText: 'Complete Registration',
  },
};

export const SimpleWizard: StoryObj<typeof AsciiMultiStepForm> = {
  args: {
    steps: [
      {
        id: 'basic',
        title: 'Basic Info',
        fields: [
          {
            name: 'name',
            label: 'Name',
            type: 'text',
            validation: [createValidationRules.required()],
          },
          {
            name: 'email',
            label: 'Email',
            type: 'email',
            validation: [createValidationRules.required(), createValidationRules.email()],
          },
        ],
      },
      {
        id: 'details',
        title: 'Additional Details',
        fields: [
          {
            name: 'company',
            label: 'Company',
            type: 'text',
          },
          {
            name: 'role',
            label: 'Role',
            type: 'select',
            options: [
              { value: 'developer', label: 'Developer' },
              { value: 'designer', label: 'Designer' },
              { value: 'manager', label: 'Manager' },
            ],
          },
        ],
      },
    ],
    onSubmit: async (values) => {
      console.log('Simple wizard:', values);
      await new Promise(resolve => setTimeout(resolve, 800));
      alert('Wizard completed!');
    },
    showProgress: true,
  },
};

export const NoProgressBar: StoryObj<typeof AsciiMultiStepForm> = {
  args: {
    steps: registrationSteps.slice(0, 2), // Only first 2 steps
    onSubmit: async (values) => {
      console.log('No progress bar form:', values);
      alert('Submitted!');
    },
    showProgress: false,
  },
};