import React, { useState, useRef, useEffect } from "react";

interface AsciiTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  disabled?: boolean;
}

export const AsciiTooltip: React.FC<AsciiTooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 500,
  className = "",
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({});
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      calculatePosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + scrollX + 8;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    if (left < 0) left = 8;
    if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 8;
    if (top < scrollY) top = scrollY + 8;
    if (top + tooltipRect.height > scrollY + viewportHeight) top = scrollY + viewportHeight - tooltipRect.height - 8;

    setTooltipStyle({
      position: 'absolute',
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrow = () => {
    const arrowClass = "absolute text-white";
    
    switch (position) {
      case 'top':
        return <div className={`${arrowClass} -bottom-1 left-1/2 transform -translate-x-1/2`}>v</div>;
      case 'bottom':
        return <div className={`${arrowClass} -top-1 left-1/2 transform -translate-x-1/2`}>^</div>;
      case 'left':
        return <div className={`${arrowClass} -right-1 top-1/2 transform -translate-y-1/2`}>{'>'}</div>;
      case 'right':
        return <div className={`${arrowClass} -left-1 top-1/2 transform -translate-y-1/2`}>{'<'}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger Element */}
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onFocus={showTooltip}
        onBlur={hideTooltip}
        className="cursor-help"
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          style={tooltipStyle}
          className={`
            font-mono text-xs bg-black text-white border border-white
            px-2 py-1 whitespace-nowrap pointer-events-none
            opacity-95 transition-opacity duration-200
            ${className}
          `}
        >
          <div className="relative">
            {content}
            {getArrow()}
          </div>
        </div>
      )}
    </div>
  );
};