"use client";

import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import ReactMarkdown from "react-markdown";

interface CustomNodeData {
  label: string;
  content: string;
  width?: number;
  height?: number;
}

export default function CustomNode({
  data,
  selected,
}: NodeProps<CustomNodeData>) {
  return (
    <div
      className={`custom-node ${selected ? "selected" : ""}`}
      style={{
        width:  400,
        // height: data.height || 500,
        border: selected ? "2px solid #007bff" : "1px solid #ddd",
        borderRadius: "8px",
        background: "#fff",
        boxShadow: selected
          ? "0 4px 12px rgba(0,123,255,0.3)"
          : "0 2px 8px rgba(0,0,0,0.1)",
        padding: "12px",
        fontSize: "12px",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.2s ease",
      }}
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#007bff",
          width: "8px",
          height: "8px",
        }}
      />

      {/* Node Content */}
      <div style={{ height: "100%", overflow: "hidden" }}>
        {/* Title/Label */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "14px",
            color: "#333",
            marginBottom: "8px",
            borderBottom: "1px solid #eee",
            paddingBottom: "4px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {data.label}
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: "11px",
            color: "#666",
            lineHeight: "1.4",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 100, // Show max 6 lines
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-sm leading-relaxed mb-2 last:mb-0">
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                ul: ({ children }) => (
                  <ul className="text-sm space-y-1 ml-4 mb-2 last:mb-0">
                    {children}
                  </ul>
                ),
                li: ({ children }) => (
                  <li className="text-foreground">{children}</li>
                ),
                h1: ({ children }) => (
                  <h1 className="text-base font-semibold mb-2 text-foreground">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-sm font-semibold mb-2 text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-medium mb-1 text-foreground">
                    {children}
                  </h3>
                ),
              }}
            >
              {data.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Output Handle */}

       <Handle type="target" position={Position.Top} className="w-3 h-3" id="top" />
            <Handle type="target" position={Position.Bottom} className="w-3 h-3" id="bottom" />
            <Handle type="target" position={Position.Right} className="w-3 h-3" id="right" />
            <Handle type="target" position={Position.Left} className="w-3 h-3" id="left" />
    </div>
  );
}
