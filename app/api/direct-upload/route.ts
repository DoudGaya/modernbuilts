// app/api/direct-upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";

// Increase the size limit for direct uploads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Further increased to handle larger files
    },
    responseLimit: false, // No response size limit
  },
};

// Force dynamic to prevent caching issues
export const dynamic = "force-dynamic";

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log("Starting direct upload processing");
    
    // Parse multipart form data
    let formData;
    try {
      formData = await request.formData();
    } catch (formError) {
      console.error("Error parsing form data:", formError);
      return NextResponse.json(
        { error: "Failed to parse form data. Please try again or use a smaller file." },
        { status: 400 }
      );
    }
    
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "uploads";
    
    if (!file) {
      console.error("Direct upload error: No file provided");
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }
    
    // Validate the file
    if (file.size === 0) {
      return NextResponse.json(
        { error: "Cannot upload empty file" },
        { status: 400 }
      );
    }
    
    console.log(`Processing direct upload: ${file.name}, size: ${(file.size/1024/1024).toFixed(2)} MB, folder: ${folder}`);
    
    // Check if AWS credentials are configured
    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error("AWS credentials not configured");
      return NextResponse.json(
        { error: "Server configuration error: Missing S3 credentials" },
        { status: 500 }
      );
    }
    
    // Check if bucket name is configured
    const bucketName = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      console.error("AWS bucket name not configured");
      return NextResponse.json(
        { error: "Server configuration error: Missing S3 bucket name" },
        { status: 500 }
      );
    }
    
    // Upload with timeout handling
    let timeoutId: NodeJS.Timeout | null = null;
    const uploadPromise = uploadToS3(file, folder);
    
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Upload timed out on the server"));
      }, 300000); // 5 minute timeout for very large files
    });
    
    // Race the upload against the timeout
    let fileUrl;
    try {
      fileUrl = await Promise.race([uploadPromise, timeoutPromise]);
      if (timeoutId) clearTimeout(timeoutId);
    } catch (uploadError) {
      if (timeoutId) clearTimeout(timeoutId);
      console.error("Upload error:", uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}` },
        { status: 500 }
      );
    }
    
    console.log(`Direct upload successful, URL: ${fileUrl}`);
    
    return NextResponse.json({ 
      fileUrl,
      success: true,
      file: {
        name: file.name,
        size: file.size,
        type: file.type
      }
    });
  } catch (error) {
    console.error("Error in direct upload:", error);
    return NextResponse.json(
      { error: `Failed to upload file: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
