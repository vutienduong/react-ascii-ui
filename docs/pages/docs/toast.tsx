import React, { useState } from 'react';
import { AsciiToast } from 'react-ascii-ui';

export default function ToastDocs() {
  const [toasts, setToasts] = useState<Array<{
    id: number;
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
    duration?: number;
  }>>([]);

  const addToast = (type: 'info' | 'success' | 'warning' | 'error', message: string, duration?: number) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, type, message, duration }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiToast</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Temporary notification messages with ASCII styling and automatic dismissal.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          border: '1px solid #333',
          backgroundColor: '#111',
          padding: '20px',
          position: 'relative',
          minHeight: '200px'
        }}>
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => addToast('info', 'This is an info message')}
              style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
              className="before:content-['['] after:content-[']'] hover:text-blue-400"
            >
              Show Info
            </button>
            <button
              onClick={() => addToast('success', 'Operation completed successfully')}
              style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
              className="before:content-['['] after:content-[']'] hover:text-green-400"
            >
              Show Success
            </button>
            <button
              onClick={() => addToast('warning', 'Please check your input')}
              style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
              className="before:content-['['] after:content-[']'] hover:text-yellow-400"
            >
              Show Warning
            </button>
            <button
              onClick={() => addToast('error', 'Something went wrong!')}
              style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
              className="before:content-['['] after:content-[']'] hover:text-red-400"
            >
              Show Error
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            {toasts.map(toast => (
              <AsciiToast
                key={toast.id}
                type={toast.type}
                message={toast.message}
                duration={toast.duration}
                isVisible={true}
                onClose={() => removeToast(toast.id)}
                position="top-right"
              />
            ))}
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
{`import { AsciiToast } from 'react-ascii-ui';

export default function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>
        Show Toast
      </button>

      <AsciiToast
        type="success"
        message="Operation completed successfully"
        duration={3000}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        position="bottom-right"
      />
    </div>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Toast Types</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <AsciiToast
                type="info"
                message="This is an informational message"
                duration={0}
                isVisible={true}
                onClose={() => {}}
              />
              <AsciiToast
                type="success"
                message="Operation completed successfully"
                duration={0}
                isVisible={true}
                onClose={() => {}}
              />
              <AsciiToast
                type="warning"
                message="Please review your settings"
                duration={0}
                isVisible={true}
                onClose={() => {}}
              />
              <AsciiToast
                type="error"
                message="Failed to save changes"
                duration={0}
                isVisible={true}
                onClose={() => {}}
              />
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Auto-dismiss Toast</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <button
              onClick={() => addToast('info', 'This toast will disappear in 2 seconds', 2000)}
              style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '5px 10px'
              }}
              className="before:content-['['] after:content-[']'] hover:text-blue-400"
            >
              Show Auto-dismiss Toast
            </button>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Simple Message Toast</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <AsciiToast
              type="success"
              message="File saved successfully"
              duration={0}
              isVisible={true}
              onClose={() => {}}
            />
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
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>message</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Toast message text</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>type</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'info' | 'success' | 'warning' | 'error'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'info'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Toast type for styling</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>duration</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>4000</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Auto-dismiss duration (0 = no auto-dismiss)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>isVisible</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Controls toast visibility</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>onClose</td>
                <td style={{ padding: '8px', color: '#ccc' }}>{'() => void'}</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Called when toast is closed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>position</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'bottom-right'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Toast position on screen</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>showCloseButton</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>true</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Show/hide close button</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#111' }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Toast Features</h3>
        <ul style={{ color: '#ccc', fontSize: '14px', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Four toast types with distinct ASCII styling</li>
          <li>Automatic dismissal with configurable duration</li>
          <li>Manual dismiss with close button</li>
          <li>Optional message content below title</li>
          <li>Monospace font with bracket notation</li>
          <li>Type-specific color coding</li>
        </ul>
      </div>
    </div>
  );
}