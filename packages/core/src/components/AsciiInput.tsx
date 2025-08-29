import React from "react";

export const AsciiInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ className = "", ...props }) => {
  return (
    <span className="font-mono before:content-['['] after:content-[']']">
      <input
        {...props}
        className={`
          font-mono bg-transparent border-none outline-none px-1
          text-white w-40 ${className}
        `}
      />
    </span>
  );
};