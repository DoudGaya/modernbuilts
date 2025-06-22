"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MessageSquare, Calendar, User } from "lucide-react"
import { getAllComplaints, updateComplaintStatus, respondToComplaint } from "@/actions/complaint"
// import { toast } from "@/components/ui/use-toast"
import { toast } from 'sonner'

type ComplaintWithUser = {
  id: string;
  subject: string;
  description: string;
  status: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  response: string | null;
  respondedAt: Date | null;
  user: {
    name: string | null;
    email: string | null;
  };
}

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<ComplaintWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedComplaint, setSelectedComplaint] = useState<ComplaintWithUser | null>(null)
  const [response, setResponse] = useState("")

  useEffect(() => {
    loadComplaints()
  }, [searchTerm, statusFilter])

  const loadComplaints = async () => {
    setLoading(true)
    const result = await getAllComplaints({
      search: searchTerm,
      status: statusFilter,
    })

    if (result.success) {
      setComplaints(result.complaints)
    } else {
       toast("Error...", {
          description: "Failed to load complaints",
         
        })
    }
    setLoading(false)
  }
  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateComplaintStatus(id, status)

    if (result.success) {
      toast.success("Complaint status updated")
      loadComplaints()
    } else {
      toast.error(result.error || "Failed to update status")
    }
  }
  const handleRespond = async (id: string) => {
    if (!response.trim()) {
      toast.error("Please enter a response")
      return
    }

    const result = await respondToComplaint(id, response)

    if (result.success) {
      toast.success("Response sent successfully")
      setResponse("")
      setSelectedComplaint(null)
      loadComplaints()
    } else {
      toast.error(result.error || "Failed to send response")
    }
  }

  if (loading) {
    return <div>Loading complaints...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Complaints</h1>
          <p className="text-gray-600">Manage and respond to user complaints</p>
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
                placeholder="Search complaints..."
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
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{complaint.subject}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <User className="w-4 h-4 mr-1" />
                    {complaint.user.name} ({complaint.user.email})
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${
                      complaint.status === "Open"
                        ? "bg-red-500"
                        : complaint.status === "In Progress"
                          ? "bg-yellow-500"
                          : complaint.status === "Resolved"
                            ? "bg-green-500"
                            : "bg-gray-500"
                    }`}
                  >
                    {complaint.status}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-700">{complaint.description}</p>
              </div>

              {complaint.response && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Admin Response:</h4>
                  <p className="text-gray-700">{complaint.response}</p>                  <p className="text-sm text-gray-500 mt-2">
                    Responded on: {complaint.respondedAt ? new Date(complaint.respondedAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2 border-t">
                <Select onValueChange={(value) => handleStatusUpdate(complaint.id, value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={() => setSelectedComplaint(complaint)}>
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Respond
                </Button>
              </div>

              {selectedComplaint?.id === complaint.id && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <Textarea
                    placeholder="Enter your response..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={4}
                  />
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleRespond(complaint.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Send Response
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedComplaint(null)
                        setResponse("")
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {complaints.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No complaints found</p>
        </div>
      )}
    </div>
  )
}
