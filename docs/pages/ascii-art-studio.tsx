import React, { useState, useRef, useCallback } from 'react';
import { 
  AsciiArtGenerator, 
  AsciiCard, 
  AsciiButton, 
  AsciiSelect, 
  AsciiInput,
  AsciiCheckbox,
  useAsciiArt, 
  useWebcamAsciiArt, 
  useBatchAsciiArt 
} from 'react-ascii-ui';

function BatchProcessor() {
  const { convertBatch, results, isProcessing } = useBatchAsciiArt();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBatchUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    await convertBatch(files, {
      width: 60,
      height: 30,
      style: 'simple'
    });
  };

  const exportBatch = () => {
    const combined = results.map((result, index) => 
      `=== Image ${index + 1} ===\n${result.ascii}\n\n`
    ).join('');
    
    const blob = new Blob([combined], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'batch-ascii-art.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AsciiCard title="📦 Batch Processing" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleBatchUpload}
          style={{ 
            padding: '10px',
            border: '1px solid #333',
            backgroundColor: '#111',
            color: '#fff',
            marginRight: '10px'
          }}
        />
        {isProcessing && <span style={{ color: '#ffaa00' }}>Processing images...</span>}
      </div>

      {results.length > 0 && (
        <div>
          <div style={{ marginBottom: '15px' }}>
            <AsciiButton onClick={exportBatch}>
              💾 Export All ({results.length} images)
            </AsciiButton>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '15px',
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            {results.map((result, index) => (
              <div key={index} style={{ 
                border: '1px solid #333', 
                padding: '10px', 
                borderRadius: '4px',
                backgroundColor: '#111'
              }}>
                <h4 style={{ color: '#00ff00', fontSize: '12px', marginBottom: '5px' }}>
                  Image {index + 1}
                </h4>
                <pre style={{ 
                  color: '#fff',
                  fontSize: '6px',
                  lineHeight: '1',
                  overflow: 'hidden',
                  fontFamily: 'monospace',
                  maxHeight: '150px'
                }}>
                  {result.ascii}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </AsciiCard>
  );
}

function WebcamStudio() {
  const { stream, startWebcam, stopWebcam, captureFrame } = useWebcamAsciiArt();
  const [asciiOutput, setAsciiOutput] = useState<string>('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFrames, setRecordedFrames] = useState<string[]>([]);
  const recordingInterval = useRef<NodeJS.Timeout>();

  const toggleWebcam = () => {
    if (stream) {
      stopWebcam();
    } else {
      startWebcam();
    }
  };

  const startRecording = () => {
    if (!stream) return;
    
    setIsRecording(true);
    setRecordedFrames([]);
    
    recordingInterval.current = setInterval(() => {
      if (asciiOutput) {
        setRecordedFrames(frames => [...frames, asciiOutput]);
      }
    }, 200); // Record frame every 200ms
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }
  };

  const playbackFrames = () => {
    if (recordedFrames.length === 0) return;
    
    let frameIndex = 0;
    const playbackInterval = setInterval(() => {
      // You could display frames in a playback area
      frameIndex++;
      if (frameIndex >= recordedFrames.length) {
        clearInterval(playbackInterval);
      }
    }, 200);
  };

  const exportRecording = () => {
    if (recordedFrames.length === 0) return;
    
    const recording = recordedFrames.map((frame, index) => 
      `=== Frame ${index + 1} ===\n${frame}\n\n`
    ).join('');
    
    const blob = new Blob([recording], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ascii-webcam-recording.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AsciiCard title="📹 Live Webcam Studio" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <AsciiButton 
            onClick={toggleWebcam}
            style={{ color: stream ? '#ff0000' : '#00ff00' }}
          >
            {stream ? '⏹️ Stop Webcam' : '▶️ Start Webcam'}
          </AsciiButton>
          
          <AsciiButton 
            onClick={isRecording ? stopRecording : startRecording}
            disabled={!stream}
            style={{ color: isRecording ? '#ffaa00' : '#ffffff' }}
          >
            {isRecording ? '⏹️ Stop Recording' : '⏺️ Record'}
          </AsciiButton>
          
          <AsciiButton 
            onClick={exportRecording}
            disabled={recordedFrames.length === 0}
          >
            💾 Export ({recordedFrames.length} frames)
          </AsciiButton>
        </div>
        
        {isRecording && (
          <div style={{ color: '#ff0000', fontSize: '12px' }}>
            🔴 Recording... {recordedFrames.length} frames captured
          </div>
        )}
      </div>

      {stream && asciiOutput && (
        <div>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>Live ASCII Feed:</h4>
          <div style={{ 
            border: '2px solid #00ff00', 
            padding: '10px', 
            borderRadius: '4px',
            backgroundColor: '#000'
          }}>
            <pre style={{ 
              color: '#00ff00',
              fontSize: '8px',
              lineHeight: '1',
              fontFamily: 'monospace',
              margin: 0
            }}>
              {asciiOutput}
            </pre>
          </div>
        </div>
      )}
      
      {!stream && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          border: '1px dashed #333',
          borderRadius: '4px',
          color: '#666'
        }}>
          📷 Click "Start Webcam" to begin live ASCII conversion
          <br />
          <small>Requires camera permissions</small>
        </div>
      )}
    </AsciiCard>
  );
}

function AdvancedSettings() {
  const [settings, setSettings] = useState({
    width: 80,
    height: 40,
    style: 'detailed',
    contrast: 1.0,
    brightness: 1.0,
    invert: false,
    dithering: false
  });

  const [customCharset, setCustomCharset] = useState(' .:-=+*#%@');

  return (
    <AsciiCard title="⚙️ Advanced Settings" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Dimensions</h4>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>
              Width: {settings.width}
            </label>
            <input
              type="range"
              min="20"
              max="200"
              value={settings.width}
              onChange={(e) => setSettings(s => ({ ...s, width: parseInt(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>
              Height: {settings.height}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={settings.height}
              onChange={(e) => setSettings(s => ({ ...s, height: parseInt(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Character Set</h4>
          <div style={{ marginBottom: '10px' }}>
            <AsciiSelect
              value={settings.style}
              onChange={(e) => setSettings(s => ({ ...s, style: e.target.value }))}
            >
              <option value="simple">Simple ( .:-=+*#%@)</option>
              <option value="detailed">Detailed (70+ chars)</option>
              <option value="blocks">Block (░▒▓█)</option>
              <option value="minimal">Binary ( █)</option>
              <option value="custom">Custom</option>
            </AsciiSelect>
          </div>
          {settings.style === 'custom' && (
            <AsciiInput
              value={customCharset}
              onChange={(e) => setCustomCharset(e.target.value)}
              placeholder="Enter custom characters..."
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
            />
          )}
        </div>

        <div>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Image Adjustments</h4>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>
              Contrast: {settings.contrast.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.contrast}
              onChange={(e) => setSettings(s => ({ ...s, contrast: parseFloat(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px' }}>
              Brightness: {settings.brightness.toFixed(1)}
            </label>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={settings.brightness}
              onChange={(e) => setSettings(s => ({ ...s, brightness: parseFloat(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
            <AsciiCheckbox
              checked={settings.invert}
              onChange={(e) => setSettings(s => ({ ...s, invert: e.target.checked }))}
              label="Invert Colors"
            />
            <AsciiCheckbox
              checked={settings.dithering}
              onChange={(e) => setSettings(s => ({ ...s, dithering: e.target.checked }))}
              label="Dithering"
            />
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        borderRadius: '4px' 
      }}>
        <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>Current Settings Preview</h4>
        <pre style={{ color: '#ccc', fontSize: '12px', fontFamily: 'monospace' }}>
{JSON.stringify(settings, null, 2)}
        </pre>
      </div>
    </AsciiCard>
  );
}

export default function AsciiArtStudio() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>
        🎨 ASCII Art Studio
      </h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Professional ASCII art creation suite with image conversion, webcam support, batch processing, and advanced customization options.
      </p>

      <div style={{
        padding: '15px',
        border: '1px solid #00aaff',
        borderRadius: '4px',
        backgroundColor: '#001122',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#00aaff', marginBottom: '10px' }}>🚀 Studio Features</h3>
        <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
          <li><strong>Real-time Conversion</strong> - Instant image-to-ASCII processing with live preview</li>
          <li><strong>Webcam Integration</strong> - Live video ASCII conversion with recording capabilities</li>
          <li><strong>Batch Processing</strong> - Convert multiple images simultaneously</li>
          <li><strong>Advanced Controls</strong> - Contrast, brightness, dithering, and custom character sets</li>
          <li><strong>Export Options</strong> - Save as text files or copy to clipboard</li>
        </ul>
      </div>

      {/* Tab Navigation */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        borderBottom: '1px solid #333',
        paddingBottom: '10px'
      }}>
        {[
          { id: 'generator', label: '🖼️ Image Converter', desc: 'Convert images to ASCII art' },
          { id: 'webcam', label: '📹 Live Webcam', desc: 'Real-time video ASCII conversion' },
          { id: 'batch', label: '📦 Batch Processor', desc: 'Convert multiple images at once' },
          { id: 'settings', label: '⚙️ Advanced Settings', desc: 'Customize conversion parameters' }
        ].map(tab => (
          <AsciiButton
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            title={tab.desc}
            style={{
              backgroundColor: activeTab === tab.id ? '#00ff00' : 'transparent',
              color: activeTab === tab.id ? '#000' : '#00ff00',
              border: `1px solid ${activeTab === tab.id ? '#00ff00' : '#333'}`,
              padding: '4px 8px',
              fontSize: '12px'
            }}
          >
            {tab.label}
          </AsciiButton>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'generator' && (
        <AsciiCard title="🖼️ Image to ASCII Converter" style={{ marginBottom: '30px' }}>
          <div style={{ 
            border: '2px dashed #333', 
            padding: '20px', 
            borderRadius: '4px',
            backgroundColor: '#111'
          }}>
            <AsciiArtGenerator 
              defaultOptions={{ 
                width: 80, 
                height: 40, 
                style: 'detailed',
                contrast: 1.2,
                brightness: 1.0
              }}
              showControls={true}
              showPreview={true}
              onResult={(result) => {
                console.log('Generated ASCII art:', result);
              }}
            />
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#000', 
            border: '1px solid #333',
            borderRadius: '4px'
          }}>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>💡 Pro Tips</h4>
            <ul style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>
              <li>High contrast images work best (portraits, logos, simple graphics)</li>
              <li>Resize large images before conversion for better performance</li>
              <li>Use 'detailed' character set for photographs, 'simple' for graphics</li>
              <li>Adjust contrast and brightness sliders for optimal results</li>
            </ul>
          </div>
        </AsciiCard>
      )}

      {activeTab === 'webcam' && <WebcamStudio />}
      {activeTab === 'batch' && <BatchProcessor />}
      {activeTab === 'settings' && <AdvancedSettings />}

      <div style={{
        marginTop: '40px',
        padding: '30px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>🎯 Perfect for</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginTop: '20px'
        }}>
          {[
            { icon: '💼', title: 'Business Cards', desc: 'Unique ASCII art business cards and signatures' },
            { icon: '🎮', title: 'Game Assets', desc: 'Retro game graphics and terminal interfaces' },
            { icon: '📱', title: 'Social Media', desc: 'Eye-catching ASCII art for posts and profiles' },
            { icon: '🎨', title: 'Art Projects', desc: 'Digital art installations and creative coding' },
            { icon: '💻', title: 'Documentation', desc: 'Technical documentation and README files' },
            { icon: '🔧', title: 'Developer Tools', desc: 'CLI applications and terminal utilities' }
          ].map((use, index) => (
            <div key={index} style={{ textAlign: 'center', padding: '15px' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{use.icon}</div>
              <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '8px' }}>{use.title}</h4>
              <p style={{ color: '#ccc', fontSize: '12px', lineHeight: '1.4' }}>{use.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}