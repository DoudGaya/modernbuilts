// hooks/useFileUpload.ts
import { useState } from "react";
import axios, { AxiosProgressEvent } from "axios";

interface UploadResult {
  fileUrl: string;
  fileName: string;
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  // Diagnostic function to test API connectivity
  const testConnectivity = async () => {
    try {
      console.log("Testing API connectivity...");
      
      // Test health check endpoint
      const healthResponse = await fetch('/api/health-check', {
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (!healthResponse.ok) {
        throw new Error(`Health check failed: ${healthResponse.status}`);
      }
      
      const healthData = await healthResponse.json();
      console.log("Health check passed:", healthData);
      
      // Test debug endpoint
      const debugResponse = await fetch('/api/debug/upload-status', {
        method: 'GET',
        cache: 'no-cache'
      });
      
      if (!debugResponse.ok) {
        throw new Error(`Debug endpoint failed: ${debugResponse.status}`);
      }
      
      const debugData = await debugResponse.json();
      console.log("Debug info:", debugData);
      
      // Test JSON POST capability
      const postResponse = await fetch('/api/debug/upload-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testType: 'connectivity' })
      });
      
      if (!postResponse.ok) {
        throw new Error(`POST test failed: ${postResponse.status}`);
      }
      
      const postData = await postResponse.json();
      console.log("POST test passed:", postData);
      
      return { success: true, message: "All connectivity tests passed" };
    } catch (error) {
      console.error("Connectivity test failed:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      };
    }
  };// Helper function for direct uploads through our API
  const uploadDirectly = async (file: File, folder: string): Promise<UploadResult | null> => {
    console.log(`Using direct upload for ${file.name} (${(file.size/1024/1024).toFixed(2)} MB)`);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    
    // More conservative timeout calculation for direct uploads
    const estimatedTimeInSeconds = Math.max(120, Math.ceil(file.size / (100 * 1024))); // Slower estimate for reliability
    const timeout = estimatedTimeInSeconds * 1000;
    
    console.log(`Setting timeout to ${timeout}ms (${estimatedTimeInSeconds}s) for this upload`);
    
    try {
      // Implement retry logic with fewer attempts for faster feedback
      let attempts = 0;
      const maxAttempts = 2;
      
      while (attempts < maxAttempts) {
        try {
          attempts++;
          setRetryCount(attempts - 1);
          console.log(`Direct upload attempt ${attempts}/${maxAttempts}`);
            // Use relative URL to avoid any potential CORS issues
          const uploadUrl = '/api/direct-upload';
          
          // Create a custom axios instance with specific configuration for uploads
          const response = await axios({
            method: 'post',
            url: uploadUrl,
            data: formData,
            timeout: timeout,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json',
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || file.size)
              );
              setProgress(percentCompleted);
            },
            // Enhanced error handling and network resilience
            maxContentLength: file.size * 2,
            maxBodyLength: file.size * 2,
            validateStatus: (status) => status >= 200 && status < 500,
            // Ensure we're not hitting browser request limits
            maxRedirects: 0,
          });
          
          if (response.status >= 400) {
            console.error(`API returned error status: ${response.status}`, response.data);
            throw new Error(`Server responded with status: ${response.status} - ${response.data?.error || 'Unknown error'}`);
          }
          
          if (response.data && response.data.fileUrl) {
            console.log(`Direct upload successful: ${response.data.fileUrl}`);
            return {
              fileUrl: response.data.fileUrl,
              fileName: file.name
            };
          } else {
            throw new Error("No file URL returned from server");
          }
        } catch (err: any) {
          const errorMsg = err.response?.data?.error || 
            err.message || 
            (err.response ? `Server error: ${err.response.status}` : 'Network error'); 
          
          console.error(`Direct upload attempt ${attempts} failed: ${errorMsg}`);
          
          // Enhanced error diagnosis
          if (err.code === 'ECONNABORTED') {
            console.error('Request timed out - server might be overloaded or file too large');
          } else if (err.code === 'ERR_NETWORK') {
            console.error('Network error - check internet connection and server status');
          } else if (err.response) {
            console.error('Response error data:', err.response.data);
            console.error('Response status:', err.response.status);
            
            // If it's a server configuration error, don't retry
            if (err.response.status >= 500) {
              console.error('Server error detected, may be a configuration issue');
            }
          } else if (err.request) {            console.error('No response received - likely network or CORS issue');
            console.error('Request details:', {
              url: '/api/direct-upload',
              method: 'POST',
              headers: err.config?.headers
            });
          }
          
          // If we've reached max attempts, rethrow
          if (attempts >= maxAttempts) {
            // Provide a more helpful error message
            if (err.code === 'ERR_NETWORK' || !err.response) {
              throw new Error("Upload failed due to network connectivity issues. Please check your internet connection and try again.");
            }
            throw err;
          }
          
          // Otherwise wait before retrying with shorter backoff
          const waitTime = 1500 * attempts;
          console.log(`Retrying in ${waitTime/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
      
      throw new Error("Maximum upload attempts reached");
    } catch (err) {
      console.error("All direct upload attempts failed:", err);
      throw err;
    }
  };const uploadFile = async (
    file: File,
    folder: string = "uploads"
  ): Promise<UploadResult | null> => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      setProgress(0);
      setRetryCount(0);
      setError(null);

      // Validate file before attempting upload
      if (file.size === 0) {
        throw new Error("Cannot upload empty file");
      }
      
      // Check if we're running in development and adjust strategy
      const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      console.log(`Upload environment: ${isDevelopment ? 'development' : 'production'}`);
      console.log(`File details: ${file.name}, size: ${(file.size/1024/1024).toFixed(2)} MB, type: ${file.type}`);
      
      // For larger files or in development, skip the presigned URL and use direct upload
      // Lower threshold for development to avoid CORS issues
      const sizeThreshold = isDevelopment ? 1 * 1024 * 1024 : 2 * 1024 * 1024; // 1MB for dev, 2MB for prod
      
      if (file.size > sizeThreshold) {
        console.log(`File size exceeds threshold (${(sizeThreshold/1024/1024).toFixed(2)} MB), using direct upload`);
        return await uploadDirectly(file, folder);
      }
      
      // For smaller files, try presigned URL first (but skip in development if having CORS issues)
      if (!isDevelopment) {
        try {
          console.log(`Requesting presigned URL for ${file.name}`);
          
          // Simplified network check using a more reliable method
          try {
            const healthResponse = await fetch('/api/health-check', { 
              method: 'GET',
              cache: 'no-cache',
              headers: { 
                'Cache-Control': 'no-cache',
                'Accept': 'application/json'
              },
              signal: AbortSignal.timeout(5000) // 5 second timeout
            });
            
            if (!healthResponse.ok) {
              throw new Error(`Health check failed: ${healthResponse.status}`);
            }
            
            console.log("Network connectivity check passed");
          } catch (networkError) {
            console.error("Network connectivity check failed:", networkError);
            console.log("Falling back to direct upload due to network issues...");
            return await uploadDirectly(file, folder);
          }
          
          const { data } = await axios.post("/api/upload", {
            fileName: file.name,
            fileType: file.type,
            folder
          }, {
            timeout: 15000, // Reduced timeout for faster fallback
            validateStatus: (status) => status >= 200 && status < 500,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          });
          
          if (!data.uploadUrl) {
            throw new Error("No upload URL received");
          }
          
          console.log("Got presigned URL, starting upload");
          
          // Calculate a dynamic timeout based on file size
          const estimatedTimeInSeconds = Math.max(60, Math.ceil(file.size / (200 * 1024))); // More conservative estimate
          const timeout = estimatedTimeInSeconds * 1000;
          
          // Upload to S3 directly with retry logic
          let attempts = 0;
          const maxAttempts = 2; // Reduced attempts for faster fallback
          
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
                maxContentLength: file.size * 2,
                maxBodyLength: file.size * 2
              });
              
              console.log("Upload via presigned URL successful");
              return { fileUrl: data.fileUrl, fileName: file.name };
            } catch (putError: any) {
              console.error(`S3 upload attempt ${attempts} failed:`, putError);
              
              // More detailed error logging
              if (putError.response) {
                console.error("Response error data:", putError.response.data);
                console.error("Response status:", putError.response.status);
              } else if (putError.request) {
                console.error("No response received:", putError.request);
                console.error("Likely a CORS or network connectivity issue");
              } else {
                console.error("Request setup error:", putError.message);
              }
              
              if (attempts >= maxAttempts) throw putError;
              
              const waitTime = 1000 * attempts; // Shorter backoff
              console.log(`Retrying in ${waitTime/1000} seconds...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
            }
          }
          
          throw new Error("Maximum S3 upload attempts reached");
        } catch (presignedError: any) {
          console.error("Presigned URL upload failed:", presignedError);
          
          // Enhanced error handling for diagnosing network issues
          if (presignedError.code === 'ECONNABORTED') {
            console.error("Request timed out - server might be overloaded or connection is slow");
          } else if (presignedError.code === 'ERR_NETWORK') {
            console.error("Network error detected - likely connectivity or CORS issues");
          } else if (presignedError.response) {
            console.error("Server responded with error:", presignedError.response.status);
          } else if (presignedError.request) {
            console.error("No response received - likely CORS or server connectivity issue");
          }
          
          console.log("Falling back to direct upload...");
          
          // If presigned URL upload fails, try direct upload
          return await uploadDirectly(file, folder);
        }
      } else {
        // In development, go straight to direct upload to avoid CORS issues
        console.log("Development environment detected, using direct upload to avoid CORS issues");
        return await uploadDirectly(file, folder);
      }
    } catch (err: any) {
      console.error("All upload methods failed:", err);
      
      // More descriptive error messages
      let errorMessage = "Upload failed";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Upload timed out. The server may be overloaded or your connection is slow.";
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = "Network error. This could be a CORS issue or server connectivity problem. Please try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
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
      console.log(`Starting upload of ${files.length} files to ${folder}`);        // Upload one file at a time for better reliability
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
    testConnectivity,
    isUploading,
    progress,
    retryCount,
    error,
  };
}