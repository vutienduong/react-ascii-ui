import React from "react";

interface AsciiAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
}

export const AsciiAlert: React.FC<AsciiAlertProps> = ({ 
  variant = 'info',
  title,
  children, 
  className = "", 
  ...props 
}) => {
  const getIcon = (variant: string) => {
    switch (variant) {
      case 'error': return '(!)';
      case 'warning': return '(⚠)';
      case 'success': return '(✓)';
      case 'info': 
      default: return '(i)';
    }
  };

  const getVariantColor = (variant: string) => {
    switch (variant) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      case 'info':
      default: return 'text-blue-400';
    }
  };

  return (
    <div
      {...props}
      className={`
        font-mono border-l-2 pl-3 py-2 
        ${getVariantColor(variant)} border-current
        ${className}
      `}
    >
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 select-none">
          {getIcon(variant)}
        </span>
        <div className="flex-1">
          {title && (
            <div className="font-bold mb-1">
              {title}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};