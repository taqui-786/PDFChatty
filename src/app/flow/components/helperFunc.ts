import { Node, Edge } from 'reactflow';

// Define the structure of your data items
interface DataItem {
  label: string;
  content: string;
}

// Define the node data structure for your custom nodes
interface CustomNodeData {
  label: string;
  content: string;
  width?: number;
  height?: number;
}

// Helper function to calculate dynamic node dimensions
const calculateNodeDimensions = (label: string, content: string) => {
  // Standardized dimensions with limited variation
  const baseWidth = 320;
  const baseHeight = 200;
  const widthVariance = 80; // Allow ±80px width variation
  const heightVariance = 120; // Allow ±120px height variation
  
  // Character-based calculations
  const avgCharWidth = 7.5;
  const lineHeight = 20;
  const padding = 50;
  const headerSpacing = 10;
  
  // Calculate content requirements
  const totalText = label + ' ' + content;
  const textLength = totalText.length;
  const estimatedLines = Math.ceil(textLength / 45); // Roughly 45 chars per line
  
  // Determine size category based on content length
  let widthMultiplier = 1;
  let heightMultiplier = 1;
  
  if (textLength < 150) {
    // Short content - use base size or slightly smaller
    widthMultiplier = 0.9;
    heightMultiplier = 0.8;
  } else if (textLength < 300) {
    // Medium content - use base size
    widthMultiplier = 1;
    heightMultiplier = 1;
  } else if (textLength < 500) {
    // Long content - slightly larger
    widthMultiplier = 1.15;
    heightMultiplier = 1.3;
  } else {
    // Very long content - maximum size
    widthMultiplier = 1.25;
    heightMultiplier = 1.6;
  }
  
  // Calculate final dimensions
  const width = Math.round(baseWidth * widthMultiplier);
  const height = Math.round(baseHeight * heightMultiplier);
  
  // Ensure reasonable bounds
  const finalWidth = Math.max(Math.min(width, baseWidth + widthVariance), baseWidth - widthVariance);
  const finalHeight = Math.max(Math.min(height, baseHeight + heightVariance), baseHeight - heightVariance);
  
  return { width: finalWidth, height: finalHeight };
};


// Helper function to generate nodes and edges from data array
export const generateNodesAndEdges = (
  dataArray: DataItem[],
  parentNodeId: string = "1",
  nodeType: string = "pdfNode",
  startingId: number = 2
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Configuration for positioning
  const centerX = 400; // X position of parent node (adjust based on your parent node position)
  const centerY = 300; // Y position of parent node (adjust based on your parent node position)
  const radius = 300; // Distance from parent node
  const nodeWidth = 250;
  const nodeHeight = 150;

  // Calculate positions in a circular layout
  const angleStep = (2 * Math.PI) / dataArray.length;

  dataArray.forEach((item, index) => {
    const nodeId = (startingId + index).toString();
    
    // Calculate position in circle around parent
    const angle = index * angleStep;
    const x = centerX + radius * Math.cos(angle) - nodeWidth / 2;
    const y = centerY + radius * Math.sin(angle) - nodeHeight / 2;

    // Create node
    const node: Node = {
      id: nodeId,
      type: nodeType,
      position: { x, y },
      data: {
        label: item.label,
        content: item.content,
        width: nodeWidth,
        height: nodeHeight,
      } as CustomNodeData,
    };

    // Create edge connecting to parent
    const edge: Edge = {
      id: `e${parentNodeId}-${nodeId}`,
      source: parentNodeId,
      target: nodeId,
      type: 'smoothstep',
      animated: false,
      style: {
        strokeWidth: 2,
        stroke: '#888',
      },
    };

    nodes.push(node);
    edges.push(edge);
  });

  return { nodes, edges };
};

// Alternative function for grid layout (if you prefer grid over circular)

export const generateNodesAndEdgesGrid = (
  dataArray: DataItem[],
  parentNodeId: string = "1",
  nodeType: string = "customNode",
  startingId: number = 2
): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  // Configuration for grid positioning
  const startX = 600; // Starting X position (to the right of parent)
  const startY = 50;  // Starting Y position
  const standardSpacingX = 60; // Standard horizontal spacing
  const standardSpacingY = 60; // Standard vertical spacing
  const nodesPerRow = 3; // Number of nodes per row

  // First pass: calculate all node dimensions
  const nodeDimensions = dataArray.map(item => 
    calculateNodeDimensions(item.label, item.content)
  );

  // Use more standardized row/column sizing
  const avgWidth = nodeDimensions.reduce((sum, dim) => sum + dim.width, 0) / nodeDimensions.length;
  const avgHeight = nodeDimensions.reduce((sum, dim) => sum + dim.height, 0) / nodeDimensions.length;
  
  // Calculate uniform spacing based on average dimensions
  const uniformColWidth = Math.ceil(avgWidth);
  const uniformRowHeight = Math.ceil(avgHeight);

  dataArray.forEach((item, index) => {
    const nodeId = (startingId + index).toString();
    const dimensions = nodeDimensions[index];
    
    // Calculate grid position with more uniform spacing
    const row = Math.floor(index / nodesPerRow);
    const col = index % nodesPerRow;
    
    // Use uniform grid positioning
    const x = startX + col * (uniformColWidth + standardSpacingX);
    const y = startY + row * (uniformRowHeight + standardSpacingY);

    // Create node with dynamic dimensions
    const node: Node = {
      id: nodeId,
      type: nodeType,
      position: { x, y },
      data: {
        label: item.label,
        content: item.content,
        width: dimensions.width,
        height: dimensions.height,
      } as CustomNodeData,
    };

    // Create edge connecting to parent
    const edge: Edge = {
      id: `e${parentNodeId}-${nodeId}`,
      source: parentNodeId,
      target: nodeId,
      type: 'smoothstep',
      animated: false,
      style: {
        strokeWidth: 2,
        stroke: '#888',
      },
    };

    nodes.push(node);
    edges.push(edge);
  });

  return { nodes, edges };
};

// Usage example function that you can call in your component
export const updateFlowWithData = (
  dataArray: DataItem[],
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void,
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void,
  initialNodes: Node[],
  layout: 'circular' | 'grid' | 'tree' = 'circular'
) => {
  let generateFunction;
  
  switch (layout) {
    case 'grid':
      generateFunction = generateNodesAndEdgesGrid;
      break;
    case 'tree':
      generateFunction = generateNodesAndEdgesGrid;
      break;
    case 'circular':
    default:
      generateFunction = generateNodesAndEdges;
      break;
  }
  
  const { nodes: newNodes, edges: newEdges } = generateFunction(dataArray);
  
  // Combine with existing nodes (keeping the parent node)
  const allNodes = [...initialNodes, ...newNodes];
  const allEdges = [...newEdges];
  
  setNodes(allNodes);
  setEdges(allEdges);
};

