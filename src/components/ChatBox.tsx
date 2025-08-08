"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, FileText, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { useGetChatbotAnswer } from "@/lib/db/hooks";
import MarkdownContent from "./MarkdownContent";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface PDFChatbotProps {
  chatsPdfId: string;
}

export default function PDFChatbot({ chatsPdfId }: PDFChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm ready to help you with questions about this document. What would you like to know?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const getAnswerMutation = useGetChatbotAnswer();
  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const res = await getAnswerMutation.mutateAsync({
      question: input.trim(),
      pdfId: chatsPdfId,
      requestId:
        "Chat-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).substr(2, 5),
    });
    if (res.success) {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: res.answer as string,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    } else {
      setIsTyping(false);
      toast.error("Failed to get response...");
    }
  };

  const handleCopyContent = async (content: string) => {
    if (content) {
      try {
        await navigator.clipboard.writeText(content);
        toast.success("Content copied to clipboard");
      } catch (error) {
        toast.error("Failed to copy content");
      }
    }
  };
  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-transparent rounded-lg">
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
      </div>
      {/* <span className="text-sm text-muted-foreground">AI is thinking...</span> */}
    </div>
  );

  return (
    <div className="w-full max-w-full">
      <Card className="h-[600px]  overflow-y-scroll flex flex-col py-0 shadow-none border-none">
        <CardContent className="flex-1 p-0 overflow-hidden">
          <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback
                      className={
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div
                    className={`flex flex-col gap-1 max-w-[80%] ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground ml-4"
                          : "bg-muted mr-4"
                      }`}
                    >
                      {message.role === "assistant" ? (
                        <MarkdownContent content={message.content} />
                      ) : (
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      )}
                    </div>
                    {message.role !== "user" ? (
                      <div className="flex items-center gap-1 ">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground p-0"
                          onClick={() => handleCopyContent(message.content)}
                        >
                          {" "}
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <rect
                              width="14"
                              height="14"
                              x="8"
                              y="8"
                              rx="2"
                              ry="2"
                            />
                            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                          </svg>
                        </Button>
                        <span className="text-xs text-muted-foreground ">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}

              {isTyping && <TypingIndicator />}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="border-t bg-card/50 backdrop-blur-sm p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about this PDF..."
              className="flex-1 bg-background/50 border-muted-foreground/20 focus:border-primary"
              disabled={isTyping}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isTyping}
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
