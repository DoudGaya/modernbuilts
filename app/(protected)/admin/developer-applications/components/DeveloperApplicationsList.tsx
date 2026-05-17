"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Eye, Check, X, Building2, Calendar, Phone, Mail } from "lucide-react"
import { updateDeveloperApplicationStatus } from "@/actions/developer"
import { useToast } from "@/components/ui/use-toast"

interface DeveloperApplication {
  id: string
  companyName: string
  companyType: string
  contactPersonName: string
  contactPersonTitle: string
  contactEmail: string
  contactPhone: string
  experienceYears: string
  projectTypes: string[]
  totalProjectsCompleted: string
  totalProjectValue: string
  annualRevenue: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  createdAt: Date
  user: {
    id: string
    name: string | null
    email: string | null
    phone: string | null
  }
}

interface Props {
  applications: DeveloperApplication[]
}

export default function DeveloperApplicationsList({ applications }: Props) {
  const [selectedApplication, setSelectedApplication] = useState<DeveloperApplication | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [feedback, setFeedback] = useState("")
  const { toast } = useToast()

  const handleStatusUpdate = async (applicationId: string, status: "APPROVED" | "REJECTED") => {
    setIsProcessing(true)
    
    try {
      const result = await updateDeveloperApplicationStatus(applicationId, status, feedback)
      
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: result.success,
        })
        // Refresh the page to show updated status
        window.location.reload()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setFeedback("")
      setSelectedApplication(null)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>
      case "APPROVED":
        return <Badge variant="default" className="bg-green-600">Approved</Badge>
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
  }

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{applications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === "PENDING").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Check className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === "APPROVED").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <X className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">
                  {applications.filter(app => app.status === "REJECTED").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Developer Applications</CardTitle>
          <CardDescription>Click on any application to view details and take action</CardDescription>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">Developer applications will appear here when submitted.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Applied</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.companyName}</p>
                        <p className="text-sm text-gray-600">{application.companyType}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.contactPersonName}</p>
                        <p className="text-sm text-gray-600">{application.contactPersonTitle}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{application.experienceYears}</p>
                        <p className="text-sm text-gray-600">{application.totalProjectsCompleted} projects</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>{formatDate(application.createdAt)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedApplication(application)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Developer Application - {application.companyName}</DialogTitle>
                            <DialogDescription>
                              Review the complete application details and take action
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedApplication && (
                            <div className="space-y-6">
                              {/* Company Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Company Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Company Name</Label>
                                    <p className="font-medium">{selectedApplication.companyName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Company Type</Label>
                                    <p className="font-medium">{selectedApplication.companyType}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Annual Revenue</Label>
                                    <p className="font-medium">{selectedApplication.annualRevenue}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-600">Total Project Value</Label>
                                    <p className="font-medium">{selectedApplication.totalProjectValue}</p>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Contact Information */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Email</Label>
                                      <p className="font-medium">{selectedApplication.contactEmail}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                    <div>
                                      <Label className="text-sm font-medium text-gray-600">Phone</Label>
                                      <p className="font-medium">{selectedApplication.contactPhone}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Project Types */}
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-lg">Specialization</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <Label className="text-sm font-medium text-gray-600">Project Types</Label>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedApplication.projectTypes.map((type) => (
                                      <Badge key={type} variant="secondary">{type}</Badge>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              {/* Actions */}
                              {selectedApplication.status === "PENDING" && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg">Review Application</CardTitle>
                                  </CardHeader>
                                  <CardContent className="space-y-4">
                                    <div>
                                      <Label htmlFor="feedback">Feedback (Optional)</Label>
                                      <Textarea
                                        id="feedback"
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Add any comments or feedback for the developer..."
                                        rows={3}
                                      />
                                    </div>
                                    
                                    <div className="flex space-x-4">
                                      <Button
                                        onClick={() => handleStatusUpdate(selectedApplication.id, "APPROVED")}
                                        disabled={isProcessing}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <Check className="h-4 w-4 mr-2" />
                                        {isProcessing ? "Processing..." : "Approve"}
                                      </Button>
                                      
                                      <Button
                                        onClick={() => handleStatusUpdate(selectedApplication.id, "REJECTED")}
                                        disabled={isProcessing}
                                        variant="destructive"
                                      >
                                        <X className="h-4 w-4 mr-2" />
                                        {isProcessing ? "Processing..." : "Reject"}
                                      </Button>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
