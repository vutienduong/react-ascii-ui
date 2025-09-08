import React, { useState, useRef } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { AsciiNetworkVisualizer } from './AsciiNetworkVisualizer';
import { 
  useNetworkVisualizer, 
  useNetworkAnalysis, 
  useNetworkMonitoring,
  useNetworkPaths 
} from './hooks';
import { 
  generateSampleNetwork, 
  exportNetwork,
  NetworkLayoutEngine 
} from './utils';
import { 
  ASCII_NETWORK_THEMES, 
  NetworkTopology, 
  NetworkNode, 
  NetworkEdge,
  LayoutType 
} from './types';

export const NetworkVisualizerDemo: React.FC = () => {
  const { theme } = useAsciiTheme();
  const [activeDemo, setActiveDemo] = useState<'visualizer' | 'builder' | 'analysis' | 'monitoring'>('visualizer');
  
  // Initialize with sample data
  const [sampleTopology] = useState(() => generateSampleNetwork());
  
  // Network visualizer hook
  const networkViz = useNetworkVisualizer(sampleTopology, {
    width: 800,
    height: 600,
    layout: 'force'
  });
  
  // Analysis hook
  const analysis = useNetworkAnalysis(networkViz.topology);
  
  // Monitoring hook
  const monitoring = useNetworkMonitoring();
  
  // Path finding hook
  const pathFinder = useNetworkPaths(networkViz.topology);
  
  // Demo state
  const [selectedTheme, setSelectedTheme] = useState('green');
  const [selectedLayout, setSelectedLayout] = useState<LayoutType>('force');
  const [showLabels, setShowLabels] = useState(true);
  const [showStatus, setShowStatus] = useState(true);
  const [showMetrics, setShowMetrics] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');
  const [targetNodeId, setTargetNodeId] = useState<string>('');
  
  // Builder state
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newNodeType, setNewNodeType] = useState<string>('server');
  const [edgeSource, setEdgeSource] = useState('');
  const [edgeTarget, setEdgeTarget] = useState('');
  
  // File handling
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportNetwork = (format: 'json' | 'dot' | 'gml' | 'csv') => {
    try {
      const exported = exportNetwork(networkViz.topology, format);
      const blob = new Blob([exported], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `network.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleImportNetwork = async (file: File) => {
    try {
      const text = await file.text();
      const extension = file.name.split('.').pop()?.toLowerCase();
      
      if (extension === 'json') {
        await networkViz.importTopology(text, 'json');
      } else if (extension === 'csv') {
        await networkViz.importTopology(text, 'csv');
      } else {
        throw new Error('Unsupported file format');
      }
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const handleAddNode = () => {
    if (!newNodeLabel.trim()) return;
    
    const newNode: NetworkNode = {
      id: `node-${Date.now()}`,
      label: newNodeLabel.trim(),
      type: newNodeType as any,
      status: 'online',
      x: Math.random() * 800,
      y: Math.random() * 600
    };
    
    networkViz.addNode(newNode);
    setNewNodeLabel('');
  };

  const handleAddEdge = () => {
    if (!edgeSource || !edgeTarget || edgeSource === edgeTarget) return;
    
    const newEdge: NetworkEdge = {
      id: `edge-${Date.now()}`,
      source: edgeSource,
      target: edgeTarget,
      type: 'ethernet',
      status: 'active'
    };
    
    networkViz.addEdge(newEdge);
    setEdgeSource('');
    setEdgeTarget('');
  };

  const handleFindPath = () => {
    if (!selectedNodeId || !targetNodeId) return;
    
    const path = pathFinder.findPath(selectedNodeId, targetNodeId);
    if (path) {
      console.log('Path found:', path);
      // Could highlight path in visualization
    } else {
      console.log('No path found');
    }
  };

  const containerStyle = {
    fontFamily: theme.typography.fontFamily,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    padding: '20px',
    minHeight: '100vh'
  };

  const titleStyle = {
    color: theme.colors.primary,
    fontSize: '2rem',
    marginBottom: '20px',
    textAlign: 'center' as const
  };

  const tabsStyle = {
    display: 'flex',
    marginBottom: '30px',
    borderBottom: `2px solid ${theme.colors.border}`,
    gap: '20px'
  };

  const tabStyle = (isActive: boolean) => ({
    padding: '10px 20px',
    cursor: 'pointer',
    borderBottom: isActive ? `3px solid ${theme.colors.primary}` : 'none',
    color: isActive ? theme.colors.primary : theme.colors.text,
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'all 0.2s'
  });

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '8px'
  };

  const controlsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: theme.colors.muted + '20',
    borderRadius: '4px'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {theme.characters.doubleHorizontal.repeat(3)} ASCII Network Visualizer Demo {theme.characters.doubleHorizontal.repeat(3)}
      </h1>

      {/* Navigation Tabs */}
      <div style={tabsStyle}>
        <div 
          style={tabStyle(activeDemo === 'visualizer')}
          onClick={() => setActiveDemo('visualizer')}
        >
          🔗 Network Viewer
        </div>
        <div 
          style={tabStyle(activeDemo === 'builder')}
          onClick={() => setActiveDemo('builder')}
        >
          🏗️ Topology Builder
        </div>
        <div 
          style={tabStyle(activeDemo === 'analysis')}
          onClick={() => setActiveDemo('analysis')}
        >
          📊 Network Analysis
        </div>
        <div 
          style={tabStyle(activeDemo === 'monitoring')}
          onClick={() => setActiveDemo('monitoring')}
        >
          📡 Real-time Monitor
        </div>
      </div>

      {/* Network Visualizer Demo */}
      {activeDemo === 'visualizer' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Interactive Network Visualization
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Visualize network topologies with ASCII-style graphics. Supports multiple layouts, 
            interactive controls, and real-time updates.
          </p>

          {/* Visualization Controls */}
          <div style={controlsStyle}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Theme:</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                style={{
                  width: '100%',
                  padding: '5px',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                {Object.entries(ASCII_NETWORK_THEMES).map(([key, themeData]) => (
                  <option key={key} value={key}>
                    {themeData.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Layout:</label>
              <select
                value={selectedLayout}
                onChange={(e) => {
                  setSelectedLayout(e.target.value as LayoutType);
                  networkViz.applyLayout(e.target.value);
                }}
                style={{
                  width: '100%',
                  padding: '5px',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text,
                  border: `1px solid ${theme.colors.border}`
                }}
              >
                <option value="force">Force-Directed</option>
                <option value="hierarchical">Hierarchical</option>
                <option value="circular">Circular</option>
                <option value="grid">Grid</option>
                <option value="tree">Tree</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>
                <input
                  type="checkbox"
                  checked={showLabels}
                  onChange={(e) => setShowLabels(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Labels
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showStatus}
                  onChange={(e) => setShowStatus(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Status
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={showMetrics}
                  onChange={(e) => setShowMetrics(e.target.checked)}
                  style={{ marginRight: '8px' }}
                />
                Show Metrics
              </label>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => networkViz.updateTopology(generateSampleNetwork())}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.9rem',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.background,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                New Sample
              </button>
              <button
                onClick={() => networkViz.clearSelection()}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.9rem',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.muted,
                  color: theme.colors.text,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Clear Selection
              </button>
            </div>
          </div>

          {/* Network Visualization */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '20px',
            border: `2px solid ${theme.colors.border}`,
            borderRadius: '8px',
            padding: '10px'
          }}>
            <AsciiNetworkVisualizer
              topology={networkViz.topology}
              options={{
                width: 800,
                height: 600,
                theme: selectedTheme,
                layout: selectedLayout,
                showLabels,
                showStatus,
                showMetrics,
                interactive: true,
                zoom: true,
                pan: true
              }}
              onNodeClick={(node) => {
                console.log('Node clicked:', node);
                networkViz.selectNode(node.id);
              }}
              onEdgeClick={(edge) => {
                console.log('Edge clicked:', edge);
                networkViz.selectEdge(edge.id);
              }}
            />
          </div>

          {/* Export/Import Controls */}
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div>
              <strong>Export:</strong>
              {(['json', 'dot', 'gml', 'csv'] as const).map(format => (
                <button
                  key={format}
                  onClick={() => handleExportNetwork(format)}
                  style={{
                    padding: '6px 12px',
                    marginLeft: '8px',
                    fontSize: '0.9rem',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.background,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
            
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,.csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImportNetwork(file);
                }}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  padding: '6px 12px',
                  fontSize: '0.9rem',
                  fontFamily: theme.typography.fontFamily,
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.background,
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                📁 Import
              </button>
            </div>
          </div>

          {networkViz.error && (
            <div style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: theme.colors.error + '20',
              border: `1px solid ${theme.colors.error}`,
              borderRadius: '4px',
              color: theme.colors.error
            }}>
              Error: {networkViz.error}
            </div>
          )}
        </div>
      )}

      {/* Topology Builder Demo */}
      {activeDemo === 'builder' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Network Topology Builder
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Build custom network topologies by adding nodes and connections.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Add Node */}
            <div>
              <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Add Node</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                  type="text"
                  placeholder="Node label"
                  value={newNodeLabel}
                  onChange={(e) => setNewNodeLabel(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                />
                <select
                  value={newNodeType}
                  onChange={(e) => setNewNodeType(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                >
                  <option value="server">Server</option>
                  <option value="workstation">Workstation</option>
                  <option value="router">Router</option>
                  <option value="switch">Switch</option>
                  <option value="firewall">Firewall</option>
                  <option value="database">Database</option>
                  <option value="cloud">Cloud</option>
                  <option value="printer">Printer</option>
                </select>
                <button
                  onClick={handleAddNode}
                  disabled={!newNodeLabel.trim()}
                  style={{
                    padding: '10px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: newNodeLabel.trim() ? theme.colors.primary : theme.colors.muted,
                    color: theme.colors.background,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: newNodeLabel.trim() ? 'pointer' : 'not-allowed'
                  }}
                >
                  Add Node
                </button>
              </div>
            </div>

            {/* Add Edge */}
            <div>
              <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Add Connection</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select
                  value={edgeSource}
                  onChange={(e) => setEdgeSource(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select source node</option>
                  {networkViz.topology.nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>
                <select
                  value={edgeTarget}
                  onChange={(e) => setEdgeTarget(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select target node</option>
                  {networkViz.topology.nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleAddEdge}
                  disabled={!edgeSource || !edgeTarget || edgeSource === edgeTarget}
                  style={{
                    padding: '10px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: (edgeSource && edgeTarget && edgeSource !== edgeTarget) ? theme.colors.primary : theme.colors.muted,
                    color: theme.colors.background,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: (edgeSource && edgeTarget && edgeSource !== edgeTarget) ? 'pointer' : 'not-allowed'
                  }}
                >
                  Add Connection
                </button>
              </div>
            </div>
          </div>

          {/* Current Topology Stats */}
          <div style={{ 
            marginTop: '30px', 
            padding: '15px', 
            backgroundColor: theme.colors.muted + '20', 
            borderRadius: '4px' 
          }}>
            <h4 style={{ color: theme.colors.text, marginBottom: '10px' }}>
              Current Topology
            </h4>
            <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem' }}>
              <span>Nodes: {networkViz.topology.nodes.length}</span>
              <span>Edges: {networkViz.topology.edges.length}</span>
              <span>Selected: {networkViz.selectedNodes.length + networkViz.selectedEdges.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Network Analysis Demo */}
      {activeDemo === 'analysis' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Network Analysis & Metrics
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Analyze network structure, find paths, and calculate network metrics.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Network Metrics */}
            <div>
              <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Network Metrics</h3>
              {analysis.analysis ? (
                <div style={{ 
                  padding: '15px', 
                  backgroundColor: theme.colors.muted + '20', 
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Nodes:</strong> {analysis.analysis.nodeCount}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Edges:</strong> {analysis.analysis.edgeCount}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Density:</strong> {(analysis.analysis.density * 100).toFixed(2)}%
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>Avg Degree:</strong> {analysis.analysis.avgDegree.toFixed(2)}
                  </div>
                  <div style={{ marginBottom: '15px' }}>
                    <strong>Max Degree:</strong> {analysis.analysis.maxDegree}
                  </div>
                  
                  <div>
                    <strong>Hub Nodes:</strong>
                    <ul style={{ marginTop: '5px', marginLeft: '15px' }}>
                      {analysis.analysis.hubs.map((hub: any) => (
                        <li key={hub.nodeId}>
                          {networkViz.topology.nodes.find(n => n.id === hub.nodeId)?.label} 
                          ({hub.degree} connections)
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div>Calculating metrics...</div>
              )}
            </div>

            {/* Path Finding */}
            <div>
              <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>Path Analysis</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select
                  value={selectedNodeId}
                  onChange={(e) => setSelectedNodeId(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select source node</option>
                  {networkViz.topology.nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>
                
                <select
                  value={targetNodeId}
                  onChange={(e) => setTargetNodeId(e.target.value)}
                  style={{
                    padding: '8px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.text,
                    border: `1px solid ${theme.colors.border}`,
                    borderRadius: '4px'
                  }}
                >
                  <option value="">Select target node</option>
                  {networkViz.topology.nodes.map(node => (
                    <option key={node.id} value={node.id}>
                      {node.label}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={handleFindPath}
                  disabled={!selectedNodeId || !targetNodeId}
                  style={{
                    padding: '10px',
                    fontFamily: theme.typography.fontFamily,
                    backgroundColor: (selectedNodeId && targetNodeId) ? theme.colors.primary : theme.colors.muted,
                    color: theme.colors.background,
                    border: 'none',
                    borderRadius: '4px',
                    cursor: (selectedNodeId && targetNodeId) ? 'pointer' : 'not-allowed'
                  }}
                >
                  Find Shortest Path
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Monitoring Demo */}
      {activeDemo === 'monitoring' && (
        <div style={sectionStyle}>
          <h2 style={{ color: theme.colors.secondary, marginBottom: '20px' }}>
            Real-time Network Monitoring
          </h2>
          <p style={{ color: theme.colors.muted, marginBottom: '20px' }}>
            Monitor network status changes and events in real-time.
          </p>

          <div style={{ marginBottom: '20px' }}>
            <button
              onClick={() => {
                if (monitoring.isMonitoring) {
                  monitoring.stopMonitoring();
                } else {
                  monitoring.startMonitoring(
                    networkViz.topology,
                    2000,
                    (updatedTopology) => networkViz.updateTopology(updatedTopology)
                  );
                }
              }}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: monitoring.isMonitoring ? theme.colors.error || '#ff4444' : theme.colors.primary,
                color: theme.colors.background,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              {monitoring.isMonitoring ? '⏹️ Stop Monitoring' : '▶️ Start Monitoring'}
            </button>

            <button
              onClick={monitoring.clearEvents}
              style={{
                padding: '12px 24px',
                fontSize: '1rem',
                fontFamily: theme.typography.fontFamily,
                backgroundColor: theme.colors.muted,
                color: theme.colors.text,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🗑️ Clear Events
            </button>
          </div>

          {/* Monitoring Status */}
          <div style={{
            padding: '15px',
            backgroundColor: monitoring.isMonitoring ? theme.colors.primary + '20' : theme.colors.muted + '20',
            border: `1px solid ${monitoring.isMonitoring ? theme.colors.primary : theme.colors.border}`,
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                Status: {monitoring.isMonitoring ? 'Monitoring Active' : 'Monitoring Inactive'}
              </span>
              <span>
                Events: {monitoring.events.length}
              </span>
            </div>
          </div>

          {/* Recent Events */}
          <div>
            <h3 style={{ color: theme.colors.text, marginBottom: '15px' }}>
              Recent Events
            </h3>
            <div style={{
              maxHeight: '300px',
              overflowY: 'auto',
              border: `1px solid ${theme.colors.border}`,
              borderRadius: '4px',
              padding: '10px',
              backgroundColor: theme.colors.background
            }}>
              {monitoring.events.length === 0 ? (
                <div style={{ color: theme.colors.muted, textAlign: 'center', padding: '20px' }}>
                  No events recorded. Start monitoring to see network updates.
                </div>
              ) : (
                monitoring.events.slice(-10).reverse().map((event, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '8px',
                      borderBottom: `1px solid ${theme.colors.border}`,
                      fontSize: '0.9rem',
                      fontFamily: 'monospace'
                    }}
                  >
                    <span style={{ color: theme.colors.primary }}>
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                    {' - '}
                    <span style={{ color: theme.colors.text }}>
                      {event.type}
                    </span>
                    {event.nodeId && (
                      <span style={{ color: theme.colors.secondary }}>
                        {' ('}
                        {networkViz.topology.nodes.find(n => n.id === event.nodeId)?.label || event.nodeId}
                        {')'}
                      </span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        padding: '20px',
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: '8px',
        textAlign: 'center' as const
      }}>
        <h3 style={{ color: theme.colors.primary, marginBottom: '10px' }}>
          🔗 ASCII Network Visualizer Complete!
        </h3>
        <p style={{ color: theme.colors.text }}>
          Interactive network topology visualization with ASCII aesthetics, 
          multiple layout algorithms, real-time monitoring, path analysis, 
          and comprehensive network metrics. Perfect for network administration 
          and monitoring dashboards!
        </p>
      </div>
    </div>
  );
};

export default NetworkVisualizerDemo;