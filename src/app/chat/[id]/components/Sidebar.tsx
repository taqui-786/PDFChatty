import { cn } from "@/lib/utils";
import {
  BotMessageSquare,
  ChevronRight,
  GripVertical,
} from "lucide-react";
import React, { DragEvent, TouchEvent, useState } from "react";
import { Tools } from "./Tool";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const [draggedItem, setDraggedItem] = useState<{
    type: string;
    color: string;
    element: HTMLElement | null;
  } | null>(null);

  // Desktop drag start
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

  // Mobile touch start
  const onTouchStart = (
    event: TouchEvent<HTMLDivElement>,
    nodeType: string,
    color: string
  ) => {
    const target = event.currentTarget;
    setDraggedItem({
      type: nodeType,
      color,
      element: target
    });
    
    // Add visual feedback
    target.style.opacity = "0.7";
    target.style.transform = "scale(1.05)";
    
    // Prevent scrolling while dragging
    event.preventDefault();
  };

  // Mobile touch move
  const onTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    if (!draggedItem) return;
    
    event.preventDefault();
    const touch = event.touches[0];
    
    // Create a visual clone that follows the finger
    let dragElement = document.getElementById('drag-clone');
    if (!dragElement && draggedItem.element) {
      dragElement = draggedItem.element.cloneNode(true) as HTMLElement;
      dragElement.id = 'drag-clone';
      dragElement.style.position = 'fixed';
      dragElement.style.pointerEvents = 'none';
      dragElement.style.zIndex = '1000';
      dragElement.style.opacity = '0.8';
      dragElement.style.transform = 'scale(0.9)';
      document.body.appendChild(dragElement);
    }
    
    if (dragElement) {
      dragElement.style.left = `${touch.clientX - 50}px`;
      dragElement.style.top = `${touch.clientY - 50}px`;
    }
  };

  // Mobile touch end
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!draggedItem) return;
    
    const touch = event.changedTouches[0];
    const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
    
    // Clean up visual feedback
    if (draggedItem.element) {
      draggedItem.element.style.opacity = "";
      draggedItem.element.style.transform = "";
    }
    
    // Remove drag clone
    const dragElement = document.getElementById('drag-clone');
    if (dragElement) {
      dragElement.remove();
    }
    
    // Check if dropped on a valid target (you'll need to implement this based on your drop zone)
    // This is where you'd trigger the same logic as your desktop drop handler
    if (targetElement && targetElement.closest('[data-drop-zone]')) {
      // Simulate the data transfer for mobile
      const transferData = {
        type: draggedItem.type,
        color: draggedItem.color,
      };
      
      // Dispatch custom event or call your drop handler
      const dropEvent = new CustomEvent('mobile-drop', {
        detail: {
          transferData,
          clientX: touch.clientX,
          clientY: touch.clientY,
          target: targetElement
        }
      });
      
      document.dispatchEvent(dropEvent);
    }
    
    setDraggedItem(null);
  };

  const handleSidebarToogle = () => {
    const mySidebar = document.getElementById("my_sidebar");
    const mySidebarBtn = document.getElementById("sideBar_btn");
    const mainContainer = document.getElementById("mainContainer");
    if (mySidebar && mySidebarBtn && mainContainer) {
      if (mySidebar.style.right !== "-300px") {
        mySidebar.style.right = "-300px";
        mySidebarBtn.style.transform = "rotate(180deg)";
        mainContainer.style.width = "20px";
        mainContainer.style.borderLeft = "1px solid #e2ddde";
      } else {
        mySidebar.style.right = "0px";
        mySidebarBtn.style.transform = "rotate(0deg)";
        mainContainer.style.width = "fit-content";
      }
    }
  };

  return (
    <div className="w-fit absolute right-0 flex-1 " id="mainContainer">
      <Button
        size={"icon"}
        className="absolute -left-5 top-5 z-50"
        onClick={handleSidebarToogle}
        id="sideBar_btn"
      >
        <ChevronRight className="size-5" />
      </Button>

      <div
        className="w-72 bg-background  border-l h-full  flex flex-col relative top-0 "
        id="my_sidebar"
      >
        <div className="px-5 pt-5 flex  ">
          <h3 className="text-lg text-center w-full font-semibold ">
            Document Tools
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Tools.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4 rounded-lg border cursor-grab transition-all duration-200 active:cursor-grabbing active:shadow-md touch-manipulation",
                "hover:shadow-md hover:border-slate-300"
              )}
              style={{
                backgroundColor: item.color?.background,
                color: item.color?.text,
                borderColor: item.color?.border,
              }}
              // Desktop events
              onDragStart={(event) =>
                onDragStart(event, item.type, item.color.text)
              }
              draggable
              // Mobile events
              onTouchStart={(event) =>
                onTouchStart(event, item.type, item.color.text)
              }
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-base line-clamp-1">
                    {item.label}
                  </div>
                  <div className="text-sm text-slate-600 mt-1 line-clamp-2">
                    {item.description}
                  </div>
                </div>
                <div className="ml-1 p-1  ">
                  <GripVertical className="size-5" />
                </div>
              </div>
            </div>
          ))}
          <div
            className={cn(
              "p-4 rounded-lg border cursor-grab transition-all duration-200 active:cursor-grabbing active:shadow-md bg-muted touch-manipulation",
              "hover:shadow-md hover:border-slate-300"
            )}
            // Desktop events
            onDragStart={(event) => onDragStart(event, "MyChatNode", "#333")}
            draggable
            // Mobile events
            onTouchStart={(event) => onTouchStart(event, "MyChatNode", "#333")}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
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
      </div>
    </div>
  );
};

export default Sidebar;