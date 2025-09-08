import React, { useState } from 'react';
import { AsciiButton, AsciiSoundProvider, useAsciiSound, useButtonSounds, useSystemSounds } from 'react-ascii-ui';

function SoundDemo() {
  const { playBeep, playPreset } = useAsciiSound();
  const buttonSounds = useButtonSounds();
  const systemSounds = useSystemSounds();
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Interactive Demo</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <AsciiButton 
          onClick={() => setSoundEnabled(!soundEnabled)}
          style={{ marginRight: '10px' }}
        >
          {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
        </AsciiButton>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '30px' }}>
        <div>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>Button Sounds</h4>
          <AsciiButton onClick={() => buttonSounds.playClick()} style={{ marginBottom: '5px', width: '100%' }}>
            Click Sound
          </AsciiButton>
          <AsciiButton onClick={() => buttonSounds.playHover()} style={{ marginBottom: '5px', width: '100%' }}>
            Hover Sound
          </AsciiButton>
          <AsciiButton onClick={() => buttonSounds.playClick()} style={{ marginBottom: '5px', width: '100%' }}>
            Focus Sound
          </AsciiButton>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '10px' }}>System Sounds</h4>
          <AsciiButton onClick={() => systemSounds.playBootUp()} style={{ marginBottom: '5px', width: '100%' }}>
            Boot Up
          </AsciiButton>
          <AsciiButton onClick={() => systemSounds.playAlert()} style={{ marginBottom: '5px', width: '100%' }}>
            Alert
          </AsciiButton>
          <AsciiButton onClick={() => systemSounds.playNotification()} style={{ marginBottom: '5px', width: '100%' }}>
            Notification
          </AsciiButton>
        </div>
      </div>
    </div>
  );
}

export default function SoundSystemDocs() {
  return (
    <AsciiSoundProvider>
      <div>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>🔊 Sound System</h1>
        
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Web Audio API integration with 20+ retro sound effects and custom hooks for enhanced user experience.
        </p>

        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Features</h2>
        
        <ul style={{ color: '#ccc', lineHeight: '1.8', marginBottom: '30px' }}>
          <li><strong>20+ Sound Presets</strong> - Button clicks, system alerts, game sounds, and more</li>
          <li><strong>Custom Hooks</strong> - useButtonSounds, useSystemSounds, useGameSounds, etc.</li>
          <li><strong>Web Audio API</strong> - High-quality audio synthesis and effects</li>
          <li><strong>Sound Categories</strong> - Button, Terminal, Form, Modal, System, Game, Typing, Ambient</li>
          <li><strong>Volume Control</strong> - Global and individual sound volume management</li>
          <li><strong>Performance Optimized</strong> - Efficient audio context management</li>
        </ul>

        <SoundDemo />

        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Installation</h2>
        
        <pre style={{ 
          backgroundColor: '#000', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          overflow: 'auto',
          marginBottom: '30px'
        }}>
{`import { 
  AsciiSoundProvider, 
  useAsciiSound,
  useButtonSounds,
  useSystemSounds 
} from 'react-ascii-ui';`}
        </pre>

        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Usage</h2>

        <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>Basic Setup</h3>
        <pre style={{ 
          backgroundColor: '#000', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          overflow: 'auto',
          marginBottom: '20px'
        }}>
{`function App() {
  return (
    <AsciiSoundProvider defaultVolume={0.5} defaultEnabled={true}>
      <YourComponents />
    </AsciiSoundProvider>
  );
}`}
        </pre>

        <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px' }}>Using Sound Hooks</h3>
        <pre style={{ 
          backgroundColor: '#000', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          overflow: 'auto',
          marginBottom: '20px'
        }}>
{`function MyComponent() {
  const { playSound, setVolume } = useAsciiSound();
  const buttonSounds = useButtonSounds();
  const systemSounds = useSystemSounds();

  return (
    <button 
      onClick={() => buttonSounds.playClick()}
      onMouseEnter={() => buttonSounds.playHover()}
    >
      Click me!
    </button>
  );
}`}
        </pre>

        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Available Sound Categories</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          {[
            { name: 'useButtonSounds', sounds: ['click', 'hover', 'focus', 'disabled'] },
            { name: 'useSystemSounds', sounds: ['success', 'error', 'warning', 'notification'] },
            { name: 'useTerminalSounds', sounds: ['keyPress', 'enter', 'backspace', 'startup'] },
            { name: 'useGameSounds', sounds: ['jump', 'collect', 'powerUp', 'gameOver'] },
            { name: 'useModalSounds', sounds: ['open', 'close', 'confirm', 'cancel'] },
            { name: 'useTypingSounds', sounds: ['keyTap', 'space', 'enter', 'delete'] }
          ].map((category, index) => (
            <div key={index} style={{ 
              border: '1px solid #333', 
              padding: '15px', 
              borderRadius: '4px',
              backgroundColor: '#111'
            }}>
              <h4 style={{ color: '#00ff00', marginBottom: '10px', fontFamily: 'monospace' }}>
                {category.name}
              </h4>
              <ul style={{ color: '#ccc', fontSize: '14px', listStyle: 'none', padding: 0 }}>
                {category.sounds.map((sound, idx) => (
                  <li key={idx} style={{ marginBottom: '5px' }}>• {sound}()</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px' }}>Props</h2>
        
        <div style={{ 
          border: '1px solid #333', 
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '30px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00', borderRight: '1px solid #333' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', color: '#00ff00' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>defaultVolume</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>number</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>0.5</td>
                <td style={{ padding: '12px', color: '#ccc' }}>Default volume level (0-1)</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>defaultEnabled</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>boolean</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>true</td>
                <td style={{ padding: '12px', color: '#ccc' }}>Whether sounds are enabled by default</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', color: '#fff', borderRight: '1px solid #333', fontFamily: 'monospace' }}>autoResume</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>boolean</td>
                <td style={{ padding: '12px', color: '#ccc', borderRight: '1px solid #333' }}>true</td>
                <td style={{ padding: '12px', color: '#ccc' }}>Auto-resume audio context on user interaction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: '#111'
        }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>💡 Pro Tip</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            The sound system automatically handles browser audio policies and will request user interaction 
            before playing sounds. All sounds are generated using the Web Audio API for consistent, 
            high-quality retro effects that enhance the ASCII aesthetic.
          </p>
        </div>
      </div>
    </AsciiSoundProvider>
  );
}