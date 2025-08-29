import React, { useEffect, useState } from "react";

interface AsciiToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  isVisible: boolean;
  onClose?: () => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  showCloseButton?: boolean;
}

export const AsciiToast: React.FC<AsciiToastProps> = ({
  message,
  type = 'info',
  duration = 4000,
  isVisible,
  onClose,
  position = 'bottom-right',
  showCloseButton = true
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      setIsAnimating(false);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // Wait for animation
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '(✓)';
      case 'warning': return '(⚠)';
      case 'error': return '(!)';
      case 'info':
      default: return '(i)';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400 border-green-400';
      case 'warning': return 'text-yellow-400 border-yellow-400';
      case 'error': return 'text-red-400 border-red-400';
      case 'info':
      default: return 'text-blue-400 border-blue-400';
    }
  };

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-right': return 'top-4 right-4';
      case 'top-left': return 'top-4 left-4';
      case 'bottom-left': return 'bottom-4 left-4';
      case 'top-center': return 'top-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-center': return 'bottom-4 left-1/2 transform -translate-x-1/2';
      case 'bottom-right':
      default: return 'bottom-4 right-4';
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed z-50 font-mono max-w-sm w-full mx-4 sm:w-auto
        transition-all duration-300 ease-in-out
        ${getPositionClasses(position)}
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <div
        className={`
          bg-black border-2 p-3 flex items-start gap-3
          ${getTypeColor(type)}
        `}
      >
        {/* Icon */}
        <span className="flex-shrink-0 select-none text-lg">
          {getIcon(type)}
        </span>

        {/* Message */}
        <div className="flex-1 text-white">
          {message}
        </div>

        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-white hover:text-red-400 cursor-pointer font-bold ml-2"
            aria-label="Close toast"
          >
            [X]
          </button>
        )}
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
interface ToastItem {
  id: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

interface AsciiToastContainerProps {
  toasts: ToastItem[];
  onRemoveToast: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const AsciiToastContainer: React.FC<AsciiToastContainerProps> = ({
  toasts,
  onRemoveToast,
  position = 'bottom-right'
}) => {
  return (
    <>
      {toasts.map((toast) => (
        <AsciiToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          isVisible={true}
          onClose={() => onRemoveToast(toast.id)}
          position={position}
        />
      ))}
    </>
  );
};