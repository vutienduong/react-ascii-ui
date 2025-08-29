import React from "react";

export const AsciiButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={\`
        font-mono text-white hover:text-green-400
        before:content-['['] after:content-[']']
        px-1 cursor-pointer outline-none
        focus-visible:outline focus-visible:outline-dashed
        \${className}
      \`}
    >
      {children}
    </button>
  );
};