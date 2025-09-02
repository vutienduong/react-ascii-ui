import React from 'react';
import { AsciiDivider } from 'react-ascii-ui';

export default function DividerDocs() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Divider</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          A simple horizontal separator using ASCII dash characters to divide content sections.
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
        <div style={{ color: '#ccc', fontFamily: 'monospace' }}>
          <p style={{ marginBottom: '20px' }}>Content above the divider</p>
          <AsciiDivider />
          <p style={{ marginTop: '20px', marginBottom: '20px' }}>Content between dividers</p>
          <AsciiDivider />
          <p style={{ marginTop: '20px' }}>Content below the divider</p>
        </div>
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
          {`import { AsciiDivider } from 'react-ascii-ui';

export default function Example() {
  return (
    <div>
      <p>Section 1</p>
      <AsciiDivider />
      <p>Section 2</p>
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
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Divider</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ color: '#ccc', fontFamily: 'monospace' }}>
              <div>First section</div>
              <AsciiDivider />
              <div>Second section</div>
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
            {`<div>First section</div>
<AsciiDivider />
<div>Second section</div>`}
          </pre>
        </div>

        {/* Multiple Dividers */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Multiple Sections</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ color: '#ccc', fontFamily: 'monospace' }}>
              <h4 style={{ color: '#00ff00', margin: '0 0 10px 0' }}>Header Section</h4>
              <p style={{ margin: '0 0 15px 0' }}>Introduction content goes here.</p>
              <AsciiDivider />
              <h4 style={{ color: '#00ff00', margin: '15px 0 10px 0' }}>Main Content</h4>
              <p style={{ margin: '0 0 15px 0' }}>The main body of information.</p>
              <AsciiDivider />
              <h4 style={{ color: '#00ff00', margin: '15px 0 10px 0' }}>Footer Section</h4>
              <p style={{ margin: '0' }}>Closing remarks and links.</p>
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
  <h4>Header Section</h4>
  <p>Introduction content</p>
  <AsciiDivider />
  
  <h4>Main Content</h4>
  <p>Main body of information</p>
  <AsciiDivider />
  
  <h4>Footer Section</h4>
  <p>Closing remarks</p>
</div>`}
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div id="api" style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        
        <p style={{ color: '#ccc', marginBottom: '20px' }}>
          AsciiDivider is a simple component that renders a horizontal line of dash characters. 
          It does not accept any props.
        </p>
        
        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Props</h3>
        <p style={{ color: '#ccc', fontStyle: 'italic' }}>
          This component does not accept any props.
        </p>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Characteristics</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Width:</strong> 70 dash characters (-)</li>
            <li><strong>Font:</strong> Uses monospace font for consistent character width</li>
            <li><strong>Overflow:</strong> Text is ellipsized if container is too narrow</li>
            <li><strong>Styling:</strong> Inherits color from parent container</li>
          </ul>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Usage Notes</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li>Perfect for separating content sections in terminal-style interfaces</li>
            <li>Maintains consistent appearance across different font sizes</li>
            <li>Responsive - adapts to container width with ellipsis overflow</li>
            <li>Can be used multiple times in a layout without spacing issues</li>
          </ul>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '20px',
          fontSize: '14px'
        }}>
          The divider automatically adjusts to the text color of its container, making it easy to theme.
        </p>
      </div>
    </div>
  );
}