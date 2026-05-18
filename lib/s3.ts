import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.REGION! || process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID! || process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY! || process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function uploadToS3(file: File, folder: string): Promise<string> {
  try {
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileKey = `${folder}/${crypto.randomUUID()}-${file.name.replace(/\s/g, "-")}`

    const params = {
      Bucket: process.env.BUCKET_NAME! || process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
      Body: fileBuffer,
      ContentType: file.type,
    }

    await s3Client.send(new PutObjectCommand(params))

    return `https://${process.env.BUCKET_NAME || process.env.AWS_BUCKET_NAME}.s3.${process.env.REGION || process.env.AWS_REGION}.amazonaws.com/${fileKey}`
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
      Bucket: process.env.BUCKET_NAME! || process.env.AWS_BUCKET_NAME!,
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
    Bucket: process.env.BUCKET_NAME! || process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: contentType,
  }

  const command = new PutObjectCommand(params)
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return signedUrl
}
