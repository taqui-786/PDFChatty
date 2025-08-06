"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Loader2, MessageCircle, Trash2 } from "lucide-react";

interface PdfCardProps {
  fileName?: string;
  fileSize?: string;
  onStartChat?: () => void;
  onCancel?: () => void;
  isInitializing?: boolean;
}

export default function PdfChatCard({
  fileName = "sample.pdf",
  fileSize = "0.0 MB",
  onStartChat,
  onCancel,
  isInitializing = false,
}: PdfCardProps) {
  return (
    <Card className="w-full max-w-sm bg-white shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
      <CardContent className="px-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="h-5 w-5 text-gray-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {fileName}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{fileSize}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Ready to analyze
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            Start a conversation with your document using AI
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Button onClick={onStartChat} className="w-full" disabled={isInitializing}>
            {isInitializing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Getting things ready...
              </>
            ) : (
              <>
                <MessageCircle className="mr-2 h-4 w-4" />
                Start Chat
              </>
            )}
          </Button>

          <Button variant="outline" onClick={onCancel} className="w-full" disabled={isInitializing}>
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
