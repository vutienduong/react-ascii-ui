import React, { useState, useEffect } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiBadge,
  AsciiAlert,
  AsciiChart,
  AsciiProgressBar,
  AsciiTable
} from 'react-ascii-ui';

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface ServiceStatus {
  name: string;
  status: 'running' | 'stopped' | 'error';
  uptime: string;
  port: number;
  memory: number;
  cpu: number;
}

export default function MonitoringDemo() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 45, max: 100, status: 'healthy', trend: 'stable' },
    { name: 'Memory', value: 62, max: 100, status: 'healthy', trend: 'up' },
    { name: 'Disk Space', value: 78, max: 100, status: 'warning', trend: 'up' },
    { name: 'Network I/O', value: 23, max: 100, status: 'healthy', trend: 'down' },
    { name: 'Active Connections', value: 156, max: 500, status: 'healthy', trend: 'stable' },
    { name: 'Request Queue', value: 12, max: 100, status: 'healthy', trend: 'stable' }
  ]);

  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Web Server', status: 'running', uptime: '7d 14h 32m', port: 80, memory: 256, cpu: 15 },
    { name: 'Database', status: 'running', uptime: '7d 14h 28m', port: 5432, memory: 512, cpu: 25 },
    { name: 'Redis Cache', status: 'running', uptime: '7d 14h 30m', port: 6379, memory: 128, cpu: 8 },
    { name: 'Background Jobs', status: 'running', uptime: '7d 12h 15m', port: 0, memory: 64, cpu: 12 },
    { name: 'API Gateway', status: 'running', uptime: '7d 14h 32m', port: 8080, memory: 192, cpu: 18 },
    { name: 'File Storage', status: 'error', uptime: '0m', port: 9000, memory: 0, cpu: 0 }
  ]);

  const [alerts] = useState([
    { id: 1, severity: 'critical', message: 'File Storage service is down', timestamp: '2 minutes ago' },
    { id: 2, severity: 'warning', message: 'Disk space usage above 75%', timestamp: '15 minutes ago' },
    { id: 3, severity: 'info', message: 'System backup completed successfully', timestamp: '1 hour ago' },
    { id: 4, severity: 'warning', message: 'High memory usage detected', timestamp: '2 hours ago' }
  ]);

  const [cpuHistory, setCpuHistory] = useState([45, 52, 38, 49, 61, 45, 42, 55, 48, 45]);
  const [memoryHistory, setMemoryHistory] = useState([58, 62, 65, 59, 67, 62, 64, 68, 61, 62]);
  const [networkHistory, setNetworkHistory] = useState([25, 28, 19, 31, 23, 27, 22, 29, 26, 23]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(metric.max, metric.value + (Math.random() - 0.5) * 10)),
        status: metric.value > 80 ? 'critical' : metric.value > 60 ? 'warning' : 'healthy'
      })));

      // Update chart data
      setCpuHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 30) + 30]);
      setMemoryHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 20) + 50]);
      setNetworkHistory(prev => [...prev.slice(1), Math.floor(Math.random() * 25) + 15]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
      case 'healthy':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
      case 'critical':
      case 'stopped':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
      case 'healthy':
        return '🟢';
      case 'warning':
        return '🟡';
      case 'error':
      case 'critical':
      case 'stopped':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const serviceTableData = services.map(service => ({
    name: service.name,
    status: service.status,
    uptime: service.uptime,
    port: service.port || 'N/A',
    memory: `${service.memory}MB`,
    cpu: `${service.cpu}%`
  }));

  const serviceTableColumns = [
    { key: 'name', header: 'Service', width: '25%' },
    { key: 'status', header: 'Status', width: '15%' },
    { key: 'uptime', header: 'Uptime', width: '20%' },
    { key: 'port', header: 'Port', width: '10%' },
    { key: 'memory', header: 'Memory', width: '15%' },
    { key: 'cpu', header: 'CPU', width: '15%' }
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>
          🖥️ SYSTEM MONITORING DASHBOARD
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1em' }}>
          Real-time infrastructure monitoring and alerting system
        </p>
        <div style={{ marginTop: '15px' }}>
          <AsciiBadge color="success">System Online</AsciiBadge>
          <span style={{ margin: '0 10px' }}>•</span>
          <AsciiBadge color="primary">Last Updated: {new Date().toLocaleTimeString()}</AsciiBadge>
        </div>
      </div>

      {/* Alerts */}
      {alerts.filter(a => a.severity === 'critical').length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <AsciiAlert variant="error">
            🚨 Critical Alert: {alerts.find(a => a.severity === 'critical')?.message}
          </AsciiAlert>
        </div>
      )}

      {/* System Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        {metrics.map((metric) => (
          <AsciiCard key={metric.name} title={`${getTrendIcon(metric.trend)} ${metric.name}`}>
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ color: '#ccc' }}>Current</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#00ff00', fontSize: '1.5em', fontWeight: 'bold' }}>
                    {Math.round(metric.value)}{metric.max === 100 ? '%' : ''}
                  </span>
                  <AsciiBadge color={getStatusColor(metric.status)}>
                    {metric.status.toUpperCase()}
                  </AsciiBadge>
                </div>
              </div>
              <AsciiProgressBar
                value={metric.value}
                max={metric.max}
                color={getStatusColor(metric.status)}
                showPercentage={false}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px', fontSize: '12px', color: '#666' }}>
                <span>0</span>
                <span>{metric.max}{metric.max === 100 ? '%' : ''}</span>
              </div>
            </div>
          </AsciiCard>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <AsciiCard title="📊 CPU Usage (Last 10min)">
          <AsciiChart 
            data={cpuHistory}
            type="line"
            height={8}
            color="success"
            showValues={true}
          />
          <div style={{ textAlign: 'center', marginTop: '10px', color: '#ccc', fontSize: '12px' }}>
            Average: {Math.round(cpuHistory.reduce((a, b) => a + b, 0) / cpuHistory.length)}%
          </div>
        </AsciiCard>

        <AsciiCard title="💾 Memory Usage (Last 10min)">
          <AsciiChart 
            data={memoryHistory}
            type="area"
            height={8}
            color="warning"
            showValues={true}
          />
          <div style={{ textAlign: 'center', marginTop: '10px', color: '#ccc', fontSize: '12px' }}>
            Average: {Math.round(memoryHistory.reduce((a, b) => a + b, 0) / memoryHistory.length)}%
          </div>
        </AsciiCard>

        <AsciiCard title="🌐 Network I/O (Last 10min)">
          <AsciiChart 
            data={networkHistory}
            type="bar"
            height={8}
            color="primary"
            showValues={true}
          />
          <div style={{ textAlign: 'center', marginTop: '10px', color: '#ccc', fontSize: '12px' }}>
            Average: {Math.round(networkHistory.reduce((a, b) => a + b, 0) / networkHistory.length)}%
          </div>
        </AsciiCard>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Services Status */}
        <AsciiCard title="⚙️ Services Status">
          <AsciiTable
            data={serviceTableData}
            columns={serviceTableColumns}
          />
          <div style={{ marginTop: '15px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <AsciiButton>🔄 Refresh All</AsciiButton>
            <AsciiButton>▶️ Start Service</AsciiButton>
            <AsciiButton>⏹️ Stop Service</AsciiButton>
            <AsciiButton>🔧 Configure</AsciiButton>
          </div>
        </AsciiCard>

        {/* Alerts Panel */}
        <div>
          <AsciiCard title="🚨 Recent Alerts" style={{ marginBottom: '20px' }}>
            <div style={{ maxHeight: '300px', overflow: 'auto' }}>
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    padding: '12px',
                    marginBottom: '10px',
                    backgroundColor: '#1a1a1a',
                    border: `1px solid ${
                      alert.severity === 'critical' ? '#ff4444' :
                      alert.severity === 'warning' ? '#ffaa00' : '#444'
                    }`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <AsciiBadge color={getStatusColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </AsciiBadge>
                    <span style={{ color: '#666', fontSize: '12px' }}>{alert.timestamp}</span>
                  </div>
                  <div style={{ color: '#ccc', fontSize: '14px' }}>{alert.message}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
              <AsciiButton style={{ width: '100%' }}>View All Alerts</AsciiButton>
            </div>
          </AsciiCard>

          {/* System Info */}
          <AsciiCard title="💻 System Information">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Hostname:</span>
                <span style={{ color: '#00ff00' }}>server-01</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>OS:</span>
                <span>Ubuntu 22.04 LTS</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Kernel:</span>
                <span>5.15.0-76-generic</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Uptime:</span>
                <AsciiBadge color="success">7d 14h 32m</AsciiBadge>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Load Avg:</span>
                <span>0.45, 0.52, 0.48</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Total RAM:</span>
                <span>8.0 GB</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ccc' }}>Disk Space:</span>
                <span>500 GB SSD</span>
              </div>
            </div>
          </AsciiCard>
        </div>
      </div>
    </div>
  );
}