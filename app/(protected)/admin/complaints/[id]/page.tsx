"use client"

import { useState, useTransition, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Clock, MessageSquare, CheckCircle, XCircle, User, Calendar, Send } from "lucide-react"
import { getComplaintByIdAdmin, respondToComplaint } from "@/actions/complaint"
import Link from "next/link"
import { FormError } from "@/components/FormError"
import { FormSuccess } from "@/components/FormSuccess"

export default function AdminComplaintDetailPage() {
  const params = useParams()
  const [complaint, setComplaint] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [response, setResponse] = useState("")
  const [status, setStatus] = useState("Resolved")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    if (params.id) {
      loadComplaint()
    }
  }, [params.id])
  const loadComplaint = async () => {
    setLoading(true)
    const result = await getComplaintByIdAdmin(params.id as string)
    
    if (result.error) {
      setError(result.error)
    } else if (result.complaint) {
      setComplaint(result.complaint)
    }
    setLoading(false)
  }

  const handleSubmitResponse = () => {
    if (!response.trim()) {
      setError("Please enter a response")
      return
    }

    setError("")
    setSuccess("")
    
    startTransition(() => {
      respondToComplaint(params.id as string, response, status)
        .then((data) => {
          if (data.error) {
            setError(data.error)
          } else if (data.success) {
            setSuccess(data.success)
            setResponse("")
            loadComplaint() // Reload to show the response
          }
        })
        .catch(() => {
          setError("Something went wrong!")
        })
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return <Clock className="h-5 w-5" />
      case 'in progress':
        return <MessageSquare className="h-5 w-5" />
      case 'resolved':
        return <CheckCircle className="h-5 w-5" />
      case 'closed':
        return <XCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'open':
        return 'bg-red-100 text-red-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/complaints">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Complaints
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Loading...</h1>
          </div>
        </div>
      </div>
    )
  }

  if (error && !complaint) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/complaints">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Complaints
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Error</h1>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/complaints">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Complaint Details</h1>
          <p className="text-gray-600">View and respond to complaint</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Complaint Details */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(complaint.status)}
                  {complaint.subject}
                </CardTitle>
                <CardDescription>
                  Complaint ID: {complaint.id}
                </CardDescription>
              </div>
              <Badge className={getStatusColor(complaint.status)}>
                {complaint.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">User Information:</h3>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {complaint.user.name || 'Unknown'}
                  </span>
                  <span>{complaint.user.email}</span>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="text-gray-700 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                  {complaint.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Submitted:</span>
                  <p className="text-gray-600">{new Date(complaint.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <span className="font-semibold">Last Updated:</span>
                  <p className="text-gray-600">{new Date(complaint.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Response */}
        {complaint.response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Current Response</CardTitle>
              {complaint.respondedAt && (
                <CardDescription>
                  Responded on {new Date(complaint.respondedAt).toLocaleString()}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 whitespace-pre-wrap">{complaint.response}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {complaint.response ? 'Update Response' : 'Send Response'}
            </CardTitle>
            <CardDescription>
              {complaint.response 
                ? 'You can update your response and change the status.'
                : 'Provide a response to help resolve this complaint.'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Response *</label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Enter your response to this complaint..."
                  rows={6}
                  disabled={isPending}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="flex gap-4">
                <Button 
                  onClick={handleSubmitResponse}
                  disabled={isPending || !response.trim()}
                  className="flex-1"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isPending ? "Sending..." : "Send Response"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
