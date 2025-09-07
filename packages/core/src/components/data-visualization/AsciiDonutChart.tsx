import React, { useState, useEffect } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { useAnimation } from '../../animations/hooks/useAnimation';
import { DonutChartProps } from './types';

export const AsciiDonutChart: React.FC<DonutChartProps> = ({
  data,
  innerRadius = 0.5,
  showPercentages = true,
  showLegend = true,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [animatedData, setAnimatedData] = useState(data.map(d => ({ ...d, value: 0 })));
  
  const { progress, start } = useAnimation({
    duration: 1500,
    easing: 'ease-out'
  });

  useEffect(() => {
    start();
  }, [data, start]);

  useEffect(() => {
    const newData = data.map(item => ({
      ...item,
      value: item.value * progress
    }));
    setAnimatedData(newData);
  }, [progress, data]);

  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const size = 15; // Fixed size for ASCII donut
  const center = Math.floor(size / 2);
  const outerRadius = center;
  const innerRadiusPixels = Math.floor(outerRadius * innerRadius);

  const renderDonut = () => {
    const grid: Array<Array<{ char: string; color: string }>> = Array(size)
      .fill(null)
      .map(() => Array(size).fill(null).map(() => ({ char: ' ', color: 'transparent' })));

    let currentAngle = 0;
    const finalData = animatedData;
    const animatedTotal = finalData.reduce((sum, item) => sum + item.value, 0);

    finalData.forEach((item, index) => {
      if (item.value <= 0 || animatedTotal <= 0) return;
      
      const percentage = item.value / animatedTotal;
      const segmentAngle = percentage * 2 * Math.PI;
      const segmentColor = item.color || theme.colors.primary;

      // Draw segment
      for (let angle = currentAngle; angle < currentAngle + segmentAngle; angle += 0.1) {
        for (let radius = innerRadiusPixels; radius <= outerRadius; radius++) {
          const x = Math.round(center + Math.cos(angle) * radius);
          const y = Math.round(center + Math.sin(angle) * radius);
          
          if (x >= 0 && x < size && y >= 0 && y < size) {
            // Choose character based on radius
            let char = '█';
            if (radius === outerRadius) {
              char = '▓'; // Outer edge
            } else if (radius === innerRadiusPixels) {
              char = '▒'; // Inner edge
            } else if (radius < (outerRadius + innerRadiusPixels) / 2) {
              char = '░'; // Inner area
            }
            
            grid[y][x] = { char, color: segmentColor };
          }
        }
      }

      currentAngle += segmentAngle;
    });

    return grid;
  };

  const calculatePercentages = () => {
    if (totalValue === 0) return data.map(() => 0);
    return data.map(item => Math.round((item.value / totalValue) * 100));
  };

  const percentages = showPercentages ? calculatePercentages() : [];
  const chartGrid = renderDonut();

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        ...style
      }}
    >
      <div className="flex items-start gap-4">
        {/* Chart */}
        <div>
          {chartGrid.map((row, rowIndex) => (
            <div key={rowIndex} className="leading-none text-xs">
              {row.map((cell, colIndex) => (
                <span 
                  key={colIndex}
                  style={{ color: cell.color }}
                >
                  {cell.char}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        {showLegend && (
          <div className="flex flex-col gap-1">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <span 
                  style={{ color: item.color || theme.colors.primary }}
                  className="font-bold"
                >
                  ■
                </span>
                <span style={{ color: theme.colors.text }}>
                  {item.label}
                </span>
                {showPercentages && (
                  <span style={{ color: theme.colors.textSecondary }}>
                    ({percentages[index]}%)
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Center value (total) */}
      <div 
        className="text-center mt-2 text-sm font-bold"
        style={{ color: theme.colors.text }}
      >
        Total: {Math.round(totalValue)}
      </div>
    </div>
  );
};