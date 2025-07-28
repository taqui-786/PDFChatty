"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, FileText, Bot, User } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { getAnswer } from "@/lib/action";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown"


interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface PDFChatbotProps {
  pdfName?: string;
}

export default function PDFChatbot({
  pdfName = "Document.pdf",
}: PDFChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hello! I'm ready to help you with questions about "${pdfName}". What would you like to know?`,
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    const res = await getAnswer(input.trim(), pdfName);
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
      toast.error("Failed to get response...")
    }
  };

  const TypingIndicator = () => (
    <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
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
      <span className="text-sm text-muted-foreground">AI is thinking...</span>
    </div>
  );

  return (
    <div className="w-full max-w-2xl">
      <Card className="h-[600px] flex flex-col shadow-lg border-0 bg-gradient-to-b from-background to-muted/20">
        <CardHeader className="border-b bg-card/50 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-semibold">PDF Chat</span>
            </div>
            <Badge variant="secondary" className="ml-auto">
              {pdfName}
            </Badge>
          </CardTitle>
        </CardHeader>

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
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-li:text-foreground">
                          <ReactMarkdown
                            components={{
                              p: ({ children }) => <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
                              strong: ({ children }) => (
                                <strong className="font-semibold text-foreground">{children}</strong>
                              ),
                              ul: ({ children }) => (
                                <ul className="text-sm space-y-1 ml-4 mb-2 last:mb-0">{children}</ul>
                              ),
                              li: ({ children }) => <li className="text-foreground">{children}</li>,
                              h1: ({ children }) => (
                                <h1 className="text-base font-semibold mb-2 text-foreground">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-sm font-semibold mb-2 text-foreground">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-sm font-medium mb-1 text-foreground">{children}</h3>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground px-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
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
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Ask questions about the PDF content, request summaries, or search
            for specific information.
          </p>
        </div>
      </Card>
    </div>
  );
}
