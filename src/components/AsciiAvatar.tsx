import React from "react";

interface AsciiAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'parentheses' | 'brackets' | 'braces';
  color?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'purple' | 'pink';
  showBorder?: boolean;
}

export const AsciiAvatar: React.FC<AsciiAvatarProps> = ({
  name,
  size = 'md',
  variant = 'parentheses',
  color = 'default',
  showBorder = false,
  className = "",
  ...props
}) => {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 3); // Max 3 initials
  };

  const getBrackets = () => {
    switch (variant) {
      case 'brackets': return { left: '[', right: ']' };
      case 'braces': return { left: '{', right: '}' };
      case 'parentheses':
      default: return { left: '(', right: ')' };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'text-xs min-w-[1.5rem] h-6';
      case 'sm': return 'text-sm min-w-[2rem] h-8';
      case 'lg': return 'text-lg min-w-[3.5rem] h-14';
      case 'xl': return 'text-xl min-w-[4rem] h-16';
      case 'md':
      default: return 'text-base min-w-[3rem] h-12';
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'primary': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'purple': return 'text-purple-400';
      case 'pink': return 'text-pink-400';
      case 'default':
      default: return 'text-white';
    }
  };

  const getBorderClass = () => {
    if (!showBorder) return '';
    return `border ${getColorClass().replace('text-', 'border-')}`;
  };

  const brackets = getBrackets();
  const initials = getInitials(name);

  return (
    <div
      {...props}
      className={`
        font-mono inline-flex items-center justify-center
        ${getSizeClasses()} ${getColorClass()} ${getBorderClass()}
        font-bold select-none
        ${className}
      `}
      title={name}
    >
      <span className="flex items-center">
        <span>{brackets.left}</span>
        <span className="px-0.5">{initials}</span>
        <span>{brackets.right}</span>
      </span>
    </div>
  );
};