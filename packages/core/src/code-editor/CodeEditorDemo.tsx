import React, { useState } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { AsciiCodeEditor } from './AsciiCodeEditor';
import { useCodeEditor, useCodeTabs } from './hooks';
import { ASCII_CODE_THEMES, LANGUAGE_DEFINITIONS } from './index';

export const CodeEditorDemo: React.FC = () => {
  const { theme } = useAsciiTheme();
  const [activeDemo, setActiveDemo] = useState<'single' | 'tabs' | 'themes' | 'languages'>('single');
  
  // Single editor demo
  const [singleEditorContent, setSingleEditorContent] = useState(`// Welcome to ASCII Code Editor!
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(\`The 10th Fibonacci number is: \${result}\`);

/* Multi-line comment example
   This editor supports:
   - Syntax highlighting
   - Multiple languages
   - Sound effects
   - Retro ASCII themes
*/

const greeting = "Hello, ASCII World!";
const numbers = [1, 2, 3, 4, 5];
const isReady = true;`);

  // Tabs demo
  const tabs = useCodeTabs();
  
  // Theme demo
  const [selectedTheme, setSelectedTheme] = useState('green');
  
  // Language demo
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [languageContent, setLanguageContent] = useState(getExampleCode('javascript'));

  function getExampleCode(language: string): string {
    const examples: Record<string, string> = {
      javascript: `// JavaScript Example
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello ASCII World!' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`,

      typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

class UserService {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  findUser(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }
}

const service = new UserService();`,

      python: `# Python Example
import asyncio
from typing import List, Dict

class DataProcessor:
    def __init__(self, data: List[Dict]):
        self.data = data
    
    async def process(self) -> Dict:
        """Process data asynchronously"""
        results = []
        
        for item in self.data:
            # Simulate async operation
            await asyncio.sleep(0.1)
            processed = {
                'id': item.get('id'),
                'processed_at': datetime.now(),
                'status': 'complete'
            }
            results.append(processed)
        
        return {'results': results, 'count': len(results)}

# Usage
processor = DataProcessor([{'id': 1}, {'id': 2}])`,

      css: `/* CSS Example */
.ascii-editor {
  font-family: 'Courier New', monospace;
  background: #000000;
  color: #00ff00;
  border: 2px solid #00ff00;
}

.syntax-highlight {
  position: relative;
  overflow: hidden;
}

.keyword {
  color: #00ffff;
  font-weight: bold;
}

.string {
  color: #ffff00;
}

.comment {
  color: #666666;
  font-style: italic;
}

@media (max-width: 768px) {
  .ascii-editor {
    font-size: 12px;
    padding: 8px;
  }
}`,

      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ASCII UI Demo</title>
    <style>
        body { 
            font-family: monospace; 
            background: #000; 
            color: #00ff00; 
        }
    </style>
</head>
<body>
    <div class="ascii-container">
        <h1>Welcome to ASCII World</h1>
        <p>This is a retro-style interface.</p>
        
        <button onclick="showMessage()">
            Click Me
        </button>
    </div>

    <script>
        function showMessage() {
            alert('Hello from ASCII UI!');
        }
    </script>
</body>
</html>`,

      json: `{
  "name": "ascii-code-editor",
  "version": "1.0.0",
  "description": "Retro-style code editor with ASCII aesthetics",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production"
  },
  "dependencies": {
    "express": "^4.18.0",
    "react": "^18.0.0",
    "ascii-art": "^2.8.0"
  },
  "devDependencies": {
    "jest": "^28.0.0",
    "nodemon": "^2.0.0",
    "webpack": "^5.70.0"
  },
  "keywords": [
    "ascii",
    "retro",
    "terminal",
    "code-editor"
  ],
  "author": "ASCII UI Team",
  "license": "MIT"
}`
    };

    return examples[language] || examples.javascript;
  }

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    setLanguageContent(getExampleCode(newLanguage));
  };

  const containerStyle = {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: '20px',
    minHeight: '100vh'
  };

  const titleStyle = {
    color: theme.colors.primary,
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center' as const
  };

  const tabsStyle = {
    display: 'flex',
    marginBottom: '30px',
    borderBottom: `2px solid ${theme.colors.border}`,
    gap: '20px'
  };

  const tabStyle = (isActive: boolean) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: isActive ? `3px solid ${theme.colors.primary}` : 'none',
    color: isActive ? theme.colors.primary : theme.colors.text,
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s'
  });

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {theme.characters.doubleHorizontal.repeat(3)} ASCII Code Editor Demo {theme.characters.doubleHorizontal.repeat(3)}
      </h1>

      {/* Navigation Tabs */}
      <div style={tabsStyle}>
        <div 
          style={tabStyle(activeDemo === 'single')}
          onClick={() => setActiveDemo('single')}
        >
          📝 Basic Editor
        </div>
        <div 
          style={tabStyle(activeDemo === 'tabs')}
          onClick={() => setActiveDemo('tabs')}
        >
          📁 Multi-Tab Editor
        </div>
        <div 
          style={tabStyle(activeDemo === 'themes')}
          onClick={() => setActiveDemo('themes')}
        >
          🎨 Theme Gallery
        </div>
        <div 
          style={tabStyle(activeDemo === 'languages')}
          onClick={() => setActiveDemo('languages')}
        >
          💻 Language Support
        </div>
      </div>

      {/* Basic Editor Demo */}
      {activeDemo === 'single' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Basic Code Editor
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            A full-featured code editor with syntax highlighting, line numbers, and retro ASCII styling.
            Try typing, selecting text, and using keyboard shortcuts!
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>Features:</h3>
            <ul style={{ color: theme.colors.muted, marginLeft: '20px', lineHeight: '1.6' }}>
              <li>Syntax highlighting for multiple languages</li>
              <li>Line numbers and cursor position tracking</li>
              <li>Sound effects for typing (keyboard sounds)</li>
              <li>Auto-indentation and bracket matching</li>
              <li>Multiple retro ASCII themes</li>
              <li>Keyboard shortcuts (Ctrl+A, Tab, etc.)</li>
            </ul>
          </div>

          <AsciiCodeEditor
            value={singleEditorContent}
            onChange={setSingleEditorContent}
            filename="example.js"
            options={{
              language: 'javascript',
              theme: 'green',
              lineNumbers: true,
              soundEffects: true,
              tabSize: 2
            }}
            style={{ height: '400px' }}
          />

          <div style={{ marginTop: '15px', fontSize: '0.9rem', color: theme.colors.muted }}>
            <strong>Keyboard Shortcuts:</strong> Ctrl+A (Select All), Tab (Indent), Ctrl+/ (Toggle Comment)
          </div>
        </div>
      )}

      {/* Multi-Tab Editor Demo */}
      {activeDemo === 'tabs' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Multi-Tab Code Editor
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Work with multiple files simultaneously using the tab system.
          </p>

          {/* Tab Controls */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                const tabId = tabs.addTab({
                  filename: `file${tabs.tabs.length + 1}.js`,
                  content: '// New JavaScript file\nconsole.log("Hello from new tab!");',
                  language: 'javascript',
                  isModified: false
                });
                tabs.setActiveTab(tabId);
              }}
              style={{
                padding: '8px 16px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + New JS Tab
            </button>

            <button
              onClick={() => {
                const tabId = tabs.addTab({
                  filename: `component${tabs.tabs.length + 1}.tsx`,
                  content: '// New TypeScript React component\nimport React from "react";\n\nconst Component: React.FC = () => {\n  return <div>Hello World!</div>;\n};\n\nexport default Component;',
                  language: 'typescript',
                  isModified: false
                });
                tabs.setActiveTab(tabId);
              }}
              style={{
                padding: '8px 16px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.secondary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + New TS Tab
            </button>

            <button
              onClick={() => {
                const tabId = tabs.addTab({
                  filename: `styles${tabs.tabs.length + 1}.css`,
                  content: '/* New CSS file */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: #000;\n  color: #00ff00;\n}',
                  language: 'css',
                  isModified: false
                });
                tabs.setActiveTab(tabId);
              }}
              style={{
                padding: '8px 16px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.accent || theme.colors.primary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              + New CSS Tab
            </button>
          </div>

          {/* Tab Bar */}
          {tabs.tabs.length > 0 && (
            <div style={{
              display: 'flex',
              borderBottom: `1px solid ${theme.colors.border}`,
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              {tabs.tabs.map(tab => (
                <div
                  key={tab.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: tab.id === tabs.activeTabId ? theme.colors.primary : theme.colors.background,
                    color: tab.id === tabs.activeTabId ? theme.colors.background : theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderBottom: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.9rem'
                  }}
                  onClick={() => tabs.setActiveTab(tab.id)}
                >
                  <span style={{ marginRight: '8px' }}>
                    {tab.filename}
                    {tab.isModified && ' •'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      tabs.closeTab(tab.id);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      padding: '2px',
                      borderRadius: '2px',
                      fontSize: '0.8rem'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Active Editor */}
          {tabs.activeTab ? (
            <AsciiCodeEditor
              value={tabs.activeTab.content}
              onChange={(newContent) => {
                tabs.updateTab(tabs.activeTab!.id, {
                  content: newContent,
                  isModified: newContent !== tabs.activeTab!.content
                });
              }}
              filename={tabs.activeTab.filename}
              options={{
                language: tabs.activeTab.language,
                theme: 'classic',
                lineNumbers: true,
                soundEffects: true
              }}
              style={{ height: '400px' }}
            />
          ) : (
            <div style={{
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `2px dashed ${theme.colors.border}`,
              borderRadius: '8px',
              color: theme.colors.muted
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📝</div>
                <p>No tabs open. Create a new tab to start coding!</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Theme Gallery Demo */}
      {activeDemo === 'themes' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            ASCII Theme Gallery
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Choose from various retro ASCII themes, each with its own color palette and aesthetic.
          </p>

          {/* Theme Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: theme.colors.text }}>
              Select Theme:
            </label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              style={{
                padding: '8px 12px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '4px'
              }}
            >
              {Object.entries(ASCII_CODE_THEMES).map(([key, themeData]) => (
                <option key={key} value={key}>
                  {themeData.name}
                </option>
              ))}
            </select>
          </div>

          {/* Theme Preview */}
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: theme.colors.text, marginBottom: '10px' }}>
              Theme: {ASCII_CODE_THEMES[selectedTheme].name}
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '10px',
              padding: '15px',
              backgroundColor: ASCII_CODE_THEMES[selectedTheme].colors.gutter,
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}>
              {Object.entries(ASCII_CODE_THEMES[selectedTheme].colors).map(([colorName, colorValue]) => (
                <div key={colorName} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: colorValue,
                    border: '1px solid #333',
                    borderRadius: '2px'
                  }} />
                  <span style={{ color: ASCII_CODE_THEMES[selectedTheme].colors.text }}>
                    {colorName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Editor with Selected Theme */}
          <AsciiCodeEditor
            value={`// ${ASCII_CODE_THEMES[selectedTheme].name} Theme Demo
const themes = {
  retro: true,
  ascii: "awesome",
  colors: ["green", "amber", "cyan"],
  features: [
    "syntax highlighting",
    "line numbers", 
    "cursor tracking",
    "sound effects"
  ]
};

/* This theme showcases:
   - Custom color schemes
   - Retro terminal aesthetics  
   - High contrast readability
*/

function demonstrateTheme() {
  console.log("Welcome to ASCII Code Editor!");
  
  const message = \`Current theme: \${themes.ascii}\`;
  return message.toUpperCase();
}

// Try different themes to see the visual differences
const result = demonstrateTheme();`}
            filename={`theme-demo-${selectedTheme}.js`}
            options={{
              language: 'javascript',
              theme: selectedTheme,
              lineNumbers: true,
              soundEffects: false
            }}
            style={{ height: '350px' }}
            onChange={() => {}} // Read-only for demo
          />
        </div>
      )}

      {/* Language Support Demo */}
      {activeDemo === 'languages' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Multi-Language Support
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            The editor supports syntax highlighting for multiple programming languages.
            Each language has its own tokenizer and keyword set.
          </p>

          {/* Language Selector */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', color: theme.colors.text }}>
              Select Language:
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={{
                padding: '8px 12px',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: '4px'
              }}
            >
              {Object.entries(LANGUAGE_DEFINITIONS).map(([key, langData]) => (
                <option key={key} value={key}>
                  {langData.name} ({langData.extensions.join(', ')})
                </option>
              ))}
            </select>
          </div>

          {/* Language Info */}
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: theme.colors.muted + '20', borderRadius: '4px' }}>
            <h4 style={{ color: theme.colors.text, marginBottom: '10px' }}>
              {LANGUAGE_DEFINITIONS[selectedLanguage].name} Features:
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.9rem' }}>
              <div>
                <strong>Extensions:</strong> {LANGUAGE_DEFINITIONS[selectedLanguage].extensions.join(', ')}
              </div>
              <div>
                <strong>Keywords:</strong> {LANGUAGE_DEFINITIONS[selectedLanguage].keywords.length} supported
              </div>
              <div>
                <strong>Operators:</strong> {LANGUAGE_DEFINITIONS[selectedLanguage].operators.length} types
              </div>
              <div>
                <strong>Comments:</strong> {LANGUAGE_DEFINITIONS[selectedLanguage].commentDelimiters.line.length > 0 ? 'Line & Block' : 'Block only'}
              </div>
            </div>
          </div>

          {/* Editor with Selected Language */}
          <AsciiCodeEditor
            value={languageContent}
            onChange={setLanguageContent}
            filename={`example${LANGUAGE_DEFINITIONS[selectedLanguage].extensions[0]}`}
            options={{
              language: selectedLanguage,
              theme: 'amber',
              lineNumbers: true,
              soundEffects: true
            }}
            style={{ height: '400px' }}
          />

          {/* Language Examples */}
          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: theme.colors.text, marginBottom: '10px' }}>
              Quick Language Examples:
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '10px'
            }}>
              {Object.keys(LANGUAGE_DEFINITIONS).map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  style={{
                    padding: '8px 12px',
                    fontSize: '0.9rem',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: lang === selectedLanguage ? theme.colors.primary : theme.colors.background,
                    color: lang === selectedLanguage ? theme.colors.background : theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {LANGUAGE_DEFINITIONS[lang].name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: '8px',
        textAlign: 'center' as const
      }}>
        <h3 style={{ color: theme.colors.primary, marginBottom: '10px' }}>
          💻 ASCII Code Editor Complete!
        </h3>
        <p style={{ color: theme.colors.text }}>
          Full-featured code editor with syntax highlighting, multiple languages, 
          retro themes, sound effects, and advanced editing features. Perfect for 
          creating authentic terminal-style coding experiences!
        </p>
      </div>
    </div>
  );
};

export default CodeEditorDemo;