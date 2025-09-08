import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  NetworkTopology, 
  NetworkNode, 
  NetworkEdge, 
  NetworkEvent,
  NetworkVisualizerOptions 
} from './types';
import { NetworkLayoutEngine, analyzeNetwork } from './utils';

export interface UseNetworkVisualizerState {
  topology: NetworkTopology;
  selectedNodes: string[];
  selectedEdges: string[];
  hoveredNode: string | null;
  hoveredEdge: string | null;
  isLoading: boolean;
  error: string | null;
  layoutApplied: boolean;
}

export interface UseNetworkVisualizerActions {
  updateTopology: (topology: NetworkTopology) => void;
  addNode: (node: NetworkNode) => void;
  updateNode: (nodeId: string, updates: Partial<NetworkNode>) => void;
  removeNode: (nodeId: string) => void;
  addEdge: (edge: NetworkEdge) => void;
  updateEdge: (edgeId: string, updates: Partial<NetworkEdge>) => void;
  removeEdge: (edgeId: string) => void;
  selectNode: (nodeId: string, multiSelect?: boolean) => void;
  selectEdge: (edgeId: string, multiSelect?: boolean) => void;
  clearSelection: () => void;
  applyLayout: (layoutType: string, options?: any) => void;
  importTopology: (data: string, format: 'json' | 'csv') => Promise<void>;
  exportTopology: (format: 'json' | 'dot' | 'gml' | 'csv') => string;
}

/**
 * Main hook for network visualization functionality
 */
export const useNetworkVisualizer = (
  initialTopology?: NetworkTopology,
  options?: NetworkVisualizerOptions
): UseNetworkVisualizerState & UseNetworkVisualizerActions => {
  const [topology, setTopology] = useState<NetworkTopology>(
    initialTopology || { nodes: [], edges: [] }
  );
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<string[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [layoutApplied, setLayoutApplied] = useState(false);

  const updateTopology = useCallback((newTopology: NetworkTopology) => {
    setTopology(newTopology);
    setLayoutApplied(false);
    setError(null);
  }, []);

  const addNode = useCallback((node: NetworkNode) => {
    setTopology(prev => ({
      ...prev,
      nodes: [...prev.nodes, node]
    }));
    setLayoutApplied(false);
  }, []);

  const updateNode = useCallback((nodeId: string, updates: Partial<NetworkNode>) => {
    setTopology(prev => ({
      ...prev,
      nodes: prev.nodes.map(node => 
        node.id === nodeId ? { ...node, ...updates } : node
      )
    }));
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setTopology(prev => ({
      ...prev,
      nodes: prev.nodes.filter(node => node.id !== nodeId),
      edges: prev.edges.filter(edge => 
        edge.source !== nodeId && edge.target !== nodeId
      )
    }));
    setSelectedNodes(prev => prev.filter(id => id !== nodeId));
    setLayoutApplied(false);
  }, []);

  const addEdge = useCallback((edge: NetworkEdge) => {
    setTopology(prev => ({
      ...prev,
      edges: [...prev.edges, edge]
    }));
  }, []);

  const updateEdge = useCallback((edgeId: string, updates: Partial<NetworkEdge>) => {
    setTopology(prev => ({
      ...prev,
      edges: prev.edges.map(edge => 
        edge.id === edgeId ? { ...edge, ...updates } : edge
      )
    }));
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setTopology(prev => ({
      ...prev,
      edges: prev.edges.filter(edge => edge.id !== edgeId)
    }));
    setSelectedEdges(prev => prev.filter(id => id !== edgeId));
  }, []);

  const selectNode = useCallback((nodeId: string, multiSelect = false) => {
    setSelectedNodes(prev => {
      if (multiSelect) {
        return prev.includes(nodeId) 
          ? prev.filter(id => id !== nodeId)
          : [...prev, nodeId];
      } else {
        return [nodeId];
      }
    });
  }, []);

  const selectEdge = useCallback((edgeId: string, multiSelect = false) => {
    setSelectedEdges(prev => {
      if (multiSelect) {
        return prev.includes(edgeId) 
          ? prev.filter(id => id !== edgeId)
          : [...prev, edgeId];
      } else {
        return [edgeId];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNodes([]);
    setSelectedEdges([]);
  }, []);

  const applyLayout = useCallback((layoutType: string, layoutOptions?: any) => {
    if (options && topology.nodes.length > 0) {
      setIsLoading(true);
      
      try {
        const layoutEngine = new NetworkLayoutEngine(
          topology, 
          options.width, 
          options.height
        );
        
        const layoutNodes = layoutEngine.applyLayout(layoutType as any);
        
        setTopology(prev => ({
          ...prev,
          nodes: layoutNodes
        }));
        
        setLayoutApplied(true);
        setError(null);
      } catch (err) {
        setError(`Layout failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    }
  }, [topology, options]);

  const importTopology = useCallback(async (data: string, format: 'json' | 'csv') => {
    setIsLoading(true);
    setError(null);
    
    try {
      let importedTopology: NetworkTopology;
      
      if (format === 'json') {
        importedTopology = JSON.parse(data);
      } else if (format === 'csv') {
        importedTopology = parseCSVTopology(data);
      } else {
        throw new Error(`Unsupported format: ${format}`);
      }
      
      // Validate topology structure
      if (!importedTopology.nodes || !Array.isArray(importedTopology.nodes)) {
        throw new Error('Invalid topology: nodes array required');
      }
      if (!importedTopology.edges || !Array.isArray(importedTopology.edges)) {
        throw new Error('Invalid topology: edges array required');
      }
      
      setTopology(importedTopology);
      setLayoutApplied(false);
    } catch (err) {
      setError(`Import failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const exportTopology = useCallback((format: 'json' | 'dot' | 'gml' | 'csv') => {
    switch (format) {
      case 'json':
        return JSON.stringify(topology, null, 2);
      case 'dot':
        return exportToDot(topology);
      case 'gml':
        return exportToGML(topology);
      case 'csv':
        return exportToCSV(topology);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }, [topology]);

  return {
    // State
    topology,
    selectedNodes,
    selectedEdges,
    hoveredNode,
    hoveredEdge,
    isLoading,
    error,
    layoutApplied,

    // Actions
    updateTopology,
    addNode,
    updateNode,
    removeNode,
    addEdge,
    updateEdge,
    removeEdge,
    selectNode,
    selectEdge,
    clearSelection,
    applyLayout,
    importTopology,
    exportTopology
  };
};

/**
 * Hook for network analysis and metrics
 */
export const useNetworkAnalysis = (topology: NetworkTopology) => {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    
    try {
      const result = analyzeNetwork(topology);
      setAnalysis(result);
    } catch (error) {
      console.error('Network analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [topology]);

  useEffect(() => {
    if (topology.nodes.length > 0) {
      runAnalysis();
    }
  }, [topology, runAnalysis]);

  return {
    analysis,
    isAnalyzing,
    runAnalysis
  };
};

/**
 * Hook for real-time network monitoring
 */
export const useNetworkMonitoring = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [events, setEvents] = useState<NetworkEvent[]>([]);
  const [metrics, setMetrics] = useState<Record<string, any>>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startMonitoring = useCallback((
    topology: NetworkTopology,
    updateInterval = 5000,
    onUpdate?: (topology: NetworkTopology) => void
  ) => {
    setIsMonitoring(true);
    
    intervalRef.current = setInterval(() => {
      // Simulate network status updates
      const updatedTopology = simulateNetworkUpdates(topology);
      onUpdate?.(updatedTopology);
      
      // Add monitoring event
      const event: NetworkEvent = {
        type: 'network-update' as any,
        timestamp: new Date(),
        data: { updated: true }
      };
      
      setEvents(prev => [...prev.slice(-49), event]); // Keep last 50 events
    }, updateInterval);
  }, []);

  const stopMonitoring = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsMonitoring(false);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return {
    isMonitoring,
    events,
    metrics,
    startMonitoring,
    stopMonitoring,
    clearEvents
  };
};

/**
 * Hook for network path finding
 */
export const useNetworkPaths = (topology: NetworkTopology) => {
  const findPath = useCallback((sourceId: string, targetId: string) => {
    const visited = new Set<string>();
    const queue = [{ nodeId: sourceId, path: [sourceId] }];
    
    while (queue.length > 0) {
      const { nodeId, path } = queue.shift()!;
      
      if (nodeId === targetId) {
        return path;
      }
      
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);
      
      // Find connected nodes
      const connectedNodes = topology.edges
        .filter(edge => edge.source === nodeId || edge.target === nodeId)
        .map(edge => edge.source === nodeId ? edge.target : edge.source)
        .filter(id => !visited.has(id));
      
      connectedNodes.forEach(connectedId => {
        queue.push({ nodeId: connectedId, path: [...path, connectedId] });
      });
    }
    
    return null; // No path found
  }, [topology]);

  const findAllPaths = useCallback((sourceId: string, targetId: string) => {
    const allPaths: string[][] = [];
    
    const dfs = (currentId: string, path: string[], visited: Set<string>) => {
      if (currentId === targetId) {
        allPaths.push([...path]);
        return;
      }
      
      const connectedNodes = topology.edges
        .filter(edge => 
          (edge.source === currentId || edge.target === currentId) &&
          edge.status === 'active'
        )
        .map(edge => edge.source === currentId ? edge.target : edge.source)
        .filter(id => !visited.has(id));
      
      connectedNodes.forEach(connectedId => {
        visited.add(connectedId);
        dfs(connectedId, [...path, connectedId], visited);
        visited.delete(connectedId);
      });
    };
    
    const visited = new Set([sourceId]);
    dfs(sourceId, [sourceId], visited);
    
    return allPaths;
  }, [topology]);

  return { findPath, findAllPaths };
};

// Helper functions
const parseCSVTopology = (csvData: string): NetworkTopology => {
  const lines = csvData.trim().split('\n');
  const header = lines[0].toLowerCase().split(',');
  
  const nodes: NetworkNode[] = [];
  const edges: NetworkEdge[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: Record<string, string> = {};
    
    header.forEach((col, index) => {
      row[col.trim()] = values[index]?.trim().replace(/"/g, '') || '';
    });
    
    if (row.type === 'Node') {
      nodes.push({
        id: row.id,
        label: row.label || row.id,
        type: (row.nodetype || 'unknown') as any,
        status: (row.status || 'unknown') as any
      });
    } else if (row.type === 'Edge') {
      edges.push({
        id: row.id,
        source: row.source,
        target: row.target,
        type: (row.edgetype || 'unknown') as any,
        status: (row.status || 'unknown') as any,
        label: row.label
      });
    }
  }
  
  return { nodes, edges };
};

const exportToDot = (topology: NetworkTopology): string => {
  let dot = 'digraph Network {\n';
  dot += '  node [shape=box];\n';
  
  topology.nodes.forEach(node => {
    dot += `  "${node.id}" [label="${node.label}"];\n`;
  });
  
  topology.edges.forEach(edge => {
    dot += `  "${edge.source}" -> "${edge.target}"`;
    if (edge.label) {
      dot += ` [label="${edge.label}"]`;
    }
    dot += ';\n';
  });
  
  dot += '}';
  return dot;
};

const exportToGML = (topology: NetworkTopology): string => {
  let gml = 'graph [\n';
  gml += '  directed 1\n';
  
  topology.nodes.forEach(node => {
    gml += `  node [\n`;
    gml += `    id "${node.id}"\n`;
    gml += `    label "${node.label}"\n`;
    gml += `  ]\n`;
  });
  
  topology.edges.forEach(edge => {
    gml += `  edge [\n`;
    gml += `    source "${edge.source}"\n`;
    gml += `    target "${edge.target}"\n`;
    if (edge.label) {
      gml += `    label "${edge.label}"\n`;
    }
    gml += `  ]\n`;
  });
  
  gml += ']';
  return gml;
};

const exportToCSV = (topology: NetworkTopology): string => {
  let csv = 'Type,ID,Label,Source,Target,Status,NodeType,EdgeType\n';
  
  topology.nodes.forEach(node => {
    csv += `Node,"${node.id}","${node.label}",,,"${node.status}","${node.type}",\n`;
  });
  
  topology.edges.forEach(edge => {
    csv += `Edge,"${edge.id}","${edge.label || ''}","${edge.source}","${edge.target}","${edge.status}",,"${edge.type}"\n`;
  });
  
  return csv;
};

const simulateNetworkUpdates = (topology: NetworkTopology): NetworkTopology => {
  // Randomly update node/edge statuses for demo purposes
  const updatedNodes = topology.nodes.map(node => {
    if (Math.random() < 0.1) { // 10% chance to change status
      const statuses = ['online', 'offline', 'warning', 'error'];
      const currentIndex = statuses.indexOf(node.status);
      const newStatus = statuses[(currentIndex + 1) % statuses.length];
      return { ...node, status: newStatus as any };
    }
    return node;
  });
  
  const updatedEdges = topology.edges.map(edge => {
    if (Math.random() < 0.05) { // 5% chance to change status
      const statuses = ['active', 'inactive', 'congested', 'error'];
      const currentIndex = statuses.indexOf(edge.status);
      const newStatus = statuses[(currentIndex + 1) % statuses.length];
      return { ...edge, status: newStatus as any };
    }
    return edge;
  });
  
  return { ...topology, nodes: updatedNodes, edges: updatedEdges };
};