import React, { useState } from 'react';
import { AsciiPopover } from 'react-ascii-ui';

export default function PopoverDocs() {
  const [showControlled, setShowControlled] = useState(false);

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiPopover</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Contextual overlay components with ASCII styling for displaying additional information and actions.
        </p>
        
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Basic Click Trigger</h4>
            <AsciiPopover content="This is a click-triggered popover!" position="top">
              <button style={{
                backgroundColor: '#333',
                color: '#00ff00',
                border: '1px solid #00ff00',
                padding: '8px 15px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}>
                Click Me
              </button>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Hover Trigger</h4>
            <AsciiPopover content="This appears on hover!" position="bottom" trigger="hover">
              <button style={{
                backgroundColor: '#333',
                color: '#ffaa00',
                border: '1px solid #ffaa00',
                padding: '8px 15px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}>
                Hover Me
              </button>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>User Profile Card</h4>
            <AsciiPopover 
              content={
                <div>
                  <div style={{ color: '#00ff00', marginBottom: '5px', fontWeight: 'bold' }}>John Doe</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '8px' }}>john.doe@example.com</div>
                  <div style={{ borderTop: '1px solid #333', paddingTop: '8px', marginTop: '8px' }}>
                    <div style={{ fontSize: '12px', color: '#ccc' }}>Last login: 2 hours ago</div>
                  </div>
                </div>
              } 
              position="bottom"
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333',
                border: '2px solid #00ff00',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00ff00',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                JD
              </div>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Action Menu</h4>
            <AsciiPopover 
              content={
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    📝 Edit
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    📋 Copy
                  </button>
                  <button style={{
                    backgroundColor: 'transparent',
                    color: '#ff4444',
                    border: 'none',
                    padding: '5px 10px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    🗑️ Delete
                  </button>
                </div>
              } 
              position="bottom"
            >
              <button style={{
                backgroundColor: '#333',
                color: '#fff',
                border: '1px solid #ccc',
                padding: '8px 12px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}>
                ⋮ Actions
              </button>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Tooltip Help</h4>
            <AsciiPopover 
              content="This feature allows you to manage user permissions and access controls"
              position="top"
              trigger="hover"
            >
              <span style={{
                color: '#ccc',
                cursor: 'help',
                borderBottom: '1px dotted #ccc'
              }}>
                User Management ℹ️
              </span>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Notification Badge</h4>
            <AsciiPopover 
              content={
                <div>
                  <div style={{ color: '#ff4444', marginBottom: '5px', fontWeight: 'bold' }}>3 New Messages</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '8px' }}>• Meeting reminder at 3 PM</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '8px' }}>• Code review request</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>• System update available</div>
                </div>
              } 
              position="left"
            >
              <div style={{
                position: 'relative',
                backgroundColor: '#333',
                color: '#fff',
                border: '1px solid #ccc',
                padding: '8px 12px',
                fontFamily: 'monospace',
                cursor: 'pointer'
              }}>
                🔔 Notifications
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#ff4444',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  3
                </span>
              </div>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Status Indicator</h4>
            <AsciiPopover 
              content={
                <div>
                  <div style={{ color: '#00ff00', marginBottom: '5px', fontWeight: 'bold' }}>System Status: Healthy</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>• CPU: 45%</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>• Memory: 62%</div>
                  <div style={{ color: '#ccc', fontSize: '12px', marginBottom: '4px' }}>• Disk: 38%</div>
                  <div style={{ color: '#ccc', fontSize: '12px' }}>• Uptime: 7 days</div>
                </div>
              } 
              position="right"
              trigger="hover"
            >
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1a4a1a',
                color: '#00ff00',
                border: '1px solid #00ff00',
                padding: '6px 12px',
                fontFamily: 'monospace',
                cursor: 'pointer',
                borderRadius: '4px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#00ff00',
                  animation: 'pulse 2s infinite'
                }}></div>
                Online
              </div>
            </AsciiPopover>
          </div>

          <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '30px', textAlign: 'center' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Code Documentation</h4>
            <AsciiPopover 
              content={
                <div style={{ fontFamily: 'monospace', fontSize: '11px' }}>
                  <div style={{ color: '#00ff00', marginBottom: '8px' }}>Function: calculateTotal()</div>
                  <div style={{ color: '#ccc', marginBottom: '8px' }}>
                    Parameters:<br/>
                    • items: Array&lt;Item&gt;<br/>
                    • tax: number (optional)
                  </div>
                  <div style={{ color: '#ccc', fontSize: '10px' }}>
                    Returns the total price including tax
                  </div>
                </div>
              } 
              position="top"
              trigger="hover"
            >
              <code style={{
                backgroundColor: '#2a2a2a',
                color: '#fff',
                padding: '4px 8px',
                borderRadius: '3px',
                cursor: 'help',
                border: '1px solid #444'
              }}>
                calculateTotal()
              </code>
            </AsciiPopover>
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
{`import { AsciiPopover } from 'react-ascii-ui';

export default function App() {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <AsciiPopover
      content="Helpful information here!"
      position="top"
      trigger="click"
      visible={showPopover}
      onVisibilityChange={setShowPopover}
    >
      <button>Show Info</button>
    </AsciiPopover>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Advanced Examples</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Controlled Popover</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '30px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <AsciiPopover
                content="This popover is controlled externally!"
                position="top"
                visible={showControlled}
                onVisibilityChange={setShowControlled}
              >
                <button style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  border: '1px solid #ccc',
                  padding: '8px 15px',
                  fontFamily: 'monospace',
                  cursor: 'pointer'
                }}>
                  Target Element
                </button>
              </AsciiPopover>
              
              <button 
                onClick={() => setShowControlled(!showControlled)}
                style={{
                  backgroundColor: showControlled ? '#ff4444' : '#00ff00',
                  color: '#000',
                  border: 'none',
                  padding: '8px 15px',
                  fontFamily: 'monospace',
                  cursor: 'pointer'
                }}
              >
                {showControlled ? 'Hide' : 'Show'} Popover
              </button>
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
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>children</td>
                <td style={{ padding: '8px', color: '#ccc' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Trigger element</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>content</td>
                <td style={{ padding: '8px', color: '#ccc' }}>ReactNode</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Popover content</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>position</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Position</td>
                <td style={{ padding: '8px', color: '#ccc' }}>top</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Popover position relative to trigger</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>trigger</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Trigger</td>
                <td style={{ padding: '8px', color: '#ccc' }}>click</td>
                <td style={{ padding: '8px', color: '#ccc' }}>How popover is triggered</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>visible</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Controlled visibility</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>onVisibilityChange</td>
                <td style={{ padding: '8px', color: '#ccc' }}>{'(visible: boolean) => void'}</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Visibility change callback</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>delay</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>0</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Show/hide delay in milliseconds</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>offset</td>
                <td style={{ padding: '8px', color: '#ccc' }}>number</td>
                <td style={{ padding: '8px', color: '#ccc' }}>8</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Distance from trigger element</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>arrow</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>true</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Show arrow pointer</td>
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
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Type Definitions</h3>
          <pre style={{ color: '#ccc', fontSize: '14px' }}>
{`type Position = 'top' | 'bottom' | 'left' | 'right';
type Trigger = 'click' | 'hover';`}
          </pre>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#111' }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Popover Features</h3>
        <ul style={{ color: '#ccc', fontSize: '14px', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
          <li>✅ Multiple positioning options (top, bottom, left, right)</li>
          <li>✅ Click and hover trigger modes</li>
          <li>✅ Controlled and uncontrolled usage patterns</li>
          <li>✅ Rich content support (text, HTML, React components)</li>
          <li>✅ Auto-positioning to avoid viewport edges</li>
          <li>✅ Customizable styling and arrow indicators</li>
          <li>✅ Configurable delays and offsets</li>
          <li>✅ Click outside to close functionality</li>
          <li>🔄 Keyboard navigation and accessibility support (coming soon)</li>
          <li>🔄 Portal rendering for z-index management (coming soon)</li>
        </ul>
      </div>
    </div>
  );
}