import React from "react";

interface AsciiSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  onText?: string;
  offText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'bracket' | 'slider';
}

export const AsciiSwitch: React.FC<AsciiSwitchProps> = ({
  label,
  onText = 'ON',
  offText = 'OFF',
  size = 'md',
  variant = 'bracket',
  className = "",
  checked = false,
  ...props
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-lg';
      case 'md':
      default: return 'text-sm';
    }
  };

  const renderBracketSwitch = () => {
    const activeText = checked ? onText : offText;
    const activeColor = checked ? 'text-green-400' : 'text-white';
    
    return (
      <span className={`select-none ${activeColor} ${getSizeClasses()}`}>
        [ {activeText} ]
      </span>
    );
  };

  const renderSliderSwitch = () => {
    const track = checked ? '▓▓▓░░░' : '░░░▓▓▓';
    const activeColor = checked ? 'text-green-400' : 'text-white';
    
    return (
      <span className={`select-none ${activeColor} ${getSizeClasses()}`}>
        [{track}]
      </span>
    );
  };

  const renderSwitch = () => {
    switch (variant) {
      case 'slider':
        return renderSliderSwitch();
      case 'bracket':
      default:
        return renderBracketSwitch();
    }
  };

  return (
    <label className={`font-mono cursor-pointer inline-flex items-center gap-2 ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        {...props}
      />
      
      {renderSwitch()}
      
      {label && (
        <span className={`text-white ${getSizeClasses()}`}>
          {label}
        </span>
      )}
    </label>
  );
};