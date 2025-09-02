import React from 'react';
import Link from 'next/link';

const components = [
  {
    category: 'Forms & Input',
    items: [
      { name: 'Button', href: '/docs/button', description: 'Clickable button with ASCII styling' },
      { name: 'Input', href: '/docs/input', description: 'Text input field with ASCII border' },
      { name: 'Checkbox', href: '/docs/checkbox', description: 'Checkbox with ASCII checkmarks' },
      { name: 'Radio', href: '/docs/radio', description: 'Radio button with selection indicators' },
      { name: 'Select', href: '/docs/select', description: 'Dropdown with ASCII arrows' },
      { name: 'Textarea', href: '/docs/textarea', description: 'Multi-line text input' },
    ]
  },
  {
    category: 'Layout & Structure',
    items: [
      { name: 'Card', href: '/docs/card', description: 'Container with title and border' },
      { name: 'Navbar', href: '/docs/navbar', description: 'Horizontal navigation bar' },
      { name: 'Sidebar', href: '/docs/sidebar', description: 'Collapsible side navigation' },
      { name: 'Table', href: '/docs/table', description: 'Data table with ASCII borders' },
      { name: 'Tabs', href: '/docs/tabs', description: 'Tabbed interface' },
      { name: 'Accordion', href: '/docs/accordion', description: 'Expandable sections' },
    ]
  },
  {
    category: 'Feedback & Status',
    items: [
      { name: 'Alert', href: '/docs/alert', description: 'Status messages [INFO], [ERROR], etc.' },
      { name: 'Badge', href: '/docs/badge', description: 'Small status indicators' },
      { name: 'Progress', href: '/docs/progress', description: 'Progress bars with ASCII characters' },
      { name: 'Spinner', href: '/docs/spinner', description: 'Loading indicators' },
      { name: 'Toast', href: '/docs/toast', description: 'Temporary notification messages' },
    ]
  },
  {
    category: 'Data Display',
    items: [
      { name: 'Chart', href: '/docs/chart', description: 'ASCII charts and graphs' },
      { name: 'Tree', href: '/docs/tree', description: 'Hierarchical tree view' },
      { name: 'Pagination', href: '/docs/pagination', description: 'Page navigation controls' },
    ]
  },
  {
    category: 'Overlay & Dialog',
    items: [
      { name: 'Modal', href: '/docs/modal', description: 'Dialog boxes and modals' },
      { name: 'Tooltip', href: '/docs/tooltip', description: 'Hover information display' },
      { name: 'Popover', href: '/docs/popover', description: 'Contextual overlay content' },
    ]
  }
];

export default function Components() {
  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Components</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          A comprehensive collection of ASCII-styled React components for building retro interfaces.
        </p>
      </div>

      {components.map((category, categoryIndex) => (
        <div key={categoryIndex} style={{ marginBottom: '50px' }}>
          <h2 style={{ 
            color: '#fff', 
            fontSize: '1.8em', 
            marginBottom: '20px',
            borderBottom: '1px solid #333',
            paddingBottom: '10px'
          }}>
            {category.category}
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '15px'
          }}>
            {category.items.map((component, index) => (
              <Link
                key={index}
                href={component.href}
                style={{
                  display: 'block',
                  padding: '20px',
                  border: '1px solid #333',
                  borderRadius: '4px',
                  backgroundColor: '#111',
                  textDecoration: 'none',
                  color: '#fff',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff00';
                  e.currentTarget.style.backgroundColor = '#1a1a1a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#333';
                  e.currentTarget.style.backgroundColor = '#111';
                }}
              >
                <h3 style={{ 
                  color: '#00ff00', 
                  fontSize: '1.3em', 
                  marginBottom: '8px',
                  fontFamily: 'monospace'
                }}>
                  Ascii{component.name}
                </h3>
                <p style={{ 
                  color: '#ccc', 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {component.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        marginTop: '60px',
        padding: '30px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Installation</h3>
        <p style={{ color: '#ccc', marginBottom: '20px' }}>
          Install React ASCII UI to get started with all components
        </p>
        <pre style={{ 
          backgroundColor: '#000', 
          border: '1px solid #333', 
          padding: '15px', 
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace'
        }}>
          npm install react-ascii-ui
        </pre>
      </div>
    </div>
  );
}