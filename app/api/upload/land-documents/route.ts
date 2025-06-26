import { NextRequest, NextResponse } from "next/server"
import { uploadToS3 } from "@/lib/s3"

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called')
    
    const formData = await request.formData()
    const file = formData.get("file") as File

    console.log('File received:', file?.name, file?.type, file?.size)

    if (!file) {
      console.log('No file provided in request')
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.log('File too large:', file.size)
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      )
    }

    // Validate file type (documents and images)
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/webp",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]

    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type)
      return NextResponse.json(
        { error: "Invalid file type. Only PDF, Word documents, and images are allowed." },
        { status: 400 }
      )
    }

    console.log('Starting S3 upload...')
    // Upload to S3 in the land-submission folder
    const fileUrl = await uploadToS3(file, "land-submission")
    console.log('S3 upload successful:', fileUrl)

    return NextResponse.json({
      success: true,
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}
