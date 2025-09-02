import React from 'react';
import { AsciiBadge } from 'react-ascii-ui';

export default function BadgeDocs() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Badge</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Small status indicators and labels with ASCII-style bracket notation.
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
          {/* Colors */}
          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>Colors:</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <AsciiBadge>Default</AsciiBadge>
              <AsciiBadge color="primary">Primary</AsciiBadge>
              <AsciiBadge color="success">Success</AsciiBadge>
              <AsciiBadge color="warning">Warning</AsciiBadge>
              <AsciiBadge color="error">Error</AsciiBadge>
            </div>
          </div>

          {/* Variants */}
          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>Variants:</h4>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <AsciiBadge variant="square">Square</AsciiBadge>
              <AsciiBadge variant="curly">Curly</AsciiBadge>
              <AsciiBadge variant="square" color="primary">Square Primary</AsciiBadge>
              <AsciiBadge variant="curly" color="success">Curly Success</AsciiBadge>
            </div>
          </div>

          {/* Use Cases */}
          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>Use Cases:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ccc', fontFamily: 'monospace' }}>Status:</span>
                <AsciiBadge color="success">ONLINE</AsciiBadge>
                <AsciiBadge color="error">OFFLINE</AsciiBadge>
                <AsciiBadge color="warning">PENDING</AsciiBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ccc', fontFamily: 'monospace' }}>Tags:</span>
                <AsciiBadge variant="curly">NEW</AsciiBadge>
                <AsciiBadge variant="curly" color="primary">BETA</AsciiBadge>
                <AsciiBadge variant="curly" color="warning">HOT</AsciiBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ color: '#ccc', fontFamily: 'monospace' }}>Counts:</span>
                <AsciiBadge color="primary">5</AsciiBadge>
                <AsciiBadge color="success">12</AsciiBadge>
                <AsciiBadge color="error">0</AsciiBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Installation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: '#333', 
              border: '1px solid #666', 
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              npm
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              yarn
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              pnpm
            </button>
          </div>
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
          {`import { AsciiBadge } from 'react-ascii-ui';

export default function Example() {
  return (
    <div>
      <AsciiBadge>Default</AsciiBadge>
      <AsciiBadge color="success">Success</AsciiBadge>
      <AsciiBadge variant="curly" color="primary">New</AsciiBadge>
    </div>
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Badge</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiBadge>Badge</AsciiBadge>
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
            {`<AsciiBadge>Badge</AsciiBadge>`}
          </pre>
        </div>

        {/* Color Variants */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Colors</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <AsciiBadge color="default">Default</AsciiBadge>
              <AsciiBadge color="primary">Primary</AsciiBadge>
              <AsciiBadge color="success">Success</AsciiBadge>
              <AsciiBadge color="warning">Warning</AsciiBadge>
              <AsciiBadge color="error">Error</AsciiBadge>
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
            {`<AsciiBadge color="default">Default</AsciiBadge>
<AsciiBadge color="primary">Primary</AsciiBadge>
<AsciiBadge color="success">Success</AsciiBadge>
<AsciiBadge color="warning">Warning</AsciiBadge>
<AsciiBadge color="error">Error</AsciiBadge>`}
          </pre>
        </div>

        {/* Variants */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Square vs Curly</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <AsciiBadge variant="square">Square</AsciiBadge>
              <AsciiBadge variant="curly">Curly</AsciiBadge>
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
            {`<AsciiBadge variant="square">Square</AsciiBadge>
<AsciiBadge variant="curly">Curly</AsciiBadge>`}
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontFamily: 'monospace', color: '#ccc' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Server Status:</span>
                <AsciiBadge color="success">ONLINE</AsciiBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Build #1234</span>
                <AsciiBadge color="warning">PENDING</AsciiBadge>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>Node.js App</span>
                <AsciiBadge variant="curly" color="primary">NEW</AsciiBadge>
                <AsciiBadge variant="curly" color="success">STABLE</AsciiBadge>
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
            {`<div>
  <span>Server Status:</span>
  <AsciiBadge color="success">ONLINE</AsciiBadge>
</div>
<div>
  <span>Node.js App</span>
  <AsciiBadge variant="curly" color="primary">NEW</AsciiBadge>
  <AsciiBadge variant="curly" color="success">STABLE</AsciiBadge>
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
                  children
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  React.ReactNode
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  -
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  The content displayed inside the badge
                </td>
              </tr>
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
                  'square' | 'curly'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'square'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Bracket style - square [text] or curly {'{text}'}
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  color
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'default' | 'primary' | 'success' | 'warning' | 'error'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'default'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Color theme of the badge
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
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Color Schemes</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>default:</strong> White text</li>
            <li><strong>primary:</strong> Blue text</li>
            <li><strong>success:</strong> Green text</li>
            <li><strong>warning:</strong> Yellow text</li>
            <li><strong>error:</strong> Red text</li>
          </ul>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiBadge extends all HTML span attributes and React.HTMLAttributes.
        </p>
      </div>
    </div>
  );
}