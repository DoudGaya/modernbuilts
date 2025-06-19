// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/s3-client";
// import { generatePresignedUrl } from "@/lib/s3";

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, folder } = await request.json();
    
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
    
    const { uploadUrl, fileUrl } = await generatePresignedUrl(
      fileName,
      fileType,
      folder
    );
    
    console.log("Generated presigned URL successfully", { fileUrl });
    
    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: `Failed to generate upload URL: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}