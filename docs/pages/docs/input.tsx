import React, { useState } from 'react';
import { AsciiInput } from 'react-ascii-ui';

export default function InputDocs() {
  const [value, setValue] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Input</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Text input field with ASCII border styling for forms and user input.
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
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '400px' }}>
          <AsciiInput 
            placeholder="Enter your name..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <AsciiInput 
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AsciiInput 
            placeholder="Disabled input"
            disabled
          />
        </div>
        {value && (
          <div style={{ color: '#ccc', fontSize: '14px' }}>
            Current value: "{value}"
          </div>
        )}
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
{`import { AsciiInput } from 'react-ascii-ui';

export default function Example() {
  const [value, setValue] = useState('');
  
  return (
    <AsciiInput
      placeholder="Enter text..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Default Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Default</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiInput placeholder="Enter text..." />
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
            {`<AsciiInput placeholder="Enter text..." />`}
          </pre>
        </div>

        {/* Password Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Password</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiInput type="password" placeholder="Enter password..." />
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
            {`<AsciiInput type="password" placeholder="Enter password..." />`}
          </pre>
        </div>

        {/* Controlled Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Controlled</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiInput 
              value="Controlled value"
              onChange={() => {}}
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
{`const [value, setValue] = useState('');

<AsciiInput 
  value={value}
  onChange={(e) => setValue(e.target.value)}
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
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>value</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>The controlled value of the input</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>defaultValue</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>The default value for uncontrolled usage</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>placeholder</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Placeholder text when input is empty</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>type</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>text</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>HTML input type (text, password, email, etc.)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>disabled</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>false</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Whether the input is disabled</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>onChange</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>function</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Function called when input value changes</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>className</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ color: '#ccc', marginTop: '15px', fontSize: '14px' }}>
          AsciiInput extends all HTML input attributes and React.InputHTMLAttributes.
        </p>
      </div>
    </div>
  );
}