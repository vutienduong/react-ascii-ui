import React, { useState } from 'react';
import { AsciiChart } from 'react-ascii-ui';

export default function ChartDocs() {
  const [chartData, setChartData] = useState([3, 7, 4, 9, 2, 8, 5, 6, 1, 4]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  const [chartColor, setChartColor] = useState<'default' | 'success' | 'warning' | 'error' | 'primary'>('default');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Chart</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          ASCII-styled data visualization components with bar, line, and area chart variants.
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
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'start' }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>Bar Chart</h4>
            <AsciiChart 
              data={[5, 8, 3, 9, 2, 7, 4, 6]}
              type="bar"
              color="success"
              showValues
            />
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>Line Chart</h4>
            <AsciiChart 
              data={[2, 5, 3, 8, 4, 6, 1, 7]}
              type="line"
              color="primary"
            />
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px', textAlign: 'center' }}>Area Chart</h4>
            <AsciiChart 
              data={[1, 4, 2, 6, 3, 5, 2, 4]}
              type="area"
              color="warning"
            />
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
          <AsciiChart 
            data={chartData}
            type={chartType}
            color={chartColor}
            title="Sample Data"
            showValues
            height={10}
          />
        </div>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Type:</label>
            <select 
              value={chartType} 
              onChange={(e) => setChartType(e.target.value as any)}
              style={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                border: '1px solid #333', 
                padding: '5px',
                fontFamily: 'monospace'
              }}
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="area">Area</option>
            </select>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Color:</label>
            <select 
              value={chartColor} 
              onChange={(e) => setChartColor(e.target.value as any)}
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
            </select>
          </div>
          <div>
            <label style={{ color: '#ccc', display: 'block', marginBottom: '5px', fontSize: '14px' }}>Data:</label>
            <button 
              onClick={() => setChartData(Array.from({ length: 10 }, () => Math.floor(Math.random() * 10) + 1))}
              style={{ 
                backgroundColor: '#333', 
                color: '#fff', 
                border: '1px solid #666', 
                padding: '5px 10px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}
            >
              Random Data
            </button>
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
          {`import { AsciiChart } from 'react-ascii-ui';

export default function Example() {
  const data = [3, 7, 4, 9, 2, 8, 5];

  return (
    <AsciiChart 
      data={data}
      type="bar"
      color="success"
      title="Sales Data"
      showValues
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        {/* Bar Chart */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Bar Chart</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiChart 
              data={[5, 8, 3, 9, 2, 7, 4, 6]}
              type="bar"
              height={6}
              showValues
            />
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
            {`<AsciiChart 
  data={[5, 8, 3, 9, 2, 7, 4, 6]}
  type="bar"
  height={6}
  showValues
/>`}
          </pre>
        </div>

        {/* Line Chart */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Line Chart</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiChart 
              data={[2, 5, 3, 8, 4, 6, 1, 7, 3, 5]}
              type="line"
              color="primary"
              height={8}
            />
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
            {`<AsciiChart 
  data={[2, 5, 3, 8, 4, 6, 1, 7, 3, 5]}
  type="line"
  color="primary"
  height={8}
/>`}
          </pre>
        </div>

        {/* Area Chart */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Area Chart</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiChart 
              data={[1, 4, 2, 6, 3, 5, 2, 4]}
              type="area"
              color="success"
              height={7}
            />
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
            {`<AsciiChart 
  data={[1, 4, 2, 6, 3, 5, 2, 4]}
  type="area"
  color="success"
  height={7}
/>`}
          </pre>
        </div>

        {/* With Title and Values */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>With Title and Values</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiChart 
              data={[12, 19, 3, 17, 6, 3, 19, 6]}
              type="bar"
              color="warning"
              title="Monthly Revenue"
              showValues
              height={8}
            />
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
            {`<AsciiChart 
  data={[12, 19, 3, 17, 6, 3, 19, 6]}
  type="bar"
  color="warning"
  title="Monthly Revenue"
  showValues
  height={8}
/>`}
          </pre>
        </div>

        {/* Error Chart */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Error Visualization</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <AsciiChart 
              data={[7, 2, 9, 1, 8, 3, 6, 4]}
              type="area"
              color="error"
              title="System Errors"
              showValues
            />
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
            {`<AsciiChart 
  data={[7, 2, 9, 1, 8, 3, 6, 4]}
  type="area"
  color="error"
  title="System Errors"
  showValues
/>`}
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
                  data
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  number[]
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
                  Array of numeric data points to visualize
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  type
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'bar' | 'line' | 'area'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'bar'
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Chart visualization type
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  height
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
                  8
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Height of the chart in character rows
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  width
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
                  data.length
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Width of the chart in characters
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  showValues
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
                  Whether to show min/max values below the chart
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
                  'default' | 'success' | 'warning' | 'error' | 'primary'
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
                  Color theme for the chart
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  title
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
                  Optional title displayed above the chart
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
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Chart Types</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Bar Chart:</strong> Uses solid blocks (▇) for data visualization</li>
            <li><strong>Line Chart:</strong> Connects data points with dots (●) and vertical lines (│)</li>
            <li><strong>Area Chart:</strong> Filled areas with solid (▓) and gradient (▒) patterns</li>
          </ul>
          
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px', marginTop: '15px' }}>Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Auto Normalization:</strong> Data is automatically scaled to fit the chart height</li>
            <li><strong>Color Themes:</strong> Five semantic color variants for different data types</li>
            <li><strong>Responsive:</strong> Charts adapt to different data lengths</li>
            <li><strong>Value Display:</strong> Optional min/max value indicators</li>
            <li><strong>ASCII Styling:</strong> Pure ASCII characters for retro aesthetic</li>
          </ul>
        </div>

        <p style={{
          color: '#ccc',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiChart extends all HTML div attributes and supports all React div props.
        </p>
      </div>
    </div>
  );
}