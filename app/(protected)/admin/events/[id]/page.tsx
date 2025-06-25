"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Calendar, MapPin, Users, Clock, Edit, Trash2, Mail, Phone, Building } from "lucide-react"
import { getEventById, deleteEvent, updateRegistrationStatus } from "@/actions/events"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useParams } from "next/navigation"

type EventRegistration = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  status: string;
  registeredAt: Date;
  user?: {
    name: string | null;
    email: string | null;
    phone: string | null;
  } | null;
}

type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: string;
  status: string;
  maxAttendees: number | null;
  registrationDeadline: Date | null;
  isPublic: boolean;
  image: string | null;
  creator: {
    name: string | null;
    email: string | null;
  };
  registrations: EventRegistration[];
  createdAt: Date;
  updatedAt: Date;
}

export default function EventDetailPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  useEffect(() => {
    loadEvent()
  }, [eventId])

  const loadEvent = async () => {
    setLoading(true)
    const result = await getEventById(eventId)

    if (result.success) {
      setEvent(result.event)
    } else {
      toast.error(result.error || "Failed to load event")
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    const result = await deleteEvent(eventId)

    if (result.success) {
      toast.success("Event deleted successfully")
      router.push("/admin/events")
    } else {
      toast.error(result.error || "Failed to delete event")
    }
  }

  const handleRegistrationStatusUpdate = async (registrationId: string, newStatus: string) => {
    const result = await updateRegistrationStatus(registrationId, newStatus)

    if (result.success) {
      toast.success("Registration status updated")
      loadEvent() // Reload to get updated data
    } else {
      toast.error(result.error || "Failed to update registration status")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500"
      case "Cancelled": return "bg-red-500"
      case "Completed": return "bg-blue-500"
      default: return "bg-gray-500"
    }
  }

  const getRegistrationStatusColor = (status: string) => {
    switch (status) {
      case "Registered": return "bg-blue-100 text-blue-800"
      case "Attended": return "bg-green-100 text-green-800"
      case "Cancelled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Calendar className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading event...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
        <Button asChild>
          <Link href="/admin/events">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/events">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-gray-600">Event Details & Registrations</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/events/${event.id}/edit`}>
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Link>
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <CardDescription className="mt-2">{event.description}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(event.status)} text-white`}>
                  {event.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-sm text-gray-600">
                      {event.maxAttendees ? `${event.registrations.length}/${event.maxAttendees}` : `${event.registrations.length} registered`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Registration Deadline</p>
                    <p className="text-sm text-gray-600">
                      {event.registrationDeadline ? new Date(event.registrationDeadline).toLocaleDateString() : "No deadline"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Event Image */}
          {event.image && (
            <Card>
              <CardHeader>
                <CardTitle>Event Image</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Registration Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{event.registrations.length}</p>
                <p className="text-sm text-blue-600">Total Registrations</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Registered</span>
                  <span className="font-medium">
                    {event.registrations.filter(r => r.status === "Registered").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Attended</span>
                  <span className="font-medium">
                    {event.registrations.filter(r => r.status === "Attended").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cancelled</span>
                  <span className="font-medium">
                    {event.registrations.filter(r => r.status === "Cancelled").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Type</span>
                <span className="font-medium">{event.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Public</span>
                <span className="font-medium">{event.isPublic ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span>Created by</span>
                <span className="font-medium">{event.creator.name || event.creator.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Created</span>
                <span className="font-medium">{new Date(event.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Event Registrations</CardTitle>
          <CardDescription>Manage attendee registrations and track attendance</CardDescription>
        </CardHeader>
        <CardContent>
          {event.registrations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {event.registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">
                      {registration.user?.name || registration.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>{registration.user?.email || registration.email || "N/A"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {(registration.user?.phone || registration.phone) ? (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{registration.user?.phone || registration.phone}</span>
                        </div>
                      ) : "N/A"}
                    </TableCell>
                    <TableCell>
                      {registration.company ? (
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span>{registration.company}</span>
                        </div>
                      ) : "N/A"}
                    </TableCell>
                    <TableCell>{new Date(registration.registeredAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getRegistrationStatusColor(registration.status)}>
                        {registration.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={registration.status}
                        onValueChange={(value) => handleRegistrationStatusUpdate(registration.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Registered">Registered</SelectItem>
                          <SelectItem value="Attended">Attended</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No registrations yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
