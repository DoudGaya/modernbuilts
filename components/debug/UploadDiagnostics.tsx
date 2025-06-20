"use client";

import { useState } from "react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UploadDiagnostics() {
  const { testConnectivity, uploadFile, isUploading, progress, error } = useFileUpload();
  const [diagnosticResults, setDiagnosticResults] = useState<any>(null);
  const [testFile, setTestFile] = useState<File | null>(null);

  const runDiagnostics = async () => {
    console.log("Running upload diagnostics...");
    const result = await testConnectivity();
    setDiagnosticResults(result);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTestFile(file);
      console.log("Test file selected:", {
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type
      });
    }
  };

  const testUpload = async () => {
    if (!testFile) {
      alert("Please select a file first");
      return;
    }

    console.log("Testing file upload...");
    try {
      const result = await uploadFile(testFile, "test-uploads");
      if (result) {
        console.log("Upload test successful:", result);
        alert(`Upload successful! File URL: ${result.fileUrl}`);
      } else {
        console.log("Upload test failed");
        alert("Upload failed - check console for details");
      }
    } catch (error) {
      console.error("Upload test error:", error);
      alert(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Diagnostics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={runDiagnostics} className="w-full">
              Test API Connectivity
            </Button>
            {diagnosticResults && (
              <div className="mt-4 p-4 bg-gray-100 rounded-md">
                <h4 className="font-semibold mb-2">Diagnostic Results:</h4>
                <pre className="text-sm overflow-auto">
                  {JSON.stringify(diagnosticResults, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Select Test File:
            </label>
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*,.pdf,.doc,.docx"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {testFile && (
              <div className="mt-2 text-sm text-gray-600">
                Selected: {testFile.name} ({(testFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          <div>
            <Button 
              onClick={testUpload} 
              disabled={!testFile || isUploading}
              className="w-full"
            >
              {isUploading ? `Uploading... ${progress}%` : "Test File Upload"}
            </Button>
            {error && (
              <div className="mt-2 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-md">
            <h4 className="font-semibold mb-2">Debugging Steps:</h4>
            <ol className="list-decimal list-inside text-sm space-y-1">
              <li>First, run "Test API Connectivity" to check if the server is responding</li>
              <li>Check the browser console for detailed error messages</li>
              <li>Try uploading a small file (under 1MB) first</li>
              <li>If small files work, try larger files</li>
              <li>Check your AWS S3 configuration if uploads reach the server but fail</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
