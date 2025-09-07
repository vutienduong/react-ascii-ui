import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../animations/hooks/useAnimation';
import { SparklineProps } from './types';

export const AsciiSparkline: React.FC<SparklineProps> = ({
  data,
  width = 20,
  height = 5,
  color,
  showTrend = false,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [visiblePoints, setVisiblePoints] = useState(0);
  
  const { progress, start } = useAnimation({
    duration: 1000,
    easing: 'ease-out'
  });

  useEffect(() => {
    start();
    setVisiblePoints(Math.floor(progress * data.length));
  }, [data, start, progress]);

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const normalizeValue = (value: number): number => {
    if (range === 0) return Math.floor(height / 2);
    return Math.floor(((value - minValue) / range) * (height - 1));
  };

  const sparklineColor = color || theme.colors.primary;

  const renderSparkline = () => {
    const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
    const pointsToShow = Math.min(visiblePoints, data.length);
    
    // Plot data points
    for (let i = 0; i < pointsToShow; i++) {
      const x = Math.floor((i / Math.max(data.length - 1, 1)) * (width - 1));
      const y = height - 1 - normalizeValue(data[i]);
      
      if (x >= 0 && x < width && y >= 0 && y < height) {
        // Use different characters based on position
        if (i === pointsToShow - 1) {
          grid[y][x] = '●'; // Current point
        } else {
          grid[y][x] = '·'; // Historical points
        }
        
        // Connect to next point with simple line
        if (i < pointsToShow - 1) {
          const nextX = Math.floor(((i + 1) / Math.max(data.length - 1, 1)) * (width - 1));
          const nextY = height - 1 - normalizeValue(data[i + 1]);
          
          // Simple line connection
          if (nextX > x) {
            for (let lineX = x + 1; lineX < nextX && lineX < width; lineX++) {
              const lineY = Math.round(y + ((nextY - y) * (lineX - x)) / (nextX - x));
              if (lineY >= 0 && lineY < height && grid[lineY][lineX] === ' ') {
                grid[lineY][lineX] = nextY > y ? '╱' : nextY < y ? '╲' : '─';
              }
            }
          }
        }
      }
    }

    return grid;
  };

  const calculateTrend = (): 'up' | 'down' | 'flat' => {
    if (data.length < 2) return 'flat';
    const firstHalf = data.slice(0, Math.floor(data.length / 2));
    const secondHalf = data.slice(Math.floor(data.length / 2));
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const threshold = range * 0.1; // 10% of range
    if (secondAvg > firstAvg + threshold) return 'up';
    if (secondAvg < firstAvg - threshold) return 'down';
    return 'flat';
  };

  const trend = showTrend ? calculateTrend() : null;
  const trendIcon = trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→';
  const trendColor = trend === 'up' ? theme.colors.success : 
                    trend === 'down' ? theme.colors.error : 
                    theme.colors.textSecondary;

  const chartGrid = renderSparkline();

  return (
    <span
      {...props}
      className={`inline-flex items-center font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      <span className="inline-block">
        {chartGrid.map((row, rowIndex) => (
          <span key={rowIndex} className="block leading-none text-xs">
            {row.map((cell, colIndex) => (
              <span 
                key={colIndex}
                style={{
                  color: cell === '●' ? sparklineColor :
                         cell === ' ' ? 'transparent' :
                         theme.colors.textSecondary
                }}
              >
                {cell}
              </span>
            ))}
          </span>
        ))}
      </span>
      
      {showTrend && (
        <span 
          className="ml-1 text-xs"
          style={{ color: trendColor }}
        >
          {trendIcon}
        </span>
      )}
    </span>
  );
};