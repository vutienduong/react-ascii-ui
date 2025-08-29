import React from "react";

interface AsciiProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  showValue?: boolean;
  label?: string;
  variant?: 'blocks' | 'bars' | 'dots';
  color?: 'default' | 'success' | 'warning' | 'error';
}

export const AsciiProgressBar: React.FC<AsciiProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  showPercentage = true,
  showValue = false,
  label,
  variant = 'blocks',
  color = 'default',
  className = "",
  ...props
}) => {
  // Normalize value to percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const getBarLength = () => {
    switch (size) {
      case 'sm': return 10;
      case 'lg': return 30;
      case 'md':
      default: return 20;
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'default':
      default: return 'text-white';
    }
  };

  const renderProgressBar = () => {
    const barLength = getBarLength();
    const filled = Math.round((percentage / 100) * barLength);
    const empty = barLength - filled;

    let filledChar = '▓';
    let emptyChar = '░';

    switch (variant) {
      case 'bars':
        filledChar = '█';
        emptyChar = '▁';
        break;
      case 'dots':
        filledChar = '●';
        emptyChar = '○';
        break;
      case 'blocks':
      default:
        filledChar = '▓';
        emptyChar = '░';
        break;
    }

    const filledSection = filledChar.repeat(filled);
    const emptySection = emptyChar.repeat(empty);

    return `[${filledSection}${emptySection}]`;
  };

  const renderStatusText = () => {
    const parts: string[] = [];

    if (showValue) {
      parts.push(`${value}/${max}`);
    }

    if (showPercentage) {
      parts.push(`(${Math.round(percentage)}%)`);
    }

    return parts.length > 0 ? ` ${parts.join(' ')}` : '';
  };

  return (
    <div
      {...props}
      className={`font-mono ${getColorClass()} ${className}`}
    >
      {label && (
        <div className="mb-1 text-sm">
          {label}
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <span className="select-none">
          {renderProgressBar()}
        </span>
        
        {(showPercentage || showValue) && (
          <span className="text-sm whitespace-nowrap">
            {renderStatusText()}
          </span>
        )}
      </div>
    </div>
  );
};