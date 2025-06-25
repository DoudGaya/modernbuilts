"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Trash2, FileText, Download, Plus, Edit, Eye } from "lucide-react"
import { getAllReports, deleteReport } from "@/actions/reports"
import { toast } from 'sonner'
import Link from 'next/link'

type Report = {
  id: string;
  title: string;
  description: string;
  type: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  publishDate: Date;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [publicFilter, setPublicFilter] = useState("all")

  useEffect(() => {
    loadReports()
  }, [searchTerm, typeFilter, publicFilter])

  const loadReports = async () => {
    setLoading(true)
    const result = await getAllReports({
      search: searchTerm,
      type: typeFilter,
      isPublic: publicFilter === "all" ? undefined : publicFilter === "public",
    })

    if (result.success) {
      setReports(result.reports)
    } else {
      toast.error(result.error || "Failed to load reports")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) {
      return
    }

    const result = await deleteReport(id)

    if (result.success) {
      toast.success("Report deleted successfully")
      loadReports()
    } else {
      toast.error(result.error || "Failed to delete report")
    }
  }

  const reportTypes = [
    "Financial Report",
    "Annual Report", 
    "Market Report",
    "Project Report",
    "Quarterly Report",
    "Investment Report",
    "Other"
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports Management</h1>
          <p className="text-gray-600">Manage investor reports and documents</p>
        </div>
        <Button asChild>
          <Link href="/admin/reports/create">
            <Plus className="w-4 h-4 mr-2" />
            Upload Report
          </Link>
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Public Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.isPublic).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Financial Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => r.type === "Financial Report").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reports.filter(r => {
                    const reportDate = new Date(r.publishDate)
                    const now = new Date()
                    return reportDate.getMonth() === now.getMonth() && reportDate.getFullYear() === now.getFullYear()
                  }).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Visibility</label>
              <Select value={publicFilter} onValueChange={setPublicFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={() => {
                setSearchTerm("")
                setTypeFilter("all")
                setPublicFilter("all")
              }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.length > 0 ? (
          reports.map((report) => (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-8 h-8 text-yellow-600" />
                    <div>
                      <Badge variant="outline">{report.type}</Badge>
                      {report.isPublic && (
                        <Badge className="ml-2 bg-green-100 text-green-800">Public</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg">{report.title}</CardTitle>
                <CardDescription className="line-clamp-2">{report.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Published</span>
                    <span>{new Date(report.publishDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>File Size</span>
                    <span>{report.fileSize}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>File Name</span>
                    <span className="truncate ml-2">{report.fileName}</span>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(report.fileUrl, '_blank')}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/admin/reports/${report.id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(report.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reports found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || typeFilter !== "all" || publicFilter !== "all" 
                ? "Try adjusting your filters" 
                : "Get started by uploading your first report"}
            </p>
            <Button asChild>
              <Link href="/admin/reports/create">
                <Plus className="w-4 h-4 mr-2" />
                Upload Report
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
