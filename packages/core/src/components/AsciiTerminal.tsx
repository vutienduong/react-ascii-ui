import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';

export interface TerminalCommand {
  command: string;
  args: string[];
  rawInput: string;
}

export interface TerminalHistoryEntry {
  id: string;
  input: string;
  output: React.ReactNode;
  timestamp: Date;
  type: 'command' | 'output' | 'error' | 'system';
}

export interface TerminalCommandHandler {
  command: string;
  description: string;
  usage?: string;
  handler: (command: TerminalCommand) => React.ReactNode | Promise<React.ReactNode>;
}

export interface AsciiTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  prompt?: string;
  welcomeMessage?: React.ReactNode;
  commands?: TerminalCommandHandler[];
  onCommandExecute?: (command: TerminalCommand, output: React.ReactNode) => void;
  maxHistorySize?: number;
  showTimestamps?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  height?: string | number;
}

export const AsciiTerminal: React.FC<AsciiTerminalProps> = ({
  prompt = '$ ',
  welcomeMessage,
  commands = [],
  onCommandExecute,
  maxHistorySize = 1000,
  showTimestamps = false,
  autoFocus = true,
  placeholder = 'Type a command...',
  readOnly = false,
  height = '400px',
  className = '',
  style,
  ...props
}) => {
  const { theme } = useAsciiTheme();
  const [history, setHistory] = useState<TerminalHistoryEntry[]>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isExecuting, setIsExecuting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const historyIdCounter = useRef(0);

  // Auto-focus input when component mounts
  useEffect(() => {
    if (autoFocus && inputRef.current && !readOnly) {
      inputRef.current.focus();
    }
  }, [autoFocus, readOnly]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = historyRef.current.scrollHeight;
    }
  }, [history]);

  // Add welcome message on mount
  useEffect(() => {
    if (welcomeMessage) {
      addHistoryEntry(welcomeMessage, 'system');
    }
  }, [welcomeMessage]);

  const generateHistoryId = useCallback(() => {
    return `entry-${++historyIdCounter.current}`;
  }, []);

  const addHistoryEntry = useCallback((
    output: React.ReactNode, 
    type: TerminalHistoryEntry['type'] = 'output',
    input?: string
  ) => {
    const entry: TerminalHistoryEntry = {
      id: generateHistoryId(),
      input: input || '',
      output,
      timestamp: new Date(),
      type,
    };

    setHistory(prev => {
      const newHistory = [...prev, entry];
      return newHistory.slice(-maxHistorySize);
    });
  }, [maxHistorySize, generateHistoryId]);

  const parseCommand = useCallback((input: string): TerminalCommand => {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    const command = parts[0] || '';
    const args = parts.slice(1);
    
    return {
      command,
      args,
      rawInput: trimmed,
    };
  }, []);

  // Built-in commands
  const builtInCommands: TerminalCommandHandler[] = [
    {
      command: 'help',
      description: 'Show available commands',
      handler: () => {
        const allCommands = [...builtInCommands, ...commands];
        return (
          <div className="space-y-1">
            <div className="font-bold text-cyan-400">Available Commands:</div>
            {allCommands.map((cmd, index) => (
              <div key={index} className="flex">
                <span className="w-16 text-green-400">{cmd.command}</span>
                <span className="text-gray-300">- {cmd.description}</span>
              </div>
            ))}
          </div>
        );
      },
    },
    {
      command: 'clear',
      description: 'Clear terminal history',
      handler: () => {
        setHistory([]);
        return null;
      },
    },
    {
      command: 'history',
      description: 'Show command history',
      handler: () => (
        <div className="space-y-1">
          {commandHistory.map((cmd, index) => (
            <div key={index}>
              <span className="text-gray-500">{index + 1}</span> {cmd}
            </div>
          ))}
        </div>
      ),
    },
    {
      command: 'date',
      description: 'Show current date and time',
      handler: () => new Date().toLocaleString(),
    },
    {
      command: 'whoami',
      description: 'Show current user',
      handler: () => 'ascii-ui-user',
    },
    {
      command: 'pwd',
      description: 'Print working directory',
      handler: () => '/home/ascii-ui-user',
    },
    {
      command: 'echo',
      description: 'Echo text',
      usage: 'echo [text]',
      handler: (cmd) => cmd.args.join(' ') || '',
    },
  ];

  const executeCommand = useCallback(async (parsedCommand: TerminalCommand) => {
    if (!parsedCommand.command) return;

    setIsExecuting(true);

    // Add command to history
    addHistoryEntry(
      <span><span style={{ color: theme.colors.success }}>{prompt}</span>{parsedCommand.rawInput}</span>,
      'command',
      parsedCommand.rawInput
    );

    // Update command history
    setCommandHistory(prev => [...prev, parsedCommand.rawInput]);

    try {
      // Find command handler
      const allCommands = [...builtInCommands, ...commands];
      const commandHandler = allCommands.find(
        cmd => cmd.command.toLowerCase() === parsedCommand.command.toLowerCase()
      );

      let output: React.ReactNode;

      if (commandHandler) {
        output = await commandHandler.handler(parsedCommand);
      } else {
        output = (
          <span style={{ color: theme.colors.error }}>
            Command not found: {parsedCommand.command}. Type 'help' for available commands.
          </span>
        );
      }

      if (output !== null) {
        addHistoryEntry(output, commandHandler ? 'output' : 'error');
      }

      onCommandExecute?.(parsedCommand, output);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Command execution failed';
      addHistoryEntry(
        <span style={{ color: theme.colors.error }}>Error: {errorMessage}</span>,
        'error'
      );
    } finally {
      setIsExecuting(false);
    }
  }, [prompt, theme.colors, builtInCommands, commands, addHistoryEntry, onCommandExecute]);

  const handleInputSubmit = useCallback(async () => {
    if (!input.trim() || isExecuting) return;

    const parsedCommand = parseCommand(input);
    setInput('');
    setHistoryIndex(-1);

    await executeCommand(parsedCommand);
  }, [input, isExecuting, parseCommand, executeCommand]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (readOnly) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        handleInputSubmit();
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex = historyIndex === -1 
            ? commandHistory.length - 1 
            : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (historyIndex !== -1) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setInput('');
          } else {
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }
        }
        break;

      case 'Tab':
        e.preventDefault();
        // Basic autocomplete
        if (input.trim()) {
          const allCommands = [...builtInCommands, ...commands];
          const matches = allCommands.filter(cmd => 
            cmd.command.toLowerCase().startsWith(input.toLowerCase())
          );
          if (matches.length === 1) {
            setInput(matches[0].command + ' ');
          }
        }
        break;

      case 'c':
        if (e.ctrlKey) {
          e.preventDefault();
          setInput('');
          addHistoryEntry(
            <span><span style={{ color: theme.colors.success }}>{prompt}</span>{input}^C</span>,
            'command'
          );
        }
        break;
    }
  }, [
    readOnly, 
    handleInputSubmit, 
    commandHistory, 
    historyIndex, 
    input, 
    builtInCommands, 
    commands, 
    prompt, 
    theme.colors.success,
    addHistoryEntry
  ]);

  const handleTerminalClick = useCallback(() => {
    if (!readOnly && inputRef.current) {
      inputRef.current.focus();
    }
  }, [readOnly]);

  const renderHistoryEntry = (entry: TerminalHistoryEntry) => {
    const timestampColor = theme.colors.textSecondary;
    const timestamp = showTimestamps ? (
      <span style={{ color: timestampColor }} className="text-xs mr-2">
        [{entry.timestamp.toLocaleTimeString()}]
      </span>
    ) : null;

    return (
      <div key={entry.id} className="whitespace-pre-wrap break-words">
        {timestamp}
        {entry.output}
      </div>
    );
  };

  const terminalHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      {...props}
      className={`font-mono ${className}`}
      style={{
        fontFamily: theme.typography.fontFamily,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        border: `1px solid ${theme.colors.border}`,
        borderRadius: theme.borderRadius,
        height: terminalHeight,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div 
        className="px-3 py-2 border-b flex items-center justify-between"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border 
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.error }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.warning }} />
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.colors.success }} />
          </div>
          <span className="ml-2 text-sm font-medium">ASCII Terminal</span>
        </div>
        <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
          Ready
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={historyRef}
        className="flex-1 p-3 overflow-y-auto text-sm leading-relaxed"
        style={{ 
          backgroundColor: theme.colors.background,
          minHeight: 0, // Important for flex overflow
        }}
      >
        {/* History */}
        <div className="space-y-1">
          {history.map(renderHistoryEntry)}
        </div>

        {/* Current Input Line */}
        {!readOnly && (
          <div className="flex items-center mt-2">
            <span style={{ color: theme.colors.success }}>{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isExecuting}
              placeholder={isExecuting ? 'Executing...' : placeholder}
              className="flex-1 bg-transparent outline-none ml-1"
              style={{ 
                color: theme.colors.text,
                caretColor: theme.colors.success,
              }}
            />
            {isExecuting && (
              <span 
                className="ml-2 animate-pulse"
                style={{ color: theme.colors.info }}
              >
                ⟳
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};