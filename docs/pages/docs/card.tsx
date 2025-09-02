import React from 'react';
import { AsciiCard, AsciiButton } from 'react-ascii-ui';

export default function CardDocs() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Card</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          A container component with ASCII borders for organizing and grouping related content.
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
        gap: '20px',
        flexWrap: 'wrap'
      }}>
        <AsciiCard title="Welcome" style={{ flex: '1', minWidth: '250px' }}>
          <p style={{ color: '#ccc', marginBottom: '15px' }}>
            Welcome to React ASCII UI! This is a card component with a title.
          </p>
          <AsciiButton>Get Started</AsciiButton>
        </AsciiCard>
        
        <AsciiCard style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>No Title Card</h3>
          <p style={{ color: '#ccc', marginBottom: '15px' }}>
            This card doesn't have a title prop, so you can add your own header.
          </p>
          <AsciiButton>Learn More</AsciiButton>
        </AsciiCard>
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
{`import { AsciiCard, AsciiButton } from 'react-ascii-ui';

export default function Example() {
  return (
    <AsciiCard title="User Profile">
      <p>Welcome back, User!</p>
      <AsciiButton>Edit Profile</AsciiButton>
    </AsciiCard>
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Card */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Card</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiCard>
              <p style={{ color: '#ccc' }}>This is a basic card without a title.</p>
            </AsciiCard>
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
{`<AsciiCard>
  <p>This is a basic card without a title.</p>
</AsciiCard>`}
          </pre>
        </div>

        {/* Card with Title */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Card with Title</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiCard title="[ SYSTEM STATUS ]">
              <p style={{ color: '#ccc' }}>All systems operational.</p>
            </AsciiCard>
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
{`<AsciiCard title="[ SYSTEM STATUS ]">
  <p>All systems operational.</p>
</AsciiCard>`}
          </pre>
        </div>

        {/* Card with Form */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Card with Form Elements</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiCard title="Login">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                  placeholder="Username"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '8px',
                    fontFamily: 'monospace'
                  }}
                />
                <input 
                  type="password"
                  placeholder="Password"
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid #333',
                    color: '#fff',
                    padding: '8px',
                    fontFamily: 'monospace'
                  }}
                />
                <AsciiButton>Sign In</AsciiButton>
              </div>
            </AsciiCard>
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
{`<AsciiCard title="Login">
  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    <AsciiInput placeholder="Username" />
    <AsciiInput type="password" placeholder="Password" />
    <AsciiButton>Sign In</AsciiButton>
  </div>
</AsciiCard>`}
          </pre>
        </div>

        {/* Card Grid */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Card Grid</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
            }}>
              <AsciiCard title="CPU">
                <div style={{ color: '#00ff00', fontSize: '24px' }}>45%</div>
                <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
              </AsciiCard>
              <AsciiCard title="RAM">
                <div style={{ color: '#ffaa00', fontSize: '24px' }}>78%</div>
                <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
              </AsciiCard>
              <AsciiCard title="DISK">
                <div style={{ color: '#ff4444', fontSize: '24px' }}>92%</div>
                <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
              </AsciiCard>
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
{`<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
  <AsciiCard title="CPU">
    <div style={{ color: '#00ff00', fontSize: '24px' }}>45%</div>
    <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
  </AsciiCard>
  <AsciiCard title="RAM">
    <div style={{ color: '#ffaa00', fontSize: '24px' }}>78%</div>
    <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
  </AsciiCard>
  <AsciiCard title="DISK">
    <div style={{ color: '#ff4444', fontSize: '24px' }}>92%</div>
    <div style={{ color: '#ccc', fontSize: '12px' }}>Usage</div>
  </AsciiCard>
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
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>title</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Optional title displayed at the top of the card</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>children</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>React.ReactNode</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>The content of the card</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>className</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Additional CSS classes</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>style</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>React.CSSProperties</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Inline styles</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ color: '#ccc', marginTop: '15px', fontSize: '14px' }}>
          AsciiCard extends all HTML div attributes and React.HTMLAttributes&lt;HTMLDivElement&gt;.
        </p>
      </div>
    </div>
  );
}