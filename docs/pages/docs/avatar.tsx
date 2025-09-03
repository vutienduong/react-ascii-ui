import React, { useState } from 'react';
import { AsciiAvatar } from 'react-ascii-ui';

export default function AvatarDocs() {
  const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedColor, setSelectedColor] = useState<'default' | 'primary' | 'success' | 'warning' | 'error' | 'purple' | 'pink'>('default');
  const [selectedVariant, setSelectedVariant] = useState<'parentheses' | 'brackets' | 'braces'>('parentheses');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Avatar</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Display user initials in ASCII-styled brackets with various sizes, colors, and bracket types.
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
        backgroundColor: '#111',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <AsciiAvatar name="John Doe" size="xs" />
          <AsciiAvatar name="Jane Smith" size="sm" variant="brackets" color="primary" />
          <AsciiAvatar name="Alice Cooper" size="md" variant="braces" color="success" />
          <AsciiAvatar name="Bob Wilson" size="lg" color="warning" showBorder />
          <AsciiAvatar name="Charlie Brown Miller" size="xl" color="error" variant="brackets" />
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
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          <AsciiAvatar 
            name="Interactive User" 
            size={selectedSize}
            color={selectedColor}
            variant={selectedVariant}
            showBorder={true}
          />
        </div>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Size:</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="xs">XS</option>
              <option value="sm">SM</option>
              <option value="md">MD</option>
              <option value="lg">LG</option>
              <option value="xl">XL</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Color:</label>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="default">Default</option>
              <option value="primary">Primary</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="purple">Purple</option>
              <option value="pink">Pink</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Variant:</label>
            <select 
              value={selectedVariant} 
              onChange={(e) => setSelectedVariant(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="parentheses">( )</option>
              <option value="brackets">[ ]</option>
              <option value="braces">{ }</option>
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
          {`import { AsciiAvatar } from 'react-ascii-ui';

export default function Example() {
  return (
    <AsciiAvatar 
      name="John Doe"
      size="md"
      color="primary"
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

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
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiAvatar name="User" size="xs" />
            <AsciiAvatar name="User" size="sm" />
            <AsciiAvatar name="User" size="md" />
            <AsciiAvatar name="User" size="lg" />
            <AsciiAvatar name="User" size="xl" />
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
            {`<AsciiAvatar name="User" size="xs" />
<AsciiAvatar name="User" size="sm" />
<AsciiAvatar name="User" size="md" />
<AsciiAvatar name="User" size="lg" />
<AsciiAvatar name="User" size="xl" />`}
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
            gap: '15px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <AsciiAvatar name="User" color="default" />
            <AsciiAvatar name="User" color="primary" />
            <AsciiAvatar name="User" color="success" />
            <AsciiAvatar name="User" color="warning" />
            <AsciiAvatar name="User" color="error" />
            <AsciiAvatar name="User" color="purple" />
            <AsciiAvatar name="User" color="pink" />
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
            {`<AsciiAvatar name="User" color="default" />
<AsciiAvatar name="User" color="primary" />
<AsciiAvatar name="User" color="success" />
<AsciiAvatar name="User" color="warning" />
<AsciiAvatar name="User" color="error" />
<AsciiAvatar name="User" color="purple" />
<AsciiAvatar name="User" color="pink" />`}
          </pre>
        </div>

        {/* Different Variants */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Bracket Variants</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiAvatar name="User" variant="parentheses" />
            <AsciiAvatar name="User" variant="brackets" />
            <AsciiAvatar name="User" variant="braces" />
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
            {`<AsciiAvatar name="User" variant="parentheses" />
<AsciiAvatar name="User" variant="brackets" />
<AsciiAvatar name="User" variant="braces" />`}
          </pre>
        </div>

        {/* With Border */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>With Border</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            gap: '15px',
            alignItems: 'center'
          }}>
            <AsciiAvatar name="Jane Doe" showBorder color="success" />
            <AsciiAvatar name="Bob Smith" showBorder color="primary" variant="brackets" />
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
            {`<AsciiAvatar name="Jane Doe" showBorder color="success" />
<AsciiAvatar name="Bob Smith" showBorder color="primary" variant="brackets" />`}
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
                  name
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
                  Full name to generate initials from
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
                  'xs' | 'sm' | 'md' | 'lg' | 'xl'
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
                  Size variant of the avatar
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
                  'parentheses' | 'brackets' | 'braces'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'parentheses'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Type of brackets around initials
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
                  'default' | 'primary' | 'success' | 'warning' | 'error' | 'purple' | 'pink'
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
                  Color variant of the avatar
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showBorder
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
                  Whether to show a border around the avatar
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
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Smart Initials:</strong> Automatically extracts up to 3 initials from full name</li>
            <li><strong>Multiple Sizes:</strong> Five size variants from xs to xl</li>
            <li><strong>Bracket Variants:</strong> Choose between parentheses, brackets, or braces</li>
            <li><strong>Color Options:</strong> Seven color variants with semantic naming</li>
            <li><strong>Optional Border:</strong> Show/hide border that matches the text color</li>
            <li><strong>Tooltip Support:</strong> Shows full name on hover via title attribute</li>
          </ul>
        </div>

        <p style={{
          color: '#ccc',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiAvatar extends all HTML div attributes and supports all React div props.
        </p>
      </div>
    </div>
  );
}