import React, { useState, useCallback, useMemo } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { SingleFormProps, FormState, FormField } from './types';
import { validateForm, isFormValid } from './validation';
import { AsciiFormField } from './AsciiFormField';

export const AsciiForm: React.FC<SingleFormProps> = ({
  fields,
  onSubmit,
  initialValues = {},
  submitButtonText = 'Submit',
  resetButtonText = 'Reset',
  showReset = true,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [formState, setFormState] = useState<FormState>({
    values: { ...initialValues },
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  // Validate all fields
  const formErrors = useMemo(() => {
    return validateForm(formState.values, fields);
  }, [formState.values, fields]);

  const isFormValidNow = isFormValid(formErrors);

  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    setFormState(prev => ({
      ...prev,
      values: { ...prev.values, [fieldName]: value },
      errors: { ...prev.errors, [fieldName]: '' }, // Clear error on change
    }));
  }, []);

  const handleFieldBlur = useCallback((fieldName: string) => {
    setFormState(prev => ({
      ...prev,
      touched: { ...prev.touched, [fieldName]: true },
      errors: { ...prev.errors, ...formErrors },
    }));
  }, [formErrors]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const touchedFields = fields.reduce((acc, field) => {
      acc[field.name] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setFormState(prev => ({
      ...prev,
      touched: touchedFields,
      errors: { ...prev.errors, ...formErrors },
    }));

    if (!isFormValidNow) {
      return;
    }

    setFormState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(formState.values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setFormState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [fields, formErrors, isFormValidNow, onSubmit, formState.values]);

  const handleReset = useCallback(() => {
    setFormState({
      values: { ...initialValues },
      errors: {},
      touched: {},
      isSubmitting: false,
      isValid: false,
    });
  }, [initialValues]);

  const organizeFieldsByRow = () => {
    const rows: FormField[][] = [];
    let currentRow: FormField[] = [];
    let currentRowWidth = 0;

    fields.forEach(field => {
      const fieldWidth = field.width === 'half' ? 50 : 
                        field.width === 'third' ? 33 : 
                        field.width === 'quarter' ? 25 : 100;

      if (currentRowWidth + fieldWidth > 100 && currentRow.length > 0) {
        rows.push(currentRow);
        currentRow = [field];
        currentRowWidth = fieldWidth;
      } else {
        currentRow.push(field);
        currentRowWidth += fieldWidth;
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const fieldRows = organizeFieldsByRow();

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        color: theme.colors.text,
        ...style,
      }}
    >
      <div 
        className="border rounded p-6"
        style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}
      >
        {/* Form Fields organized in rows */}
        {fieldRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex flex-wrap gap-4 mb-4 last:mb-0">
            {row.map((field) => (
              <div 
                key={field.name}
                className={
                  field.width === 'half' ? 'flex-1 min-w-0' :
                  field.width === 'third' ? 'flex-1 min-w-0 basis-1/3' :
                  field.width === 'quarter' ? 'flex-1 min-w-0 basis-1/4' :
                  'w-full'
                }
              >
                <AsciiFormField
                  field={field}
                  value={formState.values[field.name]}
                  error={formState.errors[field.name]}
                  touched={formState.touched[field.name]}
                  onChange={(value) => handleFieldChange(field.name, value)}
                  onBlur={() => handleFieldBlur(field.name)}
                />
              </div>
            ))}
          </div>
        ))}

        {/* Form Actions */}
        <div className="flex justify-end items-center gap-3 mt-6 pt-4 border-t" style={{ borderColor: theme.colors.border }}>
          {showReset && (
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 border rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
              style={{
                borderColor: theme.colors.border,
                color: theme.colors.textSecondary,
                backgroundColor: 'transparent',
              }}
            >
              {resetButtonText}
            </button>
          )}

          <button
            type="submit"
            disabled={formState.isSubmitting}
            className="px-6 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            {formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⟳</span>
                Submitting...
              </span>
            ) : (
              submitButtonText
            )}
          </button>
        </div>

        {/* Form Status */}
        {Object.keys(formState.touched).length > 0 && !isFormValidNow && (
          <div 
            className="mt-4 p-3 border rounded text-sm"
            style={{ 
              borderColor: theme.colors.error,
              backgroundColor: `${theme.colors.error}15`,
              color: theme.colors.error 
            }}
          >
            <div className="flex items-center gap-2">
              <span>⚠</span>
              <span>Please fix the errors above before submitting.</span>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};