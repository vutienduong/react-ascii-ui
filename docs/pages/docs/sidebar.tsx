import React, { useState } from 'react';
import { AsciiSidebar } from 'react-ascii-ui';

export default function SidebarDocs() {
  const [activeNavItem, setActiveNavItem] = useState('dashboard');
  const [activeFileItem, setActiveFileItem] = useState('');

  const navItems = [
    { label: 'Dashboard', onClick: () => setActiveNavItem('dashboard'), active: activeNavItem === 'dashboard', icon: '⬢' },
    { label: 'Users', onClick: () => setActiveNavItem('users'), active: activeNavItem === 'users', icon: '👤' },
    { label: 'Settings', onClick: () => setActiveNavItem('settings'), active: activeNavItem === 'settings', icon: '⚙' },
    { label: 'Analytics', onClick: () => setActiveNavItem('analytics'), active: activeNavItem === 'analytics', icon: '📊' }
  ];

  const fileItems = [
    { label: 'src/', onClick: () => setActiveFileItem('src'), active: activeFileItem === 'src', icon: '📁' },
    { label: 'components/', onClick: () => setActiveFileItem('components'), active: activeFileItem === 'components', icon: '📁' },
    { label: 'Button.tsx', onClick: () => setActiveFileItem('button'), active: activeFileItem === 'button', icon: '📄' },
    { label: 'Input.tsx', onClick: () => setActiveFileItem('input'), active: activeFileItem === 'input', icon: '📄' },
    { label: 'package.json', onClick: () => setActiveFileItem('package'), active: activeFileItem === 'package', icon: '📦' }
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiSidebar</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          A collapsible sidebar navigation component with ASCII styling and bracket notation.
        </p>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '250px 1fr', 
          gap: '20px',
          height: '400px',
          border: '1px solid #333',
          backgroundColor: '#111'
        }}>
          <AsciiSidebar
            title="Navigation"
            items={navItems}
            width="w-full"
          />
          <div style={{ padding: '20px', color: '#ccc' }}>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Main Content</h3>
            <p>Current section: <span style={{ color: '#00ff00' }}>{activeNavItem}</span></p>
            <p style={{ marginTop: '10px', lineHeight: '1.6' }}>
              Click on sidebar items to see active state changes. The sidebar uses bracket notation
              and supports icons, active states, and click handlers.
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto'
        }}>
{`npm install react-ascii-ui`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Usage</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`import { AsciiSidebar } from 'react-ascii-ui';

const items = [
  { 
    label: 'Dashboard', 
    onClick: () => console.log('Dashboard clicked'),
    active: true,
    icon: '⬢'
  },
  { 
    label: 'Users', 
    href: '/users',
    icon: '👤'
  }
];

export default function App() {
  return (
    <AsciiSidebar
      title="My App"
      items={items}
      width="w-64"
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>File Explorer Sidebar</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '250px 1fr', 
            gap: '20px',
            height: '300px',
            border: '1px solid #333',
            backgroundColor: '#111'
          }}>
            <AsciiSidebar
              title="File Explorer"
              items={fileItems}
              width="w-full"
            />
            <div style={{ padding: '20px', color: '#ccc' }}>
              <p>Selected: <span style={{ color: '#00ff00' }}>{activeFileItem || 'None'}</span></p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Sidebar with Links</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '250px 1fr', 
            gap: '20px',
            height: '250px',
            border: '1px solid #333',
            backgroundColor: '#111'
          }}>
            <AsciiSidebar
              title="External Links"
              items={[
                { label: 'Home', href: '/', icon: '🏠' },
                { label: 'About', href: '/about', icon: 'ℹ' },
                { label: 'Contact', href: '/contact', icon: '✉' }
              ]}
              width="w-full"
            />
            <div style={{ padding: '20px', color: '#ccc' }}>
              <p>These items are links that will navigate to different pages.</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        <div style={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>items</td>
                <td style={{ padding: '8px', color: '#ccc' }}>AsciiSidebarItem[]</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Array of sidebar items</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>title</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Optional sidebar title</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>width</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>"w-64"</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Sidebar width class</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>className</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                <td style={{ padding: '8px', color: '#ccc' }}>""</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>

          <div style={{ marginTop: '20px' }}>
            <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>AsciiSidebarItem</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Property</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Type</th>
                  <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>label</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>Display text for the item</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>href</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>Optional link URL</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>onClick</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>{'() => void'}</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>Optional click handler</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>active</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>Whether item is active</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px', fontFamily: 'monospace' }}>icon</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>string</td>
                  <td style={{ padding: '8px', color: '#ccc' }}>Optional icon character</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}