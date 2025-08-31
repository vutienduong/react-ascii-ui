import { 
  AsciiCard, 
  AsciiButton, 
  AsciiAlert, 
  AsciiBadge, 
  AsciiProgressBar, 
  AsciiTable,
  AsciiChart,
  AsciiNavbar
} from 'react-ascii-ui';

export default function Dashboard() {
  const tableData = [
    { id: '001', name: 'Alice Smith', status: 'Active', score: 95 },
    { id: '002', name: 'Bob Johnson', status: 'Inactive', score: 78 },
    { id: '003', name: 'Carol Wilson', status: 'Active', score: 87 },
    { id: '004', name: 'David Brown', status: 'Active', score: 92 },
  ];

  const chartData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 72 },
    { label: 'Mar', value: 58 },
    { label: 'Apr', value: 83 },
    { label: 'May', value: 91 },
    { label: 'Jun', value: 67 },
  ];

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Dashboard Demo</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        A comprehensive dashboard showcasing React ASCII UI components in action.
      </p>

      {/* Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiNavbar
          brand="Admin Panel"
          items={[
            { label: 'Dashboard', href: '/dashboard', active: true },
            { label: 'Users', href: '/users' },
            { label: 'Settings', href: '/settings' }
          ]}
        />
      </div>

      {/* Status Alerts */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiAlert variant="success" style={{ marginBottom: '10px' }}>
          System status: All services operational
        </AsciiAlert>
        <AsciiAlert variant="warning" style={{ marginBottom: '10px' }}>
          3 pending updates available
        </AsciiAlert>
      </div>

      {/* Metrics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <AsciiCard title="Active Users">
          <div style={{ fontSize: '2em', color: '#00ff00', marginBottom: '10px' }}>1,247</div>
          <AsciiBadge color="success">↑ +12% from last month</AsciiBadge>
        </AsciiCard>

        <AsciiCard title="Revenue">
          <div style={{ fontSize: '2em', color: '#00ff00', marginBottom: '10px' }}>$52,350</div>
          <AsciiBadge color="success">↑ +8% from last month</AsciiBadge>
        </AsciiCard>

        <AsciiCard title="Server Load">
          <div style={{ marginBottom: '15px' }}>
            <AsciiProgressBar value={75} max={100} />
            <div style={{ textAlign: 'center', marginTop: '5px', color: '#ccc' }}>75% CPU Usage</div>
          </div>
          <AsciiBadge color="warning">High load detected</AsciiBadge>
        </AsciiCard>

        <AsciiCard title="Storage">
          <div style={{ marginBottom: '15px' }}>
            <AsciiProgressBar value={45} max={100} />
            <div style={{ textAlign: 'center', marginTop: '5px', color: '#ccc' }}>45% Disk Usage</div>
          </div>
          <AsciiBadge color="default">Normal usage</AsciiBadge>
        </AsciiCard>
      </div>

      {/* Chart Section */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiCard title="Monthly Performance">
          <AsciiChart 
            data={chartData.map(item => item.value)} 
            type="bar" 
            width={chartData.length} 
            height={12}
            color="success"
            showValues={true}
            style={{ margin: '0 auto' }}
          />
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginTop: '10px',
            color: '#ccc',
            fontSize: '12px'
          }}>
            {chartData.map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                {item.label}
              </div>
            ))}
          </div>
        </AsciiCard>
      </div>

      {/* User Table */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiCard title="Recent Users">
          <AsciiTable
            data={tableData}
            columns={[
              { key: 'id', header: 'ID', width: '15%' },
              { key: 'name', header: 'Name', width: '35%' },
              { key: 'status', header: 'Status', width: '25%' },
              { key: 'score', header: 'Score', width: '25%', align: 'right' }
            ]}
          />
        </AsciiCard>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiCard title="Quick Actions">
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <AsciiButton>Generate Report</AsciiButton>
            <AsciiButton>Export Data</AsciiButton>
            <AsciiButton>Backup System</AsciiButton>
            <AsciiButton>Maintenance Mode</AsciiButton>
            <AsciiButton>Emergency Stop</AsciiButton>
          </div>
        </AsciiCard>
      </div>

      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontStyle: 'italic', 
        marginTop: '40px' 
      }}>
        Dashboard built with React ASCII UI components
      </p>
    </div>
  );
}