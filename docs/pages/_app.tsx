import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <nav style={{ borderBottom: '1px solid #fff', paddingBottom: '20px', marginBottom: '40px' }}>
        <div style={{ marginBottom: '15px' }}>
          <a href="/" style={{ color: '#00ff00', textDecoration: 'none', marginRight: '20px' }}>React ASCII UI</a>
          <a href="/getting-started" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Getting Started</a>
          <a href="/components" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Components</a>
          <a href="/themes" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Themes</a>
          <a href="/animations" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Animations</a>
          <a href="/roadmap" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Roadmap</a>
        </div>
        <div style={{ fontSize: '14px' }}>
          <span style={{ color: '#666', marginRight: '15px' }}>Demos:</span>
          <a href="/dashboard" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Dashboard</a>
          <a href="/terminal" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Terminal</a>
          <a href="/ide" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>IDE</a>
          <a href="/music-player" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Music Player</a>
          <a href="/chat" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Chat</a>
          <a href="/email" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Email</a>
          <a href="/file-manager" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>File Manager</a>
          <a href="/monitoring" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Monitoring</a>
          <a href="/table" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Table</a>
          <a href="/chart" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Chart</a>
          <a href="/sound-demo" style={{ color: '#ffaa00', textDecoration: 'none', marginRight: '15px' }}>🔊 Sound Demo</a>
          <a href="/ascii-art-studio" style={{ color: '#ffaa00', textDecoration: 'none', marginRight: '15px' }}>🎨 ASCII Art Studio</a>
          <a href="/code-editor-ide" style={{ color: '#ffaa00', textDecoration: 'none', marginRight: '15px' }}>💻 Code Editor IDE</a>
          <a href="/network-monitor" style={{ color: '#ffaa00', textDecoration: 'none' }}>🔗 Network Monitor</a>
        </div>
      </nav>
      <Component {...pageProps} />
      <footer style={{ borderTop: '1px solid #fff', paddingTop: '20px', marginTop: '40px', textAlign: 'center', color: '#666' }}>
        <p>Built with love for the ASCII aesthetic revolution</p>
        <p>© 2024 React ASCII UI. MIT License.</p>
      </footer>
    </div>
  );
}