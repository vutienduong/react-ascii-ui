import React, { useState } from 'react';
import { 
  AsciiCard, 
  AsciiButton, 
  AsciiAlert, 
  AsciiBadge, 
  AsciiTable,
  AsciiNavbar,
  AsciiInput,
  AsciiSelect,
  AsciiModal
} from 'react-ascii-ui';

export default function Users() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [users, setUsers] = useState([
    { id: '001', name: 'Alice Smith', email: 'alice@tech.com', role: 'Developer', status: 'Active', projects: 12, joinDate: '2023-01-15' },
    { id: '002', name: 'Bob Johnson', email: 'bob@design.com', role: 'Designer', status: 'Inactive', projects: 8, joinDate: '2023-03-22' },
    { id: '003', name: 'Carol Wilson', email: 'carol@pm.com', role: 'Project Manager', status: 'Active', projects: 15, joinDate: '2022-11-08' },
    { id: '004', name: 'David Brown', email: 'david@dev.com', role: 'Developer', status: 'Active', projects: 9, joinDate: '2023-05-10' },
    { id: '005', name: 'Eva Garcia', email: 'eva@qa.com', role: 'QA Engineer', status: 'Active', projects: 6, joinDate: '2023-07-18' },
    { id: '006', name: 'Frank Miller', email: 'frank@backend.com', role: 'Backend Dev', status: 'Active', projects: 11, joinDate: '2023-02-28' },
    { id: '007', name: 'Grace Lee', email: 'grace@ui.com', role: 'UI Designer', status: 'Inactive', projects: 4, joinDate: '2023-04-12' },
    { id: '008', name: 'Henry Zhang', email: 'henry@devops.com', role: 'DevOps', status: 'Active', projects: 7, joinDate: '2023-06-03' }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status: string) => {
    return status === 'Active' ? 
      <AsciiBadge color="success">{status}</AsciiBadge> :
      <AsciiBadge color="default">{status}</AsciiBadge>;
  };

  const getRoleBadge = (role: string) => {
    const roleColors: { [key: string]: 'default' | 'success' | 'warning' | 'error' | 'primary' } = {
      'Developer': 'primary',
      'Designer': 'warning',
      'Project Manager': 'success',
      'QA Engineer': 'error',
      'Backend Dev': 'primary',
      'UI Designer': 'warning',
      'DevOps': 'default'
    };
    return <AsciiBadge color={roleColors[role] || 'default'}>{role}</AsciiBadge>;
  };

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>User Management</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Manage users, roles, and permissions across your organization.
      </p>

      {/* Navigation */}
      <div style={{ marginBottom: '30px' }}>
        <AsciiNavbar
          brand="Admin Panel"
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Users', href: '/users', active: true },
            { label: 'Settings', href: '/settings' }
          ]}
        />
      </div>

      {/* User Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <AsciiCard title="Total Users">
          <div style={{ fontSize: '2em', color: '#00ff00', marginBottom: '5px' }}>{users.length}</div>
          <div style={{ color: '#ccc', fontSize: '14px' }}>All registered users</div>
        </AsciiCard>

        <AsciiCard title="Active Users">
          <div style={{ fontSize: '2em', color: '#00ff00', marginBottom: '5px' }}>
            {users.filter(u => u.status === 'Active').length}
          </div>
          <div style={{ color: '#ccc', fontSize: '14px' }}>Currently active</div>
        </AsciiCard>

        <AsciiCard title="Inactive Users">
          <div style={{ fontSize: '2em', color: '#ff4444', marginBottom: '5px' }}>
            {users.filter(u => u.status === 'Inactive').length}
          </div>
          <div style={{ color: '#ccc', fontSize: '14px' }}>Need attention</div>
        </AsciiCard>

        <AsciiCard title="Average Projects">
          <div style={{ fontSize: '2em', color: '#00ffff', marginBottom: '5px' }}>
            {Math.round(users.reduce((sum, u) => sum + u.projects, 0) / users.length)}
          </div>
          <div style={{ color: '#ccc', fontSize: '14px' }}>Per user</div>
        </AsciiCard>
      </div>

      {/* User Management */}
      <AsciiCard title="[ USER DIRECTORY ]">
        {/* Controls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 200px 150px', 
          gap: '15px', 
          marginBottom: '20px' 
        }}>
          <AsciiInput
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%' }}
          />
          
          <AsciiSelect
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{ width: '100%' }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </AsciiSelect>

          <AsciiButton onClick={() => setShowAddModal(true)}>
            Add User
          </AsciiButton>
        </div>

        {/* Results Info */}
        <div style={{ 
          marginBottom: '15px', 
          color: '#ccc', 
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>Showing {filteredUsers.length} of {users.length} users</span>
          {searchQuery && (
            <span>Filtering by: "{searchQuery}"</span>
          )}
        </div>

        {/* User Table */}
        <div style={{ marginBottom: '20px' }}>
          <AsciiTable
            data={filteredUsers}
            columns={[
              { key: 'id', header: 'ID', width: '8%' },
              { key: 'name', header: 'Name', width: '20%' },
              { key: 'email', header: 'Email', width: '25%' },
              { key: 'role', header: 'Role', width: '18%' },
              { key: 'status', header: 'Status', width: '12%' },
              { key: 'projects', header: 'Projects', width: '10%', align: 'right' },
              { key: 'joinDate', header: 'Joined', width: '12%' }
            ]}
          />
        </div>

        {/* Bulk Actions */}
        <div style={{ 
          display: 'flex', 
          gap: '10px', 
          paddingTop: '15px',
          borderTop: '1px solid #333'
        }}>
          <AsciiButton>Export CSV</AsciiButton>
          <AsciiButton>Bulk Edit</AsciiButton>
          <AsciiButton>Send Invites</AsciiButton>
        </div>
      </AsciiCard>

      {/* Recent Activity */}
      <div style={{ marginTop: '30px' }}>
        <AsciiCard title="Recent Activity">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <AsciiAlert variant="info">
              Alice Smith updated her profile information
            </AsciiAlert>
            <AsciiAlert variant="success">
              New user Henry Zhang has been activated
            </AsciiAlert>
            <AsciiAlert variant="warning">
              Bob Johnson hasn't logged in for 30 days
            </AsciiAlert>
            <AsciiAlert variant="info">
              Carol Wilson completed project #142
            </AsciiAlert>
          </div>
        </AsciiCard>
      </div>

      {/* Add User Modal */}
      <AsciiModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        size="md"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>
              Full Name:
            </label>
            <AsciiInput placeholder="Enter full name" style={{ width: '100%' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>
              Email Address:
            </label>
            <AsciiInput placeholder="Enter email address" style={{ width: '100%' }} />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', color: '#fff' }}>
              Role:
            </label>
            <AsciiSelect style={{ width: '100%' }}>
              <option value="">Select role...</option>
              <option value="developer">Developer</option>
              <option value="designer">Designer</option>
              <option value="pm">Project Manager</option>
              <option value="qa">QA Engineer</option>
              <option value="devops">DevOps</option>
            </AsciiSelect>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            marginTop: '20px',
            justifyContent: 'flex-end'
          }}>
            <AsciiButton onClick={() => setShowAddModal(false)}>
              Cancel
            </AsciiButton>
            <AsciiButton onClick={() => setShowAddModal(false)}>
              Add User
            </AsciiButton>
          </div>
        </div>
      </AsciiModal>

      <p style={{ 
        textAlign: 'center', 
        color: '#666', 
        fontStyle: 'italic', 
        marginTop: '40px' 
      }}>
        User management system built with React ASCII UI
      </p>
    </div>
  );
}