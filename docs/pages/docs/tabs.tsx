import React from 'react';
import { AsciiTabs, AsciiAlert } from 'react-ascii-ui';

export default function TabsDocs() {
  const basicTabs = [
    {
      label: "Overview",
      content: (
        <div style={{ color: '#ccc' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Welcome to React ASCII UI</h3>
          <p style={{ marginBottom: '15px' }}>
            A collection of retro-styled React components that bring the aesthetic of classic 
            terminal interfaces to modern web applications.
          </p>
          <p>
            Perfect for developers who want to create nostalgic, hacker-style interfaces 
            or command-line inspired web apps.
          </p>
        </div>
      )
    },
    {
      label: "Features",
      content: (
        <div style={{ color: '#ccc' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Key Features</h3>
          <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8' }}>
            <li>25+ ASCII-styled components</li>
            <li>TypeScript support out of the box</li>
            <li>Lightweight and tree-shakeable</li>
            <li>Accessible and keyboard-friendly</li>
            <li>Retro terminal aesthetic</li>
            <li>Easy customization with CSS classes</li>
          </ul>
        </div>
      )
    },
    {
      label: "Installation",
      content: (
        <div style={{ color: '#ccc' }}>
          <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Get Started</h3>
          <p style={{ marginBottom: '15px' }}>Install the package using your preferred package manager:</p>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            marginBottom: '15px'
          }}>
            npm install react-ascii-ui
          </pre>
          <p>Then import and use the components in your React application.</p>
        </div>
      )
    }
  ];

  const codeTabs = [
    {
      label: "JavaScript",
      content: (
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto'
        }}>
{`import { AsciiButton, AsciiInput } from 'react-ascii-ui';

function App() {
  return (
    <div>
      <AsciiInput placeholder="Enter your name" />
      <AsciiButton onClick={() => alert('Hello!')}>
        Say Hello
      </AsciiButton>
    </div>
  );
}`}
        </pre>
      )
    },
    {
      label: "TypeScript",
      content: (
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto'
        }}>
{`import React, { useState } from 'react';
import { AsciiButton, AsciiInput } from 'react-ascii-ui';

interface AppProps {
  defaultName?: string;
}

const App: React.FC<AppProps> = ({ defaultName = '' }) => {
  const [name, setName] = useState<string>(defaultName);

  const handleClick = (): void => {
    alert(\`Hello, \${name}!\`);
  };

  return (
    <div>
      <AsciiInput 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name" 
      />
      <AsciiButton onClick={handleClick}>
        Say Hello
      </AsciiButton>
    </div>
  );
};`}
        </pre>
      )
    },
    {
      label: "CSS",
      content: (
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '14px',
          overflow: 'auto'
        }}>
{`/* Custom styling for ASCII components */
.my-custom-button {
  background-color: #001100;
  border: 2px solid #00ff00;
}

.my-custom-button:hover {
  background-color: #00ff00;
  color: #000000;
}

/* Override default ASCII styling */
.font-mono {
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.retro-container {
  background: linear-gradient(45deg, #000, #001100);
  border: 1px solid #00ff00;
  padding: 20px;
}`}
        </pre>
      )
    },
    {
      label: "Disabled",
      content: <div>This tab is disabled</div>,
      disabled: true
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Tabs</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Organize content into switchable sections with ASCII-styled tab headers.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#docs" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
          <span style={{ color: '#333' }}>•</span>
          <a href="#api" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>API Reference</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#111', 
            border: 'none', 
            color: '#fff', 
            borderBottom: '2px solid #00ff00',
            fontFamily: 'monospace'
          }}>
            Preview
          </button>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#666',
            fontFamily: 'monospace'
          }}>
            Code
          </button>
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
              Basic Tabs:
            </h4>
            <AsciiTabs tabs={basicTabs} />
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Code Examples (with disabled tab):
            </h4>
            <AsciiTabs tabs={codeTabs} defaultTab={1} />
          </div>
        </div>
      </div>

      {/* Installation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: '#333', 
              border: '1px solid #666', 
              color: '#fff',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              npm
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              yarn
            </button>
            <button style={{ 
              padding: '5px 10px', 
              backgroundColor: 'transparent', 
              border: '1px solid #333', 
              color: '#666',
              fontSize: '12px',
              fontFamily: 'monospace'
            }}>
              pnpm
            </button>
          </div>
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
          {`import { AsciiTabs } from 'react-ascii-ui';

const tabs = [
  {
    label: "Tab 1",
    content: <div>Content for first tab</div>
  },
  {
    label: "Tab 2", 
    content: <div>Content for second tab</div>
  }
];

export default function Example() {
  return <AsciiTabs tabs={tabs} />;
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Tabs</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTabs 
              tabs={[
                { label: "Home", content: "Welcome to the home page!" },
                { label: "About", content: "Learn more about our project." },
                { label: "Contact", content: "Get in touch with us." }
              ]} 
            />
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
            {`const tabs = [
  { label: "Home", content: "Welcome to the home page!" },
  { label: "About", content: "Learn more about our project." },
  { label: "Contact", content: "Get in touch with us." }
];

<AsciiTabs tabs={tabs} />`}
          </pre>
        </div>

        {/* Default Tab Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Default Active Tab</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTabs 
              tabs={[
                { label: "First", content: "This is the first tab" },
                { label: "Second", content: "This tab starts active!" },
                { label: "Third", content: "This is the third tab" }
              ]}
              defaultTab={1}
            />
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
            {`<AsciiTabs 
  tabs={tabs} 
  defaultTab={1}  // Second tab starts active
/>`}
          </pre>
        </div>

        {/* With Disabled Tab */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Disabled Tabs</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTabs 
              tabs={[
                { label: "Available", content: "This tab is available" },
                { label: "Disabled", content: "You shouldn't see this", disabled: true },
                { label: "Active", content: "This tab is clickable" }
              ]}
            />
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
            {`const tabs = [
  { label: "Available", content: "This tab is available" },
  { label: "Disabled", content: "Hidden content", disabled: true },
  { label: "Active", content: "This tab is clickable" }
];

<AsciiTabs tabs={tabs} />`}
          </pre>
        </div>

        {/* Rich Content Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Rich Content</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTabs 
              tabs={[
                {
                  label: "Dashboard",
                  content: (
                    <div>
                      <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>System Status</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        <div style={{ padding: '10px', border: '1px solid #333' }}>
                          <div style={{ color: '#ccc' }}>CPU Usage: 45%</div>
                        </div>
                        <div style={{ padding: '10px', border: '1px solid #333' }}>
                          <div style={{ color: '#ccc' }}>Memory: 2.3GB</div>
                        </div>
                      </div>
                    </div>
                  )
                },
                {
                  label: "Alerts",
                  content: (
                    <div>
                      <AsciiAlert variant="warning" title="System Alert">
                        Disk space is running low on drive C:
                      </AsciiAlert>
                    </div>
                  )
                }
              ]}
            />
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
            {`const tabs = [
  {
    label: "Dashboard",
    content: (
      <div>
        <h4>System Status</h4>
        <div>CPU Usage: 45%</div>
        <div>Memory: 2.3GB</div>
      </div>
    )
  },
  {
    label: "Alerts",
    content: (
      <AsciiAlert variant="warning" title="System Alert">
        Disk space is running low
      </AsciiAlert>
    )
  }
];`}
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
                  tabs
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  AsciiTab[]
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
                  Array of tab objects to display
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  defaultTab
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  number
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  0
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Index of tab that should be active initially
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  onTabChange
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  (index: number) =&gt; void
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
                  Callback fired when active tab changes
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  className
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
                  ""
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Additional CSS classes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px', marginTop: '20px' }}>AsciiTab</h4>
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
                  Property
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
                  Required
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
                  Yes
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Text displayed on the tab header
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  content
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  React.ReactNode
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Yes
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Content to show when tab is active
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  disabled
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
                  No
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether the tab is disabled and unclickable
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ 
          color: '#ccc', 
          marginTop: '15px',
          fontSize: '14px'
        }}>
          AsciiTabs extends all HTML div attributes and React.HTMLAttributes.
        </p>
      </div>
    </div>
  );
}