export interface NetworkNode {
  id: string;
  label: string;
  type: NodeType;
  x?: number;
  y?: number;
  status: NodeStatus;
  properties?: Record<string, any>;
  icon?: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
  metadata?: {
    ip?: string;
    mac?: string;
    os?: string;
    version?: string;
    uptime?: number;
    description?: string;
  };
}

export interface NetworkEdge {
  id: string;
  source: string;
  target: string;
  type: EdgeType;
  status: EdgeStatus;
  label?: string;
  properties?: Record<string, any>;
  color?: string;
  style?: 'solid' | 'dashed' | 'dotted';
  weight?: number;
  bidirectional?: boolean;
  metadata?: {
    protocol?: string;
    port?: number;
    bandwidth?: string;
    latency?: number;
    packetLoss?: number;
  };
}

export type NodeType = 
  | 'server'
  | 'workstation' 
  | 'router'
  | 'switch'
  | 'firewall'
  | 'database'
  | 'cloud'
  | 'mobile'
  | 'printer'
  | 'camera'
  | 'sensor'
  | 'unknown';

export type EdgeType =
  | 'ethernet'
  | 'wifi'
  | 'fiber'
  | 'wan'
  | 'vpn'
  | 'bluetooth'
  | 'serial'
  | 'usb'
  | 'api'
  | 'unknown';

export type NodeStatus = 'online' | 'offline' | 'warning' | 'error' | 'unknown';
export type EdgeStatus = 'active' | 'inactive' | 'congested' | 'error' | 'unknown';

export interface NetworkTopology {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  metadata?: {
    name?: string;
    description?: string;
    created?: Date;
    updated?: Date;
    version?: string;
  };
}

export interface NetworkVisualizerOptions {
  width: number;
  height: number;
  showLabels?: boolean;
  showStatus?: boolean;
  showMetrics?: boolean;
  interactive?: boolean;
  layout?: LayoutType;
  animation?: boolean;
  clustering?: boolean;
  zoom?: boolean;
  pan?: boolean;
  selection?: boolean;
  theme?: NetworkTheme;
  asciiStyle?: boolean;
  gridSize?: number;
  nodeSpacing?: number;
  edgeLength?: number;
  soundEffects?: boolean;
}

export type LayoutType = 
  | 'force'
  | 'hierarchical'
  | 'circular'
  | 'grid'
  | 'manual'
  | 'tree';

export interface NetworkTheme {
  name: string;
  colors: {
    background: string;
    grid: string;
    text: string;
    border: string;
    nodeOnline: string;
    nodeOffline: string;
    nodeWarning: string;
    nodeError: string;
    edgeActive: string;
    edgeInactive: string;
    edgeCongested: string;
    edgeError: string;
    selection: string;
    hover: string;
  };
  ascii: {
    nodeChars: {
      server: string;
      workstation: string;
      router: string;
      switch: string;
      firewall: string;
      database: string;
      cloud: string;
      mobile: string;
      printer: string;
      camera: string;
      sensor: string;
      unknown: string;
    };
    edgeChars: {
      horizontal: string;
      vertical: string;
      corner: string;
      junction: string;
      arrow: string;
    };
    statusChars: {
      online: string;
      offline: string;
      warning: string;
      error: string;
      unknown: string;
    };
  };
}

export interface NetworkEvent {
  type: NetworkEventType;
  nodeId?: string;
  edgeId?: string;
  data?: any;
  timestamp: Date;
}

export type NetworkEventType = 
  | 'node-click'
  | 'node-hover'
  | 'node-select'
  | 'edge-click'
  | 'edge-hover'
  | 'edge-select'
  | 'background-click'
  | 'zoom-change'
  | 'pan-change'
  | 'layout-change';

export interface NetworkPosition {
  x: number;
  y: number;
}

export interface NetworkBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

// ASCII Network Themes
export const ASCII_NETWORK_THEMES: Record<string, NetworkTheme> = {
  green: {
    name: 'ASCII Green',
    colors: {
      background: '#000000',
      grid: '#003300',
      text: '#00ff00',
      border: '#00aa00',
      nodeOnline: '#00ff00',
      nodeOffline: '#666666',
      nodeWarning: '#ffff00',
      nodeError: '#ff0000',
      edgeActive: '#00aa00',
      edgeInactive: '#333333',
      edgeCongested: '#ffaa00',
      edgeError: '#ff0000',
      selection: '#00ffff',
      hover: '#ffffff'
    },
    ascii: {
      nodeChars: {
        server: '█',
        workstation: '□',
        router: '◊',
        switch: '╬',
        firewall: '▲',
        database: '◆',
        cloud: '☁',
        mobile: '📱',
        printer: '🖨',
        camera: '📷',
        sensor: '●',
        unknown: '?'
      },
      edgeChars: {
        horizontal: '─',
        vertical: '│',
        corner: '└',
        junction: '┼',
        arrow: '→'
      },
      statusChars: {
        online: '●',
        offline: '○',
        warning: '△',
        error: '✗',
        unknown: '?'
      }
    }
  },
  amber: {
    name: 'ASCII Amber',
    colors: {
      background: '#000000',
      grid: '#332200',
      text: '#ffb000',
      border: '#cc8800',
      nodeOnline: '#ffaa00',
      nodeOffline: '#666666',
      nodeWarning: '#ffff00',
      nodeError: '#ff0000',
      edgeActive: '#cc8800',
      edgeInactive: '#333333',
      edgeCongested: '#ffaa00',
      edgeError: '#ff0000',
      selection: '#ffffff',
      hover: '#ffff00'
    },
    ascii: {
      nodeChars: {
        server: '■',
        workstation: '▢',
        router: '◈',
        switch: '╋',
        firewall: '▼',
        database: '◊',
        cloud: '☁',
        mobile: '📱',
        printer: '🖨',
        camera: '📷',
        sensor: '●',
        unknown: '?'
      },
      edgeChars: {
        horizontal: '═',
        vertical: '║',
        corner: '╚',
        junction: '╬',
        arrow: '⇒'
      },
      statusChars: {
        online: '●',
        offline: '○',
        warning: '⚠',
        error: '✖',
        unknown: '?'
      }
    }
  },
  cyan: {
    name: 'ASCII Cyan',
    colors: {
      background: '#000000',
      grid: '#003333',
      text: '#00ffff',
      border: '#00aaaa',
      nodeOnline: '#00ffff',
      nodeOffline: '#666666',
      nodeWarning: '#ffff00',
      nodeError: '#ff0000',
      edgeActive: '#00aaaa',
      edgeInactive: '#333333',
      edgeCongested: '#ffaa00',
      edgeError: '#ff0000',
      selection: '#ffffff',
      hover: '#ffff00'
    },
    ascii: {
      nodeChars: {
        server: '▣',
        workstation: '▢',
        router: '◇',
        switch: '✚',
        firewall: '▲',
        database: '◆',
        cloud: '☁',
        mobile: '📱',
        printer: '🖨',
        camera: '📷',
        sensor: '●',
        unknown: '?'
      },
      edgeChars: {
        horizontal: '━',
        vertical: '┃',
        corner: '┗',
        junction: '╋',
        arrow: '➤'
      },
      statusChars: {
        online: '●',
        offline: '○',
        warning: '△',
        error: '✗',
        unknown: '?'
      }
    }
  }
};

export const DEFAULT_NETWORK_OPTIONS: NetworkVisualizerOptions = {
  width: 800,
  height: 600,
  showLabels: true,
  showStatus: true,
  showMetrics: false,
  interactive: true,
  layout: 'force',
  animation: true,
  clustering: false,
  zoom: true,
  pan: true,
  selection: true,
  theme: ASCII_NETWORK_THEMES.green,
  asciiStyle: true,
  gridSize: 20,
  nodeSpacing: 50,
  edgeLength: 100
};