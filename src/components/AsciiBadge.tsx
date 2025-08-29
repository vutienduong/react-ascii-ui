import React from "react";

interface AsciiBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'square' | 'curly';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error';
}

export const AsciiBadge: React.FC<AsciiBadgeProps> = ({ 
  variant = 'square',
  color = 'default',
  children, 
  className = "", 
  ...props 
}) => {
  const getBrackets = (variant: string) => {
    switch (variant) {
      case 'curly': return { left: '{', right: '}' };
      case 'square':
      default: return { left: '[', right: ']' };
    }
  };

  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'default':
      default: return 'text-white';
    }
  };

  const brackets = getBrackets(variant);

  return (
    <span
      {...props}
      className={`
        font-mono text-xs font-bold inline-flex items-center
        ${getColorClass(color)}
        ${className}
      `}
    >
      <span className="select-none">{brackets.left}</span>
      <span className="px-1">{children}</span>
      <span className="select-none">{brackets.right}</span>
    </span>
  );
};