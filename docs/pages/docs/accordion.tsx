import React from 'react';
import { AsciiAccordion } from 'react-ascii-ui';

export default function AccordionDocs() {
  const basicItems = [
    {
      title: "What is React ASCII UI?",
      content: (
        <div>
          <p style={{ color: '#ccc', marginBottom: '10px' }}>
            React ASCII UI is a collection of retro-styled React components that use ASCII characters 
            for styling instead of traditional graphics.
          </p>
          <p style={{ color: '#ccc' }}>
            Perfect for terminal-like interfaces and nostalgic web applications.
          </p>
        </div>
      )
    },
    {
      title: "Installation",
      content: (
        <div>
          <p style={{ color: '#ccc', marginBottom: '10px' }}>Install the package using npm:</p>
          <pre style={{ 
            backgroundColor: '#000', 
            padding: '10px', 
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace'
          }}>
            npm install react-ascii-ui
          </pre>
        </div>
      )
    },
    {
      title: "Getting Started",
      content: (
        <div>
          <p style={{ color: '#ccc', marginBottom: '10px' }}>
            Import components and start building your retro interface:
          </p>
          <pre style={{ 
            backgroundColor: '#000', 
            padding: '10px', 
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`import { AsciiButton, AsciiInput } from 'react-ascii-ui';`}
          </pre>
        </div>
      ),
      defaultOpen: true
    }
  ];

  const multipleItems = [
    {
      title: "Frontend Development",
      content: "Learn React, Vue, and Angular frameworks for modern web development."
    },
    {
      title: "Backend Development", 
      content: "Master Node.js, Python, and database technologies.",
      defaultOpen: true
    },
    {
      title: "DevOps & Deployment",
      content: "Understand Docker, Kubernetes, and cloud platforms."
    }
  ];

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Accordion</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          Expandable content sections with ASCII-style indicators for organizing information.
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
              Default (Single Open):
            </h4>
            <AsciiAccordion items={basicItems} />
          </div>

          <div>
            <h4 style={{ color: '#ccc', marginBottom: '15px', fontFamily: 'monospace' }}>
              Multiple Open Allowed:
            </h4>
            <AsciiAccordion items={multipleItems} allowMultiple />
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
          {`import { AsciiAccordion } from 'react-ascii-ui';

const items = [
  {
    title: "Section 1",
    content: "Content for the first section",
    defaultOpen: true
  },
  {
    title: "Section 2", 
    content: "Content for the second section"
  }
];

export default function Example() {
  return <AsciiAccordion items={items} />;
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Accordion</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiAccordion 
              items={[
                { title: "First Item", content: "Content of the first accordion item" },
                { title: "Second Item", content: "Content of the second accordion item" }
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
            {`const items = [
  { title: "First Item", content: "Content of the first item" },
  { title: "Second Item", content: "Content of the second item" }
];

<AsciiAccordion items={items} />`}
          </pre>
        </div>

        {/* Default Open Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Default Open</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiAccordion 
              items={[
                { title: "Always Closed", content: "This starts closed" },
                { title: "Initially Open", content: "This section starts expanded", defaultOpen: true }
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
            {`const items = [
  { title: "Always Closed", content: "This starts closed" },
  { title: "Initially Open", content: "Expanded by default", defaultOpen: true }
];

<AsciiAccordion items={items} />`}
          </pre>
        </div>

        {/* Multiple Open Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Allow Multiple Open</h3>
          <div style={{
            padding: '30px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiAccordion 
              items={[
                { title: "Section A", content: "You can open multiple sections at once" },
                { title: "Section B", content: "This one can be open too", defaultOpen: true },
                { title: "Section C", content: "And this one as well!" }
              ]}
              allowMultiple
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
            {`<AsciiAccordion 
  items={items}
  allowMultiple 
/>`}
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
                  items
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  AsciiAccordionItem[]
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
                  Array of accordion items to display
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  allowMultiple
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
                  false
                </td>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#ccc'
                }}>
                  Whether multiple sections can be open simultaneously
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
        
        <h4 style={{ color: '#fff', fontSize: '1.1em', marginBottom: '10px', marginTop: '20px' }}>AsciiAccordionItem</h4>
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
                  title
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
                  The header text for the accordion item
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
                  The content to show when expanded
                </td>
              </tr>
              <tr>
                <td style={{ 
                  padding: '12px', 
                  borderBottom: '1px solid #333',
                  color: '#00ff00'
                }}>
                  defaultOpen
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
                  Whether this item should start expanded
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
          AsciiAccordion extends all HTML div attributes and React.HTMLAttributes.
        </p>
      </div>
    </div>
  );
}