import { ValidationRule, FormField } from './types';

export const validateField = (value: any, rules: ValidationRule[] = []): string | null => {
  for (const rule of rules) {
    const error = validateRule(value, rule);
    if (error) return error;
  }
  return null;
};

export const validateRule = (value: any, rule: ValidationRule): string | null => {
  switch (rule.type) {
    case 'required':
      if (!value || (typeof value === 'string' && !value.trim())) {
        return rule.message;
      }
      break;

    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        return rule.message;
      }
      break;

    case 'minLength':
      if (value && typeof value === 'string' && value.length < (rule.value as number)) {
        return rule.message;
      }
      break;

    case 'maxLength':
      if (value && typeof value === 'string' && value.length > (rule.value as number)) {
        return rule.message;
      }
      break;

    case 'pattern':
      if (value && !(rule.value as RegExp).test(value)) {
        return rule.message;
      }
      break;

    case 'custom':
      if (rule.validator && !rule.validator(value)) {
        return rule.message;
      }
      break;
  }
  return null;
};

export const validateForm = (
  values: Record<string, any>,
  fields: FormField[]
): Record<string, string> => {
  const errors: Record<string, string> = {};

  fields.forEach(field => {
    if (field.validation) {
      const error = validateField(values[field.name], field.validation);
      if (error) {
        errors[field.name] = error;
      }
    }
  });

  return errors;
};

export const isFormValid = (errors: Record<string, string>): boolean => {
  return Object.keys(errors).length === 0;
};

// Common validation rules factory functions
export const createValidationRules = {
  required: (message = 'This field is required'): ValidationRule => ({
    type: 'required',
    message,
  }),

  email: (message = 'Please enter a valid email address'): ValidationRule => ({
    type: 'email',
    message,
  }),

  minLength: (min: number, message?: string): ValidationRule => ({
    type: 'minLength',
    value: min,
    message: message || `Must be at least ${min} characters`,
  }),

  maxLength: (max: number, message?: string): ValidationRule => ({
    type: 'maxLength',
    value: max,
    message: message || `Must be no more than ${max} characters`,
  }),

  pattern: (regex: RegExp, message: string): ValidationRule => ({
    type: 'pattern',
    value: regex,
    message,
  }),

  custom: (validator: (value: any) => boolean, message: string): ValidationRule => ({
    type: 'custom',
    message,
    validator,
  }),
};