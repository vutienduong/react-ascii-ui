import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';
import { MatrixRainConfig } from '../types';
import { matrixCharset } from '../utils';

interface MatrixColumn {
  characters: string[];
  speeds: number[];
  positions: number[];
  opacities: number[];
  active: boolean;
  delay: number;
}

interface AsciiMatrixRainProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
  config?: MatrixRainConfig;
  color?: string;
  backgroundColor?: string;
}

export const AsciiMatrixRain: React.FC<AsciiMatrixRainProps> = ({
  width = 80,
  height = 20,
  config = {},
  color,
  backgroundColor,
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [grid, setGrid] = useState<string[][]>([]);
  const [opacityGrid, setOpacityGrid] = useState<number[][]>([]);
  
  const columnsRef = useRef<MatrixColumn[]>([]);
  const animationFrameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);
  
  const {
    density = 0.1,
    speed = 100,
    characters = matrixCharset.split(''),
    fadeEffect = true,
    duration = Infinity
  } = config;

  const primaryColor = color || theme.colors.primary;
  const bgColor = backgroundColor || theme.colors.background;

  const initializeColumns = useCallback(() => {
    const columns: MatrixColumn[] = [];
    
    for (let col = 0; col < width; col++) {
      const column: MatrixColumn = {
        characters: Array(height).fill(''),
        speeds: Array(height).fill(0),
        positions: Array(height).fill(-1),
        opacities: Array(height).fill(0),
        active: Math.random() < density,
        delay: Math.random() * 2000 // Random delay before starting
      };
      
      // Initialize some random characters
      for (let row = 0; row < height; row++) {
        if (Math.random() < 0.1) {
          column.characters[row] = characters[Math.floor(Math.random() * characters.length)];
          column.positions[row] = row;
          column.opacities[row] = Math.random();
        }
      }
      
      columns.push(column);
    }
    
    columnsRef.current = columns;
  }, [width, height, density, characters]);

  const updateMatrix = useCallback((timestamp: number) => {
    if (timestamp - lastUpdateRef.current < speed) {
      animationFrameRef.current = requestAnimationFrame(updateMatrix);
      return;
    }
    
    lastUpdateRef.current = timestamp;
    
    const newGrid: string[][] = Array(height).fill(null).map(() => Array(width).fill(''));
    const newOpacityGrid: number[][] = Array(height).fill(null).map(() => Array(width).fill(0));
    
    columnsRef.current.forEach((column, colIndex) => {
      if (!column.active && Math.random() < 0.005) {
        column.active = true;
        column.delay = timestamp + Math.random() * 1000;
      }
      
      if (column.active && timestamp > column.delay) {
        // Update characters
        for (let row = 0; row < height; row++) {
          // Randomly change characters
          if (Math.random() < 0.3) {
            column.characters[row] = characters[Math.floor(Math.random() * characters.length)];
          }
          
          // Update positions (falling effect)
          column.positions[row] += 0.2;
          if (column.positions[row] >= height + 5) {
            column.positions[row] = -Math.random() * 10;
            column.opacities[row] = 1;
          }
          
          // Calculate opacity based on position
          const normalizedPos = column.positions[row] / height;
          if (normalizedPos >= 0 && normalizedPos <= 1) {
            const row_index = Math.floor(column.positions[row]);
            if (row_index >= 0 && row_index < height) {
              newGrid[row_index][colIndex] = column.characters[row];
              
              if (fadeEffect) {
                // Create trailing effect
                const opacity = Math.max(0, 1 - (normalizedPos * 2));
                newOpacityGrid[row_index][colIndex] = opacity;
                
                // Add trailing characters
                for (let trail = 1; trail <= 3; trail++) {
                  const trailRow = row_index - trail;
                  if (trailRow >= 0) {
                    const trailOpacity = opacity * (0.8 - trail * 0.2);
                    if (trailOpacity > 0.1) {
                      newGrid[trailRow][colIndex] = column.characters[row];
                      newOpacityGrid[trailRow][colIndex] = Math.max(
                        newOpacityGrid[trailRow][colIndex],
                        trailOpacity
                      );
                    }
                  }
                }
              } else {
                newOpacityGrid[row_index][colIndex] = 1;
              }
            }
          }
        }
        
        // Randomly deactivate column
        if (Math.random() < 0.001) {
          column.active = false;
        }
      }
    });
    
    setGrid(newGrid);
    setOpacityGrid(newOpacityGrid);
    
    animationFrameRef.current = requestAnimationFrame(updateMatrix);
  }, [speed, characters, fadeEffect, height, width]);

  useEffect(() => {
    initializeColumns();
    animationFrameRef.current = requestAnimationFrame(updateMatrix);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [initializeColumns, updateMatrix]);

  return (
    <div
      {...props}
      className={`font-mono overflow-hidden ${className}`}
      style={{
        backgroundColor: bgColor,
        fontFamily: theme.typography.fontFamily,
        lineHeight: '1',
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        width: 'fit-content',
        ...style
      }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((char, colIndex) => (
            <span
              key={colIndex}
              style={{
                color: primaryColor,
                opacity: opacityGrid[rowIndex][colIndex],
                width: '1ch',
                textAlign: 'center',
                transition: fadeEffect ? 'opacity 0.1s ease-out' : 'none'
              }}
            >
              {char || ' '}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Fullscreen Matrix Rain component
export const AsciiMatrixRainFullscreen: React.FC<Omit<AsciiMatrixRainProps, 'width' | 'height'>> = ({
  config = {},
  ...props
}) => {
  const [dimensions, setDimensions] = useState({ width: 100, height: 30 });
  
  useEffect(() => {
    const calculateDimensions = () => {
      const charWidth = 8; // Approximate character width in pixels
      const lineHeight = 14; // Approximate line height in pixels
      
      const cols = Math.floor(window.innerWidth / charWidth);
      const rows = Math.floor(window.innerHeight / lineHeight);
      
      setDimensions({ width: cols, height: rows });
    };
    
    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    
    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);
  
  return (
    <div className="fixed inset-0 z-0">
      <AsciiMatrixRain
        width={dimensions.width}
        height={dimensions.height}
        config={{
          density: 0.05,
          speed: 150,
          fadeEffect: true,
          ...config
        }}
        style={{
          width: '100vw',
          height: '100vh'
        }}
        {...props}
      />
    </div>
  );
};