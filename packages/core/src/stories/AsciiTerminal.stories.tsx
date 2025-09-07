import type { Meta, StoryObj } from '@storybook/react';
import { AsciiTerminal, TerminalCommandHandler } from '../components/AsciiTerminal';

// Sample custom commands
const customCommands: TerminalCommandHandler[] = [
  {
    command: 'ls',
    description: 'List directory contents',
    usage: 'ls [options]',
    handler: (cmd) => {
      const showHidden = cmd.args.includes('-a');
      const files = [
        'package.json',
        'README.md', 
        'src/',
        'dist/',
        'node_modules/',
      ];
      
      const hiddenFiles = ['.git/', '.gitignore', '.env'];
      const allFiles = showHidden ? [...files, ...hiddenFiles] : files;
      
      return (
        <div className="grid grid-cols-3 gap-4">
          {allFiles.map((file, index) => (
            <span 
              key={index} 
              className={file.endsWith('/') ? 'text-blue-400 font-bold' : 'text-white'}
            >
              {file}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    command: 'cat',
    description: 'Display file contents',
    usage: 'cat [filename]',
    handler: (cmd) => {
      if (cmd.args.length === 0) {
        return <span className="text-red-400">Usage: cat [filename]</span>;
      }
      
      const filename = cmd.args[0];
      const fileContents: Record<string, string> = {
        'package.json': JSON.stringify({
          name: "react-ascii-ui",
          version: "0.1.4",
          description: "ASCII-styled React UI components",
          main: "dist/index.js"
        }, null, 2),
        'README.md': `# React ASCII UI

A collection of ASCII-styled React components for building retro terminal interfaces.

## Features
- 🎨 Multiple ASCII themes
- 🧩 Comprehensive component library  
- 🎭 Animation system
- 📊 Data visualization
- 🖥️ Terminal emulator`,
        '.env': 'NODE_ENV=development\nAPI_KEY=secret_key_here',
      };

      const content = fileContents[filename];
      if (!content) {
        return <span className="text-red-400">cat: {filename}: No such file or directory</span>;
      }

      return <pre className="whitespace-pre-wrap">{content}</pre>;
    },
  },
  {
    command: 'ps',
    description: 'Show running processes',
    handler: () => (
      <div className="space-y-1">
        <div className="text-cyan-400 font-bold">PID    COMMAND</div>
        <div>1234   react-app</div>
        <div>5678   node server.js</div>
        <div>9012   ascii-terminal</div>
        <div>3456   storybook</div>
      </div>
    ),
  },
  {
    command: 'curl',
    description: 'Simulate HTTP request',
    usage: 'curl [url]',
    handler: async (cmd) => {
      if (cmd.args.length === 0) {
        return <span className="text-red-400">Usage: curl [url]</span>;
      }

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      return (
        <div className="space-y-1">
          <div className="text-green-400">HTTP/1.1 200 OK</div>
          <div className="text-gray-400">Content-Type: application/json</div>
          <div className="text-gray-400">Date: {new Date().toISOString()}</div>
          <div className="mt-2">
            {JSON.stringify({ 
              message: "Hello from API", 
              url: cmd.args[0],
              timestamp: Date.now() 
            }, null, 2)}
          </div>
        </div>
      );
    },
  },
  {
    command: 'weather',
    description: 'Get weather information',
    usage: 'weather [city]',
    handler: (cmd) => {
      const city = cmd.args[0] || 'San Francisco';
      const temps = [65, 72, 68, 74, 70, 69, 71];
      const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
      
      const temp = temps[Math.floor(Math.random() * temps.length)];
      const condition = conditions[Math.floor(Math.random() * conditions.length)];
      
      return (
        <div className="space-y-2">
          <div className="text-cyan-400 font-bold">Weather for {city}</div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">
              {condition === 'Sunny' ? '☀️' : 
               condition === 'Cloudy' ? '☁️' : 
               condition === 'Rainy' ? '🌧️' : '⛅'}
            </span>
            <div>
              <div className="text-lg font-bold">{temp}°F</div>
              <div className="text-gray-400">{condition}</div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    command: 'ascii',
    description: 'Display ASCII art',
    handler: () => (
      <pre className="text-green-400 text-xs leading-none">
{`
    ██████  ███████  █████  ██████ ████████     ██    ██ ██ 
    ██   ██ ██      ██   ██ ██         ██        ██    ██ ██ 
    ██████  █████   ███████ ██         ██        ██    ██ ██ 
    ██   ██ ██      ██   ██ ██         ██        ██    ██ ██ 
    ██   ██ ███████ ██   ██ ██         ██         ██████  ██ 
`}
      </pre>
    ),
  },
];

const hackingCommands: TerminalCommandHandler[] = [
  {
    command: 'hack',
    description: 'Initiate hacking sequence',
    handler: async () => {
      const steps = [
        'Connecting to mainframe...',
        'Bypassing firewall...',
        'Decrypting passwords...',
        'Downloading files...',
        'Covering tracks...',
        'ACCESS GRANTED!'
      ];
      
      let result = '';
      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 500));
        result += step + '\n';
      }
      
      return (
        <div className="text-green-400 font-mono">
          <pre>{result}</pre>
        </div>
      );
    },
  },
  {
    command: 'matrix',
    description: 'Enter the Matrix',
    handler: () => {
      const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
      const lines = Array.from({ length: 20 }, () => 
        Array.from({ length: 50 }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      );
      
      return (
        <pre className="text-green-400 text-xs leading-tight animate-pulse">
          {lines.join('\n')}
        </pre>
      );
    },
  },
];

const meta: Meta<typeof AsciiTerminal> = {
  title: 'Components/AsciiTerminal',
  component: AsciiTerminal,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' }
  },
  argTypes: {
    height: {
      control: { type: 'range', min: 200, max: 800 },
    },
    showTimestamps: {
      control: 'boolean',
    },
    autoFocus: {
      control: 'boolean',
    },
    readOnly: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AsciiTerminal>;

export const BasicTerminal: Story = {
  args: {
    height: 400,
    welcomeMessage: (
      <div className="text-green-400">
        Welcome to ASCII Terminal v1.0.0
        <br />
        Type 'help' for available commands.
      </div>
    ),
  },
};

export const CustomCommands: Story = {
  args: {
    height: 500,
    commands: customCommands,
    welcomeMessage: (
      <div>
        <div className="text-cyan-400 font-bold">Linux Terminal Simulator</div>
        <div className="text-gray-400">Try commands like: ls, cat, ps, curl, weather</div>
        <div className="text-gray-400">Type 'help' to see all available commands.</div>
      </div>
    ),
    prompt: 'user@ascii:~$ ',
  },
};

export const HackerTerminal: Story = {
  args: {
    height: 450,
    commands: hackingCommands,
    welcomeMessage: (
      <div className="text-red-400 font-mono">
        <pre>{`
╔═══════════════════════════════════════╗
║        SECURE SYSTEM ACCESS          ║
║               AUTHORIZED              ║
║             PERSONNEL ONLY            ║
╚═══════════════════════════════════════╝
        `}</pre>
        <div className="text-green-400">Connection established...</div>
        <div className="text-gray-400">Try: hack, matrix</div>
      </div>
    ),
    prompt: 'root@mainframe:~# ',
  },
};

export const WithTimestamps: Story = {
  args: {
    height: 400,
    showTimestamps: true,
    commands: customCommands.slice(0, 3),
    welcomeMessage: (
      <div className="text-blue-400">
        Terminal with timestamps enabled
        <br />
        Every command and output will show execution time.
      </div>
    ),
  },
};

export const ReadOnlyTerminal: Story = {
  args: {
    height: 300,
    readOnly: true,
    welcomeMessage: (
      <div className="space-y-2">
        <div className="text-yellow-400">System Log Viewer (Read Only)</div>
        <div className="text-gray-400">[2024-01-15 10:30:15] Server started on port 3000</div>
        <div className="text-gray-400">[2024-01-15 10:30:16] Database connected successfully</div>
        <div className="text-green-400">[2024-01-15 10:30:17] All services operational</div>
        <div className="text-red-400">[2024-01-15 10:35:22] Warning: High memory usage detected</div>
        <div className="text-blue-400">[2024-01-15 10:35:30] Memory optimization complete</div>
      </div>
    ),
  },
};

export const CompactTerminal: Story = {
  args: {
    height: 250,
    commands: [customCommands[0], customCommands[5]], // ls and ascii
    welcomeMessage: 'Compact Terminal',
    prompt: '> ',
  },
};

// Demo showing multiple terminals
export const TerminalShowcase = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-green-400">ASCII Terminal Emulator</h1>
        <p className="text-cyan-400">Full-featured terminal with command parsing and history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Development Terminal */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-cyan-400">Development Terminal</h2>
          <AsciiTerminal
            height={350}
            commands={customCommands}
            welcomeMessage={
              <div>
                <div className="text-green-400">Dev Environment Ready</div>
                <div className="text-gray-400">Node.js v18.0.0 | npm v8.0.0</div>
              </div>
            }
            prompt="dev@localhost:~$ "
            onCommandExecute={(cmd, output) => {
              console.log('Command executed:', cmd.command, cmd.args);
            }}
          />
        </div>

        {/* System Monitor */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-cyan-400">System Monitor</h2>
          <AsciiTerminal
            height={350}
            readOnly={true}
            showTimestamps={true}
            welcomeMessage={
              <div className="space-y-1">
                <div className="text-blue-400">System Monitor - Live Feed</div>
                <div className="text-green-400">[OK] CPU: 34% | RAM: 2.1GB | Disk: 45%</div>
                <div className="text-yellow-400">[WARN] High network traffic detected</div>
                <div className="text-green-400">[OK] All services running normally</div>
                <div className="text-red-400">[ERROR] Failed to connect to backup server</div>
                <div className="text-green-400">[OK] Backup connection restored</div>
              </div>
            }
          />
        </div>

        {/* Hacker Terminal */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold mb-2 text-cyan-400">Hacker Terminal</h2>
          <AsciiTerminal
            height={400}
            commands={[...customCommands, ...hackingCommands]}
            welcomeMessage={
              <div className="text-red-400 font-mono">
                <div>╔═══════════════════════════════════════╗</div>
                <div>║     UNAUTHORIZED ACCESS DETECTED     ║</div>
                <div>║        INITIATING COUNTERMEASURES    ║</div>
                <div>╚═══════════════════════════════════════╝</div>
                <div className="mt-2 text-green-400">Connection hijacked... Welcome, Agent.</div>
              </div>
            }
            prompt="agent@darknet:~# "
          />
        </div>
      </div>
    </div>
  );
};

TerminalShowcase.parameters = {
  layout: 'fullscreen',
};