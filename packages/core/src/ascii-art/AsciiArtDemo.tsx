import React, { useState, useRef } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { AsciiArtGenerator } from './AsciiArtGenerator';
import { useAsciiArt, useWebcamAsciiArt, useBatchAsciiArt } from './hooks';
import { AsciiArtResult, ASCII_CHARACTER_SETS } from './types';

export const AsciiArtDemo: React.FC = () => {
  const { theme } = useAsciiTheme();
  const [activeTab, setActiveTab] = useState<'generator' | 'webcam' | 'batch' | 'examples'>('generator');
  const [selectedExample, setSelectedExample] = useState<string>('');

  // Hooks
  const asciiArt = useAsciiArt();
  const webcam = useWebcamAsciiArt();
  const batch = useBatchAsciiArt();

  const batchFileInputRef = useRef<HTMLInputElement>(null);

  const handleExampleSelect = async (exampleUrl: string) => {
    setSelectedExample(exampleUrl);
    try {
      await asciiArt.convertImage(exampleUrl, { width: 80, height: 40, style: 'detailed' });
    } catch (err) {
      console.error('Failed to process example:', err);
    }
  };

  const handleBatchFiles = (files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    batch.convertBatch(fileArray, { width: 60, height: 30, style: 'detailed' });
  };

  const containerStyle = {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: '20px',
    minHeight: '100vh'
  };

  const titleStyle = {
    color: theme.colors.primary,
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center' as const
  };

  const tabsStyle = {
    display: 'flex',
    marginBottom: '30px',
    borderBottom: `2px solid ${theme.colors.border}`,
    gap: '20px'
  };

  const tabStyle = (isActive: boolean) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: isActive ? `3px solid ${theme.colors.primary}` : 'none',
    color: isActive ? theme.colors.primary : theme.colors.text,
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s'
  });

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px'
  };

  const exampleImages = [
    { name: 'Logo', url: 'https://via.placeholder.com/200x200/00ff00/000000?text=LOGO' },
    { name: 'Portrait', url: 'https://via.placeholder.com/150x200/ffffff/333333?text=FACE' },
    { name: 'Landscape', url: 'https://via.placeholder.com/300x150/0066cc/ffffff?text=LANDSCAPE' },
    { name: 'Pattern', url: 'https://via.placeholder.com/200x200/ff6600/ffffff?text=PATTERN' }
  ];

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {theme.characters.doubleHorizontal.repeat(3)} ASCII Art Generator Demo {theme.characters.doubleHorizontal.repeat(3)}
      </h1>

      {/* Navigation Tabs */}
      <div style={tabsStyle}>
        <div 
          style={tabStyle(activeTab === 'generator')}
          onClick={() => setActiveTab('generator')}
        >
          📷 Image Converter
        </div>
        <div 
          style={tabStyle(activeTab === 'webcam')}
          onClick={() => setActiveTab('webcam')}
        >
          🎥 Webcam Live
        </div>
        <div 
          style={tabStyle(activeTab === 'batch')}
          onClick={() => setActiveTab('batch')}
        >
          📁 Batch Processing
        </div>
        <div 
          style={tabStyle(activeTab === 'examples')}
          onClick={() => setActiveTab('examples')}
        >
          🎨 Examples
        </div>
      </div>

      {/* Image Converter Tab */}
      {activeTab === 'generator' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Image to ASCII Converter
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Upload any image and convert it to ASCII art. Supports multiple formats and advanced options.
          </p>
          <AsciiArtGenerator
            onResult={(result) => console.log('ASCII Art Result:', result)}
            onError={(error) => console.error('ASCII Art Error:', error)}
            showControls={true}
            showPreview={true}
            maxFileSize={10 * 1024 * 1024} // 10MB
          />
        </div>
      )}

      {/* Webcam Live Tab */}
      {activeTab === 'webcam' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Live Webcam ASCII Art
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Use your webcam to create live ASCII art. Perfect for avatars or real-time effects.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <button
              onClick={webcam.startWebcam}
              disabled={!!webcam.stream}
              style={{
                padding: '10px 20px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: webcam.stream ? theme.colors.muted : theme.colors.primary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: webcam.stream ? 'not-allowed' : 'pointer'
              }}
            >
              🎥 Start Webcam
            </button>
            
            <button
              onClick={webcam.stopWebcam}
              disabled={!webcam.stream}
              style={{
                padding: '10px 20px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: !webcam.stream ? theme.colors.muted : theme.colors.error || '#ff4444',
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: !webcam.stream ? 'not-allowed' : 'pointer'
              }}
            >
              ⏹️ Stop Webcam
            </button>

            <button
              onClick={() => webcam.captureFrame({ width: 80, height: 40, style: 'detailed' })}
              disabled={!webcam.stream || webcam.isCapturing}
              style={{
                padding: '10px 20px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: (!webcam.stream || webcam.isCapturing) ? theme.colors.muted : theme.colors.secondary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: (!webcam.stream || webcam.isCapturing) ? 'not-allowed' : 'pointer'
              }}
            >
              📸 Capture Frame
            </button>
          </div>

          {webcam.error && (
            <div style={{
              color: theme.colors.error || '#ff4444',
              backgroundColor: theme.colors.errorBackground || '#331111',
              padding: '10px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              ⚠️ {webcam.error}
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px' }}>
            {/* Webcam Video */}
            <div>
              <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>Webcam Feed</h3>
              <video
                ref={webcam.videoRef}
                style={{
                  width: '320px',
                  height: '240px',
                  border: `1px solid ${theme.colors.border}`,
                  borderRadius: '4px',
                  backgroundColor: theme.colors.muted
                }}
                muted
              />
            </div>

            {/* ASCII Preview */}
            {asciiArt.result && (
              <div style={{ flex: 1 }}>
                <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>ASCII Output</h3>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '8px',
                  lineHeight: '8px',
                  whiteSpace: 'pre' as const,
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  padding: '10px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: '240px',
                  color: theme.colors.text
                }}>
                  {asciiArt.result.ascii}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Batch Processing Tab */}
      {activeTab === 'batch' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Batch Image Processing
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Convert multiple images to ASCII art at once. Great for processing entire folders.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <input
              ref={batchFileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleBatchFiles(e.target.files)}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => batchFileInputRef.current?.click()}
              disabled={batch.isProcessing}
              style={{
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: batch.isProcessing ? theme.colors.muted : theme.colors.primary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '8px',
                cursor: batch.isProcessing ? 'not-allowed' : 'pointer'
              }}
            >
              📁 Select Multiple Images
            </button>
          </div>

          {batch.isProcessing && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: theme.colors.text, marginBottom: '10px' }}>
                Processing: {batch.currentFile} ({Math.round(batch.progress)}%)
              </p>
              <div style={{
                width: '100%',
                height: '10px',
                backgroundColor: theme.colors.muted,
                borderRadius: '5px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${batch.progress}%`,
                  height: '100%',
                  backgroundColor: theme.colors.primary,
                  transition: 'width 0.3s'
                }} />
              </div>
            </div>
          )}

          {batch.errors.length > 0 && (
            <div style={{
              color: theme.colors.error || '#ff4444',
              backgroundColor: theme.colors.errorBackground || '#331111',
              padding: '15px',
              borderRadius: '4px',
              marginBottom: '20px'
            }}>
              <h4>Errors:</h4>
              <ul>
                {batch.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {batch.results.length > 0 && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ color: theme.colors.text }}>
                  Results ({batch.results.length} images processed)
                </h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={batch.downloadAllResults}
                    style={{
                      padding: '8px 16px',
                      fontFamily: theme.typography.fontFamily,
                      backgroundColor: theme.colors.secondary,
                      color: theme.colors.background,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    💾 Download All
                  </button>
                  <button
                    onClick={batch.clearResults}
                    style={{
                      padding: '8px 16px',
                      fontFamily: theme.typography.fontFamily,
                      backgroundColor: theme.colors.muted,
                      color: theme.colors.text,
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️ Clear
                  </button>
                </div>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px'
              }}>
                {batch.results.map((result, index) => (
                  <div
                    key={index}
                    style={{
                      border: `1px solid ${theme.colors.border}`,
                      borderRadius: '4px',
                      padding: '15px'
                    }}
                  >
                    <h4 style={{ color: theme.colors.text, marginBottom: '10px' }}>
                      Image {index + 1}
                    </h4>
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '6px',
                      lineHeight: '6px',
                      whiteSpace: 'pre' as const,
                      backgroundColor: theme.colors.background,
                      border: `1px solid ${theme.colors.border}`,
                      padding: '8px',
                      borderRadius: '4px',
                      overflow: 'auto',
                      maxHeight: '150px',
                      color: theme.colors.text
                    }}>
                      {result.ascii}
                    </div>
                    <div style={{
                      fontSize: '0.8rem',
                      color: theme.colors.muted,
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <span>Size: {result.width}×{result.height}</span>
                      <span>{result.processingTime.toFixed(1)}ms</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Examples Tab */}
      {activeTab === 'examples' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            ASCII Art Examples & Styles
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Explore different ASCII art styles and character sets with sample images.
          </p>

          {/* Character Set Examples */}
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Character Sets</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '15px'
            }}>
              {Object.entries(ASCII_CHARACTER_SETS).map(([key, set]) => (
                <div
                  key={key}
                  style={{
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px',
                    padding: '15px'
                  }}
                >
                  <h4 style={{ color: theme.colors.primary, marginBottom: '8px' }}>
                    {set.name}
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: theme.colors.muted, marginBottom: '10px' }}>
                    {set.description}
                  </p>
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: '1.2rem',
                    backgroundColor: theme.colors.background,
                    border: `1px solid ${theme.colors.border}`,
                    padding: '8px',
                    borderRadius: '4px',
                    color: theme.colors.text
                  }}>
                    {set.characters}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Example Images */}
          <div>
            <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Try These Examples</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '15px',
              marginBottom: '20px'
            }}>
              {exampleImages.map((example) => (
                <button
                  key={example.name}
                  onClick={() => handleExampleSelect(example.url)}
                  disabled={asciiArt.isProcessing}
                  style={{
                    padding: '15px',
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '8px',
                    backgroundColor: selectedExample === example.url ? theme.colors.primary : theme.colors.background,
                    color: selectedExample === example.url ? theme.colors.background : theme.colors.text,
                    cursor: asciiArt.isProcessing ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '5px' }}>
                    {example.name === 'Logo' ? '🏷️' : 
                     example.name === 'Portrait' ? '👤' : 
                     example.name === 'Landscape' ? '🏞️' : '🎨'}
                  </div>
                  <div>{example.name}</div>
                </button>
              ))}
            </div>

            {asciiArt.isProcessing && (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
                <p>Converting example image...</p>
              </div>
            )}

            {asciiArt.result && (
              <div style={{
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '4px',
                padding: '15px'
              }}>
                <h4 style={{ color: theme.colors.text, marginBottom: '10px' }}>
                  ASCII Art Result
                </h4>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  lineHeight: '10px',
                  whiteSpace: 'pre' as const,
                  backgroundColor: theme.colors.background,
                  border: `1px solid ${theme.colors.border}`,
                  padding: '15px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  maxHeight: '400px',
                  color: theme.colors.text
                }}>
                  {asciiArt.result.ascii}
                </div>
                <div style={{
                  fontSize: '0.9rem',
                  color: theme.colors.muted,
                  marginTop: '10px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>
                    Size: {asciiArt.result.width}×{asciiArt.result.height} characters
                  </span>
                  <span>
                    Processing: {asciiArt.result.processingTime.toFixed(1)}ms
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: '8px',
        textAlign: 'center' as const
      }}>
        <h3 style={{ color: theme.colors.primary, marginBottom: '10px' }}>
          🎨 ASCII Art System Complete!
        </h3>
        <p style={{ color: theme.colors.text }}>
          Convert images to ASCII art with advanced options, live webcam processing, 
          batch conversion, and multiple character sets. Perfect for retro aesthetics!
        </p>
      </div>
    </div>
  );
};

export default AsciiArtDemo;