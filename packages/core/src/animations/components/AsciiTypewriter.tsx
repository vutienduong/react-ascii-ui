import React from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useTypewriter } from '../hooks/useTypewriter';
import { TypewriterConfig } from '../types';

interface AsciiTypewriterProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string | string[];
  config?: TypewriterConfig;
  onComplete?: () => void;
  onStart?: () => void;
  autoStart?: boolean;
}

export const AsciiTypewriter: React.FC<AsciiTypewriterProps> = ({
  text,
  config = {},
  onComplete,
  onStart,
  autoStart = true,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  
  const {
    displayText,
    isComplete,
    isTyping,
    start,
    pause,
    resume,
    reset,
    setSpeed
  } = useTypewriter(text, {
    speed: 80,
    deleteSpeed: 40,
    pauseAfterComplete: 2000,
    showCursor: true,
    cursor: theme.characters.separator || '|',
    ...config
  });

  React.useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  React.useEffect(() => {
    if (isTyping && onStart) {
      onStart();
    }
  }, [isTyping, onStart]);

  React.useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  return (
    <span
      {...props}
      className={`font-mono ${className}`}
      style={{
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      {displayText}
    </span>
  );
};

// Convenience component for single-line typewriter
export const AsciiTypewriterLine: React.FC<AsciiTypewriterProps> = (props) => {
  return (
    <div className="block">
      <AsciiTypewriter {...props} />
    </div>
  );
};

// Multi-line typewriter with line-by-line animation
interface AsciiTypewriterMultiProps extends Omit<AsciiTypewriterProps, 'text'> {
  lines: string[];
  lineDelay?: number;
}

export const AsciiTypewriterMulti: React.FC<AsciiTypewriterMultiProps> = ({
  lines,
  lineDelay = 100,
  config = {},
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [currentLineIndex, setCurrentLineIndex] = React.useState(0);
  const [visibleLines, setVisibleLines] = React.useState<string[]>([]);

  const handleLineComplete = React.useCallback(() => {
    if (currentLineIndex < lines.length - 1) {
      setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, lineDelay);
    }
  }, [currentLineIndex, lines.length, lineDelay]);

  React.useEffect(() => {
    setVisibleLines(lines.slice(0, currentLineIndex + 1));
  }, [currentLineIndex, lines]);

  return (
    <div
      className={`font-mono ${className}`}
      style={{
        color: theme.colors.text,
        fontFamily: theme.typography.fontFamily,
        lineHeight: theme.typography.lineHeight,
        ...style
      }}
      {...props}
    >
      {visibleLines.map((line, index) => (
        <div key={index} className="block">
          {index === currentLineIndex ? (
            <AsciiTypewriter
              text={line}
              config={{
                ...config,
                showCursor: index === lines.length - 1
              }}
              onComplete={handleLineComplete}
            />
          ) : (
            <span>{line}</span>
          )}
        </div>
      ))}
    </div>
  );
};