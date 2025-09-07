export interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: string | number | RegExp;
  message: string;
  validator?: (value: any) => boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'textarea' | 'select' | 'checkbox' | 'radio';
  placeholder?: string;
  defaultValue?: any;
  options?: Array<{ value: string | number; label: string }>;
  validation?: ValidationRule[];
  disabled?: boolean;
  hidden?: boolean;
  width?: 'full' | 'half' | 'third' | 'quarter';
  description?: string;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  validation?: (values: Record<string, any>) => Record<string, string>;
}

export interface FormError {
  field: string;
  message: string;
}

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

export interface MultiStepFormProps extends React.HTMLAttributes<HTMLFormElement> {
  steps: FormStep[];
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  onStepChange?: (step: number, values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  showProgress?: boolean;
  allowSkipSteps?: boolean;
  submitButtonText?: string;
  nextButtonText?: string;
  prevButtonText?: string;
}

export interface SingleFormProps extends React.HTMLAttributes<HTMLFormElement> {
  fields: FormField[];
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
  initialValues?: Record<string, any>;
  submitButtonText?: string;
  resetButtonText?: string;
  showReset?: boolean;
}