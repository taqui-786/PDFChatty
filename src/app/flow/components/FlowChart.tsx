"use client";

import React, { DragEvent, useCallback, useRef, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  ReactFlowInstance,
  MarkerType,
  ConnectionMode,
  Background,
} from "reactflow";

// Import React Flow styles
import "reactflow/dist/style.css";
import PDFNode from "./PdfNode";
import Sidebar from "./Sidebar";
import { MyChatNode, MyCustomNode } from "./Nodes";
import { Chat } from "@/lib/types";

// Define node types
const nodeTypes: NodeTypes = {
  pdfNode: PDFNode,
  MyChatNode: MyChatNode,

  MyCustomNode: MyCustomNode,
};

interface targetNodeProps {
  nodeHeight: number;
  nodeWidth: number;
  positionX: number;
  positionY: number;
}

export default function FlowChart({chat}:{chat:Chat}) {
  const initialEdges: Edge[] = [];
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "pdfNode",
      position: { x: 50, y: 50 },
      deletable: false,
      data: {
        label: chat.pdfname,
        pdfUrl: chat.pdfurl,
        width: 400,
        height: 500,
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      // Enhanced connection with styling
      const enhancedConnection = {
        ...params,
        animated: true,
        style: { stroke: "#ff6b6b", strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "#ff6b6b",
        },
      };
      setEdges((eds) => addEdge(enhancedConnection, eds));
    },
    [setEdges]
  );

  function getNodeEdge(nodePosition: string) {
    if (nodePosition === "up") {
      return { sourceHandle: "top", targetHandle: "bottom" };
    } else if (nodePosition === "down") {
      return { sourceHandle: "bottom", targetHandle: "top" };
    } else if (nodePosition === "left") {
      return { sourceHandle: "left", targetHandle: "right" };
    } else if (nodePosition === "right") {
      return { sourceHandle: "right", targetHandle: "left" };
    }
  }

  function setNodePositionStop(
    targetNode: targetNodeProps
  ): "up" | "down" | "left" | "right" {
    const parentNode = nodes[0];
    const x = targetNode.positionX;
    const y = targetNode.positionY;

    const centerX = parentNode.position.x + parentNode.data.width / 2;
    const centerY = parentNode.position.y + parentNode.data.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    // Decide dominant axis
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      return deltaX > 0 ? "right" : "left";
    } else {
      return deltaY > 0 ? "down" : "up";
    }
  }

  // Enhanced drag over with visual feedback
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    // Add drop zone highlighting
    const wrapper = reactFlowWrapper.current;
    if (wrapper) {
      wrapper.style.backgroundColor = "rgba(59, 130, 246, 0.1)";
    }
  }, []);

  // Enhanced drop with animations and better UX
  const onDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      // Remove drop zone highlighting
      const wrapper = reactFlowWrapper.current;
      if (wrapper) {
        wrapper.style.backgroundColor = "";
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const transferedData = event.dataTransfer.getData("application/reactflow");
      const { type,color } = JSON.parse(transferedData) as {
        type: string;
        color?: string;
      };
      
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!reactFlowInstance || !reactFlowBounds) {
        return;
      }

      const getPosition = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Snap to grid if enabled
      const finalPosition = getPosition;

      const targetNode = setNodePositionStop({
        nodeHeight: 300,
        nodeWidth: 400,
        positionX: finalPosition.x,
        positionY: finalPosition.y,
      });

      const targetNodeEdge = getNodeEdge(targetNode);
      
      const newNode: Node = {
        id: `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: type !== 'MyChatNode' ? "MyCustomNode" : 'MyChatNode',
        position: finalPosition,
        data: {
          type: type.charAt(0).toUpperCase() + type.slice(1),
          pdfId: chat.id,
          createdAt: new Date().toLocaleTimeString(),
        },
      };
 
      const newEdge: Edge = {
        id: `e${initialNodes[0].id}-${newNode.id}`,
        source: initialNodes[0].id,
        target: newNode.id,
        animated: true,
        style: { stroke: color, strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: color,
        },
        sourceHandle: targetNodeEdge?.sourceHandle,
        targetHandle: targetNodeEdge?.targetHandle,
      };
        console.log(newNode,newEdge);

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div style={{ width: "100vw", height: "95vh" }} className="flex">
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          connectionMode={ConnectionMode.Loose}
          snapGrid={[20, 20]}
          fitView
          fitViewOptions={{
            padding: 0.2,
            includeHiddenNodes: false,
          }}
          attributionPosition="bottom-right"
          className="bg-gray-50 transition-colors duration-200 custom-reactflow"
          selectNodesOnDrag={false}
          onlyRenderVisibleElements={true}
        >
          <Background />
          <Controls showZoom={true} showFitView={true} showInteractive={true} />
          <MiniMap
            nodeStrokeColor="#333"
            nodeBorderRadius={2}
            maskColor="rgba(255, 255, 255, 0.2)"
            className="bg-white/80 backdrop-blur-sm"
          />
        </ReactFlow>
      </div>
      <Sidebar />
    </div>
  );
}
