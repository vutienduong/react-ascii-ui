import React from "react";

interface AsciiCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const AsciiCheckbox: React.FC<AsciiCheckboxProps> = ({ 
  label, 
  className = "", 
  ...props 
}) => {
  return (
    <label className={`font-mono text-white cursor-pointer inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        className="sr-only"
        {...props}
      />
      <span className="select-none">
        <span className="inline-block w-3 text-center">
          {props.checked ? '[x]' : '[ ]'}
        </span>
        {label && <span className="ml-1">{label}</span>}
      </span>
    </label>
  );
};