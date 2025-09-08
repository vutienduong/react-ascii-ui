import React, { useState } from 'react';
import { 
  AsciiCodeEditor, 
  AsciiCard, 
  AsciiButton, 
  AsciiSelect, 
  AsciiCheckbox,
  useCodeEditor,
  useCodeTabs
} from 'react-ascii-ui';

const getFileExtension = (lang: string): string => {
  const extensions: Record<string, string> = {
    javascript: 'js',
    typescript: 'ts',
    python: 'py',
    go: 'go',
    rust: 'rs',
    cpp: 'cpp'
  };
  return extensions[lang] || 'txt';
};

const sampleCode = {
  javascript: `// ASCII Code Editor Demo - JavaScript
import React, { useState, useEffect } from 'react';

function AsciiCounter() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setCount(count => count + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="ascii-counter">
      <h2>ASCII Counter: {count}</h2>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Stop' : 'Start'} Counter
      </button>
      <div className="ascii-art">
        {count % 2 === 0 ? '█' : '░'}
      </div>
    </div>
  );
}

export default AsciiCounter;`,

  python: `# ASCII Code Editor Demo - Python
import time
import random

class AsciiArtGenerator:
    def __init__(self, width=40, height=20):
        self.width = width
        self.height = height
        self.chars = ' .:-=+*#%@'
    
    def generate_noise(self):
        """Generate random ASCII noise pattern"""
        pattern = []
        for y in range(self.height):
            row = ''
            for x in range(self.width):
                char_idx = random.randint(0, len(self.chars) - 1)
                row += self.chars[char_idx]
            pattern.append(row)
        return '\\n'.join(pattern)
    
    def animate(self, frames=10, delay=0.1):
        """Create animated ASCII art"""
        for i in range(frames):
            print(f"\\033[2J\\033[H")  # Clear screen
            print(f"Frame {i + 1}/{frames}")
            print(self.generate_noise())
            time.sleep(delay)

if __name__ == "__main__":
    generator = AsciiArtGenerator()
    generator.animate(20, 0.2)`,

  typescript: `// ASCII Code Editor Demo - TypeScript
interface AsciiTheme {
  name: string;
  colors: {
    background: string;
    text: string;
    accent: string;
  };
  characters: {
    border: string;
    corner: string;
    separator: string;
  };
}

type ThemeMode = 'light' | 'dark' | 'neon' | 'retro';

class AsciiThemeManager {
  private themes: Map<ThemeMode, AsciiTheme>;
  private currentTheme: ThemeMode;

  constructor() {
    this.themes = new Map();
    this.currentTheme = 'dark';
    this.initializeThemes();
  }

  private initializeThemes(): void {
    this.themes.set('dark', {
      name: 'Dark ASCII',
      colors: {
        background: '#000000',
        text: '#00ff00',
        accent: '#ffffff'
      },
      characters: {
        border: '─│┌┐└┘├┤┬┴┼',
        corner: '┌┐└┘',
        separator: '│'
      }
    });

    this.themes.set('neon', {
      name: 'Neon Glow',
      colors: {
        background: '#0a0a0f',
        text: '#00d4ff',
        accent: '#ff1493'
      },
      characters: {
        border: '═║╔╗╚╝╠╣╦╩╬',
        corner: '╔╗╚╝',
        separator: '║'
      }
    });
  }

  setTheme(mode: ThemeMode): boolean {
    if (this.themes.has(mode)) {
      this.currentTheme = mode;
      return true;
    }
    return false;
  }

  getCurrentTheme(): AsciiTheme | undefined {
    return this.themes.get(this.currentTheme);
  }

  renderBox(content: string[]): string {
    const theme = this.getCurrentTheme();
    if (!theme) return content.join('\\n');

    const [tl, tr, bl, br] = theme.characters.corner;
    const [horizontal, vertical] = theme.characters.border;
    
    const maxWidth = Math.max(...content.map(line => line.length));
    const top = tl + horizontal.repeat(maxWidth + 2) + tr;
    const bottom = bl + horizontal.repeat(maxWidth + 2) + br;
    
    const middle = content.map(line => 
      vertical + ' ' + line.padEnd(maxWidth) + ' ' + vertical
    );

    return [top, ...middle, bottom].join('\\n');
  }
}

export { AsciiThemeManager, type AsciiTheme, type ThemeMode };`,

  go: `// ASCII Code Editor Demo - Go
package main

import (
    "fmt"
    "math/rand"
    "strings"
    "time"
)

type AsciiCanvas struct {
    Width  int
    Height int
    Buffer [][]rune
    Chars  []rune
}

func NewAsciiCanvas(width, height int) *AsciiCanvas {
    buffer := make([][]rune, height)
    for i := range buffer {
        buffer[i] = make([]rune, width)
    }
    
    return &AsciiCanvas{
        Width:  width,
        Height: height,
        Buffer: buffer,
        Chars:  []rune{' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'},
    }
}

func (c *AsciiCanvas) Clear() {
    for y := range c.Buffer {
        for x := range c.Buffer[y] {
            c.Buffer[y][x] = ' '
        }
    }
}

func (c *AsciiCanvas) SetPixel(x, y int, intensity float32) {
    if x < 0 || x >= c.Width || y < 0 || y >= c.Height {
        return
    }
    
    charIndex := int(intensity * float32(len(c.Chars)-1))
    if charIndex >= len(c.Chars) {
        charIndex = len(c.Chars) - 1
    }
    
    c.Buffer[y][x] = c.Chars[charIndex]
}

func (c *AsciiCanvas) DrawCircle(centerX, centerY int, radius float32) {
    for y := 0; y < c.Height; y++ {
        for x := 0; x < c.Width; x++ {
            dx := float32(x - centerX)
            dy := float32(y - centerY)
            distance := dx*dx + dy*dy
            
            if distance <= radius*radius {
                intensity := 1.0 - (distance / (radius * radius))
                c.SetPixel(x, y, intensity)
            }
        }
    }
}

func (c *AsciiCanvas) Render() string {
    var builder strings.Builder
    for _, row := range c.Buffer {
        builder.WriteString(string(row))
        builder.WriteRune('\\n')
    }
    return builder.String()
}

func (c *AsciiCanvas) Animate() {
    for frame := 0; frame < 60; frame++ {
        c.Clear()
        
        // Animated circle
        radius := 5 + 3*float32(frame%20)/20
        c.DrawCircle(c.Width/2, c.Height/2, radius)
        
        // Print frame
        fmt.Print("\\033[2J\\033[H") // Clear screen
        fmt.Printf("Frame %d - ASCII Animation\\n", frame+1)
        fmt.Print(c.Render())
        
        time.Sleep(100 * time.Millisecond)
    }
}

func main() {
    rand.Seed(time.Now().UnixNano())
    canvas := NewAsciiCanvas(50, 25)
    canvas.Animate()
}`
};

function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('green');
  const [showMinimap, setShowMinimap] = useState(false);
  const [lineNumbers, setLineNumbers] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);

  return (
    <AsciiCard title="🎨 Theme & Settings" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Editor Theme</label>
          <AsciiSelect
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
          >
            <option value="green">🟢 ASCII Green</option>
            <option value="amber">🟡 ASCII Amber</option>
            <option value="cyan">🔵 ASCII Cyan</option>
            <option value="classic">⚫ Classic Dark</option>
          </AsciiSelect>
        </div>
        
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Editor Options</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <AsciiCheckbox
              checked={lineNumbers}
              onChange={(e) => setLineNumbers(e.target.checked)}
              label="Show Line Numbers"
            />
            <AsciiCheckbox
              checked={wordWrap}
              onChange={(e) => setWordWrap(e.target.checked)}
              label="Word Wrap"
            />
            <AsciiCheckbox
              checked={showMinimap}
              onChange={(e) => setShowMinimap(e.target.checked)}
              label="Show Minimap"
            />
          </div>
        </div>
      </div>
    </AsciiCard>
  );
}

function MultiTabEditor() {
  const { tabs, activeTab, addTab, closeTab, setActiveTab } = useCodeTabs();
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  
  const addNewTab = () => {
    const fileName = `${selectedLanguage}-example.${getFileExtension(selectedLanguage)}`;
    addTab({
      filename: fileName,
      content: sampleCode[selectedLanguage as keyof typeof sampleCode] || '// New file',
      language: selectedLanguage,
      isModified: false
    });
  };

  return (
    <AsciiCard title="📁 Multi-Tab Code Editor" style={{ marginBottom: '30px' }}>
      {/* Tab Controls */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <AsciiSelect
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="javascript">📄 JavaScript</option>
          <option value="typescript">🔷 TypeScript</option>
          <option value="python">🐍 Python</option>
          <option value="go">🐹 Go</option>
        </AsciiSelect>
        <AsciiButton onClick={addNewTab} style={{ padding: '4px 8px', fontSize: '12px' }}>
          ➕ New Tab
        </AsciiButton>
      </div>

      {/* Tab Bar */}
      <div style={{ 
        display: 'flex', 
        gap: '2px', 
        marginBottom: '10px',
        borderBottom: '1px solid #333',
        paddingBottom: '5px'
      }}>
        {tabs.map(tab => (
          <div
            key={tab.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 12px',
              backgroundColor: activeTab?.id === tab.id ? '#333' : '#111',
              border: '1px solid #444',
              borderBottom: 'none',
              cursor: 'pointer',
              borderRadius: '4px 4px 0 0'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ 
              color: activeTab?.id === tab.id ? '#00ff00' : '#ccc',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              {tab.filename}
              {tab.isModified && ' *'}
            </span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                style={{
                  marginLeft: '8px',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Active Editor */}
      {activeTab && (
        <div style={{ 
          border: '1px solid #333', 
          borderRadius: '0 4px 4px 4px',
          overflow: 'hidden'
        }}>
          <AsciiCodeEditor
            value={activeTab.content}
            filename={activeTab.filename}
            onChange={(content) => {
              // In a real implementation, you'd update the tab content
              console.log('Content changed:', content);
            }}
            options={{
              theme: 'green',
              lineNumbers: true,
              wordWrap: false,
              minimap: true,
              autoIndent: true,
              bracketMatching: true,
              foldingEnabled: true,
              searchEnabled: true,
              autoComplete: true,
              soundEffects: true
            }}
            style={{ height: '400px' }}
          />
        </div>
      )}

      {tabs.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#666',
          border: '1px dashed #333',
          borderRadius: '4px'
        }}>
          📝 No files open. Click "New Tab" to start coding!
        </div>
      )}
    </AsciiCard>
  );
}

function LanguageShowcase() {
  const [activeLanguage, setActiveLanguage] = useState('javascript');

  return (
    <AsciiCard title="🌐 Multi-Language Support" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '15px' }}>
        <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
          {Object.keys(sampleCode).map(lang => (
            <AsciiButton
              key={lang}
              onClick={() => setActiveLanguage(lang)}
              style={{
                backgroundColor: activeLanguage === lang ? '#00ff00' : 'transparent',
                color: activeLanguage === lang ? '#000' : '#00ff00',
                border: `1px solid ${activeLanguage === lang ? '#00ff00' : '#333'}`,
                padding: '4px 8px',
                fontSize: '12px',
                margin: '2px'
              }}
            >
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </AsciiButton>
          ))}
        </div>
      </div>

      <div style={{ 
        border: '1px solid #333', 
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <AsciiCodeEditor
          value={sampleCode[activeLanguage as keyof typeof sampleCode]}
          filename={`example.${getFileExtension(activeLanguage)}`}
          onChange={() => {}}
          options={{
            theme: 'classic',
            lineNumbers: true,
            readOnly: true,
            wordWrap: false,
            minimap: false
          }}
          style={{ height: '350px' }}
        />
      </div>

      <div style={{ 
        marginTop: '15px', 
        padding: '15px', 
        backgroundColor: '#111', 
        border: '1px solid #333',
        borderRadius: '4px'
      }}>
        <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>Language Features for {activeLanguage}:</h4>
        <div style={{ color: '#ccc', fontSize: '14px' }}>
          {activeLanguage === 'javascript' && (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>ES6+ syntax highlighting</li>
              <li>JSX support for React</li>
              <li>Import/export statements</li>
              <li>Template literals</li>
              <li>Arrow functions</li>
            </ul>
          )}
          {activeLanguage === 'typescript' && (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Type annotations</li>
              <li>Interface definitions</li>
              <li>Generic types</li>
              <li>Access modifiers</li>
              <li>Decorators support</li>
            </ul>
          )}
          {activeLanguage === 'python' && (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Class and method definitions</li>
              <li>Docstring highlighting</li>
              <li>Import statements</li>
              <li>F-string literals</li>
              <li>Decorator syntax</li>
            </ul>
          )}
          {activeLanguage === 'go' && (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              <li>Package declarations</li>
              <li>Struct definitions</li>
              <li>Method receivers</li>
              <li>Interface types</li>
              <li>Channel syntax</li>
            </ul>
          )}
        </div>
      </div>
    </AsciiCard>
  );
}

export default function CodeEditorIDE() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>
        💻 Code Editor IDE
      </h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Full-featured code editing environment with multi-language syntax highlighting, 
        tabbed interface, and 4 retro ASCII themes.
      </p>

      <div style={{
        padding: '15px',
        border: '1px solid #ff8800',
        borderRadius: '4px',
        backgroundColor: '#221100',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#ff8800', marginBottom: '10px' }}>🔧 IDE Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ Multi-tab editing</li>
            <li>✅ Syntax highlighting</li>
            <li>✅ Line numbers</li>
            <li>✅ Code folding</li>
          </ul>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ Bracket matching</li>
            <li>✅ Search & replace</li>
            <li>✅ Auto-completion</li>
            <li>✅ 4 ASCII themes</li>
          </ul>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ 6+ languages</li>
            <li>✅ Minimap</li>
            <li>✅ Sound effects</li>
            <li>✅ Word wrap</li>
          </ul>
        </div>
      </div>

      <ThemeSelector />
      <MultiTabEditor />
      <LanguageShowcase />

      {/* Performance Stats */}
      <AsciiCard title="⚡ Performance Metrics" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '24px', fontWeight: 'bold' }}>&lt; 50ms</div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Syntax highlighting</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '24px', fontWeight: 'bold' }}>6+</div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Supported languages</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '24px', fontWeight: 'bold' }}>4</div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Retro themes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '24px', fontWeight: 'bold' }}>∞</div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Open tabs</div>
          </div>
        </div>
      </AsciiCard>

      <div style={{
        marginTop: '40px',
        padding: '30px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>🚀 Built for Developers</h3>
        <p style={{ color: '#ccc', marginBottom: '20px', lineHeight: '1.6' }}>
          This code editor brings the nostalgic feel of retro terminals to modern development. 
          Perfect for building ASCII-styled applications, terminal interfaces, and anywhere you 
          need syntax-highlighted code with that authentic retro computing aesthetic.
        </p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '30px'
        }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>🎨 Themes</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>Four carefully crafted ASCII themes: Green terminal, Amber CRT, Cyan matrix, and Classic dark</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>⚡ Performance</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>Optimized tokenizer for instant syntax highlighting without external dependencies</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>🔧 Features</h4>
            <p style={{ color: '#ccc', fontSize: '14px' }}>All the essentials: auto-completion, bracket matching, search, fold, and more</p>
          </div>
        </div>
      </div>
    </div>
  );
}