// lib/s3-client.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

// Initialize S3 client with retry configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: false, // Use subdomain style access (bucket.s3.region.amazonaws.com)
  maxAttempts: 3, // Retry failed requests up to 3 times
  retryMode: "standard", // Use exponential backoff
  // Extended timeout for operations
  requestHandler: {
    // @ts-ignore - Type is not fully defined in SDK
    connectionTimeout: 5000, // 5 seconds to establish connection
    socketTimeout: 60000 // 60 seconds for socket inactivity
  }
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
    // Use AWS_BUCKET_NAME for consistency with other files
  const bucketName = process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME;
  
  if (!bucketName) {
    throw new Error("S3 bucket name is not defined. Please check your environment variables.");
  }
  
  console.log(`Generating presigned URL for bucket: ${bucketName}, key: ${uniqueFileName}`);
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: uniqueFileName,
    ContentType: fileType,
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 3600, // URL expires in 1 hour
  });
  return {
    uploadUrl: signedUrl,
    fileUrl: `https://${bucketName}.s3.${process.env.AWS_REGION || "us-east-1"}.amazonaws.com/${uniqueFileName}`,
  };
}