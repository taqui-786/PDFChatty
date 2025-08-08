"use client";

import { FileText } from "lucide-react";
import { useState, useRef } from "react";
import { storeToVectorDB } from "@/lib/action";
import { toast } from "sonner";
import PdfChatCard from "../../../components/PdfChatCard";
import { useRouter } from "next/navigation";
import {
  isUploadError,
  isUploadSuccess,
  uploadPDFFile,
  UploadResponse,
} from "@/lib/firebase";
import { createPdfChat } from "@/lib/db/auth";
import { v4 as uuidv4 } from "uuid";

export default function UploadDocument() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [embeddingDocs, setEmbeddingDocs] = useState(false);
  const [embeddingFile, setEmbeddingFile] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const router = useRouter();
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

    if (!file) return;

    // Enforce 1MB size limit
    const maxSizeInBytes = 3 * 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      toast.warning("File size exceeds 1MB. Please upload a smaller file.");
      e.target.value = ""; // Clear the file input
      return;
    }

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

  async function handlePDFUpload(file: File) {
    if (!file) {
      console.log("No file selected");
      return;
    }

    if (file.type !== "application/pdf") {
      console.log("Please select a PDF file");
      return;
    }

    try {
      const result: UploadResponse = await uploadPDFFile(
        file,
        (progress: number) => {
          console.log(`Upload progress: ${progress.toFixed(2)}%`);
        }
      );

      if (isUploadSuccess(result)) {
        setPdfUrl(result.file.url);
        // toast.success(`${result.file.name} is uploaded🎉`);
        return { pdfUrl: result.file.url };
      } else if (isUploadError(result)) {
        console.error("Upload failed:", result.error);
        toast.error(result.error);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Upload failed:", errorMessage);
      toast.error(errorMessage);
    }
  }


  const handleCreateChat = async () => {
    try {
      if (!uploadedFile) {
        return;
      }

      const uuid = uuidv4();
      const toastId = toast.loading(" Processing your data...");
      setEmbeddingDocs(true);
      const res = await storeToVectorDB(uploadedFile, uuid);

      if (!res.success) {
        return toast.error(res.error, { id: toastId });
      }
      toast.loading("Now Uploading your PDF...", { id: toastId });
      const uploadedPdf = await handlePDFUpload(uploadedFile);
      if (!uploadedPdf?.pdfUrl) return toast.error("System error!");
      toast.loading("Last - Getting chat ready...", { id: toastId });

      const createChat = await createPdfChat(
        uuid,
        uploadedFile.name,
        formatFileSize(uploadedFile.size),
        uploadedPdf.pdfUrl
      );
      if (!createChat.success) {
        toast.error(createChat.error, { id: toastId });
        return;
      }
       setEmbeddingFile(`user-${uploadedFile.name}`);
      router.push(`/chat/${uuid}`);
      toast.success('You are ready to chat...',{id:toastId})
    } catch (error) {
      toast.error("System error!");
    } finally {
      setEmbeddingDocs(false);
    }
  };
  return (
    <div className="w-full ">
      {!uploadedFile ? (
        <div
          className={`
            relative border-4 border-dashed rounded-lg p-12 text-center cursor-pointer
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
        <PdfChatCard
          fileName={uploadedFile.name}
          isInitializing={embeddingDocs}
          fileSize={formatFileSize(uploadedFile.size)}
          onStartChat={handleCreateChat}
          onCancel={() => setUploadedFile(null)}
        />
      )}
    </div>
  );
}
