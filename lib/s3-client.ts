// lib/s3-client.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.REGION || process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Generate a unique file name with original extension
export const generateUniqueFileName = (originalName: string) => {
  const fileExtension = originalName.split('.').pop();
  const randomName = crypto.randomBytes(16).toString('hex');
  return `${randomName}.${fileExtension}`;
};

// Create a presigned URL for direct browser upload to S3
export async function generatePresignedUrl(
  fileName: string,
  fileType: string,
  folder: string = "jigawa-state/stb"
) {
  const uniqueFileName = `${folder}/${generateUniqueFileName(fileName)}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME,
    Key: uniqueFileName,
    ContentType: fileType,
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // URL expires in 1 hour
  });
  
  return {
    uploadUrl: signedUrl,
    fileUrl: `https://${process.env.BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${uniqueFileName}`,
  };
}