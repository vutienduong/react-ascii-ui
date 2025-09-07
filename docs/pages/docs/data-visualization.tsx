export default function DataVisualizationDocs() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Data Visualization</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        ASCII-styled charts and graphs for displaying data in a retro terminal aesthetic.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Available Components</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiBarChart</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Horizontal and vertical bar charts with animations and customizable styling.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiBarChart } from 'react-ascii-ui';

const data = [
  { label: 'Jan', value: 65, color: '#00ff00' },
  { label: 'Feb', value: 59, color: '#0088ff' },
  { label: 'Mar', value: 80, color: '#ff0088' },
];

function MyChart() {
  return (
    <AsciiBarChart 
      data={data} 
      orientation="vertical"
      config={{ 
        showLabels: true, 
        showValues: true,
        animate: true 
      }}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiLineChart</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Line charts with smooth curves, fill options, and grid system.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiLineChart } from 'react-ascii-ui';

function TrendChart() {
  return (
    <AsciiLineChart 
      data={data} 
      smooth={true}
      fill={true}
      config={{ 
        width: 50, 
        height: 15,
        showGrid: true,
        animate: true 
      }}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiSparkline</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Mini charts with trend indicators, perfect for inline metrics.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiSparkline } from 'react-ascii-ui';

const sparkData = [23, 45, 56, 78, 87, 65, 43, 32, 45, 67];

function MetricSparkline() {
  return (
    <div>
      CPU Usage: <AsciiSparkline data={sparkData} showTrend={true} />
    </div>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.4em', marginBottom: '10px' }}>AsciiDonutChart</h3>
        <p style={{ color: '#ccc', marginBottom: '15px' }}>
          Circular charts with legends and percentage display.
        </p>
        <pre style={{ 
          backgroundColor: '#111', 
          border: '1px solid #333', 
          padding: '20px', 
          borderRadius: '4px', 
          overflow: 'auto',
          marginBottom: '20px',
          color: '#ccc'
        }}>
{`import { AsciiDonutChart } from 'react-ascii-ui';

const donutData = [
  { label: 'Desktop', value: 45, color: '#00ff00' },
  { label: 'Mobile', value: 35, color: '#0088ff' },
  { label: 'Tablet', value: 20, color: '#ff0088' },
];

function UsageChart() {
  return (
    <AsciiDonutChart 
      data={donutData}
      showPercentages={true}
      showLegend={true}
    />
  );
}`}
        </pre>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Props Reference</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Common Props</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li><code>data</code> - Array of data points with label, value, and optional color</li>
          <li><code>config.animate</code> - Enable animations (default: true)</li>
          <li><code>config.animationDuration</code> - Animation duration in milliseconds</li>
          <li><code>config.showLabels</code> - Show data labels (default: true)</li>
          <li><code>config.showValues</code> - Show data values (default: true)</li>
        </ul>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Examples</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        Check out the interactive examples in our <a href="/dashboard" style={{ color: '#00ff00' }}>Dashboard Demo</a> to see 
        all data visualization components working together in real-world scenarios.
      </p>
    </div>
  );
}