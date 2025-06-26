"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, FileText, Calendar, User, MapPin, Download } from "lucide-react"
import {
  getAllLandSubmissions,
  updateLandSubmissionStatus,
  provideLandSubmissionFeedback,
} from "@/actions/land-submission"
import { toast } from "@/components/ui/use-toast"

// Define the TypeScript interface for land submission
interface LandSubmission {
  id: string;
  location: string;
  size: string;
  titleType: string;
  currentUse: string | null;
  description: string;
  documents: string[];
  status: string;
  feedback?: string | null;
  plans: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
  userId?: string | null;
}

export default function LandSubmissionsPage() {
  const [submissions, setSubmissions] = useState<LandSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<LandSubmission | null>(null)
  const [feedback, setFeedback] = useState("")
  useEffect(() => {
    loadSubmissions()
  }, [searchTerm, statusFilter])
  const loadSubmissions = async () => {
    setLoading(true)
    try {
      const result = await getAllLandSubmissions({
        search: searchTerm,
        status: statusFilter,
      })

      if (result.success && Array.isArray(result.submissions)) {
        // Safely cast the submissions to ensure TypeScript is happy
        const typedSubmissions = result.submissions as LandSubmission[]
        setSubmissions(typedSubmissions)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load submissions",
          variant: "destructive",
        })
        setSubmissions([])
      }
    } catch (error) {
      console.error("Error loading submissions:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
      setSubmissions([])
    }
    setLoading(false)
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateLandSubmissionStatus(id, status)

    if (result.success) {
      toast({
        title: "Success",
        description: "Submission status updated",
      })
      loadSubmissions()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleProvideFeedback = async (id: string) => {
    if (!feedback.trim()) {
      toast({
        title: "Error",
        description: "Please enter feedback",
        variant: "destructive",
      })
      return
    }

    const result = await provideLandSubmissionFeedback(id, feedback)

    if (result.success) {
      toast({
        title: "Success",
        description: "Feedback provided successfully",
      })
      setFeedback("")
      setSelectedSubmission(null)
      loadSubmissions()
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div>Loading land submissions...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Land Submissions</h1>
          <p className="text-gray-600">Review and manage land development submissions</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search submissions..."
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
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>      {/* Submissions List */}
      <div className="space-y-4">
        {submissions && submissions.length > 0 ? (
          submissions.map((submission) => (
          <Card key={submission.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {submission.location}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <User className="w-4 h-4 mr-1" />
                    {submission.user?.name || "Anonymous Submission"} {submission.user?.email ? `(${submission.user.email})` : "(Public Submission)"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${
                      submission.status === "Pending"
                        ? "bg-yellow-500"
                        : submission.status === "Approved"
                          ? "bg-green-500"
                          : "bg-red-500"
                    }`}
                  >
                    {submission.status || "Pending"}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : "N/A"}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Land Details</h4>
                  <p>
                    <strong>Size:</strong> {submission.size}
                  </p>
                  <p>
                    <strong>Title Type:</strong> {submission.titleType}
                  </p>
                  <p>
                    <strong>Current Use:</strong> {submission.currentUse || "Not specified"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Documents</h4>
                  <div className="space-y-2">
                    {submission.documents && submission.documents.length > 0 ? (
                      submission.documents.map((doc, index) => (
                        <div key={index} className="flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Document {index + 1}
                          </a>
                          <Button size="sm" variant="ghost">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No documents available</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700">{submission.description}</p>
              </div>

              {submission.feedback && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Admin Feedback:</h4>
                  <p className="text-gray-700">{submission.feedback}</p>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                <Select onValueChange={(value) => handleStatusUpdate(submission.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Approved">Approve</SelectItem>
                    <SelectItem value="Rejected">Reject</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                  <FileText className="w-4 h-4 mr-1" />
                  Provide Feedback
                </Button>
              </div>

              {selectedSubmission?.id === submission.id && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <Textarea
                    placeholder="Enter your feedback..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleProvideFeedback(submission.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Send Feedback
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSubmission(null)
                        setFeedback("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No land submissions found</p>
        </div>      )}
      </div>
    </div>
  )
}
