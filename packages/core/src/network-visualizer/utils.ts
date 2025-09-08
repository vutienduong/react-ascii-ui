import { 
  NetworkNode, 
  NetworkEdge, 
  NetworkTopology, 
  NetworkPosition, 
  NetworkBounds,
  LayoutType 
} from './types';

/**
 * Layout algorithms for network visualization
 */
export class NetworkLayoutEngine {
  private nodes: NetworkNode[];
  private edges: NetworkEdge[];
  private width: number;
  private height: number;

  constructor(topology: NetworkTopology, width: number, height: number) {
    this.nodes = [...topology.nodes];
    this.edges = [...topology.edges];
    this.width = width;
    this.height = height;
  }

  /**
   * Apply force-directed layout
   */
  applyForceLayout(iterations = 100): NetworkNode[] {
    const nodes = this.nodes.map(node => ({
      ...node,
      x: node.x ?? Math.random() * this.width,
      y: node.y ?? Math.random() * this.height,
      vx: 0,
      vy: 0
    }));

    const k = Math.sqrt((this.width * this.height) / nodes.length);
    const dt = 0.1;

    for (let iter = 0; iter < iterations; iter++) {
      // Reset forces
      nodes.forEach(node => {
        (node as any).fx = 0;
        (node as any).fy = 0;
      });

      // Repulsive forces between all nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          const dx = nodeA.x! - nodeB.x!;
          const dy = nodeA.y! - nodeB.y!;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.1;
          
          const force = (k * k) / distance;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          (nodeA as any).fx += fx;
          (nodeA as any).fy += fy;
          (nodeB as any).fx -= fx;
          (nodeB as any).fy -= fy;
        }
      }

      // Attractive forces for connected nodes
      this.edges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.source);
        const target = nodes.find(n => n.id === edge.target);
        
        if (source && target) {
          const dx = target.x! - source.x!;
          const dy = target.y! - source.y!;
          const distance = Math.sqrt(dx * dx + dy * dy) || 0.1;
          
          const force = (distance * distance) / k;
          const fx = (dx / distance) * force;
          const fy = (dy / distance) * force;
          
          (source as any).fx += fx;
          (source as any).fy += fy;
          (target as any).fx -= fx;
          (target as any).fy -= fy;
        }
      });

      // Update positions
      nodes.forEach(node => {
        (node as any).vx = ((node as any).vx + dt * (node as any).fx) * 0.9;
        (node as any).vy = ((node as any).vy + dt * (node as any).fy) * 0.9;
        
        node.x = Math.max(20, Math.min(this.width - 20, node.x! + dt * (node as any).vx));
        node.y = Math.max(20, Math.min(this.height - 20, node.y! + dt * (node as any).vy));
      });
    }

    // Clean up temporary properties
    return nodes.map(node => {
      const { fx, fy, vx, vy, ...cleanNode } = node as any;
      return cleanNode;
    });
  }

  /**
   * Apply hierarchical layout
   */
  applyHierarchicalLayout(): NetworkNode[] {
    // Build hierarchy levels
    const visited = new Set<string>();
    const levels: string[][] = [];
    const nodeMap = new Map(this.nodes.map(node => [node.id, node]));
    
    // Find root nodes (nodes with no incoming edges)
    const hasIncoming = new Set(this.edges.map(edge => edge.target));
    const roots = this.nodes.filter(node => !hasIncoming.has(node.id));
    
    if (roots.length === 0) {
      // If no clear roots, pick nodes with most outgoing connections
      const outgoingCount = new Map<string, number>();
      this.edges.forEach(edge => {
        outgoingCount.set(edge.source, (outgoingCount.get(edge.source) || 0) + 1);
      });
      
      const maxConnections = Math.max(...Array.from(outgoingCount.values()));
      roots.push(...this.nodes.filter(node => 
        (outgoingCount.get(node.id) || 0) === maxConnections
      ).slice(0, 3)); // Limit to 3 roots
    }

    // BFS to assign levels
    const queue = roots.map(node => ({ node: node.id, level: 0 }));
    
    while (queue.length > 0) {
      const { node: nodeId, level } = queue.shift()!;
      
      if (visited.has(nodeId)) continue;
      visited.add(nodeId);
      
      if (!levels[level]) levels[level] = [];
      levels[level].push(nodeId);
      
      // Add children to next level
      const children = this.edges
        .filter(edge => edge.source === nodeId)
        .map(edge => edge.target)
        .filter(childId => !visited.has(childId));
      
      children.forEach(childId => {
        queue.push({ node: childId, level: level + 1 });
      });
    }

    // Position nodes
    const layoutNodes: NetworkNode[] = [];
    const levelHeight = this.height / Math.max(levels.length, 1);
    
    levels.forEach((levelNodes, levelIndex) => {
      const levelWidth = this.width / Math.max(levelNodes.length, 1);
      
      levelNodes.forEach((nodeId, nodeIndex) => {
        const node = nodeMap.get(nodeId);
        if (node) {
          layoutNodes.push({
            ...node,
            x: (nodeIndex + 0.5) * levelWidth,
            y: (levelIndex + 0.5) * levelHeight
          });
        }
      });
    });

    // Add any remaining nodes (disconnected)
    this.nodes.forEach(node => {
      if (!visited.has(node.id)) {
        layoutNodes.push({
          ...node,
          x: Math.random() * this.width,
          y: Math.random() * this.height
        });
      }
    });

    return layoutNodes;
  }

  /**
   * Apply circular layout
   */
  applyCircularLayout(): NetworkNode[] {
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const radius = Math.min(this.width, this.height) * 0.4;
    
    return this.nodes.map((node, index) => {
      const angle = (2 * Math.PI * index) / this.nodes.length;
      return {
        ...node,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
  }

  /**
   * Apply grid layout
   */
  applyGridLayout(): NetworkNode[] {
    const cols = Math.ceil(Math.sqrt(this.nodes.length));
    const rows = Math.ceil(this.nodes.length / cols);
    const cellWidth = this.width / cols;
    const cellHeight = this.height / rows;
    
    return this.nodes.map((node, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      
      return {
        ...node,
        x: (col + 0.5) * cellWidth,
        y: (row + 0.5) * cellHeight
      };
    });
  }

  /**
   * Apply tree layout
   */
  applyTreeLayout(): NetworkNode[] {
    // Find root node (most connections or manually specified)
    const connectionCount = new Map<string, number>();
    this.edges.forEach(edge => {
      connectionCount.set(edge.source, (connectionCount.get(edge.source) || 0) + 1);
      connectionCount.set(edge.target, (connectionCount.get(edge.target) || 0) + 1);
    });
    
    const rootId = Array.from(connectionCount.entries())
      .sort(([,a], [,b]) => b - a)[0]?.[0] || this.nodes[0]?.id;
    
    if (!rootId) return this.nodes;
    
    // Build tree structure
    const tree = this.buildTree(rootId);
    
    // Position nodes using tree layout
    return this.positionTree(tree, this.width / 2, 50, this.width, 0);
  }

  private buildTree(rootId: string): TreeNode {
    const visited = new Set<string>();
    const nodeMap = new Map(this.nodes.map(node => [node.id, node]));
    
    const buildNode = (nodeId: string): TreeNode => {
      visited.add(nodeId);
      const node = nodeMap.get(nodeId)!;
      
      const children = this.edges
        .filter(edge => edge.source === nodeId && !visited.has(edge.target))
        .map(edge => buildNode(edge.target));
      
      return { node, children };
    };
    
    return buildNode(rootId);
  }
  
  private positionTree(
    tree: TreeNode, 
    x: number, 
    y: number, 
    width: number, 
    level: number
  ): NetworkNode[] {
    const result: NetworkNode[] = [];
    const childWidth = tree.children.length > 0 ? width / tree.children.length : 0;
    const levelHeight = this.height / 10; // Adjust based on tree depth
    
    // Position current node
    result.push({
      ...tree.node,
      x,
      y: y + level * levelHeight
    });
    
    // Position children
    tree.children.forEach((child, index) => {
      const childX = x - width/2 + (index + 0.5) * childWidth;
      result.push(...this.positionTree(child, childX, y, childWidth, level + 1));
    });
    
    return result;
  }

  /**
   * Get layout by type
   */
  applyLayout(type: LayoutType): NetworkNode[] {
    switch (type) {
      case 'force':
        return this.applyForceLayout();
      case 'hierarchical':
        return this.applyHierarchicalLayout();
      case 'circular':
        return this.applyCircularLayout();
      case 'grid':
        return this.applyGridLayout();
      case 'tree':
        return this.applyTreeLayout();
      case 'manual':
      default:
        return this.nodes.map(node => ({
          ...node,
          x: node.x ?? Math.random() * this.width,
          y: node.y ?? Math.random() * this.height
        }));
    }
  }
}

interface TreeNode {
  node: NetworkNode;
  children: TreeNode[];
}

/**
 * Calculate distance between two points
 */
export const calculateDistance = (p1: NetworkPosition, p2: NetworkPosition): number => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate network bounds
 */
export const calculateNetworkBounds = (nodes: NetworkNode[]): NetworkBounds => {
  if (nodes.length === 0) {
    return { minX: 0, maxX: 100, minY: 0, maxY: 100 };
  }

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  nodes.forEach(node => {
    if (node.x !== undefined) {
      minX = Math.min(minX, node.x);
      maxX = Math.max(maxX, node.x);
    }
    if (node.y !== undefined) {
      minY = Math.min(minY, node.y);
      maxY = Math.max(maxY, node.y);
    }
  });

  return { minX, maxX, minY, maxY };
};

/**
 * Generate sample network data
 */
export const generateSampleNetwork = (): NetworkTopology => {
  const nodes: NetworkNode[] = [
    {
      id: 'server-1',
      label: 'Main Server',
      type: 'server',
      status: 'online',
      metadata: {
        ip: '192.168.1.100',
        os: 'Linux Ubuntu 20.04',
        uptime: 2592000 // 30 days in seconds
      }
    },
    {
      id: 'router-1',
      label: 'Core Router',
      type: 'router',
      status: 'online',
      metadata: {
        ip: '192.168.1.1',
        os: 'RouterOS 7.1'
      }
    },
    {
      id: 'switch-1',
      label: 'Switch 24-Port',
      type: 'switch',
      status: 'online',
      metadata: {
        ip: '192.168.1.10'
      }
    },
    {
      id: 'firewall-1',
      label: 'Firewall',
      type: 'firewall',
      status: 'warning',
      metadata: {
        ip: '192.168.1.5',
        description: 'High CPU usage detected'
      }
    },
    {
      id: 'db-1',
      label: 'Database Server',
      type: 'database',
      status: 'online',
      metadata: {
        ip: '192.168.1.101',
        os: 'CentOS 8'
      }
    },
    {
      id: 'workstation-1',
      label: 'Admin PC',
      type: 'workstation',
      status: 'online',
      metadata: {
        ip: '192.168.1.50',
        os: 'Windows 11',
        mac: '00:1B:44:11:3A:B7'
      }
    },
    {
      id: 'workstation-2',
      label: 'Dev PC',
      type: 'workstation',
      status: 'offline',
      metadata: {
        ip: '192.168.1.51',
        description: 'Powered off'
      }
    },
    {
      id: 'printer-1',
      label: 'Network Printer',
      type: 'printer',
      status: 'online',
      metadata: {
        ip: '192.168.1.200'
      }
    },
    {
      id: 'cloud-1',
      label: 'AWS Cloud',
      type: 'cloud',
      status: 'online',
      metadata: {
        description: 'External cloud services'
      }
    }
  ];

  const edges: NetworkEdge[] = [
    {
      id: 'edge-1',
      source: 'router-1',
      target: 'switch-1',
      type: 'ethernet',
      status: 'active',
      metadata: {
        bandwidth: '1 Gbps'
      }
    },
    {
      id: 'edge-2',
      source: 'switch-1',
      target: 'server-1',
      type: 'ethernet',
      status: 'active',
      metadata: {
        bandwidth: '1 Gbps'
      }
    },
    {
      id: 'edge-3',
      source: 'switch-1',
      target: 'db-1',
      type: 'ethernet',
      status: 'active'
    },
    {
      id: 'edge-4',
      source: 'router-1',
      target: 'firewall-1',
      type: 'ethernet',
      status: 'congested',
      metadata: {
        bandwidth: '100 Mbps',
        latency: 50
      }
    },
    {
      id: 'edge-5',
      source: 'switch-1',
      target: 'workstation-1',
      type: 'ethernet',
      status: 'active'
    },
    {
      id: 'edge-6',
      source: 'switch-1',
      target: 'workstation-2',
      type: 'ethernet',
      status: 'inactive'
    },
    {
      id: 'edge-7',
      source: 'switch-1',
      target: 'printer-1',
      type: 'ethernet',
      status: 'active'
    },
    {
      id: 'edge-8',
      source: 'router-1',
      target: 'cloud-1',
      type: 'wan',
      status: 'active',
      metadata: {
        bandwidth: '50 Mbps'
      }
    }
  ];

  return {
    nodes,
    edges,
    metadata: {
      name: 'Sample Office Network',
      description: 'Typical small office network topology',
      version: '1.0'
    }
  };
};

/**
 * Export network to different formats
 */
export const exportNetwork = (topology: NetworkTopology, format: 'json' | 'dot' | 'gml' | 'csv'): string => {
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
  let csv = 'Type,ID,Label,Source,Target,Status\n';
  
  topology.nodes.forEach(node => {
    csv += `Node,"${node.id}","${node.label}",,,"${node.status}"\n`;
  });
  
  topology.edges.forEach(edge => {
    csv += `Edge,"${edge.id}","${edge.label || ''}","${edge.source}","${edge.target}","${edge.status}"\n`;
  });
  
  return csv;
};

/**
 * Network analysis utilities
 */
export const analyzeNetwork = (topology: NetworkTopology) => {
  const nodeCount = topology.nodes.length;
  const edgeCount = topology.edges.length;
  const density = edgeCount / (nodeCount * (nodeCount - 1));
  
  // Calculate degree centrality
  const degrees = new Map<string, number>();
  topology.edges.forEach(edge => {
    degrees.set(edge.source, (degrees.get(edge.source) || 0) + 1);
    degrees.set(edge.target, (degrees.get(edge.target) || 0) + 1);
  });
  
  const avgDegree = Array.from(degrees.values()).reduce((sum, degree) => sum + degree, 0) / nodeCount;
  const maxDegree = Math.max(...Array.from(degrees.values()));
  
  // Find most connected nodes
  const hubs = Array.from(degrees.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([nodeId, degree]) => ({ nodeId, degree }));
  
  return {
    nodeCount,
    edgeCount,
    density,
    avgDegree,
    maxDegree,
    hubs
  };
};