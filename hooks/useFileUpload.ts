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
  const [retryCount, setRetryCount] = useState(0);

  // Helper function for direct uploads through our API
  const uploadDirectly = async (file: File, folder: string): Promise<UploadResult | null> => {
    console.log(`Using direct upload for ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)`);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    // Calculate a dynamic timeout based on file size
    // Assuming 150KB/s minimum upload speed for safety
    const estimatedTimeInSeconds = Math.max(300, Math.ceil(file.size / (150 * 1024)));
    const timeout = estimatedTimeInSeconds * 1000;
    
    console.log(`Setting timeout to ${timeout}ms (${estimatedTimeInSeconds}s) for this upload`);
    
    try {
      // Implement retry logic
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          attempts++;
          setRetryCount(attempts - 1);
          console.log(`Upload attempt ${attempts}/${maxAttempts}`);
          
          const response = await axios.post('/api/direct-upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: timeout, // Dynamic timeout based on file size
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || file.size)
              );
              setProgress(percentCompleted);
            },
          });
          
          if (response.data && response.data.fileUrl) {
            return {
              fileUrl: response.data.fileUrl,
              fileName: file.name
            };
          } else {
            throw new Error("No file URL returned");
          }
        } catch (err) {
          console.error(`Direct upload attempt ${attempts} failed:`, err);
          
          // If we've reached max attempts, rethrow
          if (attempts >= maxAttempts) throw err;
          
          // Otherwise wait before retrying
          const waitTime = 2000 * attempts; // Progressive backoff
          console.log(`Retrying in ${waitTime/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
      
      throw new Error("Maximum upload attempts reached");
    } catch (err) {
      console.error("All direct upload attempts failed:", err);
      throw err;
    }
  };

  const uploadFile = async (
    file: File,
    folder: string = "uploads"
  ): Promise<UploadResult | null> => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      setProgress(0);
      setRetryCount(0);
      setError(null);
      
      // For larger files, skip the presigned URL and use direct upload
      // Lowering threshold to 2MB for better reliability
      if (file.size > 2 * 1024 * 1024) {
        console.log(`Large file detected (${(file.size/1024/1024).toFixed(2)} MB), using direct upload`);
        return await uploadDirectly(file, folder);
      }
      
      // For smaller files, try presigned URL first
      try {
        console.log(`Requesting presigned URL for ${file.name}`);
        const { data } = await axios.post("/api/upload", {
          fileName: file.name,
          fileType: file.type,
          folder
        }, {
          timeout: 30000, // Increased timeout for API call
        });
        
        if (!data.uploadUrl) {
          throw new Error("No upload URL received");
        }
        
        console.log("Got presigned URL, starting upload");
        
        // Calculate a dynamic timeout based on file size
        const estimatedTimeInSeconds = Math.max(300, Math.ceil(file.size / (150 * 1024)));
        const timeout = estimatedTimeInSeconds * 1000;
        
        // Upload to S3 directly with retry logic
        let attempts = 0;
        const maxAttempts = 3;
        
        while (attempts < maxAttempts) {
          try {
            attempts++;
            setRetryCount(attempts - 1);
            console.log(`Upload to S3 attempt ${attempts}/${maxAttempts}`);
            
            await axios.put(data.uploadUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
              timeout: timeout,
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || file.size)
                );
                setProgress(percentCompleted);
              },
            });
            
            console.log("Upload via presigned URL successful");
            return { fileUrl: data.fileUrl, fileName: file.name };
          } catch (putError) {
            console.error(`S3 upload attempt ${attempts} failed:`, putError);
            
            if (attempts >= maxAttempts) throw putError;
            
            const waitTime = 2000 * attempts; // Progressive backoff
            console.log(`Retrying in ${waitTime/1000} seconds...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
        
        throw new Error("Maximum S3 upload attempts reached");
      } catch (presignedError) {
        console.error("Presigned URL upload failed:", presignedError);
        console.log("Falling back to direct upload...");
        
        // If presigned URL upload fails, try direct upload
        return await uploadDirectly(file, folder);
      }
    } catch (err) {
      console.error("All upload methods failed:", err);
      setError(err instanceof Error ? err.message : "Upload failed due to network issues");
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
    setRetryCount(0);
    
    try {
      console.log(`Starting upload of ${files.length} files to ${folder}`);
      
      // Upload one file at a time for better reliability
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        console.log(`Uploading file ${i+1}/${files.length}: ${file.name}`);
          try {
          const result = await uploadFile(file, folder);
          if (result) {
            uploadedFiles.push(result);
            console.log(`Successfully uploaded ${file.name}`);
          }
        } catch (fileError) {
          console.error(`Error uploading ${file.name}:`, fileError);
          // Continue with next file
        }
        
        // Update overall progress
        const totalProgress = Math.round((i + 1) * 100 / files.length);
        setProgress(totalProgress);
      }
      
      return uploadedFiles;
    } catch (err) {
      console.error("Multiple upload failed:", err);
      setError("Some files failed to upload. Please try again.");      return uploadedFiles; // Return any files that were successfully uploaded
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadFile,
    uploadMultipleFiles,
    isUploading,
    progress,
    retryCount,
    error,
  };
}