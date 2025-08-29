import React from "react";

interface AsciiRadioOption {
  label: string;
  value: string;
}

interface AsciiRadioGroupProps {
  name: string;
  options: AsciiRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const AsciiRadioGroup: React.FC<AsciiRadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  className = ""
}) => {
  const handleChange = (optionValue: string) => {
    if (onChange) {
      onChange(optionValue);
    }
  };

  return (
    <div className={`font-mono space-y-1 ${className}`}>
      {options.map((option) => (
        <label
          key={option.value}
          className="text-white cursor-pointer inline-flex items-center w-full"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            className="sr-only"
          />
          <span className="select-none">
            <span className="inline-block w-3 text-center">
              {value === option.value ? '(•)' : '( )'}
            </span>
            <span className="ml-1">{option.label}</span>
          </span>
        </label>
      ))}
    </div>
  );
};