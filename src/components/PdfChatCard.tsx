"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, FileText, Loader2, MessageCircle, Trash2 } from "lucide-react";

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
    <Card className="w-full max-w-full rounded-lg bg-white shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md">
      <CardContent className="px-6 ">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium  truncate">
                {fileName}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{fileSize}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <div className="flex w-fit mx-auto gap-3">
            <Rocket size="28" />
            <h4 className="text-2xl font-semibold text-primary mb-2">
              Ready to analyze...
            </h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
             Let&apos;s extract summaries, key points, answers, and chat in the flowchat.
          </p>
        </div>

        {/* Action buttons */}
        <div className=" flex justify-between">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isInitializing}
            className="rounded-sm"
          >
            <Trash2 className="size-5" />
            Remove
          </Button>
          <Button
            onClick={onStartChat}
            className="rounded-sm"
            disabled={isInitializing}
          >
            {isInitializing ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Getting things ready...
              </>
            ) : (
              <>
                <ArrowUpRight className=" size-5" />
                Start Chat
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

type RocketProps = {
    size: string;
};
      
const Rocket = ({ size }: RocketProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 15 15"><path fill="#e05d38" fill-rule="evenodd" d="m6.854 3.854l.8-.8c.644-.645 1.775-1.092 2.898-1.253a5.342 5.342 0 0 1 1.504-.02c.443.066.714.196.84.323c.127.126.257.397.323.84c.064.427.059.95-.02 1.504c-.16 1.123-.608 2.254-1.253 2.898L7.5 11.793l-1.146-1.146a.5.5 0 1 0-.708.707l1.5 1.5a.5.5 0 0 0 .708 0l.547-.548l1.17 1.951a.5.5 0 0 0 .783.097l2-2a.5.5 0 0 0 .141-.425l-.465-3.252l.624-.623c.855-.856 1.358-2.225 1.535-3.465c.09-.627.1-1.25.019-1.794c-.08-.528-.256-1.05-.604-1.399c-.349-.348-.871-.525-1.4-.604a6.333 6.333 0 0 0-1.793.02C9.17.987 7.8 1.49 6.946 2.345l-.623.624l-3.252-.465a.5.5 0 0 0-.425.141l-2 2a.5.5 0 0 0 .097.783l1.95 1.17l-.547.547a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 1 0 .708-.708L3.207 7.5l.647-.646l3-3Zm3.245 9.34l-.97-1.617l2.017-2.016l.324 2.262l-1.37 1.37ZM3.423 5.87l2.016-2.016l-2.262-.324l-1.37 1.37l1.616.97Zm-1.07 4.484a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707l1-1Zm1.5 1.5a.5.5 0 1 0-.707-.707l-2 2a.5.5 0 0 0 .708.707l2-2Zm1.5 1.5a.5.5 0 1 0-.707-.708l-1 1a.5.5 0 1 0 .708.707l1-1ZM9.5 6.748a1.249 1.249 0 1 0 0-2.498a1.249 1.249 0 0 0 0 2.498Z" clip-rule="evenodd"/></svg>
);

      