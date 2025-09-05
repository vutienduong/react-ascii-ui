import React, { useState } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiInput,
  AsciiBadge,
  AsciiTabs,
  AsciiTree,
  AsciiAlert,
  type AsciiTreeNode
} from 'react-ascii-ui';

export default function IDEDemo() {
  const [selectedFile, setSelectedFile] = useState('App.tsx');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDebugging, setIsDebugging] = useState(false);

  const fileTreeData: AsciiTreeNode[] = [
    {
      id: 'src',
      label: 'src/',
      icon: '📁',
      children: [
        {
          id: 'components',
          label: 'components/',
          icon: '📁',
          children: [
            { id: 'header', label: 'Header.tsx', icon: '⚛️' },
            { id: 'sidebar', label: 'Sidebar.tsx', icon: '⚛️' },
            { id: 'footer', label: 'Footer.tsx', icon: '⚛️' }
          ]
        },
        {
          id: 'hooks',
          label: 'hooks/',
          icon: '📁',
          children: [
            { id: 'use-auth', label: 'useAuth.ts', icon: '🪝' },
            { id: 'use-api', label: 'useApi.ts', icon: '🪝' }
          ]
        },
        { id: 'app', label: 'App.tsx', icon: '⚛️' },
        { id: 'index', label: 'index.tsx', icon: '⚛️' }
      ]
    },
    {
      id: 'public',
      label: 'public/',
      icon: '📁',
      children: [
        { id: 'index-html', label: 'index.html', icon: '🌐' },
        { id: 'favicon', label: 'favicon.ico', icon: '🎨' }
      ]
    },
    { id: 'package', label: 'package.json', icon: '📦' },
    { id: 'tsconfig', label: 'tsconfig.json', icon: '⚙️' }
  ];

  const codeContent = {
    'App.tsx': `import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="app">
      <Header user={user} />
      <div className="main-content">
        <Sidebar />
        <main>
          {isAuthenticated ? (
            <Dashboard />
          ) : (
            <LoginForm />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;`,
    'Header.tsx': `import React from 'react';

interface HeaderProps {
  user?: { name: string; email: string };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>My App</h1>
      </div>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      {user && (
        <div className="user-info">
          Welcome, {user.name}
        </div>
      )}
    </header>
  );
};`
  };

  const problems = [
    { type: 'error', file: 'App.tsx', line: 15, message: 'Property "Dashboard" does not exist' },
    { type: 'warning', file: 'Header.tsx', line: 8, message: 'Missing key prop in list items' },
    { type: 'info', file: 'useAuth.ts', line: 23, message: 'Consider using useCallback for optimization' }
  ];

  const tabsData = [
    { label: 'App.tsx', content: 'App.tsx content' },
    { label: 'Header.tsx', content: 'Header.tsx content' },
    { label: 'useAuth.ts', content: 'useAuth.ts content' }
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh', padding: '10px' }}>
      {/* Top Bar */}
      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '10px 20px', 
        marginBottom: '10px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        border: '1px solid #444'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h1 style={{ color: '#00ff00', fontSize: '1.5em', margin: 0 }}>◉ ASCII IDE</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <AsciiButton>File</AsciiButton>
            <AsciiButton>Edit</AsciiButton>
            <AsciiButton>View</AsciiButton>
            <AsciiButton>Debug</AsciiButton>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <AsciiBadge color={isDebugging ? 'error' : 'success'}>
            {isDebugging ? '🐛 Debugging' : '✓ Ready'}
          </AsciiBadge>
          <AsciiButton onClick={() => setIsDebugging(!isDebugging)}>
            {isDebugging ? 'Stop Debug' : 'Start Debug'}
          </AsciiButton>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr 300px', gap: '10px', height: 'calc(100vh - 120px)' }}>
        {/* File Explorer */}
        <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #444' }}>
          <div style={{ padding: '15px', borderBottom: '1px solid #444' }}>
            <h3 style={{ color: '#00ff00', margin: '0 0 10px 0' }}>Explorer</h3>
            <AsciiInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              style={{ width: '100%' }}
            />
          </div>
          <div style={{ padding: '15px' }}>
            <AsciiTree 
              data={fileTreeData}
              defaultExpanded={['src', 'components']}
              onNodeSelect={(node) => {
                if (!node.children && node.label.includes('.')) {
                  setSelectedFile(node.label);
                }
              }}
            />
          </div>
        </div>

        {/* Main Editor */}
        <div style={{ backgroundColor: '#2d2d2d', border: '1px solid #444', display: 'flex', flexDirection: 'column' }}>
          {/* Editor Tabs */}
          <div style={{ borderBottom: '1px solid #444' }}>
            <AsciiTabs tabs={tabsData} />
          </div>

          {/* Code Editor */}
          <div style={{ flex: 1, padding: '20px' }}>
            <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ color: '#00ff00', margin: 0 }}>{selectedFile}</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <AsciiBadge color="default">TypeScript</AsciiBadge>
                <AsciiBadge color="primary">UTF-8</AsciiBadge>
              </div>
            </div>
            
            <pre style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid #444',
              padding: '20px',
              fontSize: '14px',
              lineHeight: '1.5',
              overflow: 'auto',
              height: '400px',
              color: '#fff'
            }}>
{codeContent[selectedFile as keyof typeof codeContent] || '// Select a file to view content'}
            </pre>
          </div>

          {/* Status Bar */}
          <div style={{ 
            backgroundColor: '#333', 
            padding: '8px 20px', 
            borderTop: '1px solid #444',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px'
          }}>
            <div style={{ color: '#ccc' }}>Line 1, Column 1</div>
            <div style={{ color: '#ccc' }}>Spaces: 2 | UTF-8 | TypeScript React</div>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Problems Panel */}
          <AsciiCard title="Problems" style={{ flex: 1 }}>
            <div style={{ maxHeight: '200px', overflow: 'auto' }}>
              {problems.map((problem, index) => (
                <div key={index} style={{ 
                  padding: '8px',
                  marginBottom: '8px',
                  backgroundColor: '#1a1a1a',
                  border: '1px solid #444',
                  fontSize: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <AsciiBadge color={
                      problem.type === 'error' ? 'error' : 
                      problem.type === 'warning' ? 'warning' : 'primary'
                    }>
                      {problem.type.toUpperCase()}
                    </AsciiBadge>
                    <span style={{ color: '#00ff00' }}>{problem.file}:{problem.line}</span>
                  </div>
                  <div style={{ color: '#ccc' }}>{problem.message}</div>
                </div>
              ))}
            </div>
          </AsciiCard>

          {/* Debug Console */}
          <AsciiCard title="Debug Console" style={{ flex: 1 }}>
            {isDebugging ? (
              <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                <div style={{ marginBottom: '8px', color: '#00ff00' }}>
                  {'>'} Starting debug session...
                </div>
                <div style={{ marginBottom: '8px', color: '#ccc' }}>
                  Breakpoint set at App.tsx:15
                </div>
                <div style={{ marginBottom: '8px', color: '#ffaa00' }}>
                  Warning: Unhandled promise rejection
                </div>
                <div style={{ marginBottom: '8px', color: '#00ff00' }}>
                  {'>'} Variables: user = undefined
                </div>
              </div>
            ) : (
              <div style={{ color: '#666', fontStyle: 'italic' }}>
                Debug console is not active. Click "Start Debug" to begin.
              </div>
            )}
          </AsciiCard>

          {/* Terminal */}
          <AsciiCard title="Terminal" style={{ flex: 1 }}>
            <div style={{ 
              backgroundColor: '#1a1a1a',
              border: '1px solid #444',
              padding: '10px',
              minHeight: '120px',
              fontSize: '12px'
            }}>
              <div style={{ color: '#00ff00' }}>$ npm run dev</div>
              <div style={{ color: '#ccc' }}>Starting development server...</div>
              <div style={{ color: '#ccc' }}>✓ Server running on http://localhost:3000</div>
              <div style={{ color: '#00ff00' }}>$ █</div>
            </div>
          </AsciiCard>
        </div>
      </div>
    </div>
  );
}