import React, { useState } from 'react';
import { AsciiRadioGroup } from 'react-ascii-ui';

export default function RadioGroupDocs() {
  const [selectedValue1, setSelectedValue1] = useState('option1');
  const [selectedValue2, setSelectedValue2] = useState('medium');
  const [selectedValue3, setSelectedValue3] = useState('');

  const basicOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  const sizeOptions = [
    { label: 'Small', value: 'small' },
    { label: 'Medium', value: 'medium' },
    { label: 'Large', value: 'large' },
    { label: 'Extra Large', value: 'xlarge' }
  ];

  const themeOptions = [
    { label: 'Dark Theme', value: 'dark' },
    { label: 'Light Theme', value: 'light' },
    { label: 'Auto Theme', value: 'auto' }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Radio Group</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          ASCII-styled radio button group with parentheses and bullet point indicators for single selection.
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
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>Basic Options</h4>
            <AsciiRadioGroup
              name="basic"
              options={basicOptions}
              value={selectedValue1}
              onChange={setSelectedValue1}
            />
            <div style={{ 
              marginTop: '10px', 
              color: '#00ff00', 
              fontSize: '12px', 
              fontFamily: 'monospace' 
            }}>
              Selected: {selectedValue1}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>Size Selection</h4>
            <AsciiRadioGroup
              name="size"
              options={sizeOptions}
              value={selectedValue2}
              onChange={setSelectedValue2}
            />
            <div style={{ 
              marginTop: '10px', 
              color: '#00ff00', 
              fontSize: '12px', 
              fontFamily: 'monospace' 
            }}>
              Selected: {selectedValue2}
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', marginBottom: '15px', fontSize: '16px' }}>Theme Options</h4>
            <AsciiRadioGroup
              name="theme"
              options={themeOptions}
              value={selectedValue3}
              onChange={setSelectedValue3}
            />
            <div style={{ 
              marginTop: '10px', 
              color: '#00ff00', 
              fontSize: '12px', 
              fontFamily: 'monospace' 
            }}>
              Selected: {selectedValue3 || 'none'}
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
          {`import { AsciiRadioGroup } from 'react-ascii-ui';

export default function Example() {
  const [selectedValue, setSelectedValue] = useState('option1');
  
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' }
  ];

  return (
    <AsciiRadioGroup
      name="example"
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        {/* Basic Radio Group */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Radio Group</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiRadioGroup
              name="example1"
              options={[
                { label: 'First Option', value: 'first' },
                { label: 'Second Option', value: 'second' },
                { label: 'Third Option', value: 'third' }
              ]}
              value="first"
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
            {`<AsciiRadioGroup
  name="example"
  options={[
    { label: 'First Option', value: 'first' },
    { label: 'Second Option', value: 'second' },
    { label: 'Third Option', value: 'third' }
  ]}
  value="first"
  onChange={handleChange}
/>`}
          </pre>
        </div>

        {/* Form Integration */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Form Integration</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '14px' }}>Preferred Contact Method:</h4>
              <AsciiRadioGroup
                name="contact"
                options={[
                  { label: 'Email', value: 'email' },
                  { label: 'Phone Call', value: 'phone' },
                  { label: 'Text Message', value: 'sms' },
                  { label: 'Mail', value: 'mail' }
                ]}
                value="email"
                onChange={() => {}}
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '14px' }}>Experience Level:</h4>
              <AsciiRadioGroup
                name="experience"
                options={[
                  { label: 'Beginner (0-1 years)', value: 'beginner' },
                  { label: 'Intermediate (1-3 years)', value: 'intermediate' },
                  { label: 'Advanced (3-5 years)', value: 'advanced' },
                  { label: 'Expert (5+ years)', value: 'expert' }
                ]}
                value="intermediate"
                onChange={() => {}}
              />
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
            {`const [contactMethod, setContactMethod] = useState('email');
const [experience, setExperience] = useState('intermediate');

<AsciiRadioGroup
  name="contact"
  options={contactOptions}
  value={contactMethod}
  onChange={setContactMethod}
/>

<AsciiRadioGroup
  name="experience"
  options={experienceOptions}
  value={experience}
  onChange={setExperience}
/>`}
          </pre>
        </div>

        {/* No Default Selection */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>No Default Selection</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '14px' }}>Choose your subscription:</h4>
            <AsciiRadioGroup
              name="subscription"
              options={[
                { label: 'Free Plan ($0/month)', value: 'free' },
                { label: 'Basic Plan ($9/month)', value: 'basic' },
                { label: 'Pro Plan ($29/month)', value: 'pro' },
                { label: 'Enterprise Plan ($99/month)', value: 'enterprise' }
              ]}
              value=""
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
            {`// Start with no selection
const [subscription, setSubscription] = useState('');

<AsciiRadioGroup
  name="subscription"
  options={subscriptionOptions}
  value={subscription}
  onChange={setSubscription}
/>`}
          </pre>
        </div>

        {/* Configuration Options */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Configuration Options</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <h4 style={{ color: '#fff', marginBottom: '10px', fontSize: '14px' }}>Display Settings:</h4>
            <AsciiRadioGroup
              name="display"
              options={[
                { label: 'Show Line Numbers', value: 'line-numbers' },
                { label: 'Show Minimap', value: 'minimap' },
                { label: 'Show Breadcrumbs', value: 'breadcrumbs' },
                { label: 'Show Status Bar', value: 'status-bar' },
                { label: 'Show Activity Bar', value: 'activity-bar' }
              ]}
              value="minimap"
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
            {`<AsciiRadioGroup
  name="display"
  options={displayOptions}
  value={selectedDisplay}
  onChange={setSelectedDisplay}
/>`}
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div id="api" style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>

        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>AsciiRadioGroup Props</h3>
        <div style={{ overflow: 'auto', marginBottom: '30px' }}>
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
                  Required
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
                  Yes
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Name attribute for the radio group
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  options
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  AsciiRadioOption[]
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Yes
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Array of radio button options
                </td>
              </tr>
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
                  string
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  No
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Currently selected option value
                </td>
              </tr>
              <tr>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onChange
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  (value: string) =&gt; void
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  No
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Callback when selection changes
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
                  No
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

        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>AsciiRadioOption Interface</h3>
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
                  Property
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
                  Required
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
                  Yes
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Display text for the radio option
                </td>
              </tr>
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
                  string
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Yes
                </td>
                <td style={{
                  padding: '12px',
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Unique value identifier for the option
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Visual Indicators</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Selected:</strong> Shows as (•) - parentheses with filled bullet</li>
            <li><strong>Unselected:</strong> Shows as ( ) - empty parentheses with space</li>
            <li><strong>Layout:</strong> Vertical list with proper spacing between options</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Accessibility Features</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Keyboard Navigation:</strong> Use Tab to navigate between options</li>
            <li><strong>Space/Enter:</strong> Select the focused radio option</li>
            <li><strong>Screen Reader:</strong> Proper radio button semantics with hidden native inputs</li>
            <li><strong>Focus Management:</strong> Visual focus indicators for keyboard users</li>
          </ul>
        </div>

        <p style={{
          color: '#ccc',
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiRadioGroup uses native HTML radio inputs for accessibility while providing custom ASCII styling.
        </p>
      </div>
    </div>
  );
}