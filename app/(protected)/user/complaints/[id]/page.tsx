import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MessageSquare, CheckCircle, XCircle } from "lucide-react"
import { getComplaintById } from "@/actions/complaint"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ComplaintDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function ComplaintDetailPage({ params }: ComplaintDetailPageProps) {
  const { id } = await params
  const complaintData = await getComplaintById(id)
  
  if (complaintData.error || !complaintData.complaint) {
    notFound()
  }

  const complaint = complaintData.complaint

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
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
      <div className="flex items-center gap-4">
        <Link href="/user/complaints">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Complaints
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Complaint Details</h1>
          <p className="text-gray-600">View complaint status and responses</p>
        </div>
      </div>

      <div className="grid gap-6">
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
                <h3 className="font-semibold mb-2">Description:</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
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

        {complaint.response && (
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Admin Response</CardTitle>
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

        {!complaint.response && complaint.status.toLowerCase() === 'open' && (
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Response Pending</h3>
              <p className="text-gray-600">
                Your complaint has been received and is being reviewed. You'll receive an email notification when we respond.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
