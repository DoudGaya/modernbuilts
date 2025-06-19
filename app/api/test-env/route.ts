// app/api/test-env/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  // For security, we mask most of the value but show enough to debug
  const maskValue = (value: string | undefined) => {
    if (!value) return "undefined";
    if (value.length <= 8) return "***" + value.substring(value.length - 2);
    return value.substring(0, 3) + "..." + value.substring(value.length - 3);
  };

  // Return environment variables (with sensitive data masked)
  return NextResponse.json({
    AWS_REGION: process.env.AWS_REGION || "not set",
    AWS_ACCESS_KEY_ID: maskValue(process.env.AWS_ACCESS_KEY_ID),
    AWS_SECRET_ACCESS_KEY: maskValue(process.env.AWS_SECRET_ACCESS_KEY),
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME || "not set",
    NODE_ENV: process.env.NODE_ENV,
  });
}
