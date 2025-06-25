"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import { getEventById, updateEvent } from "@/actions/events"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"

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
}

export default function EditEventPage() {
  const [isPending, startTransition] = useTransition()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "",
    maxAttendees: "",
    registrationDeadline: "",
    image: "",
    isPublic: true,
  })

  useEffect(() => {
    loadEvent()
  }, [eventId])

  const loadEvent = async () => {
    setLoading(true)
    const result = await getEventById(eventId)

    if (result.success) {
      const event = result.event
      setFormData({
        title: event.title,
        description: event.description,
        date: new Date(event.date).toISOString().split('T')[0],
        time: event.time,
        location: event.location,
        type: event.type,
        maxAttendees: event.maxAttendees?.toString() || "",
        registrationDeadline: event.registrationDeadline ? new Date(event.registrationDeadline).toISOString().split('T')[0] : "",
        image: event.image || "",
        isPublic: event.isPublic,
      })
    } else {
      toast.error(result.error || "Failed to load event")
      router.push("/admin/events")
    }
    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.location || !formData.type) {
      toast.error("Please fill in all required fields")
      return
    }

    const submitData = {
      ...formData,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees) : undefined,
    }

    startTransition(() => {
      updateEvent(eventId, submitData)
        .then((data) => {
          if (data.error) {
            toast.error(data.error)
          } else {
            toast.success("Event updated successfully!")
            router.push(`/admin/events/${eventId}`)
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

  const eventTypes = [
    "Annual Meeting",
    "Quarterly Review", 
    "Project Launch",
    "Investor Presentation",
    "Property Tour",
    "Webinar",
    "Conference",
    "Workshop",
    "Other"
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 animate-spin mx-auto mb-4 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
          <p className="text-gray-500">Loading event...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/events/${eventId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Event
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <p className="text-gray-600">Update event details and settings</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
          <CardDescription>Update the details for this event</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  disabled={isPending}
                  placeholder="e.g., Annual Investor Meeting 2025"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Event Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
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
                placeholder="Provide a detailed description of the event..."
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Event Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                disabled={isPending}
                placeholder="e.g., Lagos Continental Hotel, Virtual Meeting"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="maxAttendees">Max Attendees</Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={formData.maxAttendees}
                  onChange={(e) => handleChange("maxAttendees", e.target.value)}
                  disabled={isPending}
                  placeholder="Leave empty for unlimited"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationDeadline">Registration Deadline</Label>
                <Input
                  id="registrationDeadline"
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) => handleChange("registrationDeadline", e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Event Image URL</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                disabled={isPending}
                placeholder="https://example.com/event-image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) => handleChange("isPublic", checked)}
                disabled={isPending}
              />
              <Label htmlFor="isPublic">Make event public (visible to all users)</Label>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={isPending} className="bg-yellow-400 hover:bg-yellow-500 text-black">
                {isPending ? "Updating..." : "Update Event"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
