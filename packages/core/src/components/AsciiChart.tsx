import React from "react";

interface AsciiChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  type?: 'bar' | 'line' | 'area';
  height?: number;
  width?: number;
  showValues?: boolean;
  color?: 'default' | 'success' | 'warning' | 'error' | 'primary';
  title?: string;
}

export const AsciiChart: React.FC<AsciiChartProps> = ({
  data,
  type = 'bar',
  height = 8,
  width,
  showValues = false,
  color = 'default',
  title,
  className = "",
  ...props
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'primary': return 'text-blue-400';
      case 'default':
      default: return 'text-white';
    }
  };

  const normalizeData = (data: number[], maxHeight: number) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min;
    
    if (range === 0) return data.map(() => maxHeight / 2);
    
    return data.map(value => 
      Math.round(((value - min) / range) * maxHeight)
    );
  };

  const renderBarChart = () => {
    const normalizedData = normalizeData(data, height);
    const chartWidth = width || data.length;
    
    const rows = [];
    
    // Render from top to bottom
    for (let row = height; row > 0; row--) {
      const line = normalizedData.map(value => {
        return value >= row ? '▇' : ' ';
      }).join('');
      
      rows.push(line);
    }
    
    return rows;
  };

  const renderLineChart = () => {
    const normalizedData = normalizeData(data, height);
    const chartWidth = width || data.length;
    
    const grid = Array(height).fill(null).map(() => Array(chartWidth).fill(' '));
    
    // Plot points and connect with lines
    for (let i = 0; i < normalizedData.length - 1; i++) {
      const y1 = height - normalizedData[i] - 1;
      const y2 = height - normalizedData[i + 1] - 1;
      
      // Plot current point
      if (y1 >= 0 && y1 < height && i < chartWidth) {
        grid[y1][i] = '●';
      }
      
      // Connect to next point with line
      if (i + 1 < chartWidth) {
        const steps = Math.abs(y2 - y1);
        for (let step = 1; step <= steps; step++) {
          const interpY = y1 + Math.sign(y2 - y1) * step;
          if (interpY >= 0 && interpY < height) {
            grid[interpY][i] = step === steps ? '●' : '│';
          }
        }
      }
    }
    
    // Plot last point
    const lastY = height - normalizedData[normalizedData.length - 1] - 1;
    if (lastY >= 0 && lastY < height && normalizedData.length - 1 < chartWidth) {
      grid[lastY][normalizedData.length - 1] = '●';
    }
    
    return grid.map(row => row.join(''));
  };

  const renderAreaChart = () => {
    const normalizedData = normalizeData(data, height);
    const rows = [];
    
    // Render from top to bottom
    for (let row = height; row > 0; row--) {
      const line = normalizedData.map((value, index) => {
        if (value >= row) {
          return '▓';
        } else if (value === row - 1) {
          return '▒'; // Top edge
        }
        return ' ';
      }).join('');
      
      rows.push(line);
    }
    
    return rows;
  };

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart();
      case 'area':
        return renderAreaChart();
      case 'bar':
      default:
        return renderBarChart();
    }
  };

  const chartRows = renderChart();

  return (
    <div
      {...props}
      className={`font-mono ${getColorClass()} ${className}`}
    >
      {title && (
        <div className="mb-2 font-bold text-center">
          {title}
        </div>
      )}
      
      {/* Chart */}
      <div className="select-none">
        {chartRows.map((row, index) => (
          <div key={index} className="leading-none">
            {row}
          </div>
        ))}
      </div>
      
      {/* Values display */}
      {showValues && (
        <div className="mt-1 text-xs">
          <div className="flex justify-between">
            <span>Min: {Math.min(...data)}</span>
            <span>Max: {Math.max(...data)}</span>
          </div>
        </div>
      )}
    </div>
  );
};