"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Trash2, Mail, Phone, Calendar } from "lucide-react"
import { getAllContacts, deleteContact, updateContactStatus } from "@/actions/contact"
import { toast } from 'sonner'

type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    loadContacts()
  }, [searchTerm, statusFilter])

  const loadContacts = async () => {    setLoading(true)
    const result = await getAllContacts({
      search: searchTerm,
      status: statusFilter,
    })

    if (result.success) {
      setContacts(result.contacts)
    } else {
      toast.error(result.error || "Failed to load contacts")
    }
    setLoading(false)
  }

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateContactStatus(id, status)

    if (result.success) {
      toast.success("Contact status updated")
      loadContacts()
    } else {
      toast.error(result.error || "Failed to update status")
    }
  }

  const handleDelete = async (id: string) => {
    const result = await deleteContact(id)

    if (result.success) {
      toast.success("Contact deleted successfully")
      loadContacts()
    } else {
      toast.error(result.error || "Failed to delete contact")
    }
  }

  if (loading) {
    return <div>Loading contacts...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-600">Manage all contact form submissions</p>
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
                placeholder="Search contacts..."
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
                <SelectItem value="Unread">Unread</SelectItem>
                <SelectItem value="Read">Read</SelectItem>
                <SelectItem value="Responded">Responded</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Mail className="w-4 h-4 mr-1" />
                    {contact.email}
                    {contact.phone && (
                      <>
                        <Phone className="w-4 h-4 ml-4 mr-1" />
                        {contact.phone}
                      </>
                    )}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
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
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Subject: {contact.subject}</h4>
                <p className="text-gray-700">{contact.message}</p>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Select onValueChange={(value) => handleStatusUpdate(contact.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Read">Mark as Read</SelectItem>
                    <SelectItem value="Responded">Mark as Responded</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-1" />
                  Reply
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(contact.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found</p>
        </div>
      )}
    </div>
  )
}
