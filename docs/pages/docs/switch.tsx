import React, { useState } from 'react';
import { AsciiSwitch } from 'react-ascii-ui';

export default function SwitchDocs() {
  const [basicSwitch, setBasicSwitch] = useState(false);
  const [settingsState, setSettingsState] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    sounds: false
  });

  const handleSettingChange = (key: keyof typeof settingsState) => {
    setSettingsState(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Switch</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Toggle switches with ASCII-style ON/OFF indicators and slider variants.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#docs" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
          <span style={{ color: '#333' }}>•</span>
          <a href="#api" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>API Reference</a>
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
          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Basic Switch:
            </h4>
            <AsciiSwitch 
              checked={basicSwitch}
              onChange={(e) => setBasicSwitch(e.target.checked)}
              label="Toggle me"
            />
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Variants & Sizes:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <AsciiSwitch size="sm" checked={true} readOnly label="Small" />
                <AsciiSwitch size="md" checked={true} readOnly label="Medium" />
                <AsciiSwitch size="lg" checked={true} readOnly label="Large" />
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <AsciiSwitch variant="bracket" checked={true} readOnly label="Bracket" />
                <AsciiSwitch variant="slider" checked={true} readOnly label="Slider" />
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Settings Panel:
            </h4>
            <div style={{ 
              padding: '20px', 
              border: '1px solid #333',
              backgroundColor: '#000',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '15px'
            }}>
              <div style={{ color: '#00ff00', fontFamily: 'monospace', marginBottom: '10px' }}>
                [ SYSTEM PREFERENCES ]
              </div>
              <AsciiSwitch
                checked={settingsState.notifications}
                onChange={() => handleSettingChange('notifications')}
                label="Enable Notifications"
                variant="slider"
              />
              <AsciiSwitch
                checked={settingsState.darkMode}
                onChange={() => handleSettingChange('darkMode')}
                label="Dark Mode"
                variant="slider"
              />
              <AsciiSwitch
                checked={settingsState.autoSave}
                onChange={() => handleSettingChange('autoSave')}
                label="Auto-save Documents"
                variant="bracket"
                onText="YES"
                offText="NO"
              />
              <AsciiSwitch
                checked={settingsState.sounds}
                onChange={() => handleSettingChange('sounds')}
                label="System Sounds"
                variant="bracket"
              />
            </div>
          </div>
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
          {`import { AsciiSwitch } from 'react-ascii-ui';

export default function Example() {
  const [isOn, setIsOn] = useState(false);

  return (
    <AsciiSwitch 
      checked={isOn}
      onChange={(e) => setIsOn(e.target.checked)}
      label="Enable feature"
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Switch</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiSwitch label="Toggle setting" />
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
            {`<AsciiSwitch label="Toggle setting" />`}
          </pre>
        </div>

        {/* Custom Text */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Custom On/Off Text</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <AsciiSwitch onText="YES" offText="NO" label="Confirm action" />
              <AsciiSwitch onText="ACTIVE" offText="INACTIVE" label="Service status" />
              <AsciiSwitch onText="🟢" offText="🔴" label="System health" />
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
            {`<AsciiSwitch onText="YES" offText="NO" label="Confirm action" />
<AsciiSwitch onText="ACTIVE" offText="INACTIVE" label="Service status" />
<AsciiSwitch onText="🟢" offText="🔴" label="System health" />`}
          </pre>
        </div>

        {/* Sizes */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Different Sizes</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <AsciiSwitch size="sm" checked label="Small" />
              <AsciiSwitch size="md" checked label="Medium" />
              <AsciiSwitch size="lg" checked label="Large" />
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
            {`<AsciiSwitch size="sm" label="Small" />
<AsciiSwitch size="md" label="Medium" />
<AsciiSwitch size="lg" label="Large" />`}
          </pre>
        </div>

        {/* Variants */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Variants</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <AsciiSwitch variant="bracket" checked label="Bracket style" />
              <AsciiSwitch variant="slider" checked label="Slider style" />
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
            {`<AsciiSwitch variant="bracket" label="Bracket style" />
<AsciiSwitch variant="slider" label="Slider style" />`}
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
                  checked
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
                  Whether the switch is on
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
                  (event) =&gt; void
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
                  Callback fired when switch state changes
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
                  Optional label text
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onText
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
                  'ON'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Text shown when switch is on
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  offText
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
                  'OFF'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Text shown when switch is off
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
                  'bracket' | 'slider'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  'bracket'
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Visual style of the switch
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
                  Size of the switch and label
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div style={{ marginTop: '20px' }}>
          <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px' }}>Switch Variants</h4>
          <ul style={{ color: '#ccc', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>bracket:</strong> Shows text inside brackets [ ON ] / [ OFF ]</li>
            <li><strong>slider:</strong> Shows block slider [▓▓▓░░░] / [░░░▓▓▓]</li>
          </ul>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiSwitch extends all HTML input attributes and React.InputHTMLAttributes (except type and size).
        </p>
      </div>
    </div>
  );
}