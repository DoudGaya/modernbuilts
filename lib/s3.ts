import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(file: File, folder: string): Promise<string> {
  try {
    console.log(`Starting S3 upload for file: ${file.name}, size: ${(file.size/1024/1024).toFixed(2)} MB`);
    
    // Get file content as Buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    
    // Generate unique file name with UUID
    const fileKey = `${folder}/${crypto.randomUUID()}-${file.name.replace(/\s/g, "-")}`
    
    // Get bucket name with fallback
    const bucketName = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
    if (!bucketName) {
      throw new Error("S3 bucket name is not defined in environment variables");
    }
    
    const region = process.env.AWS_REGION || "us-east-1";
    
    console.log(`Uploading to S3 bucket: ${bucketName}, region: ${region}, key: ${fileKey}`);

    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.type,
    }

    await s3Client.send(new PutObjectCommand(params))
    
    console.log(`S3 upload successful for: ${file.name}`);

    return `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`
  } catch (error) {
    console.error("S3 upload error:", error)
    throw new Error("Failed to upload file")
  }
}

export async function deleteFromS3(fileUrl: string): Promise<void> {
  try {
    // Extract the key from the URL
    const url = new URL(fileUrl)
    const key = url.pathname.substring(1) // Remove leading slash

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    }

    await s3Client.send(new DeleteObjectCommand(params))
  } catch (error) {
    console.error("S3 delete error:", error)
    throw new Error("Failed to delete file")
  }
}

export async function generatePresignedUrl(key: string, contentType: string): Promise<string> {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params)
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return signedUrl
}
