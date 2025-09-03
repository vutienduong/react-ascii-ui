import React, { useState } from 'react';
import { AsciiProgressBar } from 'react-ascii-ui';

export default function ProgressBarDocs() {
  const [progress, setProgress] = useState(65);
  const [variant, setVariant] = useState<'blocks' | 'bars' | 'dots'>('blocks');
  const [color, setColor] = useState<'default' | 'success' | 'warning' | 'error'>('default');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Progress Bar</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          ASCII-styled progress bars with different variants, sizes, and color schemes for displaying progress.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <AsciiProgressBar value={25} color="error" label="Loading..." />
            <AsciiProgressBar value={50} color="warning" variant="bars" />
            <AsciiProgressBar value={75} color="success" variant="dots" />
            <AsciiProgressBar value={100} color="default" showValue />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div style={{
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#0a0a0a'
      }}>
        <h3 style={{ color: '#fff', marginBottom: '20px' }}>Interactive Example</h3>
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
          <AsciiProgressBar 
            value={progress}
            variant={variant}
            color={color}
            label="Interactive Progress"
            showPercentage
            showValue
            max={100}
          />
        </div>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Progress:</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              style={{ width: '150px' }}
            />
            <div style={{ color: '#ccc', fontSize: '12px', textAlign: 'center', fontFamily: 'monospace' }}>
              {progress}%
            </div>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Variant:</label>
            <select 
              value={variant} 
              onChange={(e) => setVariant(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="blocks">Blocks</option>
              <option value="bars">Bars</option>
              <option value="dots">Dots</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Color:</label>
            <select 
              value={color} 
              onChange={(e) => setColor(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="default">Default</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
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
          {`import { AsciiProgressBar } from 'react-ascii-ui';

export default function Example() {
  return (
    <AsciiProgressBar 
      value={75}
      label="Loading..."
      color="success"
      showPercentage
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        {/* Different Variants */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Variants</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiProgressBar value={60} variant="blocks" label="Blocks" />
            <AsciiProgressBar value={60} variant="bars" label="Bars" />
            <AsciiProgressBar value={60} variant="dots" label="Dots" />
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
            {`<AsciiProgressBar value={60} variant="blocks" />
<AsciiProgressBar value={60} variant="bars" />
<AsciiProgressBar value={60} variant="dots" />`}
          </pre>
        </div>

        {/* Different Sizes */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Sizes</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiProgressBar value={70} size="sm" label="Small" />
            <AsciiProgressBar value={70} size="md" label="Medium" />
            <AsciiProgressBar value={70} size="lg" label="Large" />
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
            {`<AsciiProgressBar value={70} size="sm" />
<AsciiProgressBar value={70} size="md" />
<AsciiProgressBar value={70} size="lg" />`}
          </pre>
        </div>

        {/* Different Colors */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Colors</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiProgressBar value={25} color="error" label="Error" />
            <AsciiProgressBar value={50} color="warning" label="Warning" />
            <AsciiProgressBar value={75} color="success" label="Success" />
            <AsciiProgressBar value={100} color="default" label="Default" />
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
            {`<AsciiProgressBar value={25} color="error" />
<AsciiProgressBar value={50} color="warning" />
<AsciiProgressBar value={75} color="success" />
<AsciiProgressBar value={100} color="default" />`}
          </pre>
        </div>

        {/* With Labels and Values */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Labels and Values</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiProgressBar value={30} label="Downloading..." showPercentage />
            <AsciiProgressBar value={45} max={60} showValue showPercentage={false} />
            <AsciiProgressBar value={80} label="Upload Progress" showValue showPercentage />
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
            {`<AsciiProgressBar value={30} label="Downloading..." showPercentage />
<AsciiProgressBar value={45} max={60} showValue />
<AsciiProgressBar value={80} label="Upload" showValue showPercentage />`}
          </pre>
        </div>

        {/* Custom Max Value */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Custom Max Value</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiProgressBar value={7} max={10} label="Rating" showValue />
            <AsciiProgressBar value={150} max={200} label="XP Points" showValue showPercentage />
            <AsciiProgressBar value={3} max={5} label="Stars" showValue variant="dots" />
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
            {`<AsciiProgressBar value={7} max={10} showValue />
<AsciiProgressBar value={150} max={200} showValue showPercentage />
<AsciiProgressBar value={3} max={5} variant="dots" showValue />`}
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
                  value
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
                  -
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Current progress value (0-max)
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  max
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
                  100
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Maximum value for progress calculation
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  size
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'sm' | 'md' | 'lg'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'md'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Size of the progress bar
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showPercentage
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  boolean
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  true
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether to show percentage text
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showValue
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  boolean
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  false
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether to show value/max text
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  label
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
                  -
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Optional label displayed above progress bar
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
                  'blocks' | 'bars' | 'dots'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'blocks'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Visual style variant
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
                  'default' | 'success' | 'warning' | 'error'
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
                  Color theme for the progress bar
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
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Variants</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Blocks:</strong> Uses solid blocks (▓) and light blocks (░) characters</li>
            <li><strong>Bars:</strong> Uses full height (█) and minimal height (▁) bar characters</li>
            <li><strong>Dots:</strong> Uses filled dots (●) and empty circles (○) characters</li>
          </ul>
          
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px', marginTop: '15px' }}>Sizes</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Small (sm):</strong> 10 characters wide</li>
            <li><strong>Medium (md):</strong> 20 characters wide</li>
            <li><strong>Large (lg):</strong> 30 characters wide</li>
          </ul>
          
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px', marginTop: '15px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Automatic Clamping:</strong> Values are automatically constrained between 0 and max</li>
            <li><strong>Flexible Display:</strong> Show percentage, raw values, or both</li>
            <li><strong>Custom Max:</strong> Support for non-100 based progress scales</li>
            <li><strong>Bracket Styling:</strong> Progress bar wrapped in square brackets</li>
          </ul>
        </div>

        <p style={{
          color: '#ccc',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiProgressBar extends all HTML div attributes and supports all React div props.
        </p>
      </div>
    </div>
  );
}