"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Download, Printer, Calendar, DollarSign, User, Building2, QrCode } from "lucide-react"

const investments = [
  {
    id: "INV-001",
    investorName: "John Doe",
    investorEmail: "john@example.com",
    projectTitle: "Lagos Luxury Apartments",
    amount: "₦1,500,000",
    investmentDate: "2024-11-15",
    status: "Active",
    expectedReturn: "18%",
    maturityDate: "2026-11-15",
    certificateId: "CERT-LLA-001-2024",
    verificationToken: "abc123def456ghi789",
    roi: "₦270,000",
    totalValue: "₦1,770,000",
  },
  {
    id: "INV-002",
    investorName: "Jane Smith",
    investorEmail: "jane@example.com",
    projectTitle: "Abuja Commercial Complex",
    amount: "₦750,000",
    investmentDate: "2024-10-20",
    status: "Active",
    expectedReturn: "22%",
    maturityDate: "2026-04-20",
    certificateId: "CERT-ACC-002-2024",
    verificationToken: "xyz789abc123def456",
    roi: "₦165,000",
    totalValue: "₦915,000",
  },
  {
    id: "INV-003",
    investorName: "Mike Johnson",
    investorEmail: "mike@example.com",
    projectTitle: "Port Harcourt Residential Estate",
    amount: "₦300,000",
    investmentDate: "2024-09-10",
    status: "Completed",
    expectedReturn: "16%",
    maturityDate: "2024-12-10",
    certificateId: "CERT-PHR-003-2024",
    verificationToken: "def456ghi789abc123",
    roi: "₦48,000",
    totalValue: "₦348,000",
  },
]

export default function InvestmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch =
      investment.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || investment.status.toLowerCase() === statusFilter
    const matchesProject =
      projectFilter === "all" || investment.projectTitle.toLowerCase().includes(projectFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesProject
  })

  const handlePrintCertificate = (investment: (typeof investments)[0]) => {
    // This would trigger the PDF generation and print
    console.log(`Printing certificate for ${investment.certificateId}`)
  }

  const handleDownloadCertificate = (investment: (typeof investments)[0]) => {
    // This would trigger the PDF download
    console.log(`Downloading certificate for ${investment.certificateId}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investment Management</h1>
          <p className="text-gray-600">Monitor and manage all investor investments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search investments..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="lagos">Lagos Luxury Apartments</SelectItem>
                <SelectItem value="abuja">Abuja Commercial Complex</SelectItem>
                <SelectItem value="port-harcourt">Port Harcourt Residential</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Advanced Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredInvestments.map((investment) => (
          <Card key={investment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{investment.id}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <User className="w-4 h-4 mr-1" />
                    {investment.investorName}
                  </CardDescription>
                </div>
                <Badge
                  className={`${
                    investment.status === "Active"
                      ? "bg-green-500"
                      : investment.status === "Completed"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {investment.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">{investment.projectTitle}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Invested: {new Date(investment.investmentDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Maturity: {new Date(investment.maturityDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Investment Amount</p>
                  <p className="font-semibold text-lg">{investment.amount}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected ROI</p>
                  <p className="font-semibold text-lg text-green-600">{investment.roi}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center text-sm">
                  <span>Expected Return</span>
                  <span className="font-semibold">{investment.expectedReturn}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Total Value</span>
                  <span className="font-semibold text-green-600">{investment.totalValue}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-xs text-gray-500 mb-2">Certificate: {investment.certificateId}</div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handlePrintCertificate(investment)}>
                    <Printer className="w-4 h-4 mr-1" />
                    Print
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownloadCertificate(investment)}>
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <span>Verification</span>
                <a
                  href={`http://localhost:3000/user-investment/${investment.verificationToken}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <QrCode className="w-3 h-3 mr-1" />
                  Public Link
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Total Investments</p>
                <p className="text-lg font-semibold">₦12.5B</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <User className="w-8 h-8 text-blue-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active Investors</p>
                <p className="text-lg font-semibold">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building2 className="w-8 h-8 text-yellow-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-lg font-semibold">18</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div className="ml-3">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-lg font-semibold">₦2.1B</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
