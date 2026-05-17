// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePresignedUrl } from "@/lib/s3-client";
// import { generatePresignedUrl } from "@/lib/s3";

export async function POST(request: NextRequest) {
  try {
    const { fileName, fileType, folder } = await request.json();
    
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
    
    return NextResponse.json({ uploadUrl, fileUrl });
  } catch (error) {
    console.error("Error generating presigned URL:", error);
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    );
  }
}