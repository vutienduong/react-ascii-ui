import React, { useState } from 'react';
import {
  AsciiCard,
  AsciiButton,
  AsciiInput,
  AsciiBadge,
  AsciiAlert,
  AsciiTable,
  AsciiTree,
  type AsciiTreeNode
} from 'react-ascii-ui';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: string;
  icon: string;
  path: string;
}

export default function FileManagerDemo() {
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'size' | 'modified'>('name');
  const [showHidden, setShowHidden] = useState(false);

  const fileTreeData: AsciiTreeNode[] = [
    {
      id: 'root',
      label: 'root/',
      icon: '🏠',
      children: [
        {
          id: 'home',
          label: 'home/',
          icon: '📁',
          children: [
            {
              id: 'user',
              label: 'user/',
              icon: '👤',
              children: [
                { id: 'documents', label: 'Documents/', icon: '📄' },
                { id: 'downloads', label: 'Downloads/', icon: '📥' },
                { id: 'pictures', label: 'Pictures/', icon: '🖼️' },
                { id: 'music', label: 'Music/', icon: '🎵' },
                { id: 'videos', label: 'Videos/', icon: '🎬' }
              ]
            }
          ]
        },
        {
          id: 'usr',
          label: 'usr/',
          icon: '⚙️',
          children: [
            { id: 'bin', label: 'bin/', icon: '🔧' },
            { id: 'lib', label: 'lib/', icon: '📚' }
          ]
        },
        {
          id: 'var',
          label: 'var/',
          icon: '📊',
          children: [
            { id: 'log', label: 'log/', icon: '📋' },
            { id: 'tmp', label: 'tmp/', icon: '🗂️' }
          ]
        }
      ]
    }
  ];

  const files: FileItem[] = [
    {
      id: '1',
      name: 'project-report.pdf',
      type: 'file',
      size: 2048576,
      modified: '2024-03-15 14:30',
      icon: '📄',
      path: '/home/user/Documents'
    },
    {
      id: '2',
      name: 'vacation-photos',
      type: 'folder',
      size: 0,
      modified: '2024-03-14 16:45',
      icon: '📁',
      path: '/home/user'
    },
    {
      id: '3',
      name: 'app.js',
      type: 'file',
      size: 15420,
      modified: '2024-03-15 09:20',
      icon: '📜',
      path: '/home/user/Projects'
    },
    {
      id: '4',
      name: 'config.json',
      type: 'file',
      size: 1024,
      modified: '2024-03-15 11:15',
      icon: '⚙️',
      path: '/home/user/Projects'
    },
    {
      id: '5',
      name: 'README.md',
      type: 'file',
      size: 3072,
      modified: '2024-03-14 18:30',
      icon: '📝',
      path: '/home/user/Projects'
    },
    {
      id: '6',
      name: 'backup.zip',
      type: 'file',
      size: 104857600,
      modified: '2024-03-13 22:00',
      icon: '🗜️',
      path: '/home/user/Downloads'
    },
    {
      id: '7',
      name: '.hidden-config',
      type: 'file',
      size: 512,
      modified: '2024-03-12 10:00',
      icon: '👁️',
      path: '/home/user'
    },
    {
      id: '8',
      name: 'presentation.pptx',
      type: 'file',
      size: 8388608,
      modified: '2024-03-15 13:45',
      icon: '📊',
      path: '/home/user/Documents'
    }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '-';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const filteredFiles = files
    .filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
      const isHidden = file.name.startsWith('.');
      return matchesSearch && (showHidden || !isHidden);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          return b.size - a.size;
        case 'modified':
          return new Date(b.modified).getTime() - new Date(a.modified).getTime();
        default:
          return 0;
      }
    });

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const tableColumns = [
    { key: 'icon', header: '', width: '5%' },
    { key: 'name', header: 'Name', width: '40%' },
    { key: 'size', header: 'Size', width: '15%' },
    { key: 'modified', header: 'Modified', width: '25%' },
    { key: 'actions', header: 'Actions', width: '15%' }
  ];

  const tableData = filteredFiles.map(file => ({
    icon: file.icon,
    name: file.name,
    size: formatFileSize(file.size),
    modified: file.modified,
    actions: '⋮'
  }));

  return (
    <div style={{ fontFamily: 'monospace', backgroundColor: '#1a1a1a', color: '#fff', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: '#2d2d2d', 
        padding: '15px 20px', 
        borderBottom: '1px solid #444',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ color: '#00ff00', fontSize: '1.8em', margin: 0 }}>
            📁 File Manager
          </h1>
          <div style={{ color: '#ccc', marginTop: '5px' }}>
            <span>{currentPath}</span> • <span>{filteredFiles.length} items</span>
            {selectedFiles.length > 0 && (
              <span> • {selectedFiles.length} selected</span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <AsciiButton onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}>
            {viewMode === 'list' ? '⊞ Grid' : '☰ List'}
          </AsciiButton>
          <AsciiButton>🔄 Refresh</AsciiButton>
          <AsciiButton>➕ New</AsciiButton>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100vh - 80px)' }}>
        {/* Sidebar */}
        <div style={{ width: '250px', backgroundColor: '#2d2d2d', borderRight: '1px solid #444', padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Quick Access</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <AsciiButton style={{ width: '100%', textAlign: 'left' }}>
                🏠 Home
              </AsciiButton>
              <AsciiButton style={{ width: '100%', textAlign: 'left' }}>
                📄 Documents
              </AsciiButton>
              <AsciiButton style={{ width: '100%', textAlign: 'left' }}>
                📥 Downloads
              </AsciiButton>
              <AsciiButton style={{ width: '100%', textAlign: 'left' }}>
                🖼️ Pictures
              </AsciiButton>
              <AsciiButton style={{ width: '100%', textAlign: 'left' }}>
                🗑️ Trash
              </AsciiButton>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#00ff00', marginBottom: '15px' }}>Directory Tree</h3>
            <AsciiTree 
              data={fileTreeData}
              defaultExpanded={['root', 'home', 'user']}
              onNodeSelect={(node) => {
                if (node.label.includes('/')) {
                  setCurrentPath(`/${node.label}`);
                }
              }}
            />
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Toolbar */}
          <div style={{ 
            padding: '15px 20px', 
            borderBottom: '1px solid #444',
            backgroundColor: '#2a2a2a',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '15px'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AsciiButton>⬅️ Back</AsciiButton>
              <AsciiButton>➡️ Forward</AsciiButton>
              <AsciiButton>⬆️ Up</AsciiButton>
            </div>

            <div style={{ flex: 1, maxWidth: '400px' }}>
              <AsciiInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search files and folders..."
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'size' | 'modified')}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  border: '1px solid #555',
                  padding: '6px 10px',
                  fontFamily: 'monospace'
                }}
              >
                <option value="name">Name</option>
                <option value="size">Size</option>
                <option value="modified">Modified</option>
              </select>
              
              <AsciiButton 
                onClick={() => setShowHidden(!showHidden)}
                style={{ backgroundColor: showHidden ? '#006600' : undefined }}
              >
                👁️ Hidden
              </AsciiButton>
            </div>
          </div>

          {/* File Operations Bar */}
          {selectedFiles.length > 0 && (
            <div style={{ 
              padding: '10px 20px', 
              backgroundColor: '#003300',
              borderBottom: '1px solid #006600',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <AsciiBadge color="success">{selectedFiles.length} selected</AsciiBadge>
                <AsciiButton>✂️ Cut</AsciiButton>
                <AsciiButton>📋 Copy</AsciiButton>
                <AsciiButton>🗑️ Delete</AsciiButton>
                <AsciiButton>📦 Archive</AsciiButton>
              </div>
              <AsciiButton onClick={() => setSelectedFiles([])}>
                ✖️ Clear Selection
              </AsciiButton>
            </div>
          )}

          {/* Content Area */}
          <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
            {viewMode === 'list' ? (
              <AsciiTable
                data={tableData}
                columns={tableColumns}
              />
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
                gap: '20px' 
              }}>
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => toggleFileSelection(file.id)}
                    style={{
                      backgroundColor: selectedFiles.includes(file.id) ? '#006600' : '#2d2d2d',
                      border: `1px solid ${selectedFiles.includes(file.id) ? '#00ff00' : '#444'}`,
                      padding: '15px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ fontSize: '3em', marginBottom: '10px' }}>
                      {file.icon}
                    </div>
                    <div style={{ 
                      color: '#fff', 
                      fontSize: '12px', 
                      marginBottom: '5px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {file.name}
                    </div>
                    <div style={{ color: '#666', fontSize: '10px' }}>
                      {formatFileSize(file.size)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Bar */}
          <div style={{ 
            padding: '10px 20px', 
            borderTop: '1px solid #444',
            backgroundColor: '#2d2d2d',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#ccc'
          }}>
            <div>
              {filteredFiles.length} items • {files.filter(f => f.type === 'folder').length} folders, {files.filter(f => f.type === 'file').length} files
            </div>
            <div>
              Total size: {formatFileSize(files.reduce((acc, file) => acc + file.size, 0))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}