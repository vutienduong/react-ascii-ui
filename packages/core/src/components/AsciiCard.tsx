import React from "react";

interface AsciiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const AsciiCard: React.FC<AsciiCardProps> = ({ 
  title,
  children, 
  className = "", 
  ...props 
}) => {
  return (
    <div
      {...props}
      className={`
        font-mono border border-white p-4 
        ${className}
      `}
    >
      {title && (
        <div className="mb-2 font-bold border-b border-dashed border-white pb-2">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};