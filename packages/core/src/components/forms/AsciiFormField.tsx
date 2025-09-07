import React from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { FormField } from './types';

interface AsciiFormFieldProps {
  field: FormField;
  value: any;
  error?: string;
  touched?: boolean;
  onChange: (value: any) => void;
  onBlur?: () => void;
}

export const AsciiFormField: React.FC<AsciiFormFieldProps> = ({
  field,
  value,
  error,
  touched,
  onChange,
  onBlur,
}) => {
  const { theme } = useAsciiTheme();

  if (field.hidden) return null;

  const hasError = touched && error;
  const inputBaseStyle = {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    borderColor: hasError ? theme.colors.error : theme.colors.border,
    fontFamily: theme.typography.fontFamily,
  };

  const getWidthClass = () => {
    switch (field.width) {
      case 'half': return 'w-1/2';
      case 'third': return 'w-1/3';
      case 'quarter': return 'w-1/4';
      case 'full':
      default: return 'w-full';
    }
  };

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={field.disabled}
            rows={4}
            className="w-full px-3 py-2 border border-solid focus:outline-none focus:ring-2 focus:ring-offset-1 resize-none"
            style={inputBaseStyle}
          />
        );

      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={field.disabled}
            className="w-full px-3 py-2 border border-solid focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={inputBaseStyle}
          >
            <option value="">Select an option...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              id={field.name}
              name={field.name}
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
              onBlur={onBlur}
              disabled={field.disabled}
              className="form-checkbox focus:ring-2 focus:ring-offset-1"
              style={{ accentColor: theme.colors.primary }}
            />
            <span 
              className="select-none"
              style={{ color: theme.colors.text }}
            >
              {field.label}
            </span>
          </label>
        );

      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                  onBlur={onBlur}
                  disabled={field.disabled}
                  className="form-radio focus:ring-2 focus:ring-offset-1"
                  style={{ accentColor: theme.colors.primary }}
                />
                <span 
                  className="select-none"
                  style={{ color: theme.colors.text }}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        );

      default:
        return (
          <input
            id={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={field.disabled}
            className="w-full px-3 py-2 border border-solid focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={inputBaseStyle}
          />
        );
    }
  };

  return (
    <div className={`mb-4 ${getWidthClass()}`}>
      {field.type !== 'checkbox' && (
        <label 
          htmlFor={field.name}
          className="block text-sm font-medium mb-1"
          style={{ color: theme.colors.text }}
        >
          {field.label}
          {field.validation?.some(rule => rule.type === 'required') && (
            <span style={{ color: theme.colors.error }}>*</span>
          )}
        </label>
      )}

      {field.description && (
        <p 
          className="text-xs mb-2"
          style={{ color: theme.colors.textSecondary }}
        >
          {field.description}
        </p>
      )}

      {renderInput()}

      {hasError && (
        <p 
          className="mt-1 text-xs flex items-center gap-1"
          style={{ color: theme.colors.error }}
        >
          <span>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};