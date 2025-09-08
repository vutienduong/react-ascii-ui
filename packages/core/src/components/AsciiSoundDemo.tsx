import React, { useState } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { 
  useButtonSounds, 
  useTerminalSounds, 
  useFormSounds, 
  useModalSounds, 
  useSystemSounds, 
  useGameSounds,
  useAmbientSounds,
  useAsciiSound 
} from '../sound/hooks';
import { AsciiButton } from './AsciiButton';
import { AsciiInput } from './AsciiInput';

export const AsciiSoundDemo: React.FC = () => {
  const { theme } = useAsciiTheme();
  const { masterVolume, setMasterVolume, isEnabled, setIsEnabled } = useAsciiSound();
  
  // Sound hooks
  const buttonSounds = useButtonSounds();
  const terminalSounds = useTerminalSounds();
  const formSounds = useFormSounds();
  const modalSounds = useModalSounds();
  const systemSounds = useSystemSounds();
  const gameSounds = useGameSounds();
  const { startAmbient, stopAmbient } = useAmbientSounds();
  
  const [ambientPlaying, setAmbientPlaying] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const toggleAmbient = () => {
    if (ambientPlaying) {
      stopAmbient();
      setAmbientPlaying(false);
    } else {
      startAmbient('static');
      setAmbientPlaying(true);
    }
  };

  const containerStyle = {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: '20px',
    minHeight: '100vh'
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '15px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '4px'
  };

  const titleStyle = {
    color: theme.colors.primary,
    fontSize: '1.5rem',
    marginBottom: '20px',
    fontFamily: theme.typography.fontFamily
  };

  const sectionTitleStyle = {
    color: theme.colors.secondary,
    fontSize: '1.2rem',
    marginBottom: '15px',
    fontFamily: theme.typography.fontFamily
  };

  const buttonGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '10px',
    marginBottom: '15px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {theme.characters.doubleHorizontal.repeat(3)} ASCII Sound System Demo {theme.characters.doubleHorizontal.repeat(3)}
      </h1>
      
      {/* Master Controls */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Master Controls</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              checked={isEnabled}
              onChange={(e) => setIsEnabled(e.target.checked)}
            />
            Sound Enabled
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            Volume:
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={masterVolume}
              onChange={(e) => setMasterVolume(Number(e.target.value))}
              style={{ width: '100px' }}
            />
            {Math.round(masterVolume * 100)}%
          </label>
        </div>
      </div>

      {/* Button Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Button Sounds</h2>
        <div style={buttonGridStyle}>
          <AsciiButton>Hover & Click Me</AsciiButton>
          <button 
            onClick={buttonSounds.playClick}
            style={{ ...theme.typography, padding: '8px' }}
          >
            Click Sound Only
          </button>
          <button 
            onClick={buttonSounds.playHover}
            style={{ ...theme.typography, padding: '8px' }}
          >
            Hover Sound Only
          </button>
        </div>
      </div>

      {/* Terminal Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Terminal Sounds</h2>
        <div style={{ marginBottom: '15px' }}>
          <p style={{ marginBottom: '10px' }}>Type in this field to hear key sounds:</p>
          <AsciiInput 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Start typing..."
            style={{ width: '300px' }}
          />
        </div>
        <div style={buttonGridStyle}>
          <button onClick={terminalSounds.playKeyPress} style={{ ...theme.typography, padding: '8px' }}>
            Key Press
          </button>
          <button onClick={terminalSounds.playEnter} style={{ ...theme.typography, padding: '8px' }}>
            Enter Key
          </button>
          <button onClick={terminalSounds.playBackspace} style={{ ...theme.typography, padding: '8px' }}>
            Backspace
          </button>
        </div>
      </div>

      {/* Form Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Form Sounds</h2>
        <div style={buttonGridStyle}>
          <button onClick={formSounds.playSubmit} style={{ ...theme.typography, padding: '8px' }}>
            Form Submit
          </button>
          <button onClick={formSounds.playError} style={{ ...theme.typography, padding: '8px' }}>
            Form Error
          </button>
          <button onClick={formSounds.playSuccess} style={{ ...theme.typography, padding: '8px' }}>
            Success
          </button>
        </div>
      </div>

      {/* Modal Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Modal Sounds</h2>
        <div style={buttonGridStyle}>
          <button onClick={modalSounds.playOpen} style={{ ...theme.typography, padding: '8px' }}>
            Modal Open
          </button>
          <button onClick={modalSounds.playClose} style={{ ...theme.typography, padding: '8px' }}>
            Modal Close
          </button>
        </div>
      </div>

      {/* System Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>System Sounds</h2>
        <div style={buttonGridStyle}>
          <button onClick={systemSounds.playNotification} style={{ ...theme.typography, padding: '8px' }}>
            Notification
          </button>
          <button onClick={systemSounds.playAlert} style={{ ...theme.typography, padding: '8px' }}>
            Alert
          </button>
          <button onClick={systemSounds.playBootUp} style={{ ...theme.typography, padding: '8px' }}>
            Boot Up
          </button>
        </div>
      </div>

      {/* Game Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Game Sounds</h2>
        <div style={buttonGridStyle}>
          <button onClick={gameSounds.playGameStart} style={{ ...theme.typography, padding: '8px' }}>
            Game Start
          </button>
          <button onClick={gameSounds.playGameOver} style={{ ...theme.typography, padding: '8px' }}>
            Game Over
          </button>
        </div>
      </div>

      {/* Ambient Sounds */}
      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Ambient Sounds</h2>
        <div style={buttonGridStyle}>
          <button onClick={toggleAmbient} style={{ ...theme.typography, padding: '8px' }}>
            {ambientPlaying ? 'Stop Ambient Static' : 'Start Ambient Static'}
          </button>
        </div>
        <p style={{ fontSize: '0.9rem', color: theme.colors.muted, marginTop: '10px' }}>
          Ambient sounds play randomly in the background
        </p>
      </div>

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        border: `2px solid ${theme.colors.primary}`,
        textAlign: 'center' as const
      }}>
        <h3 style={{ color: theme.colors.primary, marginBottom: '10px' }}>
          🎵 Sound System Active!
        </h3>
        <p style={{ color: theme.colors.text }}>
          All interactions in the ASCII UI library now include retro sound effects.
          Adjust volume and toggle sounds using the controls above.
        </p>
      </div>
    </div>
  );
};

export default AsciiSoundDemo;