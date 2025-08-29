import React from "react";

export const AsciiSelect: React.FC<
  React.SelectHTMLAttributes<HTMLSelectElement>
> = ({ children, className = "", ...props }) => {
  return (
    <span className="font-mono before:content-['['] after:content-[']'] relative">
      <select
        {...props}
        className={\`
          font-mono bg-transparent border-none outline-none pr-4
          appearance-none text-white \${className}
        \`}
      >
        {children}
      </select>
      <span className="absolute right-0 pr-1 pointer-events-none">▼</span>
    </span>
  );
};