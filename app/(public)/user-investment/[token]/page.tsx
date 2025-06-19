import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Calendar, DollarSign, TrendingUp, MapPin } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

// Mock data - replace with actual data fetching based on token
const investment = {
  id: "1",
  investmentId: "INV-2024-001",
  user: {
    name: "John Doe",
    email: "john@example.com",
  },
  project: {
    title: "Lagos Luxury Apartments",
    location: "Victoria Island, Lagos",
    image: "/placeholder.svg?height=300&width=400",
  },
  amount: "₦2,500,000",
  expectedReturn: "18%",
  status: "Active",
  investmentDate: "2024-01-15",
  maturityDate: "2026-01-15",
  verificationToken: "abc123def456",
  certificateNumber: "SB-CERT-2024-001",
}

export default function PublicInvestmentVerificationPage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen my-[100px] bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment Certificate Verification</h1>
          <p className="text-gray-600">Verify the authenticity of this StableBricks investment certificate</p>
        </div>

        <Card className="mb-8">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-black">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Certificate Verified</CardTitle>
            <CardDescription className="text-black/80">
              This is a valid StableBricks investment certificate
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certificate Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Certificate Number:</span>
                      <span className="font-semibold">{investment.certificateNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment ID:</span>
                      <span className="font-semibold">{investment.investmentId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge className="bg-green-500">{investment.status}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Investment Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">Investment Amount:</span>
                      </div>
                      <span className="font-semibold text-green-600">{investment.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">Expected Return:</span>
                      </div>
                      <span className="font-semibold">{investment.expectedReturn}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-gray-600">Investment Date:</span>
                      </div>
                      <span className="font-semibold">{new Date(investment.investmentDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-gray-600">Maturity Date:</span>
                      </div>
                      <span className="font-semibold">{new Date(investment.maturityDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-600">Project Name:</span>
                      <div className="font-semibold">{investment.project.title}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">{investment.project.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code and Project Image */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Verification QR Code</h3>
                  <div className="flex justify-center">
                    <QRCodeSVG
                      value={`https://stablebricks.com/user-investment/${investment.verificationToken}`}
                      size={200}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Scan to verify this certificate</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Project Image</h3>
                  <img
                    src={investment.project.image || "/placeholder.svg"}
                    alt={investment.project.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Security & Authenticity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Certificate Verification</h4>
                <p className="text-sm text-gray-600">
                  This certificate has been verified against StableBricks' secure database. The investment details shown
                  are authentic and current as of the verification date.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Security Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Unique verification token</li>
                  <li>• Secure QR code verification</li>
                  <li>• Real-time database validation</li>
                  <li>• Tamper-proof certificate design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2024 StableBricks. All rights reserved.</p>
          <p>For inquiries, contact us at investors@stablebricks.com</p>
        </div>
      </div>
    </div>
  )
}
