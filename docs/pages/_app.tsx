import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <nav style={{ borderBottom: '1px solid #fff', paddingBottom: '20px', marginBottom: '40px' }}>
        <div style={{ marginBottom: '15px' }}>
          <a href="/" style={{ color: '#00ff00', textDecoration: 'none', marginRight: '20px' }}>React ASCII UI</a>
          <a href="/getting-started" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Getting Started</a>
          <a href="/components" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Components</a>
          <a href="/roadmap" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>Roadmap</a>
        </div>
        <div style={{ fontSize: '14px' }}>
          <span style={{ color: '#666', marginRight: '15px' }}>Demos:</span>
          <a href="/dashboard" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Dashboard</a>
          <a href="/table" style={{ color: '#00ffff', textDecoration: 'none', marginRight: '15px' }}>Table</a>
          <a href="/chart" style={{ color: '#00ffff', textDecoration: 'none' }}>Chart</a>
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