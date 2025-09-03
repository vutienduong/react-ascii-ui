import React, { useState } from 'react';
import { AsciiLoader } from 'react-ascii-ui';

export default function SpinnerDocs() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiLoader (Spinner)</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Loading indicators and spinners with ASCII animations for showing progress and activity.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          border: '1px solid #333',
          backgroundColor: '#111',
          padding: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Dots Spinner</h4>
            <AsciiLoader variant="dots" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Progress Bar</h4>
            <AsciiLoader variant="progress" progress={65} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Custom Text</h4>
            <AsciiLoader variant="dots" text="Loading" />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Progress with Text</h4>
            <AsciiLoader variant="progress" progress={30} />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto'
        }}>
{`npm install react-ascii-ui`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Usage</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`import { AsciiLoader } from 'react-ascii-ui';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && (
        <AsciiLoader 
          variant="dots" 
          text="Loading data..." 
        />
      )}
    </div>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Basic Loading States</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div>
              <h5 style={{ color: '#ccc', marginBottom: '10px' }}>Processing</h5>
              <AsciiLoader variant="dots" text="Processing request..." />
            </div>
            <div>
              <h5 style={{ color: '#ccc', marginBottom: '10px' }}>Upload Progress</h5>
              <AsciiLoader 
                variant="progress" 
                progress={progress}
                text="Uploading files..."
              />
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={simulateProgress}
                  style={{
                    backgroundColor: '#333',
                    color: '#00ff00',
                    border: '1px solid #00ff00',
                    padding: '5px 10px',
                    fontFamily: 'monospace',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Start Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Different Variants</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }}>
            <div>
              <h5 style={{ color: '#ccc', marginBottom: '10px' }}>Dots</h5>
              <AsciiLoader variant="dots" />
            </div>
            <div>
              <h5 style={{ color: '#ccc', marginBottom: '10px' }}>Medium Text</h5>
              <AsciiLoader variant="dots" text="Medium" />
            </div>
            <div>
              <h5 style={{ color: '#ccc', marginBottom: '10px' }}>Loading...</h5>
              <AsciiLoader variant="dots" text="Loading..." />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Progress Variants</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '15px',
            textAlign: 'center'
          }}>
            <div>
              <h5 style={{ color: '#00ff00', marginBottom: '15px' }}>Upload complete</h5>
              <AsciiLoader variant="dots" text="Upload complete" />
            </div>
            <div>
              <h5 style={{ color: '#ff4444', marginBottom: '15px' }}>Connection failed</h5>
              <AsciiLoader variant="progress" progress={25} text="Connection failed" />
            </div>
            <div>
              <h5 style={{ color: '#ffaa00', marginBottom: '15px' }}>Retrying connection...</h5>
              <AsciiLoader variant="dots" text="Retrying connection..." />
            </div>
            <div>
              <h5 style={{ color: '#00ffff', marginBottom: '15px' }}>Syncing data</h5>
              <AsciiLoader variant="progress" progress={75} text="Syncing data" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Application Loading Flow</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AsciiLoader variant="dots" />
              <span style={{ color: '#ccc' }}>Connecting to server...</span>
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AsciiLoader variant="dots" text="Auth" />
              <span style={{ color: '#ccc' }}>Authenticating user...</span>
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AsciiLoader variant="progress" progress={50} />
              <span style={{ color: '#ccc' }}>Loading user preferences...</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AsciiLoader variant="progress" progress={90} />
              <span style={{ color: '#ccc' }}>Initializing dashboard... 90%</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        <div style={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>variant</td>
                <td style={{ padding: '8px', color: '#ccc' }}>"dots" | "progress"</td>
                <td style={{ padding: '8px', color: '#ccc' }}>dots</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Spinner animation type</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>text</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Loading</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Loading text to display</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>progress</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>50</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Progress value (0-100) for progress variant</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Spinner Variants</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <h4 style={{ color: '#ccc', marginBottom: '10px' }}>Dots Variant</h4>
              <pre style={{ color: '#fff', fontSize: '14px', backgroundColor: '#000', padding: '10px', borderRadius: '2px' }}>
{`Loading...`}
              </pre>
              <p style={{ color: '#ccc', fontSize: '12px', marginTop: '5px' }}>
                Animated dots that pulse in sequence
              </p>
            </div>
            <div>
              <h4 style={{ color: '#ccc', marginBottom: '10px' }}>Progress Variant</h4>
              <pre style={{ color: '#fff', fontSize: '14px', backgroundColor: '#000', padding: '10px', borderRadius: '2px' }}>
{`[▓▓▓▓▓░░░░░] (50%)`}
              </pre>
              <p style={{ color: '#ccc', fontSize: '12px', marginTop: '5px' }}>
                ASCII progress bar with percentage
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}