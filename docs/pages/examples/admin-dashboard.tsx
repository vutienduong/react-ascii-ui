import { useState } from 'react';

export default function AdminDashboard() {
  const [currentView, setCurrentView] = useState('overview');

  // Sample data for demonstrations
  const chartData = [
    { label: 'Jan', value: 65, color: '#00ff00' },
    { label: 'Feb', value: 59, color: '#0088ff' },
    { label: 'Mar', value: 80, color: '#ff0088' },
    { label: 'Apr', value: 81, color: '#ffff00' },
    { label: 'May', value: 56, color: '#ff8800' },
    { label: 'Jun', value: 55, color: '#8800ff' },
  ];

  const sparklineData = [23, 45, 56, 78, 87, 65, 43, 32, 45, 67, 89, 78];

  const usersData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', lastLogin: '2024-01-15' },
  ];

  const tableColumns = [
    { key: 'id', header: 'ID', width: '10%', sortable: true },
    { key: 'name', header: 'Name', width: '25%', sortable: true, filterable: true },
    { key: 'email', header: 'Email', width: '25%', sortable: true, filterable: true },
    { key: 'role', header: 'Role', width: '15%', sortable: true },
    { 
      key: 'status', 
      header: 'Status', 
      width: '15%', 
      sortable: true,
      render: (value) => (
        <span style={{ color: value === 'Active' ? '#00ff00' : '#ff6666' }}>
          {value === 'Active' ? '🟢' : '🔴'} {value}
        </span>
      )
    },
    { key: 'lastLogin', header: 'Last Login', width: '10%', sortable: true },
  ];

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'files', label: 'Files', icon: '📁' },
    { id: 'terminal', label: 'Terminal', icon: '⌨️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return (
          <div>
            <h1 style={{ color: '#00ff00', fontSize: '2em', marginBottom: '20px' }}>Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
                <div style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Total Users</div>
                <div style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold' }}>1,234</div>
                <div style={{ color: '#ccc', fontSize: '0.9em', marginTop: '5px' }}>
                  +12% from last month ↗
                </div>
              </div>
              
              <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
                <div style={{ color: '#0088ff', fontSize: '1.2em', marginBottom: '10px' }}>Revenue</div>
                <div style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold' }}>$45.2K</div>
                <div style={{ color: '#ccc', fontSize: '0.9em', marginTop: '5px' }}>
                  +8% from last month ↗
                </div>
              </div>
              
              <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
                <div style={{ color: '#ff0088', fontSize: '1.2em', marginBottom: '10px' }}>Active Sessions</div>
                <div style={{ color: '#fff', fontSize: '2em', fontWeight: 'bold' }}>89</div>
                <div style={{ color: '#ccc', fontSize: '0.9em', marginTop: '5px' }}>
                  -3% from last hour ↘
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>Monthly Performance</h3>
                <div style={{ color: '#ccc', fontFamily: 'monospace', fontSize: '12px' }}>
                  {/* Simulated ASCII Bar Chart */}
                  <div style={{ marginBottom: '5px' }}>Jan ████████████████████ 65</div>
                  <div style={{ marginBottom: '5px' }}>Feb █████████████████ 59</div>
                  <div style={{ marginBottom: '5px' }}>Mar ████████████████████████ 80</div>
                  <div style={{ marginBottom: '5px' }}>Apr █████████████████████████ 81</div>
                  <div style={{ marginBottom: '5px' }}>May ████████████████ 56</div>
                  <div style={{ marginBottom: '5px' }}>Jun ███████████████ 55</div>
                </div>
              </div>
              
              <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
                <h3 style={{ color: '#fff', marginBottom: '20px' }}>System Status</h3>
                <div style={{ color: '#ccc', fontSize: '14px', lineHeight: '2' }}>
                  <div>CPU Usage: <span style={{ color: '#00ff00' }}>34%</span></div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                    <span style={{ color: '#00ff00' }}>███████</span>
                    <span style={{ color: '#333' }}>█████████████</span> 34%
                  </div>
                  
                  <div style={{ marginTop: '10px' }}>Memory: <span style={{ color: '#ffff00' }}>67%</span></div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                    <span style={{ color: '#ffff00' }}>█████████████</span>
                    <span style={{ color: '#333' }}>███████</span> 67%
                  </div>
                  
                  <div style={{ marginTop: '10px' }}>Disk: <span style={{ color: '#ff0088' }}>89%</span></div>
                  <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                    <span style={{ color: '#ff0088' }}>██████████████████</span>
                    <span style={{ color: '#333' }}>██</span> 89%
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div style={{ border: '1px solid #333', padding: '20px', backgroundColor: '#111' }}>
              <h3 style={{ color: '#fff', marginBottom: '20px' }}>Recent Activity</h3>
              <div style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.8' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#00ff00' }}>[10:30:15]</span> User john.doe logged in
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#00ff00' }}>[10:28:42]</span> New file uploaded: report.pdf
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#ffff00' }}>[10:25:18]</span> System backup completed
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#ff6666' }}>[10:22:31]</span> Failed login attempt for admin
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#00ff00' }}>[10:20:45]</span> Database optimization finished
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <h1 style={{ color: '#00ff00', fontSize: '2em', marginBottom: '20px' }}>User Management</h1>
            <p style={{ color: '#ccc', marginBottom: '30px' }}>
              This demonstrates the AsciiAdvancedTable component with sorting, filtering, and pagination.
            </p>
            
            <div style={{ border: '1px solid #333', backgroundColor: '#111', padding: '20px' }}>
              {/* Simulated Advanced Table */}
              <div style={{ marginBottom: '20px' }}>
                <input 
                  type="text" 
                  placeholder="🔍 Search all columns..."
                  style={{ 
                    width: '100%',
                    padding: '8px',
                    backgroundColor: 'transparent',
                    border: '1px solid #333',
                    color: '#ccc'
                  }}
                />
              </div>
              
              <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
                {/* Table Header */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '10% 25% 25% 15% 15% 10%',
                  padding: '10px 0',
                  borderBottom: '1px solid #333',
                  color: '#fff',
                  fontWeight: 'bold'
                }}>
                  <div>ID ↕</div>
                  <div>Name ↕</div>
                  <div>Email ↕</div>
                  <div>Role ↕</div>
                  <div>Status ↕</div>
                  <div>Last Login ↕</div>
                </div>
                
                {/* Filter Row */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '10% 25% 25% 15% 15% 10%',
                  padding: '5px 0',
                  borderBottom: '1px solid #333',
                  gap: '5px'
                }}>
                  <div></div>
                  <input placeholder="Filter..." style={{ backgroundColor: 'transparent', border: '1px solid #444', fontSize: '10px', padding: '2px' }} />
                  <input placeholder="Filter..." style={{ backgroundColor: 'transparent', border: '1px solid #444', fontSize: '10px', padding: '2px' }} />
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                
                {/* Table Data */}
                {usersData.map(user => (
                  <div key={user.id} style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '10% 25% 25% 15% 15% 10%',
                    padding: '8px 0',
                    borderBottom: '1px solid #333',
                    color: '#ccc',
                    cursor: 'pointer'
                  }}>
                    <div>{user.id}</div>
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                    <div style={{ color: user.status === 'Active' ? '#00ff00' : '#ff6666' }}>
                      {user.status === 'Active' ? '🟢' : '🔴'} {user.status}
                    </div>
                    <div>{user.lastLogin}</div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'between', 
                alignItems: 'center',
                marginTop: '20px',
                color: '#ccc',
                fontSize: '12px'
              }}>
                <div>Showing 1-4 of 4 entries</div>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button style={{ padding: '4px 8px', backgroundColor: 'transparent', border: '1px solid #333', color: '#ccc' }}>‹</button>
                  <span style={{ padding: '4px 8px' }}>1 / 1</span>
                  <button style={{ padding: '4px 8px', backgroundColor: 'transparent', border: '1px solid #333', color: '#ccc' }}>›</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'terminal':
        return (
          <div>
            <h1 style={{ color: '#00ff00', fontSize: '2em', marginBottom: '20px' }}>Terminal Emulator</h1>
            <p style={{ color: '#ccc', marginBottom: '30px' }}>
              This demonstrates the AsciiTerminal component with command parsing and history.
            </p>
            
            {/* Simulated Terminal */}
            <div style={{ 
              border: '1px solid #333', 
              backgroundColor: '#000',
              fontFamily: 'monospace',
              fontSize: '14px',
              height: '400px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Terminal Header */}
              <div style={{ 
                padding: '8px 12px',
                backgroundColor: '#222',
                borderBottom: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27ca3f' }}></div>
                </div>
                <div style={{ color: '#ccc', fontSize: '12px' }}>ASCII Terminal</div>
                <div style={{ color: '#666', fontSize: '10px' }}>Ready</div>
              </div>
              
              {/* Terminal Content */}
              <div style={{ flex: 1, padding: '12px', overflow: 'auto' }}>
                <div style={{ color: '#00ff00', marginBottom: '10px' }}>
                  Welcome to ASCII Terminal v1.0.0<br/>
                  Type 'help' for available commands.
                </div>
                
                <div style={{ color: '#ccc', marginBottom: '5px' }}>
                  <span style={{ color: '#00ff00' }}>$ </span>help
                </div>
                <div style={{ color: '#ccc', marginBottom: '10px', marginLeft: '20px' }}>
                  Available Commands:<br/>
                  <span style={{ color: '#00ff00' }}>help</span>     - Show available commands<br/>
                  <span style={{ color: '#00ff00' }}>clear</span>    - Clear terminal history<br/>
                  <span style={{ color: '#00ff00' }}>ls</span>       - List directory contents<br/>
                  <span style={{ color: '#00ff00' }}>date</span>     - Show current date and time<br/>
                  <span style={{ color: '#00ff00' }}>whoami</span>   - Show current user<br/>
                </div>
                
                <div style={{ color: '#ccc', marginBottom: '5px' }}>
                  <span style={{ color: '#00ff00' }}>$ </span>ls
                </div>
                <div style={{ color: '#ccc', marginBottom: '10px', marginLeft: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <span style={{ color: '#4fc3f7' }}>package.json</span>
                    <span style={{ color: '#4fc3f7' }}>README.md</span>
                    <span style={{ color: '#81c784', fontWeight: 'bold' }}>src/</span>
                    <span style={{ color: '#81c784', fontWeight: 'bold' }}>dist/</span>
                    <span style={{ color: '#81c784', fontWeight: 'bold' }}>node_modules/</span>
                  </div>
                </div>
                
                <div style={{ color: '#ccc', marginBottom: '5px' }}>
                  <span style={{ color: '#00ff00' }}>$ </span>date
                </div>
                <div style={{ color: '#ccc', marginBottom: '10px', marginLeft: '20px' }}>
                  {new Date().toLocaleString()}
                </div>
                
                <div style={{ color: '#ccc' }}>
                  <span style={{ color: '#00ff00' }}>$ </span>
                  <span style={{ backgroundColor: '#00ff00', color: '#000', animation: 'blink 1s infinite' }}>█</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={{ color: '#ccc' }}>
            <h1 style={{ color: '#00ff00' }}>Feature Coming Soon</h1>
            <p>This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'monospace' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '250px',
        backgroundColor: '#111',
        borderRight: '1px solid #333',
        padding: '20px'
      }}>
        <h2 style={{ color: '#00ff00', marginBottom: '30px', fontSize: '1.5em' }}>
          Admin Panel
        </h2>
        
        <nav>
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              style={{
                padding: '12px 16px',
                marginBottom: '8px',
                backgroundColor: currentView === item.id ? '#333' : 'transparent',
                border: currentView === item.id ? '1px solid #666' : '1px solid transparent',
                color: currentView === item.id ? '#00ff00' : '#ccc',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (currentView !== item.id) {
                  e.target.style.backgroundColor = '#222';
                  e.target.style.color = '#fff';
                }
              }}
              onMouseLeave={(e) => {
                if (currentView !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#ccc';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ 
        flex: 1,
        padding: '30px',
        backgroundColor: '#000',
        color: '#ccc'
      }}>
        {renderContent()}
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}