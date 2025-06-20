// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/s3-client";

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
    // Check content type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: "Invalid content type. Expected application/json" },
        { status: 400 }
      );
    }
    
    // Parse JSON with error handling
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      console.error("Failed to parse JSON:", jsonError);
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }
    
    const { fileName, fileType, folder } = body;
    
    // Debug logging
    console.log("Upload request received:", { fileName, fileType, folder });
    console.log("Environment:", {
      region: process.env.AWS_REGION,
      bucket: process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME,
      // Mask sensitive info
      keyIdExists: !!process.env.AWS_ACCESS_KEY_ID,
      secretExists: !!process.env.AWS_SECRET_ACCESS_KEY,
    });
    
    if (!fileName || !fileType) {
      return NextResponse.json(
        { error: "File name and type are required" },
        { status: 400 }
      );
    }
    
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
    
    // Generate presigned URL with timeout handling
    let timeoutId: NodeJS.Timeout | null = null;
    const presignedPromise = generatePresignedUrl(fileName, fileType, folder);
    
    // Create a timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(new Error("Generating presigned URL timed out"));
      }, 15000); // 15 seconds should be plenty for generating a URL
    });
    
    // Race the operation against the timeout
    let result;
    try {
      result = await Promise.race([presignedPromise, timeoutPromise]);
      if (timeoutId) clearTimeout(timeoutId);
    } catch (genError) {
      if (timeoutId) clearTimeout(timeoutId);
      console.error("Error generating presigned URL:", genError);
      return NextResponse.json(
        { error: `Failed to generate presigned URL: ${genError instanceof Error ? genError.message : String(genError)}` },
        { status: 500 }
      );
    }
    
    const { uploadUrl, fileUrl } = result;
    
    console.log("Generated presigned URL successfully", { fileUrl });
    
    return NextResponse.json({ 
      uploadUrl, 
      fileUrl,
      expiresIn: 3600, // Let the client know this URL expires in 1 hour
      success: true
    });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: `Failed to generate upload URL: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}