import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ message: "Upload API is working" })
}

export async function POST() {
  return NextResponse.json({ message: "Upload POST is working" })
}
