"use client"

import { useState } from "react"
import { verifyNIN } from "@/actions/nin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NINDebugger() {
  const [nin, setNin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleVerify = async () => {
    if (!nin) return
    
    setIsLoading(true)
    console.log(`🔍 Client-side NIN verification for: ${nin}`)
    
    try {
      const verificationResult = await verifyNIN(nin)
      console.log("📋 Client-side NIN Result:", verificationResult)
      setResult(verificationResult)
    } catch (error) {
      console.error("❌ NIN Verification Error:", error)
      setResult({ error: "Verification failed" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 border-2 border-dashed border-orange-300 bg-orange-50">
      <CardHeader>
        <CardTitle className="text-orange-800">🚧 NIN Debugger (Dev Only)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter 11-digit NIN"
            value={nin}
            onChange={(e) => setNin(e.target.value)}
            maxLength={11}
            className="font-mono"
          />
          <Button 
            onClick={handleVerify} 
            disabled={isLoading || nin.length !== 11}
            size="sm"
          >
            {isLoading ? "Verifying..." : "Test"}
          </Button>
        </div>
        
        {result && (
          <div className="text-xs bg-gray-100 p-3 rounded-md overflow-auto max-h-40">
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
        
        <p className="text-xs text-orange-600">
          ⚠️ Check browser console for detailed logs
        </p>
      </CardContent>
    </Card>
  )
}
