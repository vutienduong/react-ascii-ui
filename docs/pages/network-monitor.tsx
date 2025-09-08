import React, { useState, useEffect } from 'react';
import { 
  AsciiNetworkVisualizer, 
  AsciiCard, 
  AsciiButton, 
  AsciiSelect, 
  AsciiInput,
  AsciiCheckbox,
  useNetworkVisualizer,
  useNetworkAnalysis,
  useNetworkMonitoring,
  generateSampleNetwork,
  analyzeNetwork
} from 'react-ascii-ui';

const sampleTopologies = {
  enterprise: {
    nodes: [
      { id: 'fw1', label: 'Firewall', type: 'firewall', status: 'online', x: 50, y: 100 },
      { id: 'sw1', label: 'Core Switch', type: 'switch', status: 'online', x: 200, y: 100 },
      { id: 'sw2', label: 'Access Switch', type: 'switch', status: 'online', x: 350, y: 100 },
      { id: 'srv1', label: 'Web Server', type: 'server', status: 'online', x: 200, y: 200 },
      { id: 'srv2', label: 'Database', type: 'database', status: 'warning', x: 300, y: 200 },
      { id: 'ws1', label: 'Workstation 1', type: 'workstation', status: 'online', x: 300, y: 50 },
      { id: 'ws2', label: 'Workstation 2', type: 'workstation', status: 'offline', x: 400, y: 50 }
    ],
    edges: [
      { id: 'e1', source: 'fw1', target: 'sw1', type: 'ethernet', status: 'active' },
      { id: 'e2', source: 'sw1', target: 'sw2', type: 'fiber', status: 'active' },
      { id: 'e3', source: 'sw1', target: 'srv1', type: 'ethernet', status: 'active' },
      { id: 'e4', source: 'sw1', target: 'srv2', type: 'ethernet', status: 'congested' },
      { id: 'e5', source: 'sw2', target: 'ws1', type: 'ethernet', status: 'active' },
      { id: 'e6', source: 'sw2', target: 'ws2', type: 'ethernet', status: 'inactive' }
    ]
  },
  
  datacenter: {
    nodes: [
      { id: 'lb1', label: 'Load Balancer', type: 'server', status: 'online', x: 100, y: 50 },
      { id: 'web1', label: 'Web Server 1', type: 'server', status: 'online', x: 50, y: 150 },
      { id: 'web2', label: 'Web Server 2', type: 'server', status: 'online', x: 150, y: 150 },
      { id: 'app1', label: 'App Server 1', type: 'server', status: 'online', x: 50, y: 250 },
      { id: 'app2', label: 'App Server 2', type: 'server', status: 'warning', x: 150, y: 250 },
      { id: 'db1', label: 'Primary DB', type: 'database', status: 'online', x: 100, y: 350 },
      { id: 'db2', label: 'Replica DB', type: 'database', status: 'online', x: 200, y: 350 },
      { id: 'cache1', label: 'Redis Cache', type: 'server', status: 'online', x: 250, y: 150 }
    ],
    edges: [
      { id: 'e1', source: 'lb1', target: 'web1', type: 'ethernet', status: 'active' },
      { id: 'e2', source: 'lb1', target: 'web2', type: 'ethernet', status: 'active' },
      { id: 'e3', source: 'web1', target: 'app1', type: 'api', status: 'active' },
      { id: 'e4', source: 'web2', target: 'app2', type: 'api', status: 'congested' },
      { id: 'e5', source: 'app1', target: 'db1', type: 'api', status: 'active' },
      { id: 'e6', source: 'app2', target: 'db1', type: 'api', status: 'active' },
      { id: 'e7', source: 'db1', target: 'db2', type: 'api', status: 'active' },
      { id: 'e8', source: 'web1', target: 'cache1', type: 'api', status: 'active' },
      { id: 'e9', source: 'web2', target: 'cache1', type: 'api', status: 'active' }
    ]
  },
  
  iot: {
    nodes: [
      { id: 'gateway', label: 'IoT Gateway', type: 'router', status: 'online', x: 200, y: 100 },
      { id: 'cloud', label: 'Cloud Service', type: 'cloud', status: 'online', x: 200, y: 50 },
      { id: 'sensor1', label: 'Temperature', type: 'sensor', status: 'online', x: 100, y: 200 },
      { id: 'sensor2', label: 'Humidity', type: 'sensor', status: 'online', x: 150, y: 220 },
      { id: 'sensor3', label: 'Motion', type: 'sensor', status: 'warning', x: 250, y: 220 },
      { id: 'camera1', label: 'Security Cam', type: 'camera', status: 'online', x: 300, y: 200 },
      { id: 'mobile', label: 'Mobile App', type: 'mobile', status: 'online', x: 350, y: 100 },
      { id: 'printer', label: 'Smart Printer', type: 'printer', status: 'offline', x: 50, y: 150 }
    ],
    edges: [
      { id: 'e1', source: 'gateway', target: 'cloud', type: 'wan', status: 'active' },
      { id: 'e2', source: 'gateway', target: 'sensor1', type: 'wifi', status: 'active' },
      { id: 'e3', source: 'gateway', target: 'sensor2', type: 'wifi', status: 'active' },
      { id: 'e4', source: 'gateway', target: 'sensor3', type: 'wifi', status: 'congested' },
      { id: 'e5', source: 'gateway', target: 'camera1', type: 'wifi', status: 'active' },
      { id: 'e6', source: 'gateway', target: 'mobile', type: 'wifi', status: 'active' },
      { id: 'e7', source: 'gateway', target: 'printer', type: 'wifi', status: 'inactive' }
    ]
  }
};

function TopologyBuilder() {
  const [selectedTopology, setSelectedTopology] = useState('enterprise');
  const [currentTopology, setCurrentTopology] = useState(sampleTopologies.enterprise);
  const [layout, setLayout] = useState('force');
  const [theme, setTheme] = useState('green');
  const [showLabels, setShowLabels] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [interactive, setInteractive] = useState(true);

  const loadTopology = (topologyName: string) => {
    setSelectedTopology(topologyName);
    setCurrentTopology(sampleTopologies[topologyName as keyof typeof sampleTopologies]);
  };

  const generateRandomTopology = () => {
    const generated = generateSampleNetwork();
    setCurrentTopology(generated as any);
    setSelectedTopology('random');
  };

  const analyzeCurrentTopology = () => {
    const analysis = analyzeNetwork(currentTopology as any);
    alert(`Network Analysis:
    
Nodes: ${analysis.nodeCount}
Connections: ${analysis.edgeCount}
Density: ${(analysis.density * 100).toFixed(1)}%
Average Degree: ${analysis.avgDegree.toFixed(1)}
Max Degree: ${analysis.maxDegree}

Hub Nodes: ${analysis.hubs.length > 0 ? analysis.hubs.map(h => h.nodeId).join(', ') : 'None'}`);
  };

  return (
    <AsciiCard title="🔧 Network Topology Builder" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Sample Topology</label>
          <AsciiSelect
            value={selectedTopology}
            onChange={(e) => loadTopology(e.target.value)}
          >
            <option value="enterprise">🏢 Enterprise Network</option>
            <option value="datacenter">🖥️ Data Center</option>
            <option value="iot">📡 IoT Network</option>
          </AsciiSelect>
        </div>
        
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Layout Algorithm</label>
          <AsciiSelect
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
          >
            <option value="force">Force-Directed</option>
            <option value="hierarchical">Hierarchical</option>
            <option value="circular">Circular</option>
            <option value="grid">Grid</option>
            <option value="tree">Tree</option>
          </AsciiSelect>
        </div>
        
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Visual Theme</label>
          <AsciiSelect
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="green">🟢 ASCII Green</option>
            <option value="amber">🟡 ASCII Amber</option>
            <option value="cyan">🔵 ASCII Cyan</option>
          </AsciiSelect>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
        <AsciiCheckbox
          checked={showLabels}
          onChange={(e) => setShowLabels(e.target.checked)}
          label="Show Labels"
        />
        <AsciiCheckbox
          checked={showStatus}
          onChange={(e) => setShowStatus(e.target.checked)}
          label="Show Status"
        />
        <AsciiCheckbox
          checked={interactive}
          onChange={(e) => setInteractive(e.target.checked)}
          label="Interactive"
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <AsciiButton onClick={generateRandomTopology} size="small">
          🎲 Generate Random
        </AsciiButton>
        <AsciiButton onClick={analyzeCurrentTopology} size="small">
          📊 Analyze Network
        </AsciiButton>
      </div>

      <div style={{ 
        border: '2px solid #333', 
        borderRadius: '4px',
        backgroundColor: '#000',
        height: '500px',
        overflow: 'hidden'
      }}>
        <AsciiNetworkVisualizer
          topology={currentTopology}
          options={{
            width: 600,
            height: 500,
            layout: layout as any,
            theme: theme as any,
            showLabels,
            showStatus,
            interactive,
            animation: true,
            zoom: true,
            pan: true,
            soundEffects: true
          }}
          onNodeClick={(node) => {
            console.log('Node clicked:', node);
          }}
          onEdgeClick={(edge) => {
            console.log('Edge clicked:', edge);
          }}
        />
      </div>

      <div style={{ 
        marginTop: '15px', 
        padding: '15px', 
        backgroundColor: '#111', 
        border: '1px solid #333',
        borderRadius: '4px'
      }}>
        <h4 style={{ color: '#00ff00', marginBottom: '10px' }}>Network Statistics</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '15px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '20px', fontWeight: 'bold' }}>
              {currentTopology.nodes.length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Nodes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '20px', fontWeight: 'bold' }}>
              {currentTopology.edges.length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Connections</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#00ff00', fontSize: '20px', fontWeight: 'bold' }}>
              {currentTopology.nodes.filter(n => n.status === 'online').length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Online</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ffaa00', fontSize: '20px', fontWeight: 'bold' }}>
              {currentTopology.nodes.filter(n => n.status === 'warning').length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Warning</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#ff0000', fontSize: '20px', fontWeight: 'bold' }}>
              {currentTopology.nodes.filter(n => n.status === 'offline').length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Offline</div>
          </div>
        </div>
      </div>
    </AsciiCard>
  );
}

function NetworkMonitoring() {
  const { metrics, alerts, isMonitoring, startMonitoring, stopMonitoring } = useNetworkMonitoring();
  const [alertCount, setAlertCount] = useState(0);
  const [lastAlert, setLastAlert] = useState<string | null>(null);

  useEffect(() => {
    if (alerts.length > alertCount) {
      setAlertCount(alerts.length);
      setLastAlert(alerts[alerts.length - 1]?.message || null);
    }
  }, [alerts, alertCount]);

  const simulateAlert = () => {
    const alertTypes = [
      'High CPU usage detected on Web Server 1',
      'Network congestion on link SW1-SW2',
      'Database connection timeout',
      'Firewall rule violation detected',
      'Disk space low on File Server'
    ];
    const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    setLastAlert(randomAlert);
    setAlertCount(count => count + 1);
  };

  return (
    <AsciiCard title="📡 Network Monitoring Dashboard" style={{ marginBottom: '30px' }}>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
          <AsciiButton 
            onClick={isMonitoring ? stopMonitoring : startMonitoring}
            variant={isMonitoring ? 'error' : 'success'}
          >
            {isMonitoring ? '⏹️ Stop Monitoring' : '▶️ Start Monitoring'}
          </AsciiButton>
          <AsciiButton onClick={simulateAlert} size="small">
            ⚠️ Simulate Alert
          </AsciiButton>
        </div>
        
        {isMonitoring && (
          <div style={{ color: '#00ff00', fontSize: '12px' }}>
            🔴 Live monitoring active... Checking network every 5 seconds
          </div>
        )}
      </div>

      {/* Real-time Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
        <div style={{ 
          padding: '15px', 
          border: '1px solid #333', 
          borderRadius: '4px',
          backgroundColor: '#111'
        }}>
          <div style={{ color: '#00ff00', fontSize: '18px', fontWeight: 'bold' }}>
            {Math.floor(Math.random() * 100)}%
          </div>
          <div style={{ color: '#ccc', fontSize: '12px' }}>Network Utilization</div>
          <div style={{ 
            width: '100%', 
            height: '4px', 
            backgroundColor: '#333', 
            borderRadius: '2px',
            marginTop: '5px'
          }}>
            <div style={{ 
              width: `${Math.floor(Math.random() * 100)}%`, 
              height: '100%', 
              backgroundColor: '#00ff00',
              borderRadius: '2px'
            }} />
          </div>
        </div>

        <div style={{ 
          padding: '15px', 
          border: '1px solid #333', 
          borderRadius: '4px',
          backgroundColor: '#111'
        }}>
          <div style={{ color: '#00aaff', fontSize: '18px', fontWeight: 'bold' }}>
            {Math.floor(Math.random() * 50) + 10}ms
          </div>
          <div style={{ color: '#ccc', fontSize: '12px' }}>Average Latency</div>
        </div>

        <div style={{ 
          padding: '15px', 
          border: '1px solid #333', 
          borderRadius: '4px',
          backgroundColor: '#111'
        }}>
          <div style={{ color: '#ffaa00', fontSize: '18px', fontWeight: 'bold' }}>
            {alertCount}
          </div>
          <div style={{ color: '#ccc', fontSize: '12px' }}>Active Alerts</div>
        </div>

        <div style={{ 
          padding: '15px', 
          border: '1px solid #333', 
          borderRadius: '4px',
          backgroundColor: '#111'
        }}>
          <div style={{ color: '#ff6600', fontSize: '18px', fontWeight: 'bold' }}>
            {Math.floor(Math.random() * 10)}
          </div>
          <div style={{ color: '#ccc', fontSize: '12px' }}>Failed Connections</div>
        </div>
      </div>

      {/* Latest Alert */}
      {lastAlert && (
        <div style={{
          padding: '15px',
          border: '1px solid #ffaa00',
          borderRadius: '4px',
          backgroundColor: '#332200',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#ffaa00', marginBottom: '5px' }}>🚨 Latest Alert</h4>
          <div style={{ color: '#fff', fontSize: '14px' }}>
            {lastAlert}
          </div>
          <div style={{ color: '#ccc', fontSize: '12px', marginTop: '5px' }}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      )}

      {/* Network Events Log */}
      <div style={{ 
        border: '1px solid #333', 
        borderRadius: '4px',
        backgroundColor: '#000',
        height: '200px',
        overflow: 'auto'
      }}>
        <div style={{ 
          padding: '10px', 
          borderBottom: '1px solid #333',
          backgroundColor: '#111',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 'bold'
        }}>
          📋 Network Events Log
        </div>
        <div style={{ padding: '10px', fontFamily: 'monospace', fontSize: '12px' }}>
          {[
            '2024-01-15 14:32:15 [INFO] Network scan completed - 25 nodes discovered',
            '2024-01-15 14:32:10 [WARN] High latency detected on link eth0 -> eth1',
            '2024-01-15 14:32:05 [INFO] Node srv-web-01 status changed to online',
            '2024-01-15 14:31:58 [ERROR] Connection timeout to database server',
            '2024-01-15 14:31:45 [INFO] DHCP lease renewed for 192.168.1.105',
            '2024-01-15 14:31:32 [WARN] Bandwidth utilization exceeded 80% threshold',
            '2024-01-15 14:31:20 [INFO] Firewall rule updated - allow HTTP traffic',
            '2024-01-15 14:31:15 [INFO] Network monitoring started'
          ].map((log, index) => (
            <div key={index} style={{ 
              color: log.includes('[ERROR]') ? '#ff0000' : 
                     log.includes('[WARN]') ? '#ffaa00' : '#00ff00',
              marginBottom: '2px',
              fontSize: '11px'
            }}>
              {log}
            </div>
          ))}
        </div>
      </div>
    </AsciiCard>
  );
}

function NetworkAnalytics() {
  const [selectedMetric, setSelectedMetric] = useState('bandwidth');
  const [timeRange, setTimeRange] = useState('1h');

  const generateChartData = () => {
    const points = 20;
    return Array.from({ length: points }, (_, i) => ({
      time: i,
      value: Math.floor(Math.random() * 100) + Math.sin(i * 0.5) * 20 + 50
    }));
  };

  const chartData = generateChartData();

  const renderAsciiChart = (data: any[]) => {
    const height = 12;
    const width = 50;
    const max = Math.max(...data.map(d => d.value));
    const min = Math.min(...data.map(d => d.value));
    const range = max - min;
    
    let chart = '';
    for (let y = height - 1; y >= 0; y--) {
      let line = '';
      for (let x = 0; x < width; x++) {
        const dataIndex = Math.floor((x / width) * data.length);
        const value = data[dataIndex]?.value || 0;
        const normalizedValue = (value - min) / range;
        const threshold = y / (height - 1);
        
        if (normalizedValue >= threshold) {
          line += '█';
        } else if (normalizedValue >= threshold - 0.1) {
          line += '▓';
        } else if (normalizedValue >= threshold - 0.2) {
          line += '▒';
        } else {
          line += ' ';
        }
      }
      chart += line + '\n';
    }
    return chart;
  };

  return (
    <AsciiCard title="📊 Network Analytics" style={{ marginBottom: '30px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Metric</label>
          <AsciiSelect
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            <option value="bandwidth">Bandwidth Usage</option>
            <option value="latency">Network Latency</option>
            <option value="packets">Packet Loss</option>
            <option value="connections">Active Connections</option>
          </AsciiSelect>
        </div>
        
        <div>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>Time Range</label>
          <AsciiSelect
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="5m">Last 5 minutes</option>
            <option value="1h">Last hour</option>
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
          </AsciiSelect>
        </div>
      </div>

      <div style={{ 
        border: '1px solid #333', 
        borderRadius: '4px',
        backgroundColor: '#000',
        padding: '15px'
      }}>
        <h4 style={{ color: '#00ff00', marginBottom: '10px', textAlign: 'center' }}>
          {selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} - {timeRange}
        </h4>
        
        <pre style={{ 
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '10px',
          lineHeight: '1',
          margin: 0
        }}>
          {renderAsciiChart(chartData)}
        </pre>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '10px',
          color: '#ccc',
          fontSize: '12px'
        }}>
          <span>Min: {Math.min(...chartData.map(d => d.value)).toFixed(0)}</span>
          <span>Avg: {(chartData.reduce((a, b) => a + b.value, 0) / chartData.length).toFixed(0)}</span>
          <span>Max: {Math.max(...chartData.map(d => d.value)).toFixed(0)}</span>
        </div>
      </div>

      <div style={{ 
        marginTop: '20px',
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
        gap: '15px' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#00ff00', fontSize: '16px', fontWeight: 'bold' }}>95.2%</div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Uptime</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#00aaff', fontSize: '16px', fontWeight: 'bold' }}>1.2GB</div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Data Transferred</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ffaa00', fontSize: '16px', fontWeight: 'bold' }}>847</div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Peak Connections</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#ff6600', fontSize: '16px', fontWeight: 'bold' }}>0.02%</div>
          <div style={{ color: '#ccc', fontSize: '11px' }}>Packet Loss</div>
        </div>
      </div>
    </AsciiCard>
  );
}

export default function NetworkMonitor() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>
        🔗 Network Monitor
      </h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Interactive network topology builder and analyzer with 5 layout algorithms, 
        real-time monitoring, and comprehensive network analytics.
      </p>

      <div style={{
        padding: '15px',
        border: '1px solid #00ffff',
        borderRadius: '4px',
        backgroundColor: '#001111',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>🌐 Network Analysis Features</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ Interactive topology builder</li>
            <li>✅ 5 layout algorithms</li>
            <li>✅ Real-time monitoring</li>
            <li>✅ Network health analysis</li>
          </ul>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ Alert management</li>
            <li>✅ Performance metrics</li>
            <li>✅ ASCII data visualization</li>
            <li>✅ Export capabilities</li>
          </ul>
          <ul style={{ color: '#fff', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
            <li>✅ 12+ node types</li>
            <li>✅ 8+ connection types</li>
            <li>✅ 3 visual themes</li>
            <li>✅ Sound feedback</li>
          </ul>
        </div>
      </div>

      <TopologyBuilder />
      <NetworkMonitoring />
      <NetworkAnalytics />

      <div style={{
        marginTop: '40px',
        padding: '30px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '20px', textAlign: 'center' }}>🎯 Use Cases</h3>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px'
        }}>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🏢</div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Enterprise IT</h4>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
              Monitor corporate networks, visualize server infrastructure, 
              track network performance, and identify connectivity issues.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🏠</div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>IoT & Smart Homes</h4>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
              Map IoT device networks, monitor sensor connectivity, 
              visualize smart home topologies, and manage device health.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>☁️</div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Cloud Architecture</h4>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
              Document cloud infrastructure, visualize microservice dependencies, 
              monitor service mesh connectivity, and plan scaling strategies.
            </p>
          </div>
          
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>🔒</div>
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Security Operations</h4>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.5' }}>
              Visualize network security zones, monitor firewall rules, 
              track suspicious connections, and analyze attack patterns.
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          padding: '20px',
          border: '1px solid #333',
          borderRadius: '4px',
          backgroundColor: '#000'
        }}>
          <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>⚡ Algorithm Performance</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px' }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '5px' }}>Force-Directed</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Natural clustering</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '5px' }}>Hierarchical</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Clear structure</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '5px' }}>Circular</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Equal spacing</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '5px' }}>Grid</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Organized layout</div>
            </div>
            <div>
              <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '5px' }}>Tree</div>
              <div style={{ color: '#ccc', fontSize: '12px' }}>Parent-child flow</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}