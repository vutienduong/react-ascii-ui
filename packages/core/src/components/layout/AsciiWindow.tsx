import React, { useState, useRef, useCallback } from 'react';
import { useAsciiTheme } from '../../contexts/ThemeContext';

export interface AsciiWindowProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  closable?: boolean;
  minimizable?: boolean;
  maximizable?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  initialWidth?: number;
  initialHeight?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onRestore?: () => void;
  defaultPosition?: { x: number; y: number };
  zIndex?: number;
}

export const AsciiWindow: React.FC<AsciiWindowProps> = ({
  title = 'ASCII Window',
  closable = true,
  minimizable = true,
  maximizable = true,
  resizable = true,
  draggable = true,
  initialWidth = 400,
  initialHeight = 300,
  minWidth = 200,
  minHeight = 150,
  maxWidth,
  maxHeight,
  onClose,
  onMinimize,
  onMaximize,
  onRestore,
  defaultPosition = { x: 100, y: 100 },
  zIndex = 1000,
  className = '',
  style,
  children,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const windowRef = useRef<HTMLDivElement>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent, action: 'drag' | 'resize') => {
    e.preventDefault();
    e.stopPropagation();

    if (action === 'drag' && draggable && !isMaximized) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    } else if (action === 'resize' && resizable && !isMaximized) {
      setIsResizing(true);
      setResizeStart({
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      });
    }
  }, [draggable, resizable, isMaximized, position, size]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setPosition({ 
        x: Math.max(0, Math.min(newX, window.innerWidth - size.width)),
        y: Math.max(0, Math.min(newY, window.innerHeight - size.height))
      });
    } else if (isResizing) {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;
      const newWidth = Math.max(minWidth, Math.min(resizeStart.width + deltaX, maxWidth || window.innerWidth));
      const newHeight = Math.max(minHeight, Math.min(resizeStart.height + deltaY, maxHeight || window.innerHeight));
      setSize({ width: newWidth, height: newHeight });
    }
  }, [isDragging, isResizing, dragStart, resizeStart, size, minWidth, minHeight, maxWidth, maxHeight]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    onMinimize?.();
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setIsMaximized(false);
      onRestore?.();
    } else {
      setIsMaximized(true);
      onMaximize?.();
    }
  };

  const handleClose = () => {
    onClose?.();
  };

  const renderTitleBar = () => (
    <div
      className="flex items-center justify-between px-3 py-1 border-b cursor-move select-none"
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        color: theme.colors.text,
      }}
      onMouseDown={(e) => handleMouseDown(e, 'drag')}
    >
      <div className="flex items-center gap-2">
        <span 
          className="font-bold text-sm"
          style={{ color: theme.colors.primary }}
        >
          {title}
        </span>
      </div>

      <div className="flex items-center gap-1">
        {minimizable && (
          <button
            onClick={handleMinimize}
            className="px-2 py-1 text-xs hover:opacity-70 focus:outline-none"
            style={{ color: theme.colors.warning }}
            title="Minimize"
          >
            ─
          </button>
        )}
        
        {maximizable && (
          <button
            onClick={handleMaximize}
            className="px-2 py-1 text-xs hover:opacity-70 focus:outline-none"
            style={{ color: theme.colors.info }}
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? '⧉' : '□'}
          </button>
        )}
        
        {closable && (
          <button
            onClick={handleClose}
            className="px-2 py-1 text-xs hover:opacity-70 focus:outline-none"
            style={{ color: theme.colors.error }}
            title="Close"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );

  const getWindowStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      fontFamily: theme.typography.fontFamily,
      backgroundColor: theme.colors.background,
      border: `1px solid ${theme.colors.border}`,
      borderRadius: theme.borderRadius,
      boxShadow: theme.shadows.lg,
      zIndex,
      userSelect: 'none' as const,
    };

    if (isMaximized) {
      return {
        ...baseStyles,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        borderRadius: 0,
      };
    }

    if (isMinimized) {
      return {
        ...baseStyles,
        left: position.x,
        top: position.y,
        width: 200,
        height: 'auto',
      };
    }

    return {
      ...baseStyles,
      left: position.x,
      top: position.y,
      width: size.width,
      height: size.height,
    };
  };

  return (
    <div
      ref={windowRef}
      {...props}
      className={`ascii-window ${className}`}
      style={{
        ...getWindowStyles(),
        ...style,
      }}
    >
      {renderTitleBar()}
      
      {!isMinimized && (
        <>
          <div 
            className="flex-1 overflow-auto p-3"
            style={{ 
              height: isMaximized ? 'calc(100vh - 40px)' : size.height - 40,
              color: theme.colors.text 
            }}
          >
            {children}
          </div>

          {/* Resize handle */}
          {resizable && !isMaximized && (
            <div
              className="absolute bottom-0 right-0 w-4 h-4 cursor-nw-resize"
              style={{
                background: `linear-gradient(-45deg, transparent 30%, ${theme.colors.border} 30%, ${theme.colors.border} 50%, transparent 50%)`,
              }}
              onMouseDown={(e) => handleMouseDown(e, 'resize')}
            />
          )}
        </>
      )}
    </div>
  );
};

// Window Manager Component for managing multiple windows
export interface AsciiWindowManagerProps {
  children: React.ReactNode;
  maxZIndex?: number;
}

export const AsciiWindowManager: React.FC<AsciiWindowManagerProps> = ({
  children,
  maxZIndex = 9999,
}) => {
  const [windows, setWindows] = useState<Array<{ id: string; zIndex: number }>>([]);
  const [currentZIndex, setCurrentZIndex] = useState(1000);

  const bringToFront = (windowId: string) => {
    setWindows(prev => {
      const window = prev.find(w => w.id === windowId);
      if (!window) return prev;
      
      const newZIndex = Math.min(currentZIndex + 1, maxZIndex);
      setCurrentZIndex(newZIndex);
      
      return prev.map(w => 
        w.id === windowId ? { ...w, zIndex: newZIndex } : w
      );
    });
  };

  return (
    <div className="ascii-window-manager relative">
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === AsciiWindow) {
          const windowId = `window-${index}`;
          
          return React.cloneElement(child, {
            ...child.props,
            zIndex: windows.find(w => w.id === windowId)?.zIndex || (1000 + index),
            onClick: () => bringToFront(windowId),
          });
        }
        return child;
      })}
    </div>
  );
};