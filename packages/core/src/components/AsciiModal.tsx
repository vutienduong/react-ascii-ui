import React, { useEffect } from "react";

interface AsciiModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  backdrop?: 'static' | 'clickable';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AsciiModal: React.FC<AsciiModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  backdrop = 'clickable',
  size = 'md',
  className = ""
}) => {
  // Handle ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'max-w-md w-full mx-4';
      case 'lg': return 'max-w-4xl w-full mx-4';
      case 'md':
      default: return 'max-w-2xl w-full mx-4';
    }
  };

  const handleBackdropClick = () => {
    if (backdrop === 'clickable' && onClose) {
      onClose();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={handleBackdropClick}
    >
      <div
        className={`
          font-mono bg-black text-white border-2 border-white
          ${getSizeClasses()}
          ${className}
        `}
        onClick={handleModalClick}
      >
        {/* Modal Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-white">
            <div className="font-bold">
              {title && `[ ${title} ]`}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-white hover:text-red-400 cursor-pointer text-lg font-bold ml-4"
                aria-label="Close modal"
              >
                [X]
              </button>
            )}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};