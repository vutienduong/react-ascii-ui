import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../animations/hooks/useAnimation';
import { LineChartProps } from './types';

export const AsciiLineChart: React.FC<LineChartProps> = ({
  data,
  config = {},
  smooth = false,
  fill = false,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [visiblePoints, setVisiblePoints] = useState(0);
  
  const {
    width = 40,
    height = 15,
    showLabels = true,
    showValues = true,
    showGrid = true,
    animate = true,
    animationDuration = 1500
  } = config;

  const { progress, start } = useAnimation({
    duration: animationDuration,
    easing: 'ease-out'
  });

  useEffect(() => {
    if (animate) {
      start();
      setVisiblePoints(Math.floor(progress * data.length));
    } else {
      setVisiblePoints(data.length);
    }
  }, [data, animate, start, progress]);

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const normalizeValue = (value: number): number => {
    if (range === 0) return Math.floor(height / 2);
    return Math.floor(((value - minValue) / range) * (height - 1));
  };

  const renderGrid = () => {
    const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
    
    // Add horizontal grid lines
    if (showGrid) {
      for (let row = 0; row < height; row += Math.floor(height / 4)) {
        for (let col = 0; col < width; col++) {
          grid[row][col] = '─';
        }
      }
      
      // Add vertical grid lines
      for (let col = 0; col < width; col += Math.floor(width / 8)) {
        for (let row = 0; row < height; row++) {
          grid[row][col] = grid[row][col] === '─' ? '┼' : '│';
        }
      }
    }

    return grid;
  };

  const renderLine = () => {
    const grid = renderGrid();
    const pointsToShow = Math.min(visiblePoints, data.length);
    
    // Plot data points
    for (let i = 0; i < pointsToShow; i++) {
      const x = Math.floor((i / (data.length - 1)) * (width - 1));
      const y = height - 1 - normalizeValue(data[i].value);
      
      if (x >= 0 && x < width && y >= 0 && y < height) {
        grid[y][x] = '●';
        
        // Draw line to next point
        if (i < pointsToShow - 1) {
          const nextX = Math.floor(((i + 1) / (data.length - 1)) * (width - 1));
          const nextY = height - 1 - normalizeValue(data[i + 1].value);
          
          // Simple line drawing (connect points with characters)
          if (nextX > x) {
            for (let lineX = x + 1; lineX < nextX && lineX < width; lineX++) {
              const lineY = Math.round(y + ((nextY - y) * (lineX - x)) / (nextX - x));
              if (lineY >= 0 && lineY < height && grid[lineY][lineX] === ' ') {
                if (smooth) {
                  grid[lineY][lineX] = '─';
                } else {
                  grid[lineY][lineX] = nextY > y ? '╱' : nextY < y ? '╲' : '─';
                }
              }
            }
          }
        }
        
        // Fill area under line if requested
        if (fill) {
          for (let fillY = y + 1; fillY < height; fillY++) {
            if (grid[fillY][x] === ' ' || grid[fillY][x] === '─' || grid[fillY][x] === '│') {
              grid[fillY][x] = '▒';
            }
          }
        }
      }
    }

    return grid;
  };

  const chartGrid = renderLine();

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      {/* Chart area */}
      <div style={{ color: theme.colors.primary }}>
        {chartGrid.map((row, rowIndex) => (
          <div key={rowIndex} className="leading-none text-sm">
            {row.map((cell, colIndex) => (
              <span 
                key={colIndex}
                style={{
                  color: cell === '●' ? theme.colors.success :
                         cell === '▒' ? theme.colors.secondary :
                         cell === ' ' ? 'transparent' :
                         theme.colors.border
                }}
              >
                {cell}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      {showValues && (
        <div className="flex justify-between mt-2 text-xs" style={{ color: theme.colors.textSecondary }}>
          <span>{Math.round(minValue)}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{Math.round(maxValue)}</span>
        </div>
      )}

      {/* X-axis labels */}
      {showLabels && data.length <= 8 && (
        <div className="flex justify-between mt-1 text-xs" style={{ color: theme.colors.text }}>
          {data.map((point, index) => (
            <span key={index} className="truncate max-w-12" title={point.label}>
              {point.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};