import React, { useState, useEffect } from 'react';
import { AsciiLoader, AsciiButton } from 'react-ascii-ui';

export default function LoaderDocs() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate progress loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsLoading(false);
            return 0;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const startDemo = () => {
    setProgress(0);
    setIsLoading(true);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Loader</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Loading indicators with ASCII-style animations and progress bars for showing operation status.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#docs" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
          <span style={{ color: '#333' }}>•</span>
          <a href="#api" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>API Reference</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#111', 
            border: 'none', 
            color: '#fff', 
            borderBottom: '2px solid #00ff00',
            fontFamily: 'monospace'
          }}>
            Preview
          </button>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#666',
            fontFamily: 'monospace'
          }}>
            Code
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        marginBottom: '40px',
        padding: '40px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Dots Loader:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <AsciiLoader />
              <AsciiLoader text="Processing" />
              <AsciiLoader text="Downloading files" />
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Progress Bar Loader:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <AsciiLoader variant="progress" progress={25} />
              <AsciiLoader variant="progress" progress={50} />
              <AsciiLoader variant="progress" progress={75} />
              <AsciiLoader variant="progress" progress={100} />
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Interactive Demo:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
              <AsciiButton onClick={startDemo} disabled={isLoading}>
                {isLoading ? 'Running...' : 'Start Demo'}
              </AsciiButton>
              {isLoading && (
                <AsciiLoader 
                  variant="progress" 
                  progress={Math.min(100, Math.round(progress))} 
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          npm install react-ascii-ui
        </pre>
      </div>

      {/* Usage */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Usage</h2>
        <pre style={{
          backgroundColor: '#111',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#ccc',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
          {`import { AsciiLoader } from 'react-ascii-ui';

export default function Example() {
  return (
    <div>
      {/* Dots loader */}
      <AsciiLoader text="Loading data" />
      
      {/* Progress bar */}
      <AsciiLoader variant="progress" progress={75} />
    </div>
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Dots Loader */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Dots Loader</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <AsciiLoader />
              <AsciiLoader text="Saving" />
              <AsciiLoader text="Connecting to server" />
            </div>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`{/* Default loader */}
<AsciiLoader />

{/* Custom text */}
<AsciiLoader text="Saving" />
<AsciiLoader text="Connecting to server" />`}
          </pre>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Progress Bar</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <AsciiLoader variant="progress" progress={0} />
              <AsciiLoader variant="progress" progress={33} />
              <AsciiLoader variant="progress" progress={66} />
              <AsciiLoader variant="progress" progress={100} />
            </div>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`{/* Different progress values */}
<AsciiLoader variant="progress" progress={0} />
<AsciiLoader variant="progress" progress={33} />
<AsciiLoader variant="progress" progress={66} />
<AsciiLoader variant="progress" progress={100} />`}
          </pre>
        </div>

        {/* In Context */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>In Context</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontFamily: 'monospace', color: '#ccc' }}>
              <div style={{ padding: '15px', border: '1px solid #333' }}>
                <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>File Upload</h4>
                <AsciiLoader variant="progress" progress={42} />
                <p style={{ marginTop: '10px', fontSize: '12px' }}>Uploading document.pdf...</p>
              </div>
              
              <div style={{ padding: '15px', border: '1px solid #333' }}>
                <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>System Status</h4>
                <AsciiLoader text="Checking services" />
                <p style={{ marginTop: '10px', fontSize: '12px' }}>Please wait while we verify system health.</p>
              </div>
            </div>
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`{/* Upload progress */}
<div>
  <h4>File Upload</h4>
  <AsciiLoader variant="progress" progress={uploadProgress} />
  <p>Uploading document.pdf...</p>
</div>

{/* System check */}
<div>
  <h4>System Status</h4>
  <AsciiLoader text="Checking services" />
  <p>Please wait while we verify system health.</p>
</div>`}
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div id="api" style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        
        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Props</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Prop
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Type
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Default
                </th>
                <th style={{ 
                  padding: '12px', 
                  textAlign: 'left', 
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  variant
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'dots' | 'progress'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'dots'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Type of loader to display
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  text
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  string
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'Loading'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Text to display with dots loader
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  progress
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  number
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  50
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Progress percentage (0-100) for progress variant
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  className
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  string
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  ""
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Loader Variants</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>dots:</strong> Animated dots with customizable text</li>
            <li><strong>progress:</strong> ASCII progress bar with percentage display</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li>Smooth pulsing animation for dots variant</li>
            <li>Block-style progress bar using ▓ and ░ characters</li>
            <li>Automatic percentage display for progress variant</li>
            <li>Monospace font ensures consistent character alignment</li>
          </ul>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiLoader extends all HTML div attributes and React.HTMLAttributes.
        </p>
      </div>
    </div>
  );
}