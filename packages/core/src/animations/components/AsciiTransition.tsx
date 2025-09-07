import React, { useState, useEffect, useRef } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../hooks/useAnimation';
import { TransitionConfig } from '../types';
import { glitchCharset, generateRandomChar } from '../utils';

interface AsciiTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: React.ReactNode;
  config?: TransitionConfig;
  fallback?: React.ReactNode;
}

export const AsciiTransition: React.FC<AsciiTransitionProps> = ({
  show,
  children,
  config = {},
  fallback,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [isVisible, setIsVisible] = useState(show);
  const [transitionState, setTransitionState] = useState<'enter' | 'exit' | 'idle'>('idle');
  
  const {
    type = 'fade',
    duration = 300,
    intensity = 1,
    easing = 'ease-in-out'
  } = config;

  const { progress, start, state } = useAnimation({
    duration,
    easing
  });

  useEffect(() => {
    if (show && !isVisible) {
      setTransitionState('enter');
      setIsVisible(true);
      start();
    } else if (!show && isVisible) {
      setTransitionState('exit');
      start();
    }
  }, [show, isVisible, start]);

  useEffect(() => {
    if (state === 'completed' && transitionState === 'exit') {
      setIsVisible(false);
      setTransitionState('idle');
    }
  }, [state, transitionState]);

  const renderTransitionEffect = () => {
    if (transitionState === 'idle') {
      return isVisible ? children : fallback;
    }

    const effectProgress = transitionState === 'enter' ? progress : 1 - progress;

    switch (type) {
      case 'fade':
        return (
          <div 
            style={{ 
              opacity: effectProgress,
              transition: `opacity ${duration}ms ${easing}`
            }}
          >
            {children}
          </div>
        );

      case 'slide':
        const slideOffset = (1 - effectProgress) * 100;
        return (
          <div 
            style={{ 
              transform: `translateY(${slideOffset}%)`,
              transition: `transform ${duration}ms ${easing}`
            }}
          >
            {children}
          </div>
        );

      case 'glitch':
        return <GlitchTransition progress={effectProgress} intensity={intensity}>
          {children}
        </GlitchTransition>;

      case 'matrix':
        return <MatrixTransition progress={effectProgress} intensity={intensity}>
          {children}
        </MatrixTransition>;

      default:
        return children;
    }
  };

  if (!isVisible && transitionState === 'idle') {
    return <>{fallback}</>;
  }

  return (
    <div
      {...props}
      className={`${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      {renderTransitionEffect()}
    </div>
  );
};

// Glitch effect transition
const GlitchTransition: React.FC<{
  children: React.ReactNode;
  progress: number;
  intensity: number;
}> = ({ children, progress, intensity }) => {
  const { theme } = useAsciiTheme();
  const [glitchedContent, setGlitchedContent] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const textContent = contentRef.current.textContent || '';
      const glitchAmount = Math.floor((1 - progress) * textContent.length * intensity);
      
      let result = textContent;
      for (let i = 0; i < glitchAmount; i++) {
        const randomIndex = Math.floor(Math.random() * textContent.length);
        const glitchChar = glitchCharset[Math.floor(Math.random() * glitchCharset.length)];
        result = result.substring(0, randomIndex) + glitchChar + result.substring(randomIndex + 1);
      }
      
      setGlitchedContent(result);
    }
  }, [progress, intensity]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={contentRef} style={{ opacity: 0, position: 'absolute' }}>
        {children}
      </div>
      <div 
        style={{
          color: theme.colors.primary,
          fontFamily: theme.typography.fontFamily,
          whiteSpace: 'pre-wrap'
        }}
      >
        {progress > 0.8 ? children : glitchedContent}
      </div>
    </div>
  );
};

// Matrix-style character transition
const MatrixTransition: React.FC<{
  children: React.ReactNode;
  progress: number;
  intensity: number;
}> = ({ children, progress, intensity }) => {
  const { theme } = useAsciiTheme();
  const [matrixContent, setMatrixContent] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const textContent = contentRef.current.textContent || '';
      const revealAmount = Math.floor(progress * textContent.length);
      
      let result = '';
      for (let i = 0; i < textContent.length; i++) {
        if (i < revealAmount) {
          result += textContent[i];
        } else {
          result += generateRandomChar('01');
        }
      }
      
      setMatrixContent(result);
    }
  }, [progress, intensity]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={contentRef} style={{ opacity: 0, position: 'absolute' }}>
        {children}
      </div>
      <div 
        style={{
          color: theme.colors.primary,
          fontFamily: theme.typography.fontFamily,
          whiteSpace: 'pre-wrap'
        }}
      >
        {matrixContent}
      </div>
    </div>
  );
};

// Higher-level transition components
export const AsciiFadeTransition: React.FC<Omit<AsciiTransitionProps, 'config'> & { duration?: number }> = ({ 
  duration = 300, 
  ...props 
}) => (
  <AsciiTransition 
    {...props} 
    config={{ type: 'fade', duration }} 
  />
);

export const AsciiSlideTransition: React.FC<Omit<AsciiTransitionProps, 'config'> & { duration?: number }> = ({ 
  duration = 300, 
  ...props 
}) => (
  <AsciiTransition 
    {...props} 
    config={{ type: 'slide', duration }} 
  />
);

export const AsciiGlitchTransition: React.FC<Omit<AsciiTransitionProps, 'config'> & { 
  duration?: number;
  intensity?: number;
}> = ({ 
  duration = 500, 
  intensity = 1,
  ...props 
}) => (
  <AsciiTransition 
    {...props} 
    config={{ type: 'glitch', duration, intensity }} 
  />
);

export const AsciiMatrixTransition: React.FC<Omit<AsciiTransitionProps, 'config'> & { 
  duration?: number;
  intensity?: number;
}> = ({ 
  duration = 800, 
  intensity = 1,
  ...props 
}) => (
  <AsciiTransition 
    {...props} 
    config={{ type: 'matrix', duration, intensity }} 
  />
);