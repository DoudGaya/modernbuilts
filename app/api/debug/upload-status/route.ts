// app/api/debug/upload-status/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    serverStatus: "running",
    s3Config: {
      region: process.env.AWS_REGION || "not-set",
      bucketName: process.env.AWS_BUCKET_NAME || process.env.AWS_S3_BUCKET_NAME || "not-set",
      accessKeyExists: !!process.env.AWS_ACCESS_KEY_ID,
      secretKeyExists: !!process.env.AWS_SECRET_ACCESS_KEY,
    },
    endpoints: {
      directUpload: "/api/direct-upload",
      presignedUpload: "/api/upload",
      healthCheck: "/api/health-check",
    },
    maxFileSizes: {
      serverAction: "100mb",
      api: "no-limit"
    }
  };

  return NextResponse.json(diagnostics);
}

export async function POST(request: NextRequest) {
  try {
    const { testType } = await request.json();
    
    if (testType === "form-data") {
      // Test form data parsing
      return NextResponse.json({ 
        success: true, 
        message: "Form data endpoint is accessible",
        canParseJson: true
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "POST endpoint is working",
      receivedData: { testType }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error",
        message: "POST endpoint failed"
      },
      { status: 500 }
    );
  }
}
