import { cn } from "@/lib/utils";
import { BotMessageSquare, GripVertical } from "lucide-react";
import React, { DragEvent } from "react";
import { Tools } from "./Tool";

const Sidebar = () => {
  const onDragStart = (
    event: DragEvent<HTMLDivElement>,
    nodeType: string,
    color: string
  ) => {
    const transferData = {
      type: nodeType,
      color,
    };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(transferData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-72 bg-white border-r border-slate-200 h-screen flex flex-col shadow-sm">
      <div className="p-5 border-b border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800">
          Document Processing Tools
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Drag components to the canvas
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {Tools.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-4 rounded-lg border cursor-grab transition-all duration-200 active:cursor-grabbing active:shadow-md",
              "hover:shadow-md hover:border-slate-300"
            )}
            style={{
              backgroundColor: item.color?.background,
              color: item.color?.text,
              borderColor: item.color?.border,
            }}
            onDragStart={(event) =>
              onDragStart(event, item.type, item.color.text)
            }
            draggable
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-base">{item.label}</div>
                <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                  {item.description}
                </div>
              </div>
              <div className="ml-1 p-1 rounded-md bg-background/50">
                <GripVertical className="size-5" />
              </div>
            </div>
          </div>
        ))}
        <div
          className={cn(
            "p-4 rounded-lg border cursor-grab transition-all duration-200 active:cursor-grabbing active:shadow-md bg-muted",
            "hover:shadow-md hover:border-slate-300"
          )}
   
          onDragStart={(event) =>
            onDragStart(event, 'MyChatNode', '#333')
          }
          draggable
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-base">Chat with Document</div>
              <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                Drag to add a chat component in the flow.
              </div>
            </div>
            <div className="ml-1 p-1">
              <BotMessageSquare className="size-8 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 text-xs text-slate-400">
        Drag components to the canvas to start building your document processing
        pipeline
      </div>
    </div>
  );
};

export default Sidebar;
