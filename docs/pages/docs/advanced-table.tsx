export default function AdvancedTableDocs() {
  return (
    <div>
      <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>Advanced Table</h1>
      
      <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
        A powerful data table component with sorting, filtering, pagination, and custom rendering.
      </p>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Basic Usage</h2>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`import { AsciiAdvancedTable } from 'react-ascii-ui';

const columns = [
  { 
    key: 'name', 
    header: 'Name', 
    sortable: true,
    filterable: true 
  },
  { 
    key: 'email', 
    header: 'Email', 
    sortable: true 
  },
  { 
    key: 'status', 
    header: 'Status', 
    render: (value) => value ? '🟢 Active' : '🔴 Inactive'
  },
];

const data = [
  { name: 'John Doe', email: 'john@example.com', status: true },
  { name: 'Jane Smith', email: 'jane@example.com', status: false },
];

function MyTable() {
  return (
    <AsciiAdvancedTable 
      columns={columns}
      data={data}
      sortable={true}
      filterable={true}
      searchable={true}
      paginated={true}
      pageSize={10}
      onRowClick={(row) => console.log('Clicked:', row)}
    />
  );
}`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Features</h2>
      
      <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
        <li><strong>Sorting</strong> - Click column headers to sort data (supports multiple data types)</li>
        <li><strong>Global Search</strong> - Search across all columns with a single input</li>
        <li><strong>Column Filters</strong> - Individual filter inputs for each column</li>
        <li><strong>Pagination</strong> - Built-in pagination with customizable page size</li>
        <li><strong>Custom Rendering</strong> - Custom render functions for complex cell content</li>
        <li><strong>Row Actions</strong> - Click handlers and interactive rows</li>
        <li><strong>Loading States</strong> - Built-in loading indicators</li>
        <li><strong>Empty States</strong> - Customizable empty state messages</li>
      </ul>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Column Configuration</h2>
      
      <pre style={{ 
        backgroundColor: '#111', 
        border: '1px solid #333', 
        padding: '20px', 
        borderRadius: '4px', 
        overflow: 'auto',
        marginBottom: '30px',
        color: '#ccc'
      }}>
{`const advancedColumns = [
  {
    key: 'id',
    header: 'ID',
    width: '10%',
    align: 'center',
    sortable: true
  },
  {
    key: 'name',
    header: 'Full Name',
    width: '25%',
    sortable: true,
    filterable: true
  },
  {
    key: 'salary',
    header: 'Salary',
    width: '20%',
    align: 'right',
    sortable: true,
    render: (value) => \`$\${value.toLocaleString()}\`
  },
  {
    key: 'actions',
    header: 'Actions',
    width: '15%',
    sortable: false,
    filterable: false,
    render: (_, row) => (
      <div>
        <button onClick={() => edit(row)}>✏️</button>
        <button onClick={() => delete(row)}>🗑️</button>
      </div>
    )
  }
];`}
      </pre>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Props</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Main Props</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li><code>columns</code> - Array of column definitions</li>
          <li><code>data</code> - Array of data objects</li>
          <li><code>sortable</code> - Enable sorting for all columns (default: true)</li>
          <li><code>filterable</code> - Enable filtering for all columns (default: true)</li>
          <li><code>searchable</code> - Enable global search (default: true)</li>
          <li><code>paginated</code> - Enable pagination (default: true)</li>
          <li><code>pageSize</code> - Number of rows per page (default: 10)</li>
          <li><code>loading</code> - Show loading state</li>
          <li><code>emptyMessage</code> - Custom empty state message</li>
          <li><code>onRowClick</code> - Row click handler</li>
        </ul>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ color: '#00ff00', fontSize: '1.2em', marginBottom: '10px' }}>Column Props</h3>
        <ul style={{ listStyle: 'disc', marginLeft: '20px', lineHeight: '1.8', color: '#ccc' }}>
          <li><code>key</code> - Data property key</li>
          <li><code>header</code> - Column header text</li>
          <li><code>width</code> - Column width (CSS value)</li>
          <li><code>align</code> - Text alignment ('left' | 'center' | 'right')</li>
          <li><code>sortable</code> - Enable sorting for this column</li>
          <li><code>filterable</code> - Enable filtering for this column</li>
          <li><code>render</code> - Custom render function</li>
        </ul>
      </div>

      <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '15px', marginTop: '40px' }}>Examples</h2>
      
      <p style={{ color: '#ccc', marginBottom: '20px' }}>
        See the Advanced Table in action in our <a href="/users" style={{ color: '#00ff00' }}>Users Management Demo</a> 
        with real data and interactive features.
      </p>
    </div>
  );
}