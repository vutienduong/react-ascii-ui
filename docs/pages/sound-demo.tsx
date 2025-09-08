import React, { useState } from 'react';
import { 
  AsciiSoundProvider, 
  AsciiButton, 
  AsciiCard, 
  AsciiInput,
  AsciiSelect,
  AsciiCheckbox,
  useAsciiSound,
  useButtonSounds,
  useSystemSounds,
  useTerminalSounds,
  useGameSounds,
  useModalSounds,
  useTypingSounds,
  useAmbientSounds,
  useSoundEnabled
} from 'react-ascii-ui';

function SoundControlPanel() {
  const { volume, setVolume, enabled, setEnabled } = useAsciiSound();
  const { enabled: soundEnabled, toggle } = useSoundEnabled();

  return (
    <AsciiCard title="🔊 Sound Control Panel" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Master Volume</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <span style={{ color: '#ccc', fontSize: '12px' }}>{Math.round(volume * 100)}%</span>
        </div>
        
        <div>
          <AsciiCheckbox
            checked={enabled}
            onChange={setEnabled}
            label="Sound Effects Enabled"
          />
          <div style={{ marginTop: '10px' }}>
            <AsciiButton onClick={toggle} size="small">
              {soundEnabled ? 'Disable All Sounds' : 'Enable All Sounds'}
            </AsciiButton>
          </div>
        </div>
      </div>
    </AsciiCard>
  );
}

function ButtonSoundsDemo() {
  const buttonSounds = useButtonSounds();
  
  return (
    <AsciiCard title="🔘 Button Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton 
          onClick={() => buttonSounds.click()}
          onMouseEnter={() => buttonSounds.hover()}
          onFocus={() => buttonSounds.focus()}
        >
          Click Me
        </AsciiButton>
        <AsciiButton onClick={() => buttonSounds.hover()} variant="secondary">
          Hover Sound
        </AsciiButton>
        <AsciiButton onClick={() => buttonSounds.focus()} variant="outline">
          Focus Sound
        </AsciiButton>
        <AsciiButton onClick={() => buttonSounds.disabled()} disabled>
          Disabled Sound
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function SystemSoundsDemo() {
  const systemSounds = useSystemSounds();
  
  return (
    <AsciiCard title="⚡ System Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton onClick={() => systemSounds.success()} variant="success">
          Success
        </AsciiButton>
        <AsciiButton onClick={() => systemSounds.error()} variant="error">
          Error
        </AsciiButton>
        <AsciiButton onClick={() => systemSounds.warning()} variant="warning">
          Warning
        </AsciiButton>
        <AsciiButton onClick={() => systemSounds.notification()}>
          Notification
        </AsciiButton>
        <AsciiButton onClick={() => systemSounds.startup()}>
          Startup
        </AsciiButton>
        <AsciiButton onClick={() => systemSounds.shutdown()}>
          Shutdown
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function TerminalSoundsDemo() {
  const terminalSounds = useTerminalSounds();
  const [terminalInput, setTerminalInput] = useState('');
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      terminalSounds.enter();
      setTerminalInput('');
    } else if (e.key === 'Backspace') {
      terminalSounds.backspace();
    } else {
      terminalSounds.keyPress();
    }
  };
  
  return (
    <AsciiCard title="💻 Terminal Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
          Interactive Terminal (type to hear sounds):
        </label>
        <AsciiInput
          value={terminalInput}
          onChange={setTerminalInput}
          onKeyDown={handleKeyPress}
          placeholder="Type here and press Enter..."
          style={{ fontFamily: 'monospace' }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton onClick={() => terminalSounds.keyPress()}>
          Key Press
        </AsciiButton>
        <AsciiButton onClick={() => terminalSounds.enter()}>
          Enter Key
        </AsciiButton>
        <AsciiButton onClick={() => terminalSounds.backspace()}>
          Backspace
        </AsciiButton>
        <AsciiButton onClick={() => terminalSounds.startup()}>
          Terminal Startup
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function GameSoundsDemo() {
  const gameSounds = useGameSounds();
  
  return (
    <AsciiCard title="🎮 Game Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton onClick={() => gameSounds.jump()}>
          🦘 Jump
        </AsciiButton>
        <AsciiButton onClick={() => gameSounds.collect()}>
          💰 Collect
        </AsciiButton>
        <AsciiButton onClick={() => gameSounds.powerUp()}>
          ⭐ Power Up
        </AsciiButton>
        <AsciiButton onClick={() => gameSounds.gameOver()}>
          💀 Game Over
        </AsciiButton>
        <AsciiButton onClick={() => gameSounds.levelUp()}>
          🏆 Level Up
        </AsciiButton>
        <AsciiButton onClick={() => gameSounds.hit()}>
          💥 Hit
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function ModalSoundsDemo() {
  const modalSounds = useModalSounds();
  
  return (
    <AsciiCard title="🪟 Modal Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton onClick={() => modalSounds.open()}>
          📤 Open Modal
        </AsciiButton>
        <AsciiButton onClick={() => modalSounds.close()}>
          📥 Close Modal
        </AsciiButton>
        <AsciiButton onClick={() => modalSounds.confirm()} variant="success">
          ✅ Confirm
        </AsciiButton>
        <AsciiButton onClick={() => modalSounds.cancel()} variant="error">
          ❌ Cancel
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function TypingSoundsDemo() {
  const typingSounds = useTypingSounds();
  const [typingText, setTypingText] = useState('');
  
  const handleTyping = (value: string) => {
    setTypingText(value);
    typingSounds.keyTap();
  };
  
  return (
    <AsciiCard title="⌨️ Typing Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
          Type to hear realistic typing sounds:
        </label>
        <AsciiInput
          value={typingText}
          onChange={handleTyping}
          placeholder="Start typing..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') typingSounds.enter();
            if (e.key === ' ') typingSounds.space();
            if (e.key === 'Backspace') typingSounds.delete();
          }}
        />
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton onClick={() => typingSounds.keyTap()}>
          Key Tap
        </AsciiButton>
        <AsciiButton onClick={() => typingSounds.space()}>
          Space Bar
        </AsciiButton>
        <AsciiButton onClick={() => typingSounds.enter()}>
          Enter Key
        </AsciiButton>
        <AsciiButton onClick={() => typingSounds.delete()}>
          Delete Key
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function AmbientSoundsDemo() {
  const ambientSounds = useAmbientSounds();
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  
  const playAmbient = async (soundName: string, soundFunction: () => Promise<void>) => {
    if (isPlaying === soundName) {
      setIsPlaying(null);
      // Note: In a real implementation, you'd have a way to stop ambient sounds
      return;
    }
    
    setIsPlaying(soundName);
    await soundFunction();
    setIsPlaying(null);
  };
  
  return (
    <AsciiCard title="🌊 Ambient Sounds" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        <AsciiButton 
          onClick={() => playAmbient('rain', ambientSounds.rain)}
          variant={isPlaying === 'rain' ? 'success' : 'default'}
        >
          🌧️ Rain {isPlaying === 'rain' && '(Playing)'}
        </AsciiButton>
        <AsciiButton 
          onClick={() => playAmbient('wind', ambientSounds.wind)}
          variant={isPlaying === 'wind' ? 'success' : 'default'}
        >
          💨 Wind {isPlaying === 'wind' && '(Playing)'}
        </AsciiButton>
        <AsciiButton 
          onClick={() => playAmbient('ocean', ambientSounds.ocean)}
          variant={isPlaying === 'ocean' ? 'success' : 'default'}
        >
          🌊 Ocean {isPlaying === 'ocean' && '(Playing)'}
        </AsciiButton>
        <AsciiButton 
          onClick={() => playAmbient('fire', ambientSounds.fire)}
          variant={isPlaying === 'fire' ? 'success' : 'default'}
        >
          🔥 Fire {isPlaying === 'fire' && '(Playing)'}
        </AsciiButton>
      </div>
    </AsciiCard>
  );
}

function SoundPresetsDemo() {
  const { playSound } = useAsciiSound();
  const [selectedPreset, setSelectedPreset] = useState('keyPress');
  
  const presets = [
    'keyPress', 'buttonHover', 'buttonClick', 'success', 'error', 'warning', 
    'notification', 'modalOpen', 'modalClose', 'terminalBeep', 'gameJump',
    'gameCollect', 'gamePowerUp', 'gameOver', 'typing', 'delete'
  ];
  
  return (
    <AsciiCard title="🎵 Sound Presets Explorer" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
          Select a sound preset:
        </label>
        <AsciiSelect
          value={selectedPreset}
          onChange={setSelectedPreset}
          options={presets.map(preset => ({ value: preset, label: preset }))}
        />
      </div>
      
      <AsciiButton 
        onClick={() => playSound(selectedPreset as any)}
        size="large"
      >
        🔊 Play "{selectedPreset}" Sound
      </AsciiButton>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px' }}>
        <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>Sound Information</h4>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
          The selected preset "{selectedPreset}" uses Web Audio API synthesis to create retro-style sound effects. 
          Each preset has carefully tuned frequency, duration, and waveform parameters to match classic computing aesthetics.
        </p>
      </div>
    </AsciiCard>
  );
}

export default function SoundDemo() {
  return (
    <AsciiSoundProvider defaultVolume={0.3} defaultEnabled={true}>
      <div>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>
          🔊 Complete Sound System Demo
        </h1>
        
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Experience all 20+ sound effects organized by category. Each sound is synthesized in real-time 
          using the Web Audio API for consistent, retro-style audio feedback.
        </p>

        <div style={{
          padding: '15px',
          border: '1px solid #ffaa00',
          borderRadius: '4px',
          backgroundColor: '#332200',
          marginBottom: '30px'
        }}>
          <h3 style={{ color: '#ffaa00', marginBottom: '10px' }}>🎧 Audio Requirements</h3>
          <p style={{ color: '#fff', fontSize: '14px', lineHeight: '1.5' }}>
            This demo requires audio support. Make sure your volume is up and audio isn't muted. 
            Some browsers require user interaction before playing audio - click any button to initialize the audio context.
          </p>
        </div>

        <SoundControlPanel />
        <ButtonSoundsDemo />
        <SystemSoundsDemo />
        <TerminalSoundsDemo />
        <GameSoundsDemo />
        <ModalSoundsDemo />
        <TypingSoundsDemo />
        <AmbientSoundsDemo />
        <SoundPresetsDemo />

        <div style={{
          marginTop: '40px',
          padding: '30px',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: '#111',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>🚀 Implementation</h3>
          <p style={{ color: '#ccc', marginBottom: '20px', lineHeight: '1.6' }}>
            All these sounds are generated using Web Audio API with zero audio files. 
            Each effect is synthesized in real-time with customizable parameters for frequency, 
            duration, waveform type, and volume. Perfect for retro-style applications!
          </p>
          <pre style={{ 
            backgroundColor: '#000', 
            border: '1px solid #333', 
            padding: '15px', 
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            textAlign: 'left'
          }}>
{`import { AsciiSoundProvider, useButtonSounds } from 'react-ascii-ui';

function App() {
  return (
    <AsciiSoundProvider>
      <MyComponents />
    </AsciiSoundProvider>
  );
}`}
          </pre>
        </div>
      </div>
    </AsciiSoundProvider>
  );
}