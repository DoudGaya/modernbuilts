"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Download, 
  Share2,
  MapPin, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Award,
  User,
  Building,
  QrCode,
  Loader2,
  ExternalLink,
  Printer,
  FileText
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getInvestmentById } from "@/actions/investments"
import { QRCodeSVG } from "qrcode.react"
import type { Investment } from "@/types/admin"

export default function InvestmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const user = useCurrentUser()
  const [investment, setInvestment] = useState<Investment | null>(null)
  const [loading, setLoading] = useState(true)
  const investmentId = params.id as string

  useEffect(() => {
    if (investmentId && user?.id) {
      loadInvestment()
    }
  }, [investmentId, user?.id])

  const loadInvestment = async () => {
    if (!user?.id) return
    
    setLoading(true)
    try {
      const result = await getInvestmentById(investmentId, user.id)
      if (result.success && result.investment) {
        setInvestment(result.investment)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load investment details",
          variant: "destructive",
        })
        router.push("/user/investments")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load investment details",
        variant: "destructive",
      })
      router.push("/user/investments")
    } finally {
      setLoading(false)
    }
  }

  const calculateDaysToMaturity = () => {
    if (!investment) return 0
    const today = new Date()
    const maturityDate = new Date(investment.dateOfreturn)
    const diffTime = maturityDate.getTime() - today.getTime()
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  }

  const calculateProgress = () => {
    if (!investment) return 0
    const investmentDate = new Date(investment.dateOfInvestment)
    const maturityDate = new Date(investment.dateOfreturn)
    const today = new Date()
    
    const totalDuration = maturityDate.getTime() - investmentDate.getTime()
    const elapsed = today.getTime() - investmentDate.getTime()
    
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
  }
  const handlePrintCertificate = () => {
    // Create a printable version
    const printWindow = window.open("", "_blank")
    if (printWindow && investment) {
      const qrCodeElement = document.getElementById("qr-code")
      const qrCodeSVG = qrCodeElement?.innerHTML || ""
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Investment Certificate - ${investment.certificateId}</title>
          <style>
            body { 
              font-family: 'Arial', sans-serif; 
              margin: 0; 
              background: white; 
              line-height: 1.3;
            }
            .certificate { 
              border: 2px solid #f7d046; 
              padding: 18mm 12mm; 
              max-width: 210mm; 
              min-height: 297mm;
              margin: 0 auto; 
              background: #fffbe8;
              box-sizing: border-box;
              box-shadow: none;
              position: relative;
            }
            .header { 
              text-align: center; 
              margin-bottom: 10mm; 
              border-bottom: 1px solid #f7d046;
              padding-bottom: 4mm;
            }
            .logo-section {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 4mm;
            }
            .logo-placeholder {
              width: 28mm;
              height: 28mm;
              background: #f7d046;
              border-radius: 6mm;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 10mm;
              margin-right: 6mm;
            }
            .company-name { 
              font-size: 8mm; 
              font-weight: bold; 
              color: #b68900; 
              margin-bottom: 1mm;
            }
            .company-tagline {
              font-size: 3.5mm;
              color: #b68900;
              font-style: italic;
            }
            .title { 
              font-size: 7mm; 
              font-weight: bold; 
              margin: 2mm 0 1mm 0;
              color: #b68900;
              text-transform: uppercase;
              letter-spacing: 1mm;
            }
            .subtitle {
              font-size: 4mm; 
              color: #b68900;
              margin-bottom: 2mm;
            }
            .certificate-number {
              background: #fff3cd;
              padding: 2mm 4mm;
              border-radius: 2mm;
              display: inline-block;
              font-weight: bold;
              color: #b68900;
              margin-bottom: 2mm;
              font-size: 4mm;
            }
            .content {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 8mm;
              margin-bottom: 8mm;
            }
            .section {
              background: #fff;
              padding: 4mm;
              border-radius: 3mm;
              box-shadow: none;
            }
            .section-title {
              font-size: 4mm;
              font-weight: bold;
              color: #b68900;
              margin-bottom: 2mm;
              border-bottom: 1px solid #ffe082;
              padding-bottom: 1mm;
            }
            .detail-item { 
              margin-bottom: 2mm;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .label { 
              font-weight: 600; 
              color: #b68900;
              min-width: 40%;
              font-size: 3.5mm;
            }
            .value { 
              font-weight: 700;
              color: #333;
              text-align: right;
              font-size: 3.5mm;
            }
            .value.highlight {
              color: #b68900;
              font-size: 4mm;
            }
            .qr-section { 
              text-align: center; 
              margin-top: 6mm;
              background: #fff;
              padding: 4mm;
              border-radius: 3mm;
            }
            .qr-title {
              font-size: 4mm;
              font-weight: bold;
              color: #b68900;
              margin-bottom: 2mm;
            }
            .verification-url {
              font-size: 2.5mm;
              color: #b68900;
              margin-top: 2mm;
              word-break: break-all;
            }
            .footer { 
              text-align: center; 
              margin-top: 8mm; 
              font-size: 3mm; 
              color: #b68900;
              border-top: 1px solid #ffe082;
              padding-top: 2mm;
            }
            .authenticity-seal {
              position: absolute;
              top: 8mm;
              right: 8mm;
              background: #f7d046;
              color: #fff;
              padding: 2mm 6mm;
              border-radius: 10mm;
              font-size: 3mm;
              font-weight: bold;
              transform: rotate(10deg);
            }
            @media print {
              html, body {
                width: 210mm;
                height: 297mm;
                margin: 0;
                padding: 0;
                background: white;
              }
              .certificate {
                box-shadow: none;
                border: 2px solid #b68900;
                background: #fffbe8;
                min-height: 297mm;
                max-width: 210mm;
                padding: 10mm 8mm;
              }
              .footer {
                margin-top: 4mm;
                font-size: 2.5mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="authenticity-seal">VERIFIED</div>
            
            <div class="header">
              <div class="logo-section">
                <div class="logo-placeholder">SB</div>
                <div>
                  <div class="company-name">STABLEBRICKS</div>
                  <div class="company-tagline">Engineering Solutions</div>
                </div>
              </div>
              <div class="title">Investment Certificate</div>
              <div class="subtitle">Certificate of Investment Ownership</div>
              <div class="certificate-number">
                Certificate No: ${investment.certificateId || `SB-CERT-${investment.id.slice(-8).toUpperCase()}`}
              </div>
            </div>
            
            <div class="content">
              <div class="section">
                <div class="section-title">Investment Information</div>
                <div class="detail-item">
                  <div class="label">Investor Name:</div>
                  <div class="value">${investment.user?.name || user?.name}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Investment Amount:</div>
                  <div class="value highlight">₦${investment.investmentAmount.toLocaleString()}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Expected Return:</div>
                  <div class="value highlight">₦${investment.investmentReturn.toLocaleString()}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Investment Date:</div>
                  <div class="value">${new Date(investment.dateOfInvestment).toLocaleDateString('en-GB')}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Maturity Date:</div>
                  <div class="value">${new Date(investment.dateOfreturn).toLocaleDateString('en-GB')}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Status:</div>
                  <div class="value">${investment.status}</div>
                </div>
              </div>
              
              <div class="section">
                <div class="section-title">Project Details</div>
                <div class="detail-item">
                  <div class="label">Project:</div>
                  <div class="value">${investment.project?.title}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Location:</div>
                  <div class="value">${investment.project?.location || `${investment.project?.city}, ${investment.project?.state}`}</div>
                </div>
                <div class="detail-item">
                  <div class="label">Expected ROI:</div>
                  <div class="value">${investment.project?.roi || 18}% p.a.</div>
                </div>
                ${investment.shares ? `
                <div class="detail-item">
                  <div class="label">Shares Owned:</div>
                  <div class="value">${investment.shares.toLocaleString()}</div>
                </div>
                ` : ''}
              </div>
            </div>
            
            <div class="qr-section">
              <div class="qr-title">Certificate Verification</div>
              ${qrCodeSVG}
              <div class="verification-url">
                Scan QR code or visit: https://stablebricks.com/user-investment/${investment.verificationToken}
              </div>
            </div>
            
            <div class="footer">
              <p><strong>This certificate represents your investment ownership in the StableBricks project listed above.</strong></p>
              <p>This digital certificate is legally binding and serves as proof of investment under Nigerian investment laws.</p>
              <p>© ${new Date().getFullYear()} StableBricks Engineering Solutions. All rights reserved.</p>
              <p>For inquiries: investors@stablebricks.com | Support: support@stablebricks.com</p>
            </div>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleShareCertificate = async () => {
    if (investment?.verificationToken) {
      const shareUrl = `https://stablebricks.com/user-investment/${investment.verificationToken}`
      try {
        await navigator.clipboard.writeText(shareUrl)
        toast({
          title: "Success",
          description: "Certificate verification URL copied to clipboard",
        })
      } catch (error) {
        toast({
          title: "Info",
          description: `Verification URL: ${shareUrl}`,
        })
      }
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!investment) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Investment Not Found</h2>
        <p className="text-gray-600 mb-4">The investment you're looking for doesn't exist.</p>
        <Link href="/user/investments">
          <Button>Back to Investments</Button>
        </Link>
      </div>
    )
  }

  const progress = calculateProgress()
  const daysToMaturity = calculateDaysToMaturity()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Link href="/user/investments">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Investments
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{investment.project?.title}</h1>
            <p className="text-gray-600 flex items-center mt-2">
              <MapPin className="w-4 h-4 mr-1" />
              {investment.project?.location}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {investment.verificationToken && (
            <Button variant="outline" asChild>
              <Link href={`/user-investment/${investment.verificationToken}`} target="_blank">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Public Certificate
              </Link>
            </Button>
          )}          <Button variant="outline" onClick={handlePrintCertificate}>
            <Printer className="w-4 h-4 mr-2" />
            Print Certificate
          </Button>
          <Button variant="outline" onClick={handleShareCertificate}>
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Investment Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Investment Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Maturity</span>
                  <span>{progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="text-sm text-gray-600">Days to Maturity</div>
                  <div className="text-xl font-bold">{daysToMaturity}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="text-sm text-gray-600">Expected Return</div>
                  <div className="text-xl font-bold">
                    ₦{(investment.investmentAmount * ((investment.project?.roi || 18) / 100)).toLocaleString()}
                  </div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Award className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="text-sm text-gray-600">ROI Rate</div>
                  <div className="text-xl font-bold">{investment.project?.roi || 18}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {investment.project?.coverImage && (
                <div className="mb-4">
                  <img
                    src={investment.project.coverImage}
                    alt={investment.project.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Project Name:</span>
                      <span className="font-medium">{investment.project?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{investment.project?.category || "Real Estate"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium">{investment.project?.location}</span>
                    </div>
                    {investment.project?.state && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-medium">{investment.project.state}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Investment Timeline</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">{new Date(investment.dateOfInvestment).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Maturity Date:</span>
                      <span className="font-medium">{new Date(investment.dateOfreturn).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {Math.ceil((new Date(investment.dateOfreturn).getTime() - new Date(investment.dateOfInvestment).getTime()) / (1000 * 60 * 60 * 24 * 365))} year(s)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Certificate */}
          <Card id="certificate-section">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
              <CardTitle className="flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Investment Certificate
              </CardTitle>
              <CardDescription className="text-black/80">
                Official certificate of your investment ownership
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-2xl font-bold mb-2">StableBricks Investment Certificate</div>
                <div className="text-lg text-gray-600">Certificate of Investment Ownership</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Certificate Number</div>
                    <div className="font-semibold font-mono">{investment.certificateId}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Investor Name</div>
                    <div className="font-semibold">{investment.user?.name || user?.name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Investment Amount</div>
                    <div className="font-semibold text-green-600">₦{investment.investmentAmount.toLocaleString()}</div>
                  </div>
                  {investment.shares && (
                    <div>
                      <div className="text-sm text-gray-600">Shares Owned</div>
                      <div className="font-semibold">{investment.shares} shares</div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Verification QR Code</div>
                  <div className="flex justify-center" id="qr-code">
                    {investment.verificationToken && (
                      <QRCodeSVG
                        value={`https://stablebricks.com/user-investment/${investment.verificationToken}`}
                        size={150}
                        level="H"
                        includeMargin={true}
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Scan to verify certificate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Investment Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Investment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Investment Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₦{investment.investmentAmount.toLocaleString()}
                </p>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <Badge 
                    className={
                      investment.status === "ACTIVE" ? "bg-green-600" :
                      investment.status === "COMPLETED" ? "bg-blue-600" :
                      investment.status === "PENDING" ? "bg-yellow-600" :
                      "bg-gray-600"
                    }
                  >
                    {investment.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expected ROI:</span>
                  <span className="text-sm font-medium">{investment.project?.roi || 18}%</span>
                </div>
                {investment.transactionRef && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Transaction Ref:</span>
                    <span className="text-sm font-mono">{investment.transactionRef.slice(-8)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handlePrintCertificate}
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Certificate
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleShareCertificate}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Certificate
              </Button>
              
              {investment.verificationToken && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/user-investment/${investment.verificationToken}`} target="_blank">
                    <QrCode className="w-4 h-4 mr-2" />
                    Verify Public
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Have questions about your investment? Our support team is here to help.
              </p>
              <Link href="/contact">
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
