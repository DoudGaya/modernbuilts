import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Clock, CheckCircle, XCircle, User, Calendar } from "lucide-react"
import { getAllComplaints } from "@/actions/complaint"
import Link from "next/link"

export default async function AdminComplaintsPage() {
  const complaintsData = await getAllComplaints()
  
  if (complaintsData.error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Complaints Management</h1>
          <p className="text-gray-600">Manage and respond to user complaints</p>
        </div>
        <div className="text-center py-8">
          <p className="text-red-600">Error loading complaints: {complaintsData.error}</p>
        </div>
      </div>
    )
  }

  const complaints = complaintsData.complaints || []

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return <Clock className="h-4 w-4" />
      case 'in progress':
        return <MessageSquare className="h-4 w-4" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4" />
      case 'closed':
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
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

  const getStatusPriority = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 4
      case 'in progress': return 3
      case 'resolved': return 2
      case 'closed': return 1
      default: return 0
    }
  }

  // Sort complaints by status priority (open first) then by creation date
  const sortedComplaints = [...complaints].sort((a, b) => {
    const priorityDiff = getStatusPriority(b.status) - getStatusPriority(a.status)
    if (priorityDiff !== 0) return priorityDiff
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Complaints Management</h1>
        <p className="text-gray-600">Manage and respond to user complaints</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {complaints.filter(c => c.status.toLowerCase() === 'open').length}
                </p>
                <p className="text-sm text-gray-600">Open</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {complaints.filter(c => c.status.toLowerCase() === 'in progress').length}
                </p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {complaints.filter(c => c.status.toLowerCase() === 'resolved').length}
                </p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-gray-500" />
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {complaints.length}
                </p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complaints List */}
      {sortedComplaints.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No complaints found</h3>
            <p className="text-gray-600">No complaints have been submitted yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sortedComplaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(complaint.status)}
                      {complaint.subject}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {complaint.user.name || 'Unknown'} ({complaint.user.email})
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(complaint.createdAt).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(complaint.status)}>
                    {complaint.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{complaint.description}</p>
                
                {complaint.response && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Response:</h4>
                    <p className="text-green-700 text-sm line-clamp-2">{complaint.response}</p>
                    {complaint.respondedAt && (
                      <p className="text-sm text-green-600 mt-2">
                        Responded on {new Date(complaint.respondedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    ID: {complaint.id.slice(-8)}
                  </span>
                  <Link href={`/admin/complaints/${complaint.id}`}>
                    <Button variant="outline" size="sm">
                      {complaint.response ? 'View Details' : 'Respond'}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
