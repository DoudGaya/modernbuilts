"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, Phone, Calendar, Send } from "lucide-react"
import { getContactById, respondToContact } from "@/actions/contact"
import { toast } from "sonner"
import { format } from "date-fns"

type Contact = {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  response?: string | null
  respondedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export default function ContactDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [contact, setContact] = useState<Contact | null>(null)
  const [loading, setLoading] = useState(true)
  const [response, setResponse] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (params.id) {
      loadContact()
    }
  }, [params.id])
  const loadContact = async () => {
    setLoading(true)
    const result = await getContactById(params.id as string)

    if (result.contact) {
      setContact(result.contact)
    } else {
      toast.error(result.error || "Failed to load contact")
      router.push("/admin/contacts")
    }
    setLoading(false)
  }

  const handleSubmitResponse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!response.trim()) {
      toast.error("Please enter a response")
      return
    }

    setSubmitting(true)
    const result = await respondToContact(contact!.id, response)

    if (result.success) {
      toast.success("Response sent successfully!")
      setResponse("")
      loadContact() // Reload to show updated contact
    } else {
      toast.error(result.error || "Failed to send response")
    }
    setSubmitting(false)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading contact...</div>
  }

  if (!contact) {
    return <div>Contact not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/contacts")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Contacts
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Contact Details</h1>
          <p className="text-gray-600">View and respond to contact message</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{contact.name}</CardTitle>
                <div className="flex flex-col gap-1 mt-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    {contact.email}
                  </div>
                  {contact.phone && (
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      {contact.phone}
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(contact.createdAt), "PPP 'at' p")}
                  </div>
                </div>
              </div>
              <Badge
                className={`${
                  contact.status === "Unread"
                    ? "bg-red-500"
                    : contact.status === "Read"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                }`}
              >
                {contact.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-700">Subject</Label>
              <p className="mt-1 text-sm">{contact.subject}</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-700">Message</Label>
              <p className="mt-1 text-sm whitespace-pre-wrap">{contact.message}</p>
            </div>
          </CardContent>
        </Card>

        {/* Response Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Response</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contact.response && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium text-gray-700">Previous Response</Label>
                  {contact.respondedAt && (
                    <span className="text-xs text-gray-500">
                      Sent on {format(new Date(contact.respondedAt), "PPP 'at' p")}
                    </span>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{contact.response}</p>
              </div>
            )}

            <form onSubmit={handleSubmitResponse} className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  {contact.response ? "Send Additional Response" : "Send Response"}
                </Label>
                <Textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Type your response here..."
                  rows={6}
                  className="mt-1"
                />
              </div>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Response
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
