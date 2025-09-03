import React, { useState, useEffect } from 'react';
import { AsciiProgressBar } from 'react-ascii-ui';

export default function ProgressDocs() {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const simulateDownload = () => {
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiProgressBar</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Progress bars with ASCII block characters for showing completion status and loading progress.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          border: '1px solid #333',
          backgroundColor: '#111',
          padding: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '25px'
        }}>
          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>
              Static Progress (75%)
            </h4>
            <AsciiProgressBar value={75} color="success" />
          </div>

          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>
              Animated Progress ({Math.round(animatedProgress)}%)
            </h4>
            <AsciiProgressBar value={animatedProgress} color="success" />
          </div>

          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>
              Download Progress ({Math.round(downloadProgress)}%)
            </h4>
            <div style={{ marginBottom: '10px' }}>
              <span style={{ color: '#ccc' }}>
                Downloading... {Math.round(downloadProgress)}%
              </span>
            </div>
            <AsciiProgressBar value={downloadProgress} color="default" />
            <div style={{ marginTop: '10px' }}>
              <button 
                onClick={simulateDownload}
                style={{
                  backgroundColor: '#333',
                  color: '#00ff00',
                  border: '1px solid #00ff00',
                  padding: '5px 10px',
                  fontFamily: 'monospace',
                  cursor: 'pointer'
                }}
              >
                Start Download
              </button>
            </div>
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
{`import { AsciiProgressBar } from 'react-ascii-ui';

export default function App() {
  const [progress, setProgress] = useState(0);

  return (
    <AsciiProgressBar 
      value={progress} 
      color="success" 
      showPercentage={true}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Different Sizes</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '20px'
          }}>
            <div>
              <div style={{ marginBottom: '8px', color: '#ccc' }}>Small (width: 30%)</div>
              <div style={{ width: '30%' }}><AsciiProgressBar value={70} /></div>
            </div>
            <div>
              <div style={{ marginBottom: '8px', color: '#ccc' }}>Medium (width: 50%)</div>
              <div style={{ width: '50%' }}><AsciiProgressBar value={70} color="warning" /></div>
            </div>
            <div>
              <div style={{ marginBottom: '8px', color: '#ccc' }}>Large (width: 80%)</div>
              <div style={{ width: '80%' }}><AsciiProgressBar value={70} color="error" /></div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Color Variants</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '15px'
          }}>
            <div>
              <div style={{ marginBottom: '5px', color: '#ccc' }}>Default</div>
              <AsciiProgressBar value={60} color="default" />
            </div>
            <div>
              <div style={{ marginBottom: '5px', color: '#ccc' }}>Success</div>
              <AsciiProgressBar value={80} color="success" />
            </div>
            <div>
              <div style={{ marginBottom: '5px', color: '#ccc' }}>Warning</div>
              <AsciiProgressBar value={65} color="warning" />
            </div>
            <div>
              <div style={{ marginBottom: '5px', color: '#ccc' }}>Error</div>
              <AsciiProgressBar value={25} color="error" />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>System Status Dashboard</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ color: '#ccc' }}>CPU Usage:</span>
              <AsciiProgressBar value={85} color="warning" />
              <span style={{ color: '#ffaa00', textAlign: 'right' }}>85%</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ color: '#ccc' }}>Memory:</span>
              <AsciiProgressBar value={92} color="error" />
              <span style={{ color: '#ff4444', textAlign: 'right' }}>92%</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ color: '#ccc' }}>Disk Space:</span>
              <AsciiProgressBar value={45} color="default" />
              <span style={{ color: '#00ffff', textAlign: 'right' }}>45%</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 60px', gap: '15px', alignItems: 'center' }}>
              <span style={{ color: '#ccc' }}>Network:</span>
              <AsciiProgressBar value={30} color="success" />
              <span style={{ color: '#00ff00', textAlign: 'right' }}>30%</span>
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
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>value</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>0</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Progress value (0-100)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>color</td>
                <td style={{ padding: '8px', color: '#ccc' }}>ColorVariant</td>
                <td style={{ padding: '8px', color: '#ccc' }}>default</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Progress bar color theme</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>showPercentage</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>false</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Show percentage text</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>className</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>""</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Color Variants</h3>
          <p style={{ color: '#ccc', marginBottom: '10px' }}>
            Available color options: "default" | "success" | "warning" | "error"
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <div>
              <div style={{ color: '#ccc', marginBottom: '5px' }}>default</div>
              <div style={{ fontFamily: 'monospace', color: '#00ffff' }}>██████░░░░ 60%</div>
            </div>
            <div>
              <div style={{ color: '#ccc', marginBottom: '5px' }}>success</div>
              <div style={{ fontFamily: 'monospace', color: '#00ff00' }}>████████░░ 80%</div>
            </div>
            <div>
              <div style={{ color: '#ccc', marginBottom: '5px' }}>warning</div>
              <div style={{ fontFamily: 'monospace', color: '#ffaa00' }}>██████░░░░ 65%</div>
            </div>
            <div>
              <div style={{ color: '#ccc', marginBottom: '5px' }}>error</div>
              <div style={{ fontFamily: 'monospace', color: '#ff4444' }}>██░░░░░░░░ 25%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}