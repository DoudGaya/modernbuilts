"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Download, Printer, Calendar, DollarSign, User, Building2, QrCode, AlertCircle } from "lucide-react"
import { getAllInvestments, getProjectsForFilter, generateInvestmentCertificate } from "@/actions/investments"
import { toast } from "sonner"
import { format } from "date-fns"

type Investment = {
  id: string
  investmentAmount: number
  investmentReturn: number
  dateOfInvestment: Date
  status: string
  dateOfreturn: Date
  shares: number | null
  certificateId: string | null
  verificationToken: string | null
  user: {
    id: string
    name: string | null
    email: string | null
  }
  project: {
    id: string
    title: string
    roi: number
    location: string
    state: string
    city: string
  }
}

type Project = {
  id: string
  title: string
}

export default function InvestmentsPage() {
  const [investments, setInvestments] = useState<Investment[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [projectFilter, setProjectFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadInvestments()
    loadProjects()
  }, [searchTerm, statusFilter, projectFilter, currentPage])

  const loadInvestments = async () => {
    setLoading(true)
    const result = await getAllInvestments({
      search: searchTerm,
      status: statusFilter,
      projectId: projectFilter,
      page: currentPage,
      limit: 9,
    })

    if (result.success) {
      setInvestments(result.investments)
      setPagination(result.pagination)
      setStats(result.stats)
    } else {
      toast.error(result.error || "Failed to load investments")
    }
    setLoading(false)
  }

  const loadProjects = async () => {
    const result = await getProjectsForFilter()
    if (result.success) {
      setProjects(result.projects)
    }
  }

  const handlePrintCertificate = async (investment: Investment) => {
    try {
      const result = await generateInvestmentCertificate(investment.id)
      if (result.success) {
        // Trigger print dialog
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head><title>Certificate - ${investment.certificateId}</title></head>
              <body>
                <iframe src="data:application/pdf;base64,${result.certificatePDF}" width="100%" height="100%"></iframe>
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
        }
      } else {
        toast.error(result.error || "Failed to generate certificate")
      }
    } catch (error) {
      toast.error("Failed to print certificate")
    }
  }

  const handleDownloadCertificate = async (investment: Investment) => {
    try {
      const result = await generateInvestmentCertificate(investment.id)
      if (result.success) {
        // Create download link
        const link = document.createElement('a')
        link.href = `data:application/pdf;base64,${result.certificatePDF}`
        link.download = `Certificate-${investment.certificateId}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        toast.error(result.error || "Failed to generate certificate")
      }
    } catch (error) {
      toast.error("Failed to download certificate")
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500"
      case "COMPLETED":
        return "bg-blue-500"
      case "PENDING":
        return "bg-yellow-500"
      case "END":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateROI = (investment: Investment) => {
    return (investment.investmentAmount * investment.project.roi) / 100
  }

  const calculateTotalValue = (investment: Investment) => {
    return investment.investmentAmount + calculateROI(investment)
  }

  if (loading && investments.length === 0) {
    return <div className="flex justify-center items-center h-64">Loading investments...</div>
  }  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">Investment Management</h1>
          <p className="text-gray-600 text-sm md:text-base">Monitor and manage all investor investments</p>
        </div>
        <div className="flex gap-2 justify-center sm:justify-end">
          <Button variant="outline" onClick={() => loadInvestments()} size="sm">
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Export Data</span>
            <span className="sm:hidden">Export</span>
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg md:text-xl">
            <Filter className="w-4 md:w-5 h-4 md:h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search investments..."
                className="pl-10 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="end">Ended</SelectItem>
              </SelectContent>
            </Select>
            <Select value={projectFilter} onValueChange={setProjectFilter}>
              <SelectTrigger className="text-sm">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    <span className="truncate">{project.title}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setProjectFilter("all")
              setCurrentPage(1)
            }}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Investments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {investments.map((investment) => (
          <Card key={investment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg truncate">{investment.certificateId || `INV-${investment.id.slice(-6)}`}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <User className="w-3 md:w-4 h-3 md:h-4 mr-1" />
                    <span className="truncate text-xs md:text-sm">{investment.user.name || investment.user.email}</span>
                  </CardDescription>
                </div>                <Badge className={`${getStatusBadgeColor(investment.status)} text-xs`}>
                  {investment.status}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 md:space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-xs md:text-sm">
                  <Building2 className="w-3 md:w-4 h-3 md:h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span className="font-medium truncate">{investment.project.title}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm">
                  <Calendar className="w-3 md:w-4 h-3 md:h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span>Invested: {format(new Date(investment.dateOfInvestment), "MMM dd, yyyy")}</span>
                </div>
                <div className="flex items-center text-xs md:text-sm">
                  <Calendar className="w-3 md:w-4 h-3 md:h-4 mr-2 text-gray-500 flex-shrink-0" />
                  <span>Maturity: {format(new Date(investment.dateOfreturn), "MMM dd, yyyy")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 text-xs md:text-sm">
                <div>
                  <p className="text-gray-600">Investment Amount</p>
                  <p className="font-semibold text-sm md:text-lg">{formatCurrency(investment.investmentAmount)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expected ROI</p>
                  <p className="font-semibold text-sm md:text-lg text-green-600">{formatCurrency(calculateROI(investment))}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-2 md:p-3 rounded-lg">
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span>Expected Return</span>
                  <span className="font-semibold">{investment.project.roi}%</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span>Total Value</span>
                  <span className="font-semibold text-green-600">{formatCurrency(calculateTotalValue(investment))}</span>
                </div>
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span>Shares</span>
                  <span className="font-semibold">{investment.shares || 1}</span>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-xs text-gray-500 mb-2 truncate">
                  Certificate: {investment.certificateId || "Not Generated"}
                </div>
                <div className="flex gap-1 md:gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs p-1 md:p-2">
                    <Eye className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePrintCertificate(investment)}
                    disabled={!investment.certificateId}
                    className="flex-1 text-xs p-1 md:p-2"
                  >
                    <Printer className="w-3 h-3 mr-1" />
                    <span className="hidden sm:inline">Print</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDownloadCertificate(investment)}
                    disabled={!investment.certificateId}
                    className="p-1 md:p-2"
                  >
                    <Download className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {investment.verificationToken && (
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>Verification</span>
                  <a
                    href={`/user-investment/${investment.verificationToken}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <QrCode className="w-3 h-3 mr-1" />
                    Public Link
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Card>
          <CardContent className="p-3 md:p-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="text-xs md:text-sm text-gray-600 text-center sm:text-left">
                Showing {((currentPage - 1) * 9) + 1} to {Math.min(currentPage * 9, pagination.totalInvestments)} of {pagination.totalInvestments} investments
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasPrev}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="flex items-center px-2 md:px-3 py-2 text-xs md:text-sm">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!pagination.hasNext}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center">
                <DollarSign className="w-6 md:w-8 h-6 md:h-8 text-green-500 flex-shrink-0" />
                <div className="ml-2 md:ml-3 min-w-0">
                  <p className="text-xs md:text-sm text-gray-600">Total Investments</p>
                  <p className="text-sm md:text-lg font-semibold truncate">{formatCurrency(stats.totalInvestmentValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center">
                <User className="w-6 md:w-8 h-6 md:h-8 text-blue-500 flex-shrink-0" />
                <div className="ml-2 md:ml-3">
                  <p className="text-xs md:text-sm text-gray-600">Active Investors</p>
                  <p className="text-sm md:text-lg font-semibold">{stats.activeInvestors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center">
                <Building2 className="w-6 md:w-8 h-6 md:h-8 text-yellow-500 flex-shrink-0" />
                <div className="ml-2 md:ml-3">
                  <p className="text-xs md:text-sm text-gray-600">Active Projects</p>
                  <p className="text-sm md:text-lg font-semibold">{stats.activeProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center">
                <Calendar className="w-6 md:w-8 h-6 md:h-8 text-purple-500 flex-shrink-0" />
                <div className="ml-2 md:ml-3 min-w-0">
                  <p className="text-xs md:text-sm text-gray-600">This Month</p>
                  <p className="text-sm md:text-lg font-semibold truncate">{formatCurrency(stats.thisMonthValue)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {investments.length === 0 && !loading && (
        <Card>
          <CardContent className="p-6 md:p-8">
            <div className="text-center">
              <AlertCircle className="w-8 md:w-12 h-8 md:h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-base md:text-lg font-semibold text-gray-600 mb-2">No investments found</h3>
              <p className="text-sm md:text-base text-gray-500">
                {searchTerm || statusFilter !== "all" || projectFilter !== "all"
                  ? "Try adjusting your search criteria or filters."
                  : "No investments have been made yet."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
