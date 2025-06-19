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

export async function POST(request: NextRequest) {
  try {
    console.log("Starting direct upload processing");
    
    // Parse multipart form data
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "uploads";
    
    if (!file) {
      console.error("Direct upload error: No file provided");
      return NextResponse.json(
        { error: "File is required" },
        { status: 400 }
      );
    }
    
    console.log(`Processing direct upload: ${file.name}, size: ${(file.size/1024/1024).toFixed(2)} MB, folder: ${folder}`);
    
    // Upload directly to S3 using our server-side function
    const fileUrl = await uploadToS3(file, folder);
    
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
