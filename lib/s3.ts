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
    
    // Get file content as Buffer with error handling
    let fileBuffer;
    try {
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } catch (bufferError) {
      console.error("Error creating buffer from file:", bufferError);
      throw new Error(`Failed to process file data: ${bufferError instanceof Error ? bufferError.message : String(bufferError)}`);
    }
    
    // Validate buffer
    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("File data is empty or corrupted");
    }
    
    // Generate unique file name with UUID and sanitize filename
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const fileKey = `${folder}/${crypto.randomUUID()}-${sanitizedName}`;
    
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
      ContentType: file.type || "application/octet-stream", // Provide a fallback content type
      ContentDisposition: `attachment; filename="${sanitizedName}"`,
    };

    // Implement retry logic
    const maxAttempts = 3;
    let attempt = 0;
    let lastError = null;
    
    while (attempt < maxAttempts) {
      try {
        attempt++;
        console.log(`S3 upload attempt ${attempt}/${maxAttempts} for ${file.name}`);
        
        await s3Client.send(new PutObjectCommand(params));
        console.log(`S3 upload successful for: ${file.name} on attempt ${attempt}`);
        
        return `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
      } catch (attemptError) {
        lastError = attemptError;
        console.error(`S3 upload attempt ${attempt} failed:`, attemptError);
        
        if (attempt >= maxAttempts) {
          break;
        }
        
        // Wait before retrying with exponential backoff
        const backoffMs = Math.pow(2, attempt) * 1000;
        console.log(`Retrying in ${backoffMs/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, backoffMs));
      }
    }
    
    // If we got here, all attempts failed
    console.error(`All ${maxAttempts} S3 upload attempts failed for ${file.name}`);
    throw lastError || new Error("Maximum upload attempts reached");
  } catch (error) {
    console.error("S3 upload error:", error);
    
    // Provide more detailed error message
    if (error instanceof Error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    } else {
      throw new Error("Failed to upload file due to an unknown error");
    }
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
