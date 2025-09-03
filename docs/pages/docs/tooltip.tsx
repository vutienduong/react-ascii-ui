import React, { useState } from 'react';
import { AsciiTooltip } from 'react-ascii-ui';

export default function TooltipDocs() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiTooltip</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Hover information display component with ASCII-styled borders and positioning.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          border: '1px solid #333',
          backgroundColor: '#111',
          padding: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
            <AsciiTooltip content="This is a tooltip on top!" position="top">
              <button style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px'
              }} 
              className="before:content-['['] after:content-[']'] hover:text-green-400">
                Hover for top tooltip
              </button>
            </AsciiTooltip>

            <AsciiTooltip content="Right side tooltip with longer text that wraps nicely!" position="right">
              <button style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px'
              }} 
              className="before:content-['['] after:content-[']'] hover:text-blue-400">
                Right tooltip
              </button>
            </AsciiTooltip>

            <AsciiTooltip content="Bottom tooltip here!" position="bottom">
              <button style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px'
              }} 
              className="before:content-['['] after:content-[']'] hover:text-yellow-400">
                Bottom tooltip
              </button>
            </AsciiTooltip>

            <AsciiTooltip content="Left side information!" position="left">
              <button style={{
                fontFamily: 'monospace',
                color: '#fff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '10px'
              }} 
              className="before:content-['['] after:content-[']'] hover:text-red-400">
                Left tooltip
              </button>
            </AsciiTooltip>
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
{`import { AsciiTooltip } from 'react-ascii-ui';

export default function App() {
  return (
    <AsciiTooltip 
      content="This is helpful information!" 
      position="top"
      delay={300}
    >
      <button>Hover me</button>
    </AsciiTooltip>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Different Positions</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            justifyItems: 'center'
          }}>
            <AsciiTooltip content="Top tooltip" position="top">
              <span style={{ 
                padding: '10px 20px', 
                border: '1px solid #333', 
                color: '#ccc',
                cursor: 'pointer'
              }}>
                Top
              </span>
            </AsciiTooltip>

            <AsciiTooltip content="Right tooltip with more detailed information" position="right">
              <span style={{ 
                padding: '10px 20px', 
                border: '1px solid #333', 
                color: '#ccc',
                cursor: 'pointer'
              }}>
                Right
              </span>
            </AsciiTooltip>

            <AsciiTooltip content="Bottom tooltip" position="bottom">
              <span style={{ 
                padding: '10px 20px', 
                border: '1px solid #333', 
                color: '#ccc',
                cursor: 'pointer'
              }}>
                Bottom
              </span>
            </AsciiTooltip>

            <AsciiTooltip content="Left tooltip" position="left">
              <span style={{ 
                padding: '10px 20px', 
                border: '1px solid #333', 
                color: '#ccc',
                cursor: 'pointer'
              }}>
                Left
              </span>
            </AsciiTooltip>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Disabled Tooltip</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <AsciiTooltip 
                content="This tooltip won't show because it's disabled" 
                position="top"
                disabled={true}
              >
                <span style={{ color: '#666', padding: '10px' }}>
                  Disabled Tooltip (hover me)
                </span>
              </AsciiTooltip>
              
              <AsciiTooltip 
                content="This tooltip has a longer delay" 
                position="top"
                delay={1000}
              >
                <span style={{ color: '#ccc', padding: '10px' }}>
                  Slow Tooltip (wait 1s)
                </span>
              </AsciiTooltip>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Interactive Elements</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <AsciiTooltip content="Delete this item permanently" position="top">
              <button style={{
                fontFamily: 'monospace',
                color: '#ff4444',
                backgroundColor: 'transparent',
                border: '1px solid #ff4444',
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '2px'
              }}>
                Delete
              </button>
            </AsciiTooltip>

            <AsciiTooltip content="Save changes to the database" position="top">
              <button style={{
                fontFamily: 'monospace',
                color: '#00ff00',
                backgroundColor: 'transparent',
                border: '1px solid #00ff00',
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '2px'
              }}>
                Save
              </button>
            </AsciiTooltip>

            <AsciiTooltip content="Download as PDF file" position="top">
              <button style={{
                fontFamily: 'monospace',
                color: '#00ffff',
                backgroundColor: 'transparent',
                border: '1px solid #00ffff',
                cursor: 'pointer',
                padding: '5px 10px',
                borderRadius: '2px'
              }}>
                Download
              </button>
            </AsciiTooltip>
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
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>content</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Tooltip text content</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>position</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'top' | 'right' | 'bottom' | 'left'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>'top'</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Tooltip position relative to child</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>children</td>
                <td style={{ padding: '8px', color: '#ccc' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Element to trigger tooltip on</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>delay</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>500</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Delay before showing tooltip (ms)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>className</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>""</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Additional CSS classes for tooltip</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>disabled</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>false</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Disable tooltip functionality</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#111' }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Tooltip Features</h3>
        <ul style={{ color: '#ccc', fontSize: '14px', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Four positioning options (top, right, bottom, left)</li>
          <li>Automatic positioning with collision detection</li>
          <li>Configurable show/hide delay</li>
          <li>Controlled visibility for programmatic control</li>
          <li>ASCII-styled border with monospace font</li>
          <li>Responsive text wrapping for long content</li>
          <li>Works with any trigger element</li>
        </ul>
      </div>
    </div>
  );
}