import React, { useState, useRef, useEffect, useCallback } from "react";

type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
type PopoverTrigger = 'click' | 'hover';

interface AsciiPopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: PopoverPosition;
  trigger?: PopoverTrigger;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  delay?: number;
  offset?: number;
  className?: string;
  contentClassName?: string;
  arrow?: boolean;
}

export const AsciiPopover: React.FC<AsciiPopoverProps> = ({
  children,
  content,
  position = 'top',
  trigger = 'click',
  visible,
  onVisibilityChange,
  delay = 0,
  offset = 8,
  className = "",
  contentClassName = "",
  arrow = true
}) => {
  const [internalVisible, setInternalVisible] = useState(false);
  const [actualPosition, setActualPosition] = useState<PopoverPosition>(position);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isVisible = visible !== undefined ? visible : internalVisible;

  const updateVisibility = useCallback((newVisible: boolean) => {
    setInternalVisible(newVisible);
    onVisibilityChange?.(newVisible);
  }, [onVisibilityChange]);

  const showPopover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        updateVisibility(true);
      }, delay);
    } else {
      updateVisibility(true);
    }
  }, [delay, updateVisibility]);

  const hidePopover = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        updateVisibility(false);
      }, delay);
    } else {
      updateVisibility(false);
    }
  }, [delay, updateVisibility]);

  const togglePopover = useCallback(() => {
    if (isVisible) {
      hidePopover();
    } else {
      showPopover();
    }
  }, [isVisible, showPopover, hidePopover]);

  // Position calculation
  const getPopoverPosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current) return {};

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let finalPosition = position;
    let top = 0;
    let left = 0;

    // Calculate initial position
    switch (position) {
      case 'top':
        top = triggerRect.top - popoverRect.height - offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        // Check if it overflows top
        if (top < 0) {
          finalPosition = 'bottom';
          top = triggerRect.bottom + offset;
        }
        break;

      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + (triggerRect.width - popoverRect.width) / 2;
        // Check if it overflows bottom
        if (top + popoverRect.height > viewport.height) {
          finalPosition = 'top';
          top = triggerRect.top - popoverRect.height - offset;
        }
        break;

      case 'left':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.left - popoverRect.width - offset;
        // Check if it overflows left
        if (left < 0) {
          finalPosition = 'right';
          left = triggerRect.right + offset;
        }
        break;

      case 'right':
        top = triggerRect.top + (triggerRect.height - popoverRect.height) / 2;
        left = triggerRect.right + offset;
        // Check if it overflows right
        if (left + popoverRect.width > viewport.width) {
          finalPosition = 'left';
          left = triggerRect.left - popoverRect.width - offset;
        }
        break;
    }

    // Adjust for horizontal overflow
    if (finalPosition === 'top' || finalPosition === 'bottom') {
      if (left < 0) {
        left = 8;
      } else if (left + popoverRect.width > viewport.width) {
        left = viewport.width - popoverRect.width - 8;
      }
    }

    // Adjust for vertical overflow
    if (finalPosition === 'left' || finalPosition === 'right') {
      if (top < 0) {
        top = 8;
      } else if (top + popoverRect.height > viewport.height) {
        top = viewport.height - popoverRect.height - 8;
      }
    }

    setActualPosition(finalPosition);
    
    return {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 1000
    };
  }, [position, offset]);

  // Click outside handler
  useEffect(() => {
    if (!isVisible || trigger !== 'click') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        popoverRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        hidePopover();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, trigger, hidePopover]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowStyles = () => {
    const arrowSize = 8;
    const arrowOffset = 16;

    switch (actualPosition) {
      case 'top':
        return {
          position: 'absolute' as const,
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid rgb(55, 65, 81)`, // gray-700
        };
      case 'bottom':
        return {
          position: 'absolute' as const,
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid rgb(55, 65, 81)`,
        };
      case 'left':
        return {
          position: 'absolute' as const,
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid rgb(55, 65, 81)`,
        };
      case 'right':
        return {
          position: 'absolute' as const,
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 0,
          height: 0,
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid rgb(55, 65, 81)`,
        };
      default:
        return {};
    }
  };

  const triggerProps = trigger === 'hover' ? {
    onMouseEnter: showPopover,
    onMouseLeave: hidePopover,
  } : {
    onClick: togglePopover,
  };

  return (
    <>
      <div
        ref={triggerRef}
        className={`inline-block ${className}`}
        {...triggerProps}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={popoverRef}
          className={`
            font-mono bg-gray-700 text-white border border-gray-600 rounded-md
            p-3 shadow-lg max-w-xs min-w-max
            ${contentClassName}
          `}
          style={getPopoverPosition()}
          onMouseEnter={trigger === 'hover' ? showPopover : undefined}
          onMouseLeave={trigger === 'hover' ? hidePopover : undefined}
        >
          {content}
          {arrow && <div style={getArrowStyles()} />}
        </div>
      )}
    </>
  );
};