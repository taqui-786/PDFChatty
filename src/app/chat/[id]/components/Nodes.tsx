import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { BotMessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useGetAnswer } from "@/lib/db/hooks";
import { Tool, Tools } from "./Tool";
import ChatDailog from "./ChatDailog";
import axios from "axios";
import MarkdownContent from "@/components/MarkdownContent";
import { Skeleton } from "@/components/ui/skeleton";
interface MyCustomNodeProps {
  type: string;
  pdfId: string;
}
export const MyCustomNode = ({
  data,
  selected,
  id,
}: NodeProps<MyCustomNodeProps>) => {
  const theNode: Tool | undefined = useMemo(
    () => Tools.find((tool) => tool.type === data.type),
    [data.type]
  );

  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState("");
  const hasInitialized = useRef(false);
  const getAnswerMutation = useGetAnswer();

  // Get react-flow instance for zoom functionality
  const { fitView } = useReactFlow();

  // Memoize the node click handler with stable dependencies
  const handleNodeClick = useCallback(async () => {
    try {
      if (hasInitialized.current || getAnswerMutation.isPending || !theNode) {
        return;
      }

      hasInitialized.current = true;

      const result = await axios.post("/api/tool", {
        question: theNode.prompt,
        pdfId: data.pdfId,
        requestId: theNode.id,
      });
      if (result.data && result.data?.answer) {
        setContent(result.data?.answer as string);
      } else {
        toast.error("Something went wrong");
        hasInitialized.current = false;
      }
    } catch (error) {
      console.error(`Error in ${data.type}:`, error);
      toast.error("Something went wrong");
      hasInitialized.current = false;
    } finally {
      setLoading(false);
    }
  }, [theNode, getAnswerMutation, data.type]); // Remove theNode?.prompt and theNode?.id as separate deps

  const handleFullscreen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (id) {
        fitView({
          nodes: [{ id: id }],
          duration: 300,
          padding: 0.2,
        });
      }
    },
    [fitView, id]
  );

  const handleCopyContent = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (content) {
        try {
          await navigator.clipboard.writeText(content);
          toast.success("Content copied to clipboard");
        } catch (error) {
          toast.error("Failed to copy content");
        }
      }
    },
    [content]
  );

  useEffect(() => {
    if (theNode && !hasInitialized.current && !getAnswerMutation.isPending) {
      handleNodeClick();
    }
  }, [theNode, handleNodeClick]);

  return (
    <div
      className={` ${selected ? "selected" : ""}`}
      style={{
        width: 400,
        border: selected ? "2px solid #007bff" : "1px solid #ddd",
        borderRadius: "8px",
        background: theNode?.color.background || "#fff",
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
      {/* Node Content */}
      <div style={{ height: "100%", overflow: "hidden" }}>
        {/* Title/Label with Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "14px",
            color: theNode?.color.text || "#333",
            marginBottom: "8px",
            borderBottom: "1px solid #eee",
            paddingBottom: "4px",
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              marginRight: "8px",
            }}
          >
            {theNode?.label}
          </div>

          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            {
              loading ? 
              <Loader2
                className={`animate-spin text-primary`}
                size={20}
              /> :""
            }
            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
                color: "#666",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              title="Fit to screen"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopyContent}
              disabled={!content || loading}
              style={{
                background: "none",
                border: "none",
                cursor: content && !loading ? "pointer" : "not-allowed",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
                color: content && !loading ? "#666" : "#ccc",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (content && !loading) {
                  e.currentTarget.style.color = "#333";
                }
              }}
              onMouseLeave={(e) => {
                if (content && !loading) {
                  e.currentTarget.style.color = "#666";
                }
              }}
              title="Copy content"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: "11px",
            color: "#666",
            lineHeight: "1.4",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 100,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {loading ? (
            <div className="flex flex-col gap-4 items-center justify-center h-36 w-full">
              {/* <Loader2
                className={`animate-spin text-[${theNode?.color.text}]`}
                size={28}
              />
              <span className="text-sm text-muted-foreground">
                generating result...
              </span> */}
             
              <div className="flex gap-4 w-full">
                <Skeleton className="h-5 w-24 rounded-none" />
                <Skeleton className="h-5 w-full rounded-none" />
              </div>
              <div className="flex gap-4 w-full">
                <Skeleton className="h-5 w-full rounded-none" />
                <Skeleton className="h-5 w-40 rounded-none" />
              </div>
              <div className="flex gap-4 w-full">
                <Skeleton className="h-5 w-12 rounded-none" />
                <Skeleton className="h-5 w-full rounded-none" />
                <Skeleton className="h-5 w-20 rounded-none" />
              </div>
              <div className="flex gap-4 w-full">
                <Skeleton className="h-5 w-1/2 rounded-none" />
                <Skeleton className="h-5 w-full rounded-none" />
              </div>
            </div>
          ) : (
            <MarkdownContent content={content} />
          )}
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3"
        id="top"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-3 h-3"
        id="bottom"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3"
        id="right"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3"
        id="left"
      />
    </div>
  );
};

export const MyChatNode = ({
  data,
  selected,
  id,
}: NodeProps<MyCustomNodeProps>) => {
  const { fitView } = useReactFlow();

  const handleFullscreen = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (id) {
        fitView({
          nodes: [{ id: id }],
          duration: 300,
          padding: 0.2,
        });
      }
    },
    [fitView, id]
  );

  return (
    <div
      className={` ${selected ? "selected" : ""}`}
      style={{
        width: 400,
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
      {/* Node Content */}
      <div style={{ height: "100%", overflow: "hidden" }}>
        {/* Title/Label with Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: "14px",
            color: "#333",
            marginBottom: "8px",
            borderBottom: "1px solid #eee",
            paddingBottom: "4px",
          }}
        >
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              marginRight: "8px",
            }}
          >
            Chat with Document
          </div>

          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            {/* Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
                color: "#666",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
              title="Fit to screen"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div
          style={{
            fontSize: "11px",
            color: "#666",
            lineHeight: "1.4",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 100,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-center py-8">
            <BotMessageSquare className="size-14 " />
            <ChatDailog pdfId={data.pdfId} />
          </div>
          {/* ------------------- */}
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3"
        id="top"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        className="w-3 h-3"
        id="bottom"
      />
      <Handle
        type="target"
        position={Position.Right}
        className="w-3 h-3"
        id="right"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3"
        id="left"
      />
    </div>
  );
};
