import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAsciiTheme } from '../contexts/ThemeContext';
import { useSystemSounds } from '../sound/hooks';
import {
  NetworkTopology,
  NetworkNode,
  NetworkEdge,
  NetworkVisualizerOptions,
  NetworkEvent,
  NetworkPosition,
  NetworkTheme,
  ASCII_NETWORK_THEMES,
  DEFAULT_NETWORK_OPTIONS
} from './types';
import { NetworkLayoutEngine, calculateDistance } from './utils';

export interface AsciiNetworkVisualizerProps {
  topology: NetworkTopology;
  options?: Partial<NetworkVisualizerOptions>;
  onNodeClick?: (node: NetworkNode) => void;
  onNodeHover?: (node: NetworkNode | null) => void;
  onEdgeClick?: (edge: NetworkEdge) => void;
  onEdgeHover?: (edge: NetworkEdge | null) => void;
  onNetworkEvent?: (event: NetworkEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const AsciiNetworkVisualizer: React.FC<AsciiNetworkVisualizerProps> = ({
  topology,
  options = {},
  onNodeClick,
  onNodeHover,
  onEdgeClick,
  onEdgeHover,
  onNetworkEvent,
  className = '',
  style = {}
}) => {
  const { theme: asciiTheme } = useAsciiTheme();
  const { playNotification, playAlert } = useSystemSounds();
  
  // Merge options with defaults
  const vizOptions: NetworkVisualizerOptions = { ...DEFAULT_NETWORK_OPTIONS, ...options };
  const networkTheme: NetworkTheme = typeof vizOptions.theme === 'string' 
    ? ASCII_NETWORK_THEMES[vizOptions.theme] || ASCII_NETWORK_THEMES.green
    : vizOptions.theme || ASCII_NETWORK_THEMES.green;
  
  // State
  const [layoutNodes, setLayoutNodes] = useState<NetworkNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState<NetworkPosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<NetworkPosition>({ x: 0, y: 0 });
  
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Apply layout when topology or layout type changes
  useEffect(() => {
    const layoutEngine = new NetworkLayoutEngine(topology, vizOptions.width, vizOptions.height);
    const positioned = layoutEngine.applyLayout(vizOptions.layout || 'force');
    setLayoutNodes(positioned);
  }, [topology, vizOptions.layout, vizOptions.width, vizOptions.height]);

  // Handle node interaction
  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node.id);
    onNodeClick?.(node);
    onNetworkEvent?.({
      type: 'node-click',
      nodeId: node.id,
      data: node,
      timestamp: new Date()
    });
    
    if (vizOptions.interactive && options.soundEffects !== false) {
      playNotification();
    }
  };

  const handleNodeMouseEnter = (node: NetworkNode) => {
    setHoveredNode(node.id);
    onNodeHover?.(node);
    onNetworkEvent?.({
      type: 'node-hover',
      nodeId: node.id,
      data: node,
      timestamp: new Date()
    });
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
    onNodeHover?.(null);
  };

  // Handle edge interaction
  const handleEdgeClick = (edge: NetworkEdge) => {
    setSelectedEdge(edge.id);
    onEdgeClick?.(edge);
    onNetworkEvent?.({
      type: 'edge-click',
      edgeId: edge.id,
      data: edge,
      timestamp: new Date()
    });
  };

  const handleEdgeMouseEnter = (edge: NetworkEdge) => {
    setHoveredEdge(edge.id);
    onEdgeHover?.(edge);
  };

  const handleEdgeMouseLeave = () => {
    setHoveredEdge(null);
    onEdgeHover?.(null);
  };

  // Pan and zoom handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!vizOptions.pan) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !vizOptions.pan) return;
    
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!vizOptions.zoom) return;
    
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(3, zoomLevel * delta));
    setZoomLevel(newZoom);
    
    onNetworkEvent?.({
      type: 'zoom-change',
      data: { zoom: newZoom },
      timestamp: new Date()
    });
  };

  // Get node color based on status
  const getNodeColor = (node: NetworkNode): string => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    
    if (isSelected) return networkTheme.colors.selection;
    if (isHovered) return networkTheme.colors.hover;
    
    switch (node.status) {
      case 'online': return networkTheme.colors.nodeOnline;
      case 'offline': return networkTheme.colors.nodeOffline;
      case 'warning': return networkTheme.colors.nodeWarning;
      case 'error': return networkTheme.colors.nodeError;
      default: return networkTheme.colors.nodeOffline;
    }
  };

  // Get edge color based on status
  const getEdgeColor = (edge: NetworkEdge): string => {
    const isSelected = selectedEdge === edge.id;
    const isHovered = hoveredEdge === edge.id;
    
    if (isSelected) return networkTheme.colors.selection;
    if (isHovered) return networkTheme.colors.hover;
    
    switch (edge.status) {
      case 'active': return networkTheme.colors.edgeActive;
      case 'inactive': return networkTheme.colors.edgeInactive;
      case 'congested': return networkTheme.colors.edgeCongested;
      case 'error': return networkTheme.colors.edgeError;
      default: return networkTheme.colors.edgeInactive;
    }
  };

  // Get node size
  const getNodeSize = (node: NetworkNode): number => {
    const baseSize = 20;
    switch (node.size) {
      case 'small': return baseSize * 0.7;
      case 'large': return baseSize * 1.5;
      default: return baseSize;
    }
  };

  // Get ASCII character for node
  const getNodeChar = (node: NetworkNode): string => {
    return networkTheme.ascii.nodeChars[node.type] || networkTheme.ascii.nodeChars.unknown;
  };

  // Get status character
  const getStatusChar = (status: string): string => {
    return (networkTheme.ascii.statusChars as any)[status] || networkTheme.ascii.statusChars.unknown;
  };

  // Render grid background
  const renderGrid = () => {
    if (!vizOptions.gridSize) return null;
    
    const gridLines = [];
    const gridSize = vizOptions.gridSize;
    
    // Vertical lines
    for (let x = 0; x <= vizOptions.width; x += gridSize) {
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={vizOptions.height}
          stroke={networkTheme.colors.grid}
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y <= vizOptions.height; y += gridSize) {
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={vizOptions.width}
          y2={y}
          stroke={networkTheme.colors.grid}
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }
    
    return gridLines;
  };

  // Render edges
  const renderEdges = () => {
    return topology.edges.map(edge => {
      const sourceNode = layoutNodes.find(n => n.id === edge.source);
      const targetNode = layoutNodes.find(n => n.id === edge.target);
      
      if (!sourceNode || !targetNode || sourceNode.x === undefined || sourceNode.y === undefined ||
          targetNode.x === undefined || targetNode.y === undefined) {
        return null;
      }
      
      const isSelected = selectedEdge === edge.id;
      const isHovered = hoveredEdge === edge.id;
      
      return (
        <g key={edge.id}>
          {/* Main edge line */}
          <line
            x1={sourceNode.x}
            y1={sourceNode.y}
            x2={targetNode.x}
            y2={targetNode.y}
            stroke={getEdgeColor(edge)}
            strokeWidth={isSelected || isHovered ? 3 : 2}
            strokeDasharray={edge.style === 'dashed' ? '5,5' : edge.style === 'dotted' ? '2,2' : 'none'}
            opacity={edge.status === 'inactive' ? 0.5 : 1}
            style={{ cursor: vizOptions.interactive ? 'pointer' : 'default' }}
            onClick={(e) => {
              e.stopPropagation();
              handleEdgeClick(edge);
            }}
            onMouseEnter={() => handleEdgeMouseEnter(edge)}
            onMouseLeave={handleEdgeMouseLeave}
          />
          
          {/* Arrow head for directed edges */}
          {!edge.bidirectional && (
            <polygon
              points={`${targetNode.x-5},${targetNode.y-3} ${targetNode.x-5},${targetNode.y+3} ${targetNode.x},${targetNode.y}`}
              fill={getEdgeColor(edge)}
              transform={`rotate(${Math.atan2(targetNode.y - sourceNode.y, targetNode.x - sourceNode.x) * 180 / Math.PI} ${targetNode.x} ${targetNode.y})`}
            />
          )}
          
          {/* Edge label */}
          {vizOptions.showLabels && edge.label && (
            <text
              x={(sourceNode.x + targetNode.x) / 2}
              y={(sourceNode.y + targetNode.y) / 2}
              fill={networkTheme.colors.text}
              fontSize="10"
              textAnchor="middle"
              dy="-2"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {edge.label}
            </text>
          )}
          
          {/* Metrics display */}
          {vizOptions.showMetrics && edge.metadata?.bandwidth && (
            <text
              x={(sourceNode.x + targetNode.x) / 2}
              y={(sourceNode.y + targetNode.y) / 2}
              fill={networkTheme.colors.text}
              fontSize="8"
              textAnchor="middle"
              dy="10"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {edge.metadata.bandwidth}
            </text>
          )}
        </g>
      );
    });
  };

  // Render nodes
  const renderNodes = () => {
    return layoutNodes.map(node => {
      if (node.x === undefined || node.y === undefined) return null;
      
      const isSelected = selectedNode === node.id;
      const isHovered = hoveredNode === node.id;
      const nodeSize = getNodeSize(node);
      
      return (
        <g key={node.id}>
          {/* Node background circle */}
          <circle
            cx={node.x}
            cy={node.y}
            r={nodeSize}
            fill={getNodeColor(node)}
            stroke={networkTheme.colors.border}
            strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
            style={{ cursor: vizOptions.interactive ? 'pointer' : 'default' }}
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(node);
            }}
            onMouseEnter={() => handleNodeMouseEnter(node)}
            onMouseLeave={handleNodeMouseLeave}
          />
          
          {/* ASCII character or icon */}
          <text
            x={node.x}
            y={node.y}
            fill={networkTheme.colors.background}
            fontSize={nodeSize * 0.8}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ 
              pointerEvents: 'none', 
              userSelect: 'none',
              fontFamily: 'monospace',
              fontWeight: 'bold'
            }}
          >
            {vizOptions.asciiStyle ? getNodeChar(node) : node.icon || '●'}
          </text>
          
          {/* Status indicator */}
          {vizOptions.showStatus && (
            <text
              x={node.x + nodeSize * 0.7}
              y={node.y - nodeSize * 0.7}
              fill={getNodeColor(node)}
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ pointerEvents: 'none', userSelect: 'none' }}
            >
              {getStatusChar(node.status)}
            </text>
          )}
          
          {/* Node label */}
          {vizOptions.showLabels && (
            <text
              x={node.x}
              y={node.y + nodeSize + 15}
              fill={networkTheme.colors.text}
              fontSize="11"
              textAnchor="middle"
              style={{ 
                pointerEvents: 'none', 
                userSelect: 'none',
                fontFamily: 'monospace'
              }}
            >
              {node.label}
            </text>
          )}
          
          {/* Metrics display */}
          {vizOptions.showMetrics && node.metadata?.ip && (
            <text
              x={node.x}
              y={node.y + nodeSize + 30}
              fill={networkTheme.colors.text}
              fontSize="9"
              textAnchor="middle"
              opacity={0.8}
              style={{ 
                pointerEvents: 'none', 
                userSelect: 'none',
                fontFamily: 'monospace'
              }}
            >
              {node.metadata.ip}
            </text>
          )}
        </g>
      );
    });
  };

  const containerStyle = {
    width: vizOptions.width,
    height: vizOptions.height,
    backgroundColor: networkTheme.colors.background,
    border: `1px solid ${networkTheme.colors.border}`,
    borderRadius: '4px',
    overflow: 'hidden',
    position: 'relative' as const,
    cursor: isDragging ? 'grabbing' : vizOptions.pan ? 'grab' : 'default',
    ...style
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
    transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
    transformOrigin: 'center center'
  };

  return (
    <div 
      ref={containerRef}
      className={`ascii-network-visualizer ${className}`}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <svg
        ref={svgRef}
        style={svgStyle}
        viewBox={`0 0 ${vizOptions.width} ${vizOptions.height}`}
      >
        {/* Background grid */}
        {renderGrid()}
        
        {/* Edges */}
        <g className="edges">
          {renderEdges()}
        </g>
        
        {/* Nodes */}
        <g className="nodes">
          {renderNodes()}
        </g>
      </svg>
      
      {/* Controls overlay */}
      {vizOptions.interactive && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
          {vizOptions.zoom && (
            <>
              <button
                onClick={() => setZoomLevel(prev => Math.min(3, prev * 1.2))}
                style={{
                  padding: '5px 10px',
                  fontSize: '12px',
                  backgroundColor: networkTheme.colors.background,
                  color: networkTheme.colors.text,
                  border: `1px solid ${networkTheme.colors.border}`,
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.1, prev / 1.2))}
                style={{
                  padding: '5px 10px',
                  fontSize: '12px',
                  backgroundColor: networkTheme.colors.background,
                  color: networkTheme.colors.text,
                  border: `1px solid ${networkTheme.colors.border}`,
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              <button
                onClick={() => {
                  setZoomLevel(1);
                  setPanOffset({ x: 0, y: 0 });
                }}
                style={{
                  padding: '5px 10px',
                  fontSize: '10px',
                  backgroundColor: networkTheme.colors.background,
                  color: networkTheme.colors.text,
                  border: `1px solid ${networkTheme.colors.border}`,
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Reset
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Selection info */}
      {selectedNode && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          padding: '8px 12px',
          backgroundColor: networkTheme.colors.background,
          border: `1px solid ${networkTheme.colors.border}`,
          borderRadius: '4px',
          fontSize: '12px',
          color: networkTheme.colors.text,
          fontFamily: 'monospace'
        }}>
          <strong>Selected:</strong> {layoutNodes.find(n => n.id === selectedNode)?.label}
        </div>
      )}
    </div>
  );
};

export default AsciiNetworkVisualizer;