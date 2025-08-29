import React from "react";

export const AsciiTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ className = "", ...props }) => {
  return (
    <div className="font-mono relative">
      <span className="absolute top-0 left-0 pointer-events-none select-none text-white">
        [
      </span>
      <span className="absolute top-0 right-0 pointer-events-none select-none text-white">
        ]
      </span>
      <span className="absolute bottom-0 left-0 pointer-events-none select-none text-white">
        [
      </span>
      <span className="absolute bottom-0 right-0 pointer-events-none select-none text-white">
        ]
      </span>
      <textarea
        {...props}
        className={`
          font-mono bg-transparent border-none outline-none resize-none
          text-white w-full px-3 py-1 min-h-[4rem]
          ${className}
        `}
      />
    </div>
  );
};