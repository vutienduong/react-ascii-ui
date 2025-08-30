export default function Home() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>React ASCII UI</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Welcome to React ASCII UI - the complete component library for building ASCII-style user interfaces in React.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>What is React ASCII UI?</h2>
      
      <p style={{ lineHeight: '1.6', marginBottom: '20px', color: '#ccc' }}>
        React ASCII UI is a comprehensive collection of 29+ React components designed to create beautiful, retro-style 
        interfaces that embrace the ASCII aesthetic. Perfect for terminal applications, retro games, developer tools, 
        and any project that wants to stand out with a unique visual style.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Key Features</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><strong>29+ ASCII-styled components</strong> covering all UI needs</li>
        <li><strong>Full TypeScript support</strong> with proper type definitions</li>
        <li><strong>Zero dependencies</strong> (except React)</li>
        <li><strong>Responsive design</strong> that works everywhere</li>
        <li><strong>Consistent API</strong> across all components</li>
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