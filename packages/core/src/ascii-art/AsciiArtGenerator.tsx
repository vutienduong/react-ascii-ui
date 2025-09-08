import React, { useState, useRef, useCallback } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { convertToAsciiArt, convertToAsciiArtWithDithering } from './utils';
import { AsciiArtOptions, AsciiArtResult, ASCII_CHARACTER_SETS } from './types';

export interface AsciiArtGeneratorProps {
  onResult?: (result: AsciiArtResult) => void;
  onError?: (error: string) => void;
  defaultOptions?: Partial<AsciiArtOptions>;
  showControls?: boolean;
  showPreview?: boolean;
  maxFileSize?: number; // in bytes
  allowedTypes?: string[];
}

export const AsciiArtGenerator: React.FC<AsciiArtGeneratorProps> = ({
  onResult,
  onError,
  defaultOptions = {},
  showControls = true,
  showPreview = true,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
}) => {
  const { theme } = useAsciiTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [asciiResult, setAsciiResult] = useState<AsciiArtResult | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [options, setOptions] = useState<AsciiArtOptions>({
    width: 80,
    height: 40,
    style: 'detailed',
    invert: false,
    contrast: 1,
    brightness: 0,
    preserveAspectRatio: true,
    ...defaultOptions
  });

  const handleFileSelect = useCallback(async (file: File) => {
    // Validation
    if (!allowedTypes.includes(file.type)) {
      const errorMsg = `File type not supported. Allowed types: ${allowedTypes.join(', ')}`;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    if (file.size > maxFileSize) {
      const errorMsg = `File too large. Maximum size: ${Math.round(maxFileSize / (1024 * 1024))}MB`;
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

      // Convert to ASCII
      const result = await convertToAsciiArt(file, options);
      setAsciiResult(result);
      onResult?.(result);
    } catch (err) {
      const errorMsg = `Failed to process image: ${err instanceof Error ? err.message : 'Unknown error'}`;
      setError(errorMsg);
      onError?.(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  }, [options, maxFileSize, allowedTypes, onResult, onError]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const reprocessImage = async () => {
    if (!fileInputRef.current?.files?.[0]) return;
    await handleFileSelect(fileInputRef.current.files[0]);
  };

  const downloadAscii = () => {
    if (!asciiResult) return;
    
    const blob = new Blob([asciiResult.ascii], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-art.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!asciiResult) return;
    
    try {
      await navigator.clipboard.writeText(asciiResult.ascii);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const containerStyle = {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    padding: '20px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '4px',
    backgroundColor: theme.colors.background
  };

  const dropZoneStyle = {
    border: `2px dashed ${theme.colors.border}`,
    borderRadius: '8px',
    padding: '40px 20px',
    textAlign: 'center' as const,
    cursor: 'pointer',
    transition: 'border-color 0.2s',
    marginBottom: '20px'
  };

  const controlsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '4px'
  };

  const previewStyle = {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px'
  };

  const asciiDisplayStyle = {
    fontFamily: 'monospace',
    fontSize: '10px',
    lineHeight: '10px',
    whiteSpace: 'pre' as const,
    backgroundColor: theme.colors.background,
    border: `1px solid ${theme.colors.border}`,
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
    maxHeight: '400px',
    color: theme.colors.text
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: theme.colors.primary, marginBottom: '20px' }}>
        ASCII Art Generator
      </h2>

      {/* File Upload */}
      <div
        style={dropZoneStyle}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedTypes.join(',')}
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {isProcessing ? (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🔄</div>
            <p>Processing image...</p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📸</div>
            <p>
              <strong>Click or drag & drop an image</strong>
            </p>
            <p style={{ fontSize: '0.9rem', color: theme.colors.muted, marginTop: '10px' }}>
              Supported formats: {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}<br/>
              Max file size: {Math.round(maxFileSize / (1024 * 1024))}MB
            </p>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div style={{
          color: theme.colors.error || '#ff4444',
          backgroundColor: theme.colors.errorBackground || '#331111',
          padding: '10px',
          borderRadius: '4px',
          marginBottom: '20px',
          border: `1px solid ${theme.colors.error || '#ff4444'}`
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div style={controlsStyle}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Width (characters):</label>
            <input
              type="range"
              min="20"
              max="200"
              value={options.width || 80}
              onChange={(e) => setOptions({...options, width: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '0.9rem' }}>{options.width}</span>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Height (characters):</label>
            <input
              type="range"
              min="10"
              max="100"
              value={options.height || 40}
              onChange={(e) => setOptions({...options, height: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '0.9rem' }}>{options.height}</span>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Style:</label>
            <select
              value={options.style || 'detailed'}
              onChange={(e) => setOptions({...options, style: e.target.value as any})}
              style={{ 
                width: '100%', 
                padding: '5px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`
              }}
            >
              {Object.entries(ASCII_CHARACTER_SETS).map(([key, set]) => (
                <option key={key} value={key}>
                  {set.name} - {set.description}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="checkbox"
                checked={options.invert || false}
                onChange={(e) => setOptions({...options, invert: e.target.checked})}
              />
              Invert Colors
            </label>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Contrast:</label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={options.contrast || 1}
              onChange={(e) => setOptions({...options, contrast: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '0.9rem' }}>{options.contrast?.toFixed(1)}</span>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Brightness:</label>
            <input
              type="range"
              min="-100"
              max="100"
              value={options.brightness || 0}
              onChange={(e) => setOptions({...options, brightness: Number(e.target.value)})}
              style={{ width: '100%' }}
            />
            <span style={{ fontSize: '0.9rem' }}>{options.brightness}</span>
          </div>

          {fileInputRef.current?.files?.[0] && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={reprocessImage}
                disabled={isProcessing}
                style={{
                  padding: '8px 16px',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {isProcessing ? 'Processing...' : 'Apply Changes'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Preview and Result */}
      {(previewImage || asciiResult) && showPreview && (
        <div style={previewStyle}>
          {/* Original Image Preview */}
          {previewImage && (
            <div style={{ flex: 1 }}>
              <h3 style={{ marginBottom: '10px', color: theme.colors.secondary }}>Original</h3>
              <img
                src={previewImage}
                alt="Original"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '4px'
                }}
              />
            </div>
          )}

          {/* ASCII Result */}
          {asciiResult && (
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: theme.colors.secondary }}>ASCII Art</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.9rem',
                      fontFamily: theme.typography.fontFamily,
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.background,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={downloadAscii}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.9rem',
                      fontFamily: theme.typography.fontFamily,
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.background,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    💾 Download
                  </button>
                </div>
              </div>
              
              <div style={asciiDisplayStyle}>
                {asciiResult.ascii}
              </div>
              
              <div style={{ 
                fontSize: '0.9rem', 
                color: theme.colors.muted, 
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>
                  Size: {asciiResult.width}×{asciiResult.height} characters
                </span>
                <span>
                  Processing: {asciiResult.processingTime.toFixed(1)}ms
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AsciiArtGenerator;