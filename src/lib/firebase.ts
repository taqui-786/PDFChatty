import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  getMetadata,
  uploadBytesResumable,
  FirebaseStorage,
  StorageReference,
  FullMetadata,
  UploadTask,
  UploadTaskSnapshot,
} from "firebase/storage";

// Types
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

interface PDFFileInfo {
  name: string;
  url: string;
  fullPath: string;
  timeCreated: string;
  updated: string;
  size: number;
  contentType: string | null;
}

interface UploadResult {
  success: true;
  file: {
    url: string;
    name: string;
    fullPath: string;
  };
}

interface UploadError {
  success: false;
  error: string;
  fileName: string;
}

type UploadResponse = UploadResult | UploadError;

type ProgressCallback = (progress: number) => void;

// Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY as string,
  authDomain: "pdfchatpro.firebaseapp.com",
  projectId: "pdfchatpro",
  storageBucket: "pdfchatpro.appspot.com",
  messagingSenderId: "949052867684",
  appId: "1:949052867684:web:6617c58c8e0ccee3558b71",
};

const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

// Get all PDF files from storage
async function getPDFFiles(): Promise<PDFFileInfo[]> {
  try {
    const pdfRef: StorageReference = ref(storage, "pdfs");
    const result = await listAll(pdfRef);

    const files: PDFFileInfo[] = await Promise.all(
      result.items.map(async (itemRef: StorageReference): Promise<PDFFileInfo> => {
        const [url, metadata]: [string, FullMetadata] = await Promise.all([
          getDownloadURL(itemRef),
          getMetadata(itemRef),
        ]);

        return {
          name: itemRef.name,
          url: url,
          fullPath: itemRef.fullPath,
          timeCreated: metadata.timeCreated,
          updated: metadata.updated,
          size: metadata.size,
          contentType: metadata.contentType as string,
        };
      })
    );

    return files;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error("Error getting PDF files:", errorMessage);
    throw new Error(`Failed to retrieve PDF files: ${errorMessage}`);
  }
}

// Upload single PDF file
async function uploadPDFFile(
  file: File,
  onProgress?: ProgressCallback
): Promise<UploadResponse> {
  // Validate PDF file
  if (file.type !== 'application/pdf') {
    return {
      success: false,
      error: 'Only PDF files are allowed',
      fileName: file.name,
    };
  }

  const storageRef: StorageReference = ref(storage, `pdfs/${Date.now()}_${file.name}`);
  const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

  return new Promise<UploadResponse>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress?.(progress);
      },
      (error: Error) => {
        const uploadError: UploadError = {
          success: false,
          error: error.message,
          fileName: file.name,
        };
        reject(uploadError);
      },
      async () => {
        try {
          const url: string = await getDownloadURL(uploadTask.snapshot.ref);
          const result: UploadResult = {
            success: true,
            file: {
              url,
              name: file.name,
              fullPath: uploadTask.snapshot.ref.fullPath,
            },
          };
          resolve(result);
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          const uploadError: UploadError = {
            success: false,
            error: errorMessage,
            fileName: file.name,
          };
          reject(uploadError);
        }
      }
    );
  });
}

// Type guard to check if upload was successful
function isUploadSuccess(result: UploadResponse): result is UploadResult {
  return result.success === true;
}

// Type guard to check if upload failed
function isUploadError(result: UploadResponse): result is UploadError {
  return result.success === false;
}

export { 
  storage, 
  getPDFFiles, 
  uploadPDFFile, 
  isUploadSuccess, 
  isUploadError,
  type PDFFileInfo,
  type UploadResponse,
  type UploadResult,
  type UploadError,
  type ProgressCallback,
};