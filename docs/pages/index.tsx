export default function Home() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>React ASCII UI</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Welcome to React ASCII UI - the complete component library for building ASCII-style user interfaces in React.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>What is React ASCII UI?</h2>
      
      <p style={{ lineHeight: '1.6', marginBottom: '20px', color: '#ccc' }}>
        React ASCII UI is a comprehensive collection of 50+ React components designed to create beautiful, retro-style 
        interfaces that embrace the ASCII aesthetic. From basic UI elements to advanced data visualization, forms, 
        layout systems, and even a full terminal emulator - everything you need for building professional ASCII-style applications.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Key Features</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><strong>50+ ASCII-styled components</strong> covering all UI needs</li>
        <li><strong>Data Visualization</strong> - Charts, graphs, and sparklines with ASCII styling</li>
        <li><strong>Advanced Forms</strong> - Multi-step forms with validation and file upload</li>
        <li><strong>Layout System</strong> - Responsive grids, containers, and window management</li>
        <li><strong>Terminal Emulator</strong> - Full-featured terminal with command parsing</li>
        <li><strong>Animation System</strong> - Smooth ASCII animations and transitions</li>
        <li><strong>7 Built-in Themes</strong> - From classic terminal to cyberpunk aesthetics</li>
        <li><strong>Full TypeScript support</strong> with comprehensive type definitions</li>
        <li><strong>Responsive design</strong> that works everywhere</li>
        <li><strong>Tree-shakeable</strong> for optimal bundle sizes</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Quick Example</h2>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { AsciiButton, AsciiCard } from 'react-ascii-ui';

function App() {
  return (
    <AsciiCard title="Welcome">
      <p>Hello ASCII world!</p>
      <AsciiButton onClick={() => alert('Clicked!')}>
        Click me
      </AsciiButton>
    </AsciiCard>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Ready to get started?</h2>
      
      <div style={{ marginBottom: '60px' }}>
        <a 
          href="/getting-started" 
          style={{ 
            display: 'inline-block', 
            backgroundColor: '#111', 
            border: '1px solid #fff', 
            padding: '12px 24px', 
            color: '#00ff00', 
            textDecoration: 'none',
            transition: 'background-color 0.2s'
          }}
        >
          [Get Started →]
        </a>
      </div>
    </div>
  );
}