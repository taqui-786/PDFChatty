"use client";

import { FileText } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { storeToVectorDB } from "@/lib/action";
import { toast } from "sonner";
import PDFChatbot from "./ChatBox";

export default function UploadDocument() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [embeddingDocs, setEmbeddingDocs] = useState(false);
  const [embeddingFile, setEmbeddingFile] = useState("");
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0]);
    }
  };

const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  // Ensure a file was selected
  if (!file) return;

  // Enforce 1MB size limit
  const maxSizeInBytes = 3 * 1024 * 1024; // 1MB
  if (file.size > maxSizeInBytes) {
    toast.warning("File size exceeds 1MB. Please upload a smaller file.");
    e.target.value = ""; // Clear the file input
    return;
  }

  // Set the file if valid
  setUploadedFile(file);
};


  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleStartChat = async () => {
    if (!uploadedFile) {
      return;
    }
    setEmbeddingDocs(true);
    const res = await storeToVectorDB(uploadedFile);
    console.log({ res });

    if (res.success) {
      toast.success("You are ready to Chat...");
      setEmbeddingFile(`user-${uploadedFile.name}`);
    } else {
      toast.error("Failed to embed documents...");
    }
    setEmbeddingDocs(false);
  };


if(embeddingFile.length){
  return (
       <div className="min-h-dvh bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <PDFChatbot pdfName={embeddingFile} />
    </div>
  )
}

  return (
    <div className="w-full max-w-2xl">
      {!uploadedFile ? (
        <div
          className={`
            relative border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragOver
                ? "border-primary/50 bg-primary/20"
                : "border-primary/30 hover:border-primary/40 hover:bg-primary/10"
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept=".pdf"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 text-muted-foreground">
              <FileText size={54} className="text-primary/80" />
            </div>

            <div>
              <p className="text-xl font-medium text-gray-700 mb-2">
                {isDragOver
                  ? "Drop your document here"
                  : "Upload your document"}
              </p>
              <p className="text-gray-500">
                Drag and drop a file here, or click to browse
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Supports only PDF
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2  items-center justify-center">
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary/70"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
              <button
                onClick={() => setUploadedFile(null)}
                className="text-muted-foreground hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Button onClick={handleStartChat} disabled={embeddingDocs}>
            {embeddingDocs ? "Analyizing your docs..." : "Let's start Chatting"}
          </Button>
        </div>
      )}
    </div>
  );
}
