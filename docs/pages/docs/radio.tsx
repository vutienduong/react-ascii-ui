import React, { useState } from 'react';
import { AsciiRadioGroup } from 'react-ascii-ui';

export default function RadioDocs() {
  const [selectedFramework, setSelectedFramework] = useState('react');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedPriority, setSelectedPriority] = useState('medium');

  const frameworkOptions = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' }
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiRadioGroup</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Radio button groups with ASCII styling for single-choice selections.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          border: '1px solid #333',
          backgroundColor: '#111',
          padding: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Choose framework:</h4>
            <AsciiRadioGroup
              name="framework"
              options={frameworkOptions}
              value={selectedFramework}
              onChange={setSelectedFramework}
            />
            <p style={{ color: '#ccc', marginTop: '10px', fontSize: '14px' }}>
              Selected: <span style={{ color: '#00ff00' }}>{selectedFramework}</span>
            </p>
          </div>

          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Select size:</h4>
            <AsciiRadioGroup
              name="size"
              options={sizeOptions}
              value={selectedSize}
              onChange={setSelectedSize}
            />
            <p style={{ color: '#ccc', marginTop: '10px', fontSize: '14px' }}>
              Selected: <span style={{ color: '#00ff00' }}>{selectedSize}</span>
            </p>
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
{`import { AsciiRadioGroup } from 'react-ascii-ui';

export default function App() {
  const [selected, setSelected] = useState('option1');

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];

  return (
    <AsciiRadioGroup
      name="example"
      options={options}
      value={selected}
      onChange={setSelected}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Basic Selection</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <AsciiRadioGroup
              name="basic"
              options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'maybe', label: 'Maybe' }
              ]}
              value="no"
              onChange={() => {}}
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Priority Levels</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <AsciiRadioGroup
              name="priority"
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]}
              value="medium"
              onChange={() => {}}
            />
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Form Integration</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <h4 style={{ color: '#fff', marginBottom: '10px' }}>Deployment Environment:</h4>
                <AsciiRadioGroup
                  name="environment"
                  options={[
                    { value: 'development', label: 'Development' },
                    { value: 'staging', label: 'Staging' },
                    { value: 'production', label: 'Production' }
                  ]}
                  value="staging"
                  onChange={() => {}}
                />
              </div>
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
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>name</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Name attribute for radio group</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>options</td>
                <td style={{ padding: '8px', color: '#ccc' }}>RadioOption[]</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Array of radio options</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>value</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Currently selected value</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>onChange</td>
                <td style={{ padding: '8px', color: '#ccc' }}>{'(value: string) => void'}</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Called when selection changes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>RadioOption Interface</h3>
          <pre style={{ color: '#ccc', fontSize: '14px' }}>
{`interface RadioOption {
  value: string;
  label: string;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}