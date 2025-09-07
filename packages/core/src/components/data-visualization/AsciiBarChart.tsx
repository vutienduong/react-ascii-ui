import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../animations/hooks/useAnimation';
import { BarChartProps } from './types';

export const AsciiBarChart: React.FC<BarChartProps> = ({
  data,
  config = {},
  orientation = 'vertical',
  maxBarLength = 20,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));
  
  const {
    showLabels = true,
    showValues = true,
    showGrid = false,
    animate = true,
    animationDuration = 1000
  } = config;

  const { progress, start } = useAnimation({
    duration: animationDuration,
    easing: 'ease-out'
  });

  useEffect(() => {
    if (animate) {
      start();
    } else {
      setAnimatedData(data);
    }
  }, [data, animate, start]);

  useEffect(() => {
    if (animate) {
      const newData = data.map(item => ({
        ...item,
        value: item.value * progress
      }));
      setAnimatedData(newData);
    }
  }, [progress, data, animate]);

  const maxValue = Math.max(...data.map(d => d.value));
  const finalData = animate ? animatedData : data;

  const renderVerticalBar = (item: typeof data[0], index: number) => {
    const barHeight = Math.round((item.value / maxValue) * maxBarLength);
    const emptyHeight = maxBarLength - barHeight;
    
    const barColor = item.color || theme.colors.primary;
    
    return (
      <div key={index} className="inline-flex flex-col items-center mr-3">
        {showValues && (
          <div 
            className="text-xs mb-1 h-4 flex items-end justify-center"
            style={{ color: theme.colors.textSecondary }}
          >
            {Math.round(item.value)}
          </div>
        )}
        
        <div className="flex flex-col-reverse items-center">
          {/* Empty space */}
          {Array.from({ length: emptyHeight }).map((_, i) => (
            <div key={`empty-${i}`} className="text-xs leading-none">
              {showGrid ? '┊' : ' '}
            </div>
          ))}
          
          {/* Filled bar */}
          {Array.from({ length: barHeight }).map((_, i) => (
            <div 
              key={`filled-${i}`} 
              className="text-xs leading-none"
              style={{ color: barColor }}
            >
              █
            </div>
          ))}
        </div>
        
        {showLabels && (
          <div 
            className="text-xs mt-1 text-center min-w-0 max-w-16 truncate"
            style={{ color: theme.colors.text }}
            title={item.label}
          >
            {item.label}
          </div>
        )}
      </div>
    );
  };

  const renderHorizontalBar = (item: typeof data[0], index: number) => {
    const barLength = Math.round((item.value / maxValue) * maxBarLength);
    const emptyLength = maxBarLength - barLength;
    
    const barColor = item.color || theme.colors.primary;
    
    return (
      <div key={index} className="flex items-center mb-2">
        {showLabels && (
          <div 
            className="text-xs mr-2 w-20 text-right truncate"
            style={{ color: theme.colors.text }}
            title={item.label}
          >
            {item.label}
          </div>
        )}
        
        <div className="flex items-center">
          {/* Filled bar */}
          <span style={{ color: barColor }}>
            {'█'.repeat(barLength)}
          </span>
          
          {/* Empty space */}
          <span style={{ color: theme.colors.border }}>
            {showGrid ? '░'.repeat(emptyLength) : ' '.repeat(emptyLength)}
          </span>
          
          {showValues && (
            <span 
              className="text-xs ml-2"
              style={{ color: theme.colors.textSecondary }}
            >
              {Math.round(item.value)}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      {orientation === 'vertical' ? (
        <div className="flex items-end">
          {finalData.map(renderVerticalBar)}
        </div>
      ) : (
        <div>
          {finalData.map(renderHorizontalBar)}
        </div>
      )}
      
      {showGrid && orientation === 'vertical' && (
        <div 
          className="mt-2 text-xs"
          style={{ color: theme.colors.border }}
        >
          {'─'.repeat(finalData.length * 4)}
        </div>
      )}
    </div>
  );
};