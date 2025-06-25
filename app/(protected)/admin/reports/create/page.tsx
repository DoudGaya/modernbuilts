"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Upload } from "lucide-react"
import { toast } from "sonner"
import { createReport } from "@/actions/reports"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateReportPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    fileUrl: "",
    fileName: "",
    fileSize: "",
    publishDate: new Date().toISOString().split('T')[0],
    isPublic: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.type || !formData.fileUrl || !formData.fileName || !formData.fileSize) {
      toast.error("Please fill in all required fields")
      return
    }

    startTransition(() => {
      createReport(formData)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          } else {
            toast.success("Report uploaded successfully!")
            router.push("/admin/reports")
          }
        })
    })
  }

  const handleChange = (name: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const reportTypes = [
    "Financial Report",
    "Annual Report",
    "Market Report", 
    "Project Report",
    "Quarterly Report",
    "Investment Report",
    "Compliance Report",
    "Performance Report",
    "Other"
  ]

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }))
      
      // In a real application, you would upload the file to a storage service
      // and get the URL. For now, we'll simulate this.
      toast.info("File selected. In production, this would be uploaded to cloud storage.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/reports">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reports
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Upload New Report</h1>
          <p className="text-gray-600">Add a new report or document for investors</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
          <CardDescription>Enter the details for the new report</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Report Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  disabled={isPending}
                  placeholder="e.g., Q4 2024 Financial Report"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Report Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={isPending}
                placeholder="Provide a detailed description of the report content..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="publishDate">Publish Date *</Label>
              <Input
                id="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={(e) => handleChange("publishDate", e.target.value)}
                disabled={isPending}
              />
            </div>

            {/* File Upload Section */}
            <div className="space-y-4">
              <Label>File Upload *</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500 mb-4">PDF, DOC, DOCX up to 50MB</p>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                  Choose File
                </Button>
                {formData.fileName && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">
                      <strong>Selected:</strong> {formData.fileName} ({formData.fileSize})
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Manual File Details (for when using external storage) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fileUrl">File URL *</Label>
                <Input
                  id="fileUrl"
                  type="url"
                  value={formData.fileUrl}
                  onChange={(e) => handleChange("fileUrl", e.target.value)}
                  disabled={isPending}
                  placeholder="https://example.com/report.pdf"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileName">File Name *</Label>
                <Input
                  id="fileName"
                  type="text"
                  value={formData.fileName}
                  onChange={(e) => handleChange("fileName", e.target.value)}
                  disabled={isPending}
                  placeholder="report.pdf"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fileSize">File Size *</Label>
                <Input
                  id="fileSize"
                  type="text"
                  value={formData.fileSize}
                  onChange={(e) => handleChange("fileSize", e.target.value)}
                  disabled={isPending}
                  placeholder="2.4 MB"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleChange("isPublic", checked)}
                disabled={isPending}
              />
              <Label htmlFor="isPublic">Make report public (visible to all users)</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isPending} className="bg-yellow-400 hover:bg-yellow-500 text-black">
                {isPending ? "Uploading..." : "Upload Report"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">File Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Accepted formats: PDF, DOC, DOCX</li>
                <li>• Maximum file size: 50MB</li>
                <li>• Clear, readable content</li>
                <li>• Professional formatting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use descriptive titles</li>
                <li>• Include publish date in filename</li>
                <li>• Add comprehensive descriptions</li>
                <li>• Choose appropriate report type</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
