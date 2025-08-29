import React, { useState } from 'react';

interface AsciiPreviewProps {
  title: string;
  description?: string;
  code: string;
  children: React.ReactNode;
  className?: string;
}

const AsciiPreview: React.FC<AsciiPreviewProps> = ({ 
  title, 
  description, 
  code, 
  children, 
  className = "" 
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="border border-white mb-8">
      {/* Header */}
      <div className="border-b border-white p-4 bg-gray-900">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-green-400">{title}</h3>
            {description && (
              <p className="text-gray-300 text-sm mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="text-xs px-3 py-1 border border-white hover:bg-white hover:text-black transition-colors"
          >
            {showCode ? 'Hide Code' : 'Show Code'}
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className={`p-6 bg-black text-white font-mono ${className}`}>
        {children}
      </div>

      {/* Code */}
      {showCode && (
        <div className="border-t border-white bg-gray-900">
          <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default AsciiPreview;