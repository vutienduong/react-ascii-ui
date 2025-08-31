import { useState } from 'react';
import { 
  AsciiCard, 
  AsciiButton, 
  AsciiInput,
  AsciiSelect,
  AsciiTable,
  AsciiBadge,
  AsciiPagination,
  AsciiModal
} from 'react-ascii-ui';

export default function Table() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allUsers = [
    { id: '001', name: 'Alice Smith', email: 'alice@tech.com', role: 'Developer', status: 'Active', joinDate: '2023-01-15', projects: 12, lastLogin: '2024-01-20' },
    { id: '002', name: 'Bob Johnson', email: 'bob@design.com', role: 'Designer', status: 'Inactive', joinDate: '2023-02-20', projects: 8, lastLogin: '2024-01-10' },
    { id: '003', name: 'Carol Wilson', email: 'carol@pm.com', role: 'Project Manager', status: 'Active', joinDate: '2023-03-10', projects: 15, lastLogin: '2024-01-21' },
    { id: '004', name: 'David Brown', email: 'david@dev.com', role: 'Developer', status: 'Active', joinDate: '2023-04-05', projects: 9, lastLogin: '2024-01-19' },
    { id: '005', name: 'Eva Garcia', email: 'eva@qa.com', role: 'QA Engineer', status: 'Active', joinDate: '2023-05-12', projects: 6, lastLogin: '2024-01-18' },
    { id: '006', name: 'Frank Miller', email: 'frank@admin.com', role: 'Admin', status: 'Inactive', joinDate: '2023-06-08', projects: 3, lastLogin: '2023-12-15' },
    { id: '007', name: 'Grace Lee', email: 'grace@ui.com', role: 'UI Designer', status: 'Active', joinDate: '2023-07-22', projects: 11, lastLogin: '2024-01-17' },
    { id: '008', name: 'Henry Adams', email: 'henry@backend.com', role: 'Backend Dev', status: 'Active', joinDate: '2023-08-14', projects: 7, lastLogin: '2024-01-16' },
    { id: '009', name: 'Iris Chen', email: 'iris@data.com', role: 'Data Analyst', status: 'Active', joinDate: '2023-09-03', projects: 4, lastLogin: '2024-01-21' },
    { id: '010', name: 'Jack Taylor', email: 'jack@mobile.com', role: 'Mobile Dev', status: 'Inactive', joinDate: '2023-10-18', projects: 5, lastLogin: '2023-12-20' }
  ];

  const itemsPerPage = 5;

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || user.status.toLowerCase() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handleUserClick = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    return (
      <AsciiBadge color={status === 'Active' ? 'success' : 'error'}>
        {status}
      </AsciiBadge>
    );
  };

  const columns = [
    { 
      key: 'id', 
      header: 'ID', 
      width: '10%'
    },
    { 
      key: 'name', 
      header: 'Name', 
      width: '20%'
    },
    { 
      key: 'email', 
      header: 'Email', 
      width: '25%'
    },
    { 
      key: 'role', 
      header: 'Role', 
      width: '15%'
    },
    { 
      key: 'status', 
      header: 'Status', 
      width: '15%'
    },
    { 
      key: 'projects', 
      header: 'Projects', 
      width: '15%',
      align: 'right' as const
    }
  ];

  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Table Demo</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        Advanced data table with search, filtering, pagination, and interactive features.
      </p>

      <AsciiCard title="[ USER MANAGEMENT SYSTEM ]">
        {/* Search and Filter Controls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 200px 150px', 
          gap: '15px', 
          marginBottom: '20px' 
        }}>
          <AsciiInput
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
          
          <AsciiSelect
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1); // Reset to first page on filter
            }}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </AsciiSelect>

          <AsciiButton>
            Add User
          </AsciiButton>
        </div>

        {/* Results Summary */}
        <div style={{ 
          marginBottom: '15px', 
          color: '#ccc', 
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>
            Showing {currentUsers.length} of {filteredUsers.length} users
            {searchTerm && ` (filtered from ${allUsers.length} total)`}
          </span>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Data Table */}
        <AsciiTable
          data={currentUsers}
          columns={columns}
          style={{ marginBottom: '20px' }}
        />

        {/* Pagination */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AsciiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}

        {/* Table Statistics */}
        <div style={{ 
          marginTop: '30px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px'
        }}>
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #333' }}>
            <div style={{ fontSize: '1.5em', color: '#00ff00' }}>
              {allUsers.filter(u => u.status === 'Active').length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Active Users</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #333' }}>
            <div style={{ fontSize: '1.5em', color: '#ff4444' }}>
              {allUsers.filter(u => u.status === 'Inactive').length}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Inactive Users</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #333' }}>
            <div style={{ fontSize: '1.5em', color: '#ffaa00' }}>
              {Math.round(allUsers.reduce((sum, u) => sum + u.projects, 0) / allUsers.length)}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Avg Projects</div>
          </div>
          
          <div style={{ textAlign: 'center', padding: '10px', border: '1px solid #333' }}>
            <div style={{ fontSize: '1.5em', color: '#00ffff' }}>
              {new Set(allUsers.map(u => u.role)).size}
            </div>
            <div style={{ color: '#ccc', fontSize: '12px' }}>Different Roles</div>
          </div>
        </div>
      </AsciiCard>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <AsciiModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`User Details - ${selectedUser.name}`}
        >
          <div style={{ lineHeight: '1.8' }}>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#00ff00' }}>Personal Information:</strong>
            </div>
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <div><strong>Name:</strong> {selectedUser.name}</div>
              <div><strong>Email:</strong> {selectedUser.email}</div>
              <div><strong>Role:</strong> {selectedUser.role}</div>
              <div><strong>Status:</strong> {getStatusBadge(selectedUser.status)}</div>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#00ff00' }}>Activity Information:</strong>
            </div>
            <div style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <div><strong>Join Date:</strong> {selectedUser.joinDate}</div>
              <div><strong>Projects:</strong> {selectedUser.projects}</div>
              <div><strong>Last Login:</strong> {selectedUser.lastLogin}</div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <AsciiButton>
                Edit User
              </AsciiButton>
              <AsciiButton onClick={() => setIsModalOpen(false)}>
                Close
              </AsciiButton>
            </div>
          </div>
        </AsciiModal>
      )}

      {/* Demo Info */}
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        border: '1px solid #333', 
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Table Features</h3>
        <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>
          This table demonstrates:
        </p>
        <ul style={{ 
          color: '#ccc', 
          fontSize: '14px', 
          listStyle: 'disc', 
          marginLeft: '20px', 
          lineHeight: '1.6' 
        }}>
          <li>Real-time search across multiple columns</li>
          <li>Status filtering with dropdown</li>
          <li>Custom cell rendering with badges and buttons</li>
          <li>Clickable rows that open detailed modal</li>
          <li>Pagination with page navigation</li>
          <li>Summary statistics below the table</li>
          <li>Responsive grid layout for controls</li>
          <li>Interactive modal with user details</li>
        </ul>
      </div>
    </div>
  );
}