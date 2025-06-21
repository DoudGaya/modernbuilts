"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, DollarSign, TrendingUp, MapPin, XCircle, Loader2, AlertTriangle, Award, Building2, QrCode } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { getPublicInvestmentByToken } from "@/actions/investments"

// Add print styles
const printStyles = `
  @media print {
    body { 
      margin: 0; 
      background: white !important; 
    }
    .print-container { 
      width: 210mm; 
      height: 297mm; 
      margin: 0; 
      padding: 15mm; 
      box-shadow: none !important; 
    }
    .no-print { 
      display: none !important; 
    }
    * { 
      -webkit-print-color-adjust: exact !important; 
      color-adjust: exact !important; 
    }
  }
`

interface PublicInvestment {
  id: string
  investmentAmount: number
  investmentReturn: number
  dateOfInvestment: Date
  status: string
  dateOfreturn: Date
  shares?: number | null
  certificateId?: string | null
  verificationToken?: string | null
  certificateNumber?: string
  user?: {
    id: string
    name: string | null
    email: string | null
  }
  project?: {
    id: string
    title: string
    location?: string
    state?: string
    city?: string
    coverImage?: string
    roi?: number
  }
}

export default function PublicInvestmentVerificationPage() {
  const params = useParams()
  const [investment, setInvestment] = useState<PublicInvestment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = params.token as string
  useEffect(() => {
    if (token) {
      verifyInvestment()
    }
    
    // Inject print styles
    const styleElement = document.createElement('style')
    styleElement.innerHTML = printStyles
    document.head.appendChild(styleElement)
    
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [token])

  const verifyInvestment = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const result = await getPublicInvestmentByToken(token)
      if (result.success && result.investment) {
        setInvestment(result.investment)
      } else {
        setError(result.error || "Invalid verification token")
      }
    } catch (error) {
      console.error("Verification error:", error)
      setError("Failed to verify investment")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Verifying investment certificate...</p>
        </div>
      </div>
    )
  }

  if (error || !investment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardContent className="text-center pt-6">
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">
              {error || "The investment certificate could not be verified. The token may be invalid or expired."}
            </p>
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact our support team at investors@stablebricks.com
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-500 hover:bg-green-600'
      case 'COMPLETED':
        return 'bg-blue-500 hover:bg-blue-600'
      case 'PENDING':
        return 'bg-yellow-500 hover:bg-yellow-600'
      case 'END':
        return 'bg-purple-500 hover:bg-purple-600'
      default:
        return 'bg-gray-500 hover:bg-gray-600'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* A4 Certificate Container */}
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden print-container" style={{ aspectRatio: '210/297', minHeight: '297mm', width: '210mm', margin: '0 auto' }}>
          {/* Header with StableBricks Branding */}
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-8 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-black/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center">
              {/* Logo Placeholder */}
              <div className="inline-flex items-center justify-center w-20 h-20 bg-black/10 rounded-xl mb-4">
                <span className="text-2xl font-bold text-black">SB</span>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">StableBricks</h1>
              <p className="text-lg font-medium mb-6">Engineering Solutions</p>
              
              <div className="inline-flex items-center bg-green-500 text-white px-4 py-2 rounded-full">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="font-semibold">Certificate Verified</span>
              </div>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="p-8 space-y-8">
            {/* Certificate Title */}
            <div className="text-center border-b-2 border-yellow-400 pb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Certificate</h2>
              <p className="text-gray-600">Certificate of Investment Ownership</p>
              <div className="mt-4 inline-block bg-yellow-50 border border-yellow-400 rounded-lg px-4 py-2">
                <span className="text-sm font-medium text-gray-700">Certificate ID: </span>
                <span className="font-bold text-gray-900">
                  {investment.certificateNumber || investment.certificateId || `SB-CERT-${investment.id.slice(-8).toUpperCase()}`}
                </span>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Investment Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                    Investment Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Investor:</span>
                      <span className="font-semibold">{investment.user?.name || "Anonymous"}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Investment Amount:</span>
                      <span className="font-bold text-green-600">{formatCurrency(investment.investmentAmount)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Expected Return:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(investment.investmentReturn)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Investment Date:</span>
                      <span className="font-semibold">
                        {new Date(investment.dateOfInvestment).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="font-semibold">
                        {new Date(investment.dateOfreturn).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Status:</span>
                      <Badge className={`${getStatusColor(investment.status)} text-white text-xs`}>
                        {investment.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                {investment.project && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <Building2 className="w-5 h-5 mr-2 text-yellow-500" />
                      Project Information
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Project:</span>
                        <span className="font-semibold text-right max-w-[200px]">{investment.project.title}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-semibold text-right">
                          {investment.project.location || `${investment.project.city}, ${investment.project.state}`}
                        </span>
                      </div>
                      {investment.project.roi && (
                        <div className="flex justify-between py-2">
                          <span className="text-gray-600">Expected ROI:</span>
                          <span className="font-bold text-yellow-600">{investment.project.roi}% p.a.</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - QR Code and Visual Elements */}
              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-center">
                    <QrCode className="w-5 h-5 mr-2 text-yellow-500" />
                    Verification
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg inline-block">
                    <QRCodeSVG
                      value={`https://stablebricks.com/user-investment/${investment.verificationToken}`}
                      size={120}
                      level="M"
                      includeMargin={true}
                      fgColor="#1f2937"
                      bgColor="#f9fafb"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Scan to verify certificate</p>
                </div>

                {/* Project Image */}
                {investment.project?.coverImage && (
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Project View</h3>
                    <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={investment.project.coverImage}
                        alt={investment.project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />                      <div className="absolute inset-0 items-center justify-center bg-gray-100 hidden" style={{ display: 'none' }}>
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Investment Summary Box */}
                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Investment Summary</h4>
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span>Principal:</span>
                      <span className="font-semibold">{formatCurrency(investment.investmentAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Returns:</span>
                      <span className="font-semibold text-green-600">
                        {formatCurrency(investment.investmentReturn - investment.investmentAmount)}
                      </span>
                    </div>
                    <div className="border-t border-yellow-300 pt-1 mt-2">
                      <div className="flex justify-between font-bold">
                        <span>Total Return:</span>
                        <span className="text-green-600">{formatCurrency(investment.investmentReturn)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security and Authenticity Footer */}
            <div className="border-t-2 border-yellow-400 pt-6">
              <div className="grid grid-cols-2 gap-8 text-xs">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Security Features
                  </h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Cryptographically verified</li>
                    <li>• Blockchain-backed storage</li>
                    <li>• Unique verification token</li>
                    <li>• Real-time authentication</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Legal Information</h4>
                  <p className="text-gray-600 leading-relaxed">
                    This certificate serves as legal proof of investment ownership under Nigerian investment laws. 
                    Verified on {new Date().toLocaleDateString('en-GB')} at {new Date().toLocaleTimeString('en-GB')}.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t border-gray-200 pt-4">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-yellow-400 rounded mr-2 flex items-center justify-center">
                  <span className="text-xs font-bold text-black">SB</span>
                </div>
                <span className="font-bold text-gray-900">StableBricks Engineering Solutions</span>
              </div>
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} StableBricks. All rights reserved. | 
                investors@stablebricks.com | support@stablebricks.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
