// hooks/useFileUpload.ts
import { useState } from "react";
import axios from "axios";

interface UploadResult {
  fileUrl: string;
  fileName: string;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (
    file: File,
    folder: string = "uploads"
  ): Promise<UploadResult | null> => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      // Step 1: Get a presigned URL from our server
      const { data } = await axios.post("/api/upload", {
        fileName: file.name,
        fileType: file.type,
        folder
      });

      const { uploadUrl, fileUrl } = data;

      // Step 2: Upload the file directly to S3
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percentCompleted);
        },
      });

      return { fileUrl, fileName: file.name };
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadMultipleFiles = async (
    files: File[],
    folder: string = "uploads"
  ): Promise<UploadResult[]> => {
    if (!files.length) return [];
    
    const uploadedFiles: UploadResult[] = [];
    setIsUploading(true);
    setProgress(0);
    
    try {
      let totalProgress = 0;

      // Upload files one by one for accurate progress tracking
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const result = await uploadFile(file, folder);
        
        if (result) {
          uploadedFiles.push(result);
        }
        
        totalProgress = Math.round((i + 1) * 100 / files.length);
        setProgress(totalProgress);
      }
      
      return uploadedFiles;
    } catch (err) {
      console.error("Multiple upload failed:", err);
      setError("Upload failed. Please try again.");
      return uploadedFiles; // Return any files that were successfully uploaded
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    progress,
    error,
  };
}