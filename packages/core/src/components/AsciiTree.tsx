import React, { useState, useCallback } from "react";

export interface AsciiTreeNode {
  id: string;
  label: string;
  children?: AsciiTreeNode[];
  icon?: string;
  metadata?: Record<string, any>;
}

interface AsciiTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AsciiTreeNode[];
  expandable?: boolean;
  showIcons?: boolean;
  selectable?: boolean;
  defaultExpanded?: string[];
  selectedNode?: string;
  onNodeSelect?: (node: AsciiTreeNode) => void;
  onNodeExpand?: (node: AsciiTreeNode, expanded: boolean) => void;
  renderNode?: (node: AsciiTreeNode, isSelected: boolean, isExpanded: boolean) => React.ReactNode;
}

export const AsciiTree: React.FC<AsciiTreeProps> = ({
  data,
  expandable = true,
  showIcons = true,
  selectable = false,
  defaultExpanded = [],
  selectedNode,
  onNodeSelect,
  onNodeExpand,
  renderNode,
  className = "",
  ...props
}) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(
    new Set(defaultExpanded)
  );
  const [internalSelectedNode, setInternalSelectedNode] = useState<string>();

  const actualSelectedNode = selectedNode ?? internalSelectedNode;

  const toggleNode = useCallback((node: AsciiTreeNode) => {
    if (!expandable || !node.children?.length) return;

    const newExpanded = new Set(expandedNodes);
    const isCurrentlyExpanded = expandedNodes.has(node.id);
    
    if (isCurrentlyExpanded) {
      newExpanded.delete(node.id);
    } else {
      newExpanded.add(node.id);
    }
    
    setExpandedNodes(newExpanded);
    onNodeExpand?.(node, !isCurrentlyExpanded);
  }, [expandable, expandedNodes, onNodeExpand]);

  const selectNode = useCallback((node: AsciiTreeNode) => {
    if (!selectable) return;
    
    setInternalSelectedNode(node.id);
    onNodeSelect?.(node);
  }, [selectable, onNodeSelect]);

  const renderTreeNode = useCallback((node: AsciiTreeNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const isSelected = actualSelectedNode === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const indent = '  '.repeat(depth);

    // Custom render function takes precedence
    if (renderNode) {
      return (
        <div key={node.id}>
          <div style={{ marginLeft: `${depth * 16}px` }}>
            {renderNode(node, isSelected, isExpanded)}
          </div>
          {hasChildren && isExpanded && (
            <div>
              {node.children!.map(child => renderTreeNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={node.id}>
        <div
          className={`
            font-mono flex items-center py-1 cursor-pointer
            ${isSelected ? 'text-green-400 bg-gray-800' : 'text-white hover:text-green-400'}
            ${hasChildren && expandable ? 'select-none' : ''}
          `}
          onClick={() => {
            if (hasChildren && expandable) {
              toggleNode(node);
            }
            selectNode(node);
          }}
          style={{ paddingLeft: `${depth * 16}px` }}
        >
          {/* Expansion indicator */}
          {hasChildren && expandable ? (
            <span className="text-green-400 mr-1 w-4">
              [{isExpanded ? '-' : '+'}]
            </span>
          ) : (
            <span className="text-gray-400 mr-1 w-4">
              └──
            </span>
          )}
          
          {/* Icon */}
          {showIcons && node.icon && (
            <span className="mr-2">{node.icon}</span>
          )}
          
          {/* Label */}
          <span className={hasChildren ? 'text-cyan-400' : ''}>
            {node.label}
          </span>
        </div>
        
        {/* Children */}
        {hasChildren && isExpanded && (
          <div>
            {node.children!.map(child => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }, [expandedNodes, actualSelectedNode, expandable, selectable, showIcons, toggleNode, selectNode, renderNode]);

  return (
    <div
      {...props}
      className={`
        font-mono bg-black border border-gray-600 rounded p-4
        max-h-96 overflow-y-auto
        ${className}
      `}
    >
      {data.map(node => renderTreeNode(node))}
    </div>
  );
};