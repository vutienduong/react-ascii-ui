import React, { useState, useRef } from 'react';
import { AsciiArtGenerator, useAsciiArt } from 'react-ascii-ui';

function AsciiArtDemo() {
  const { convertImage, isProcessing, result } = useAsciiArt();
  const [asciiResult, setAsciiResult] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await convertImage(file, { 
        width: 80, 
        height: 40, 
        style: 'detailed' 
      });
      if (result) {
        setAsciiResult(result.ascii);
      }
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Interactive Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ 
            padding: '10px',
            border: '1px solid #333',
            backgroundColor: '#111',
            color: '#fff',
            marginRight: '10px'
          }}
        />
        {isProcessing && <span style={{ color: '#ffaa00' }}>Processing...</span>}
      </div>

      {asciiResult && (
        <div>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>ASCII Output:</h4>
          <pre style={{ 
            backgroundColor: '#000', 
            border: '1px solid #333', 
            padding: '15px', 
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '8px',
            lineHeight: '1',
            overflow: 'auto',
            maxHeight: '400px'
          }}>
            {asciiResult}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h4 style={{ color: '#fff', marginBottom: '15px' }}>Full Component Demo</h4>
        <div style={{ border: '1px solid #333', padding: '20px', borderRadius: '4px', backgroundColor: '#111' }}>
          <AsciiArtGenerator 
            defaultOptions={{ 
              width: 60, 
              height: 30, 
              style: 'simple',
              invert: false 
            }}
            showControls={true}
            showPreview={true}
          />
        </div>
      </div>
    </div>
  );
}

export default function AsciiArtDocs() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>🎨 ASCII Art Generator</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Real-time image-to-ASCII conversion with webcam support, batch processing, and multiple character sets.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Features</h2>
      
      <ul style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '30px' }}>
        <li><strong>Real-time Conversion</strong> - Instant image-to-ASCII processing</li>
        <li><strong>Webcam Support</strong> - Live video ASCII conversion</li>
        <li><strong>Multiple Character Sets</strong> - Simple, detailed, block, and custom sets</li>
        <li><strong>Batch Processing</strong> - Convert multiple images at once</li>
        <li><strong>Advanced Options</strong> - Width, height, contrast, brightness controls</li>
        <li><strong>Export Functionality</strong> - Save ASCII art as text files</li>
        <li><strong>Dithering Effects</strong> - Floyd-Steinberg dithering support</li>
      </ul>

      <AsciiArtDemo />

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Installation</h2>
      
      <pre style={{ 
        backgroundColor: '#000', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px',
        color: '#00ff00',
        fontFamily: 'monospace',
        overflow: 'auto',
        marginBottom: '30px'
      }}>
{`import { 
  AsciiArtGenerator, 
  useAsciiArt,
  useWebcamAsciiArt,
  useBatchAsciiArt
} from 'react-ascii-ui';`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Usage</h2>

      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>Basic Component</h3>
      <pre style={{ 
        backgroundColor: '#000', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px',
        color: '#00ff00',
        fontFamily: 'monospace',
        overflow: 'auto',
        marginBottom: '20px'
      }}>
{`function MyApp() {
  return (
    <AsciiArtGenerator 
      options={{ 
        width: 80, 
        height: 40, 
        style: 'detailed',
        contrast: 1.2,
        brightness: 0.8
      }}
      showControls={true}
      showWebcam={true}
      onGenerate={(result) => console.log(result)}
    />
  );
}`}
      </pre>

      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>Using Hooks</h3>
      <pre style={{ 
        backgroundColor: '#000', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px',
        color: '#00ff00',
        fontFamily: 'monospace',
        overflow: 'auto',
        marginBottom: '20px'
      }}>
{`function CustomConverter() {
  const { convertImage, isProcessing } = useAsciiArt();
  
  const handleFileUpload = async (file) => {
    const result = await convertImage(file, {
      width: 100,
      height: 50,
      style: 'block'
    });
    console.log(result.ascii);
  };
  
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {isProcessing && <p>Converting...</p>}
    </div>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Character Sets</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        {[
          { name: 'simple', chars: ' .:-=+*#%@' },
          { name: 'detailed', chars: ' .`\'-_:;^,\"~=+<>i!lI?/\\|(){}[]rcvunxzjftLCJUYXZO0Qoahkbdpqwm*WMB8&%$#@' },
          { name: 'block', chars: ' ░▒▓█' },
          { name: 'binary', chars: ' █' }
        ].map((set, index) => (
          <div key={index} style={{ 
            border: '1px solid #333', 
            padding: '15px', 
            borderRadius: '4px',
            backgroundColor: '#111'
          }}>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>{set.name}</h4>
            <code style={{ color: '#ccc', fontSize: '12px', wordBreak: 'break-all' }}>
              {set.chars}
            </code>
          </div>
        ))}
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Props</h2>
      
      <div style={{ 
        border: '1px solid #333', 
        borderRadius: '4px',
        overflow: 'hidden',
        marginBottom: '30px'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#222' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Prop</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Type</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Default</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00' }}>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>options</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>AsciiArtOptions</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>-</td>
              <td style={{ padding: '12px', color: '#ccc' }}>Conversion options (width, height, style, etc.)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>showControls</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>boolean</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>true</td>
              <td style={{ padding: '12px', color: '#ccc' }}>Show adjustment controls</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #333' }}>
              <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>showWebcam</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>boolean</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>false</td>
              <td style={{ padding: '12px', color: '#ccc' }}>Enable webcam support</td>
            </tr>
            <tr>
              <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>onGenerate</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>function</td>
              <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>-</td>
              <td style={{ padding: '12px', color: '#ccc' }}>Callback when ASCII is generated</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '40px',
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>💡 Pro Tip</h3>
        <p style={{ color: '#ccc', lineHeight: '1.6' }}>
          For best results with photographs, use the 'detailed' character set with medium width (60-100 characters). 
          For logos or simple graphics, try the 'simple' or 'block' character sets. The webcam feature works 
          best in good lighting conditions.
        </p>
      </div>
    </div>
  );
}