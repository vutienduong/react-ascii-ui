import React from 'react';
import { AsciiTable } from 'react-ascii-ui';

const sampleData = [
  { id: '001', name: 'Alice Smith', email: 'alice@example.com', role: 'Developer', status: 'Active' },
  { id: '002', name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Inactive' },
  { id: '003', name: 'Carol Wilson', email: 'carol@example.com', role: 'Manager', status: 'Active' }
];

const columns = [
  { key: 'id', header: 'ID', width: '10%' },
  { key: 'name', header: 'Name', width: '25%' },
  { key: 'email', header: 'Email', width: '30%' },
  { key: 'role', header: 'Role', width: '20%' },
  { key: 'status', header: 'Status', width: '15%', align: 'center' as const }
];

export default function TableDocs() {
  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '10px' }}>Table</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '20px', color: '#ccc' }}>
          A data table component with ASCII borders for displaying structured information.
        </p>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <a href="#docs" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>Docs</a>
          <span style={{ color: '#333' }}>•</span>
          <a href="#api" style={{ color: '#00ff00', textDecoration: 'none', fontSize: '14px' }}>API Reference</a>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: '#111', 
            border: 'none', 
            color: '#fff', 
            borderBottom: '2px solid #00ff00',
            fontFamily: 'monospace'
          }}>
            Preview
          </button>
          <button style={{ 
            padding: '10px 20px', 
            backgroundColor: 'transparent', 
            border: 'none', 
            color: '#666',
            fontFamily: 'monospace'
          }}>
            Code
          </button>
        </div>
      </div>

      {/* Preview */}
      <div style={{
        marginBottom: '40px',
        padding: '30px',
        border: '1px solid #333',
        borderRadius: '4px',
        backgroundColor: '#111'
      }}>
        <AsciiTable 
          data={sampleData}
          columns={columns}
          caption="[ USER DATA TABLE ]"
        />
      </div>

      {/* Installation */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          fontFamily: 'monospace',
          fontSize: '14px'
        }}>
          npm install react-ascii-ui
        </pre>
      </div>

      {/* Usage */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Usage</h2>
        <pre style={{
          backgroundColor: '#111',
          border: '1px solid #333',
          padding: '20px',
          borderRadius: '4px',
          color: '#ccc',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.5'
        }}>
{`import { AsciiTable } from 'react-ascii-ui';

const data = [
  { id: '001', name: 'Alice', role: 'Developer' },
  { id: '002', name: 'Bob', role: 'Designer' }
];

const columns = [
  { key: 'id', header: 'ID', width: '20%' },
  { key: 'name', header: 'Name', width: '40%' },
  { key: 'role', header: 'Role', width: '40%' }
];

export default function Example() {
  return (
    <AsciiTable 
      data={data}
      columns={columns}
      caption="User Table"
    />
  );
}`}
        </pre>
      </div>

      {/* Examples */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>
        
        {/* Basic Example */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Basic Table</h3>
          <div style={{
            padding: '20px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTable 
              data={[
                { name: 'Alice', age: 30 },
                { name: 'Bob', age: 25 }
              ]}
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'age', header: 'Age', align: 'right' }
              ]}
            />
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
{`<AsciiTable 
  data={[
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
  ]}
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'age', header: 'Age', align: 'right' }
  ]}
/>`}
          </pre>
        </div>

        {/* With Caption */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>With Caption</h3>
          <div style={{
            padding: '20px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTable 
              data={sampleData.slice(0, 2)}
              columns={columns.slice(0, 3)}
              caption="[ EMPLOYEES ]"
            />
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiTable 
  data={data}
  columns={columns}
  caption="[ EMPLOYEES ]"
/>`}
          </pre>
        </div>

        {/* Empty State */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Empty State</h3>
          <div style={{
            padding: '20px',
            border: '1px solid #333',
            borderRadius: '4px',
            backgroundColor: '#111',
            marginBottom: '15px'
          }}>
            <AsciiTable 
              data={[]}
              columns={columns}
              caption="[ NO DATA ]"
            />
          </div>
          <pre style={{
            backgroundColor: '#000',
            border: '1px solid #333',
            padding: '15px',
            borderRadius: '4px',
            color: '#00ff00',
            fontFamily: 'monospace',
            fontSize: '12px'
          }}>
            {`<AsciiTable 
  data={[]}
  columns={columns}
  caption="[ NO DATA ]"
/>`}
          </pre>
        </div>
      </div>

      {/* API Reference */}
      <div id="api" style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>API Reference</h2>
        
        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px' }}>Props</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Prop</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>data</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Record&lt;string, any&gt;[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Array of data objects to display</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>columns</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>AsciiTableColumn[]</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Column configuration array</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>caption</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Optional table caption</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>className</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 style={{ color: '#fff', fontSize: '1.3em', marginBottom: '15px', marginTop: '30px' }}>AsciiTableColumn</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#222' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Property</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Type</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Default</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #333', color: '#fff', fontWeight: 'bold' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>key</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Data object property key</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>header</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Column header text</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>width</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>string</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>-</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Column width (CSS value)</td>
              </tr>
              <tr>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#00ff00' }}>align</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>'left' | 'center' | 'right'</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>left</td>
                <td style={{ padding: '12px', borderBottom: '1px solid #333', color: '#ccc' }}>Text alignment</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ color: '#ccc', marginTop: '15px', fontSize: '14px' }}>
          AsciiTable extends all HTML div attributes and React.HTMLAttributes&lt;HTMLDivElement&gt;.
        </p>
      </div>
    </div>
  );
}