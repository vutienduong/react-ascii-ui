import React, { useState } from 'react';

// Placeholder Tree component for demonstration
interface TreeNode {
  id: string;
  label: string;
  type: string;
  icon: string;
  children?: TreeNode[];
}

interface AsciiTreeProps {
  data: TreeNode[];
  expanded?: boolean;
}

const AsciiTree: React.FC<AsciiTreeProps> = ({ data, expanded = false }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set(expanded ? ['root'] : []));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, depth = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const indent = '  '.repeat(depth);
    
    return (
      <div key={node.id}>
        <div style={{ 
          color: '#fff', 
          cursor: hasChildren ? 'pointer' : 'default',
          padding: '2px 0'
        }} onClick={() => hasChildren && toggleNode(node.id)}>
          {indent}
          {hasChildren ? (
            <span style={{ color: '#00ff00' }}>
              [{isExpanded ? '-' : '+'}] 
            </span>
          ) : (
            <span style={{ color: '#ccc' }}>
              └── 
            </span>
          )}
          <span style={{ marginLeft: '5px', color: node.type === 'folder' ? '#00ffff' : '#fff' }}>
            {node.icon} {node.label}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {node.children?.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      backgroundColor: '#111', 
      padding: '15px', 
      border: '1px solid #333',
      borderRadius: '4px'
    }}>
      {data.map(node => renderNode(node))}
    </div>
  );
};

export default function TreeDocs() {
  const fileSystemData = [
    {
      id: 'src',
      label: 'src/',
      type: 'folder',
      icon: '📁',
      children: [
        {
          id: 'components',
          label: 'components/',
          type: 'folder',
          icon: '📁',
          children: [
            { id: 'button', label: 'Button.tsx', type: 'file', icon: '📄' },
            { id: 'input', label: 'Input.tsx', type: 'file', icon: '📄' },
            { id: 'card', label: 'Card.tsx', type: 'file', icon: '📄' }
          ]
        },
        {
          id: 'hooks',
          label: 'hooks/',
          type: 'folder',
          icon: '📁',
          children: [
            { id: 'usestate', label: 'useState.ts', type: 'file', icon: '🪝' },
            { id: 'useeffect', label: 'useEffect.ts', type: 'file', icon: '🪝' }
          ]
        },
        { id: 'index', label: 'index.ts', type: 'file', icon: '📄' }
      ]
    },
    {
      id: 'docs',
      label: 'docs/',
      type: 'folder',
      icon: '📁',
      children: [
        { id: 'readme', label: 'README.md', type: 'file', icon: '📝' },
        { id: 'changelog', label: 'CHANGELOG.md', type: 'file', icon: '📝' }
      ]
    },
    { id: 'package', label: 'package.json', type: 'file', icon: '📦' }
  ];

  const organizationData = [
    {
      id: 'company',
      label: 'TechCorp Inc.',
      type: 'organization',
      icon: '🏢',
      children: [
        {
          id: 'engineering',
          label: 'Engineering',
          type: 'department',
          icon: '⚙️',
          children: [
            { id: 'frontend', label: 'Frontend Team', type: 'team', icon: '👥' },
            { id: 'backend', label: 'Backend Team', type: 'team', icon: '👥' },
            { id: 'devops', label: 'DevOps Team', type: 'team', icon: '👥' }
          ]
        },
        {
          id: 'design',
          label: 'Design',
          type: 'department',
          icon: '🎨',
          children: [
            { id: 'ux', label: 'UX Team', type: 'team', icon: '👥' },
            { id: 'ui', label: 'UI Team', type: 'team', icon: '👥' }
          ]
        },
        {
          id: 'product',
          label: 'Product',
          type: 'department',
          icon: '📋',
          children: [
            { id: 'pm', label: 'Product Management', type: 'team', icon: '👥' },
            { id: 'research', label: 'User Research', type: 'team', icon: '👥' }
          ]
        }
      ]
    }
  ];

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#00ff00', fontSize: '2.5em', marginBottom: '20px' }}>AsciiTree</h1>
        <p style={{ fontSize: '1.2em', marginBottom: '30px', color: '#ccc' }}>
          Hierarchical tree view component with ASCII styling and expandable nodes.
        </p>
        
        <div style={{ 
          backgroundColor: '#ffaa00', 
          color: '#000', 
          padding: '15px', 
          borderRadius: '4px',
          marginBottom: '20px',
          border: '1px solid #ffaa00'
        }}>
          <strong>⚠️ Development Status:</strong> The AsciiTree component is planned for a future release. 
          This documentation shows the intended API and features. Below is a preview implementation 
          demonstrating the expected functionality.
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Preview</h2>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>File System Tree</h4>
            <AsciiTree data={fileSystemData} />
          </div>
          
          <div>
            <h4 style={{ color: '#00ff00', marginBottom: '15px' }}>Organization Chart</h4>
            <AsciiTree data={organizationData} />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Installation</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto'
        }}>
{`npm install react-ascii-ui`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Planned Usage</h2>
        <pre style={{
          backgroundColor: '#000',
          border: '1px solid #333',
          padding: '15px',
          borderRadius: '4px',
          color: '#00ff00',
          overflow: 'auto',
          fontSize: '14px'
        }}>
{`import { AsciiTree } from 'react-ascii-ui';

const treeData = [
  {
    id: 'root',
    label: 'Project Root',
    children: [
      { id: 'src', label: 'src/', children: [...] },
      { id: 'docs', label: 'docs/', children: [...] }
    ]
  }
];

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <AsciiTree
      data={treeData}
      onNodeSelect={setSelectedNode}
      expandable={true}
      showIcons={true}
    />
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Examples</h2>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Nested Folder Structure</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ 
              fontFamily: 'monospace', 
              color: '#fff',
              lineHeight: '1.4'
            }}>
              <div>[+] 📁 project-root/</div>
              <div>    [+] 📁 src/</div>
              <div>        └── 📄 index.js</div>
              <div>        └── 📄 App.js</div>
              <div>        [+] 📁 components/</div>
              <div>            └── 📄 Header.js</div>
              <div>            └── 📄 Footer.js</div>
              <div>    [+] 📁 public/</div>
              <div>        └── 📄 index.html</div>
              <div>    └── 📦 package.json</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#00ff00', fontSize: '1.3em', marginBottom: '15px' }}>Menu Navigation Tree</h3>
          <div style={{ 
            border: '1px solid #333',
            backgroundColor: '#111',
            padding: '20px'
          }}>
            <div style={{ 
              fontFamily: 'monospace', 
              color: '#fff',
              lineHeight: '1.4'
            }}>
              <div>[-] 🏠 Dashboard</div>
              <div>    └── 📊 Analytics</div>
              <div>    └── 📈 Reports</div>
              <div>[+] 👥 Users</div>
              <div>    └── 👤 User List</div>
              <div>    └── ➕ Add User</div>
              <div>[+] ⚙️ Settings</div>
              <div>    └── 🔧 General</div>
              <div>    └── 🔒 Security</div>
              <div>    └── 🎨 Appearance</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8em', marginBottom: '20px' }}>Planned API Reference</h2>
        <div style={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '4px', padding: '20px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Prop</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Type</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Default</th>
                <th style={{ textAlign: 'left', padding: '8px', color: '#00ff00' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>data</td>
                <td style={{ padding: '8px', color: '#ccc' }}>TreeNode[]</td>
                <td style={{ padding: '8px', color: '#ccc' }}>-</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Tree data structure</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>expandable</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>true</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Enable node expansion/collapse</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>showIcons</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>true</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Show node icons</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>selectable</td>
                <td style={{ padding: '8px', color: '#ccc' }}>boolean</td>
                <td style={{ padding: '8px', color: '#ccc' }}>false</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Enable node selection</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>onNodeSelect</td>
                <td style={{ padding: '8px', color: '#ccc' }}>{'(node: TreeNode) => void'}</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Node selection callback</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>onNodeExpand</td>
                <td style={{ padding: '8px', color: '#ccc' }}>{'(node: TreeNode) => void'}</td>
                <td style={{ padding: '8px', color: '#ccc' }}>undefined</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Node expansion callback</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>defaultExpanded</td>
                <td style={{ padding: '8px', color: '#ccc' }}>string[]</td>
                <td style={{ padding: '8px', color: '#ccc' }}>[]</td>
                <td style={{ padding: '8px', color: '#ccc' }}>Default expanded node IDs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', border: '1px solid #333', borderRadius: '4px', backgroundColor: '#111' }}>
        <h3 style={{ color: '#00ff00', marginBottom: '10px' }}>Planned Tree Features</h3>
        <ul style={{ color: '#ccc', fontSize: '14px', listStyle: 'disc', marginLeft: '20px', lineHeight: '1.6' }}>
          <li>Hierarchical data visualization with ASCII characters</li>
          <li>Expandable/collapsible nodes with [+] and [-] indicators</li>
          <li>Custom icons and labels for different node types</li>
          <li>Keyboard navigation support (arrow keys, enter, space)</li>
          <li>Node selection and multi-selection modes</li>
          <li>Lazy loading support for large datasets</li>
          <li>Custom node renderers and styling</li>
          <li>Search and filtering capabilities</li>
          <li>Drag and drop reordering (future enhancement)</li>
        </ul>
        
        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#0a0a0a', border: '1px solid #333', borderRadius: '2px' }}>
          <strong style={{ color: '#00ffff' }}>Development Timeline:</strong>
          <p style={{ color: '#ccc', margin: '5px 0 0 0', fontSize: '12px' }}>
            The AsciiTree component is planned for implementation in v1.1.0. 
            It will support file system navigation, menu trees, organization charts, and other hierarchical data structures.
          </p>
        </div>
      </div>
    </div>
  );
}