import React, { useState, useEffect } from 'react';
import {
  AsciiButton,
  AsciiInput,
  AsciiCard,
  AsciiAlert,
  AsciiBadge
} from 'react-ascii-ui';

export default function TerminalDemo() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    '$ whoami',
    'admin',
    '$ ls -la',
    'total 24',
    'drwxr-xr-x  5 admin  staff   160 Mar 15 09:30 .',
    'drwxr-xr-x  3 admin  staff    96 Mar 15 09:25 ..',
    '-rw-r--r--  1 admin  staff  1024 Mar 15 09:30 config.json',
    '-rwxr-xr-x  1 admin  staff  2048 Mar 15 09:28 server.js',
    'drwxr-xr-x  3 admin  staff    96 Mar 15 09:25 logs/',
    '$ ps aux | grep node',
    'admin   1234  0.5  2.1  node server.js',
    'admin   5678  0.0  0.1  grep node'
  ]);
  const [currentDirectory, setCurrentDirectory] = useState('/home/admin');
  const [systemInfo, setSystemInfo] = useState({
    uptime: '7 days, 14:32',
    load: '0.45, 0.52, 0.48',
    memory: '2.1GB / 8.0GB',
    disk: '45% of 500GB'
  });

  const executeCommand = () => {
    if (!command.trim()) return;

    const newHistory = [...history, `$ ${command}`];
    
    switch (command.toLowerCase().trim()) {
      case 'clear':
        setHistory([]);
        break;
      case 'date':
        newHistory.push(new Date().toString());
        setHistory(newHistory);
        break;
      case 'pwd':
        newHistory.push(currentDirectory);
        setHistory(newHistory);
        break;
      case 'help':
        newHistory.push('Available commands: clear, date, pwd, uptime, free, df, help, exit');
        setHistory(newHistory);
        break;
      case 'uptime':
        newHistory.push(`System uptime: ${systemInfo.uptime}`);
        newHistory.push(`Load averages: ${systemInfo.load}`);
        setHistory(newHistory);
        break;
      case 'free':
        newHistory.push('Memory usage:');
        newHistory.push(`Used: ${systemInfo.memory}`);
        setHistory(newHistory);
        break;
      case 'df':
        newHistory.push('Disk usage:');
        newHistory.push(`/dev/sda1: ${systemInfo.disk} used`);
        setHistory(newHistory);
        break;
      case 'exit':
        newHistory.push('Connection to terminal closed.');
        setHistory(newHistory);
        break;
      default:
        newHistory.push(`Command not found: ${command}`);
        newHistory.push('Type "help" for available commands');
        setHistory(newHistory);
    }
    
    if (command.toLowerCase().trim() !== 'clear') {
      setHistory(newHistory);
    }
    setCommand('');
  };

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#00ff00', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px', textAlign: 'center' }}>
          ╔════════════════════════════════════════╗
        </h1>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px', textAlign: 'center' }}>
          ║          TERMINAL INTERFACE            ║
        </h1>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px', textAlign: 'center' }}>
          ╚════════════════════════════════════════╝
        </h1>
        <p style={{ fontSize: '1.1em', textAlign: 'center', color: '#ccc' }}>
          Interactive terminal simulation built with React ASCII UI
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px' }}>
        {/* Main Terminal */}
        <AsciiCard title={`Terminal - ${currentDirectory}`} style={{ backgroundColor: '#000' }}>
          <div style={{ 
            backgroundColor: '#111', 
            padding: '15px', 
            minHeight: '400px',
            maxHeight: '400px',
            overflow: 'auto',
            border: '1px solid #333'
          }}>
            {history.map((line, index) => (
              <div key={index} style={{ 
                color: line.startsWith('$') ? '#00ff00' : '#fff',
                marginBottom: '2px',
                fontWeight: line.startsWith('$') ? 'bold' : 'normal'
              }}>
                {line}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
              <span style={{ color: '#00ff00', marginRight: '8px' }}>$</span>
              <AsciiInput
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    executeCommand();
                  }
                }}
                placeholder="Enter command..."
                style={{ 
                  flexGrow: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  outline: 'none'
                }}
              />
            </div>
          </div>
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <AsciiButton onClick={() => setCommand('help')}>Help</AsciiButton>
            <AsciiButton onClick={() => setCommand('clear')}>Clear</AsciiButton>
            <AsciiButton onClick={() => setCommand('uptime')}>System Info</AsciiButton>
            <AsciiButton onClick={executeCommand}>Execute</AsciiButton>
          </div>
        </AsciiCard>

        {/* System Monitor */}
        <div>
          <AsciiCard title="System Monitor" style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '5px' }}>Status</div>
              <AsciiBadge color="success">Online</AsciiBadge>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '5px' }}>Uptime</div>
              <div style={{ color: '#ccc' }}>{systemInfo.uptime}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '5px' }}>Load Average</div>
              <div style={{ color: '#ccc' }}>{systemInfo.load}</div>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '5px' }}>Memory</div>
              <div style={{ color: '#ccc' }}>{systemInfo.memory}</div>
            </div>

            <div>
              <div style={{ color: '#00ff00', fontWeight: 'bold', marginBottom: '5px' }}>Disk Usage</div>
              <div style={{ color: '#ccc' }}>{systemInfo.disk}</div>
            </div>
          </AsciiCard>

          <AsciiCard title="Quick Commands">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <AsciiButton 
                onClick={() => setCommand('date')}
                style={{ width: '100%', textAlign: 'left' }}
              >
                📅 Show Date
              </AsciiButton>
              <AsciiButton 
                onClick={() => setCommand('pwd')}
                style={{ width: '100%', textAlign: 'left' }}
              >
                📁 Current Directory
              </AsciiButton>
              <AsciiButton 
                onClick={() => setCommand('free')}
                style={{ width: '100%', textAlign: 'left' }}
              >
                💾 Memory Usage
              </AsciiButton>
              <AsciiButton 
                onClick={() => setCommand('df')}
                style={{ width: '100%', textAlign: 'left' }}
              >
                💽 Disk Usage
              </AsciiButton>
            </div>
          </AsciiCard>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <AsciiAlert variant="info">
          💡 Tip: Type "help" to see available commands, or click the quick action buttons
        </AsciiAlert>
      </div>
    </div>
  );
}