import React, { useState, useCallback, useMemo } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { MultiStepFormProps, FormState } from './types';
import { validateForm, isFormValid } from './validation';
import { AsciiFormField } from './AsciiFormField';

export const AsciiMultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onSubmit,
  onStepChange,
  initialValues = {},
  showProgress = true,
  allowSkipSteps = false,
  submitButtonText = 'Submit',
  nextButtonText = 'Next',
  prevButtonText = 'Previous',
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    values: { ...initialValues },
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: false,
  });

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  // Validate current step
  const currentStepErrors = useMemo(() => {
    const errors = validateForm(formState.values, currentStepData.fields);
    
    // Run custom step validation if provided
    if (currentStepData.validation) {
      const customErrors = currentStepData.validation(formState.values);
      Object.assign(errors, customErrors);
    }

    return errors;
  }, [formState.values, currentStepData]);

  const isCurrentStepValid = isFormValid(currentStepErrors);

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
      errors: { ...prev.errors, ...currentStepErrors },
    }));
  }, [currentStepErrors]);

  const goToNextStep = useCallback(() => {
    if (isCurrentStepValid && currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep, formState.values);
    } else {
      // Mark all fields as touched to show validation errors
      const touchedFields = currentStepData.fields.reduce((acc, field) => {
        acc[field.name] = true;
        return acc;
      }, {} as Record<string, boolean>);

      setFormState(prev => ({
        ...prev,
        touched: { ...prev.touched, ...touchedFields },
        errors: { ...prev.errors, ...currentStepErrors },
      }));
    }
  }, [isCurrentStepValid, currentStep, steps.length, onStepChange, formState.values, currentStepData.fields, currentStepErrors]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep, formState.values);
    }
  }, [currentStep, onStepChange, formState.values]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCurrentStepValid) {
      // Mark all fields as touched to show validation errors
      const touchedFields = currentStepData.fields.reduce((acc, field) => {
        acc[field.name] = true;
        return acc;
      }, {} as Record<string, boolean>);

      setFormState(prev => ({
        ...prev,
        touched: { ...prev.touched, ...touchedFields },
        errors: { ...prev.errors, ...currentStepErrors },
      }));
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
  }, [isCurrentStepValid, currentStepData.fields, currentStepErrors, onSubmit, formState.values]);

  const renderProgressBar = () => {
    if (!showProgress) return null;

    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 
                  ${index <= currentStep ? 'border-current' : 'border-gray-400'}
                `}
                style={{
                  backgroundColor: index <= currentStep ? theme.colors.primary : 'transparent',
                  color: index <= currentStep ? theme.colors.background : theme.colors.textSecondary,
                  borderColor: index <= currentStep ? theme.colors.primary : theme.colors.textSecondary,
                }}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className="h-0.5 w-16 mx-2"
                  style={{
                    backgroundColor: index < currentStep ? theme.colors.primary : theme.colors.textSecondary,
                  }}
                />
              )}
            </div>
          ))}
        </div>
        
        <div 
          className="text-center text-sm"
          style={{ color: theme.colors.textSecondary }}
        >
          Step {currentStep + 1} of {steps.length}: {currentStepData.title}
        </div>

        {/* ASCII Progress Bar */}
        <div className="mt-2">
          <div 
            className="text-xs text-center mb-1"
            style={{ color: theme.colors.textSecondary }}
          >
            {Math.round(progressPercentage)}% Complete
          </div>
          <div className="font-mono">
            <span style={{ color: theme.colors.primary }}>
              {'█'.repeat(Math.floor(progressPercentage / 5))}
            </span>
            <span style={{ color: theme.colors.textSecondary }}>
              {'░'.repeat(20 - Math.floor(progressPercentage / 5))}
            </span>
          </div>
        </div>
      </div>
    );
  };

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
      {renderProgressBar()}

      {/* Step Content */}
      <div 
        className="border rounded p-6 mb-6"
        style={{ borderColor: theme.colors.border, backgroundColor: theme.colors.surface }}
      >
        <h2 
          className="text-xl font-bold mb-2"
          style={{ color: theme.colors.primary }}
        >
          {currentStepData.title}
        </h2>
        
        {currentStepData.description && (
          <p 
            className="mb-4 text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            {currentStepData.description}
          </p>
        )}

        {/* Form Fields */}
        <div className="space-y-4">
          {currentStepData.fields.map((field) => (
            <AsciiFormField
              key={field.name}
              field={field}
              value={formState.values[field.name]}
              error={formState.errors[field.name]}
              touched={formState.touched[field.name]}
              onChange={(value) => handleFieldChange(field.name, value)}
              onBlur={() => handleFieldBlur(field.name)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={goToPrevStep}
          disabled={isFirstStep}
          className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.text,
            backgroundColor: 'transparent',
          }}
        >
          ← {prevButtonText}
        </button>

        <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
          {!isCurrentStepValid && (
            <span className="text-red-500">Please fix errors before proceeding</span>
          )}
        </div>

        {!isLastStep ? (
          <button
            type="button"
            onClick={goToNextStep}
            className="px-4 py-2 border rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              borderColor: theme.colors.primary,
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
              }}
          >
            {nextButtonText} →
          </button>
        ) : (
          <button
            type="submit"
            disabled={formState.isSubmitting || !isCurrentStepValid}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
            style={{
              borderColor: theme.colors.success,
              backgroundColor: theme.colors.success,
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
        )}
      </div>
    </form>
  );
};