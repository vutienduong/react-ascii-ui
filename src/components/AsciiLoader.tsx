import React from "react";

interface AsciiLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'progress';
  text?: string;
  progress?: number; // 0-100 for progress variant
}

export const AsciiLoader: React.FC<AsciiLoaderProps> = ({ 
  variant = 'dots',
  text = 'Loading',
  progress = 50,
  className = "", 
  ...props 
}) => {
  const renderLoader = () => {
    if (variant === 'progress') {
      const filled = Math.round((progress / 100) * 10);
      const empty = 10 - filled;
      const progressBar = '▓'.repeat(filled) + '░'.repeat(empty);
      
      return (
        <div className="flex items-center gap-2">
          <span>[{progressBar}]</span>
          <span>({progress}%)</span>
        </div>
      );
    }
    
    // dots variant (default)
    return (
      <div className="flex items-center gap-1">
        <span>{text}</span>
        <div className="flex">
          <span className="animate-pulse">.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
          <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
        </div>
      </div>
    );
  };

  return (
    <div
      {...props}
      className={`
        font-mono text-white select-none
        ${className}
      `}
    >
      {renderLoader()}
    </div>
  );
};