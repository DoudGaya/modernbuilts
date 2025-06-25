"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Trash2, Mail, Phone, Calendar, User as UserIcon, AlertCircle, Clock, ExternalLink } from "lucide-react"
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
  userId: string | null;
  category: string | null;
  priority: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  useEffect(() => {
    loadContacts()
  }, [searchTerm, statusFilter, categoryFilter, priorityFilter])
  const loadContacts = async () => {
    setLoading(true)
    const result = await getAllContacts({
      search: searchTerm,
      status: statusFilter,
      category: categoryFilter,
      priority: priorityFilter,
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
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading contacts...</p>
        </div>
      </div>
    )
  }

  const getContactStats = () => {
    const total = contacts.length
    const unread = contacts.filter(c => c.status === 'Unread').length
    const highPriority = contacts.filter(c => c.priority === 'HIGH').length
    const userContacts = contacts.filter(c => c.userId).length
    
    return { total, unread, highPriority, userContacts }
  }

  const stats = getContactStats()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-gray-600">Manage all contact form submissions</p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Mail className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">{stats.unread}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">{stats.highPriority}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <UserIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">From Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.userContacts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="GENERAL">General</SelectItem>
                <SelectItem value="TECHNICAL">Technical</SelectItem>
                <SelectItem value="INVESTMENT">Investment</SelectItem>
                <SelectItem value="ACCOUNT">Account</SelectItem>
                <SelectItem value="BILLING">Billing</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Export Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    {contact.userId && (
                      <Badge variant="secondary" className="text-xs">
                        <UserIcon className="w-3 h-3 mr-1" />
                        User
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center flex-wrap gap-2 text-sm">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {contact.email}
                    </span>
                    {contact.phone && (
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {contact.phone}
                      </span>
                    )}
                  </CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
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
                    {contact.priority && (
                      <Badge
                        variant="outline"
                        className={`${
                          contact.priority === "HIGH"
                            ? "border-red-500 text-red-700"
                            : contact.priority === "MEDIUM"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-green-500 text-green-700"
                        }`}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {contact.priority}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {(contact.category || contact.priority) && (
                <div className="flex gap-2 mt-2">
                  {contact.category && (
                    <Badge variant="secondary" className="text-xs">
                      {contact.category}
                    </Badge>
                  )}
                </div>
              )}
            </CardHeader>            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Subject: {contact.subject}</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {contact.message.length > 200 
                    ? `${contact.message.substring(0, 200)}...` 
                    : contact.message}
                </p>
                {contact.message.length > 200 && (
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 text-sm"
                    onClick={() => window.location.href = `/admin/contacts/${contact.id}`}
                  >
                    Read more
                  </Button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Select onValueChange={(value) => handleStatusUpdate(contact.id, value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Read">Mark as Read</SelectItem>
                    <SelectItem value="Responded">Mark as Responded</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = `/admin/contacts/${contact.id}`}
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = `/admin/contacts/${contact.id}`}
                >
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
