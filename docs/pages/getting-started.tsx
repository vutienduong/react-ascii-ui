export default function GettingStarted() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Getting Started</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Get up and running with React ASCII UI in minutes.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Installation</h2>
      
      <p style={{ marginBottom: '10px', color: '#ccc' }}>Install the package via npm:</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '15px',
        color: '#ccc'
      }}>
        npm install react-ascii-ui
      </pre>

      <p style={{ marginBottom: '10px', color: '#ccc' }}>Or with yarn:</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '30px',
        color: '#ccc'
      }}>
        yarn add react-ascii-ui
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Basic Usage</h2>
      
      <p style={{ marginBottom: '15px', color: '#ccc' }}>Import and use components in your React application:</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        marginBottom: '30px',
        color: '#ccc',
        overflow: 'auto'
      }}>
{`import { AsciiButton, AsciiCard, AsciiInput } from 'react-ascii-ui';

function MyComponent() {
  return (
    <AsciiCard title="Login">
      <AsciiInput placeholder="Username" />
      <AsciiInput type="password" placeholder="Password" />
      <AsciiButton>Login</AsciiButton>
    </AsciiCard>
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>TypeScript Support</h2>
      
      <p style={{ marginBottom: '15px', color: '#ccc' }}>
        React ASCII UI is built with TypeScript and provides full type definitions. All components extend the appropriate HTML element props:
      </p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        marginBottom: '30px',
        color: '#ccc',
        overflow: 'auto'
      }}>
{`import { AsciiButton } from 'react-ascii-ui';

// AsciiButton extends React.ButtonHTMLAttributes<HTMLButtonElement>
<AsciiButton 
  onClick={handleClick}
  disabled={isLoading}
  className="my-custom-class"
>
  Submit
</AsciiButton>`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Next Steps</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><a href="/components" style={{ color: '#00ff00', textDecoration: 'none' }}>Explore all components →</a></li>
        <li><a href="/roadmap" style={{ color: '#00ff00', textDecoration: 'none' }}>Check the roadmap →</a></li>
        <li><a href="https://github.com/your-username/react-ascii-ui" style={{ color: '#00ff00', textDecoration: 'none' }}>View examples on GitHub</a></li>
      </ul>
    </div>
  );
}