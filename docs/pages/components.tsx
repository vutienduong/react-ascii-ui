export default function Components() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Components</h1>
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Explore all React ASCII UI components with code examples.
      </p>
      
      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Forms & Input</h2>
      
      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>AsciiButton</h3>
      <p style={{ color: '#ccc', marginBottom: '15px' }}>The foundation of ASCII UI - a button that embraces the retro aesthetic.</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        color: '#ccc'
      }}>
{`<AsciiButton onClick={() => alert('Hello!')}>
  Click Me
</AsciiButton>`}
      </pre>
      
      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>AsciiInput</h3>
      <p style={{ color: '#ccc', marginBottom: '15px' }}>Text input with ASCII styling for forms.</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        color: '#ccc'
      }}>
{`<AsciiInput 
  placeholder="Enter text..."
  defaultValue="Sample text"
/>`}
      </pre>

      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>AsciiCheckbox</h3>
      <p style={{ color: '#ccc', marginBottom: '15px' }}>Checkbox with ASCII checkmarks.</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        color: '#ccc'
      }}>
{`<AsciiCheckbox defaultChecked>
  Accept terms
</AsciiCheckbox>`}
      </pre>
      
      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Layout & Structure</h2>
      
      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>AsciiCard</h3>
      <p style={{ color: '#ccc', marginBottom: '15px' }}>Container component for organizing content.</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        color: '#ccc'
      }}>
{`<AsciiCard title="User Profile">
  <p>Welcome back, User!</p>
  <AsciiButton>Edit Profile</AsciiButton>
</AsciiCard>`}
      </pre>

      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>AsciiNavbar</h3>
      <p style={{ color: '#ccc', marginBottom: '15px' }}>Horizontal navigation bar with ASCII elements.</p>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '15px', 
        borderRadius: '4px', 
        marginBottom: '20px',
        color: '#ccc'
      }}>
{`<AsciiNavbar>
  <AsciiNavbar.Brand>My App</AsciiNavbar.Brand>
  <AsciiNavbar.Item href="/">Home</AsciiNavbar.Item>
  <AsciiNavbar.Item href="/about">About</AsciiNavbar.Item>
</AsciiNavbar>`}
      </pre>
      
      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Component Props</h2>
      
      <p style={{ color: '#ccc', marginBottom: '15px' }}>
        All components extend their respective HTML element props and accept additional styling through the className prop.
      </p>

      <h3 style={{ color: '#fff', fontSize: '1.4em', marginBottom: '10px', marginTop: '30px' }}>Common Props</h3>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><code>className?: string</code> - Additional CSS classes</li>
        <li><code>children?: React.ReactNode</code> - Child elements</li>
        <li>All standard HTML attributes for the respective element type</li>
      </ul>

      <p style={{ color: '#ccc', marginTop: '40px' }}>
        More component examples and full API documentation available in the library source code!
      </p>
    </div>
  );
}