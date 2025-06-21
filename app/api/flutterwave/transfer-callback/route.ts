import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Flutterwave transfer callback received:', body)
    
    // Here you can handle the transfer callback
    // Update transaction status, send notifications, etc.
    
    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Error handling Flutterwave callback:', error)
    return NextResponse.json({ error: 'Callback processing failed' }, { status: 500 })
  }
}
