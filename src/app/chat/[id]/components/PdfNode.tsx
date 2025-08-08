"use client";

import React, { useState } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { ZoomIn, ZoomOut, FileText } from "lucide-react";

import PdfViewer from "./PdfViewer";

interface PDFNodeData {
  pdfUrl?: string;
  label?: string;
  width?: number;
  height?: number;
}

export default function PDFNode({ data, selected }: NodeProps<PDFNodeData>) {
  const [scale, setScale] = useState<number>(0.8);
console.log({data});

  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.0));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.4));
  };

  const nodeWidth = data.width || 400;
  const nodeHeight = data.height || 500;

  return (
    <div
      className={`bg-white rounded-lg shadow-lg border-2 overflow-hidden ${
        selected ? "border-blue-500" : "border-gray-300"
      }`}
      style={{ width: nodeWidth, height: nodeHeight }}
    >
      {/* Node Handles */}
      <Handle
        type="source"
        position={Position.Top}
        className="w-3 h-3"
        id="top"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3"
        id="bottom"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3"
        id="right"
      />
      <Handle
        type="source"
        position={Position.Left}
        className="w-3 h-3"
        id="left"
      />

      {/* Header */}
      <div className="bg-gray-50 px-4 py-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">
            {data.label || "PDF Viewer"}
          </span>
        </div>

        {/* Controls */}
        {data.pdfUrl && (
          <div className="flex items-center gap-1">
            <button
              onClick={zoomOut}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-xs text-gray-500 px-1">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={zoomIn}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* PDF Content Area */}
      <div className="flex-1 flex flex-col h-full">
        {!data.pdfUrl ? (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <FileText className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No PDF loaded</p>
              <p className="text-xs text-gray-400 mt-1">
                Set pdfUrl in node data
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* PDF Viewer */}
            <div className="flex-1 overflow-hidden flex items-center justify-center bg-gray-100">
              <PdfViewer url={data.pdfUrl} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
