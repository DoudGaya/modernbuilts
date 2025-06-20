"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Eye, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function InvestmentSuccessPage() {
  const searchParams = useSearchParams()
  const transactionRef = searchParams.get('ref')
  const amount = searchParams.get('amount')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <CardTitle className="text-2xl text-green-600">Investment Successful!</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Investment Amount</p>
            <p className="text-2xl font-bold text-green-600">
              ₦{amount ? parseInt(amount).toLocaleString() : '0'}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Transaction Reference</p>
            <p className="text-sm font-mono bg-gray-100 p-2 rounded break-all">
              {transactionRef}
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Your investment has been successfully processed. You will receive:
            </p>
            <ul className="text-sm text-left space-y-1">
              <li>• Investment certificate via email</li>
              <li>• Regular project updates</li>
              <li>• Return payments as scheduled</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/user/investments" className="block">
              <Button className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                View My Investments
              </Button>
            </Link>
            
            <Link href="/user/projects" className="block">
              <Button variant="outline" className="w-full">
                <ArrowRight className="w-4 h-4 mr-2" />
                Browse More Projects
              </Button>
            </Link>

            <Link href="/user/dashboard" className="block">
              <Button variant="ghost" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
