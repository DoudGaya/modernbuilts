import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Clock, CheckCircle, XCircle } from "lucide-react"
import { getUserComplaints } from "@/actions/complaint"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default async function UserComplaintsPage() {
  const complaintsData = await getUserComplaints()
  
  if (complaintsData.error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">My Complaints</h1>
            <p className="text-gray-600">Manage your complaints and track responses</p>
          </div>
          <Link href="/user/complaints/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </Link>
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
        return 'bg-yellow-100 text-yellow-800'
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Complaints</h1>
          <p className="text-gray-600">Manage your complaints and track responses</p>
        </div>
        <Link href="/user/complaints/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Complaint
          </Button>
        </Link>
      </div>

      {complaints.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No complaints yet</h3>
            <p className="text-gray-600 mb-4">You haven't submitted any complaints yet.</p>
            <Link href="/user/complaints/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Submit Your First Complaint
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {complaints.map((complaint) => (
            <Card key={complaint.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {getStatusIcon(complaint.status)}
                      {complaint.subject}
                    </CardTitle>
                    <CardDescription>
                      Submitted on {new Date(complaint.createdAt).toLocaleDateString()}
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
                    <h4 className="font-semibold text-green-800 mb-2">Admin Response:</h4>
                    <p className="text-green-700">{complaint.response}</p>
                    {complaint.respondedAt && (
                      <p className="text-sm text-green-600 mt-2">
                        Responded on {new Date(complaint.respondedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(complaint.updatedAt).toLocaleDateString()}
                  </span>
                  <Link href={`/user/complaints/${complaint.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
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
