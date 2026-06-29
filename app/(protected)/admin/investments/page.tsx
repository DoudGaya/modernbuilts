"use client"

import { useState } from "react"
import { Building2, Calendar, Download, Filter, MapPinned, Search, User, WalletCards } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const salesRequests = [
  {
    id: "REQ-001",
    clientName: "John Doe",
    clientEmail: "john@example.com",
    propertyTitle: "Tarauni Court 4-Bedroom Duplex",
    requestType: "Payment plan",
    budget: "NGN 86,000,000",
    requestDate: "2026-06-10",
    status: "Open",
    nextStep: "Send deposit terms",
  },
  {
    id: "REQ-002",
    clientName: "Jane Smith",
    clientEmail: "jane@example.com",
    propertyTitle: "Epe Growth Corridor Plots",
    requestType: "Route access",
    budget: "From NGN 9,800,000",
    requestDate: "2026-06-14",
    status: "In Review",
    nextStep: "Confirm survey and access road",
  },
  {
    id: "REQ-003",
    clientName: "Mike Johnson",
    clientEmail: "mike@example.com",
    propertyTitle: "Jabi Commercial Shell",
    requestType: "Inspection",
    budget: "NGN 145,000,000",
    requestDate: "2026-06-18",
    status: "Scheduled",
    nextStep: "Site visit confirmation",
  },
]

export default function SalesRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRequests = salesRequests.filter((request) => {
    const matchesSearch =
      request.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status.toLowerCase().replace(" ", "-") === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-950">Sales Request Management</h1>
          <p className="text-gray-600">Monitor property enquiries, inspection requests, and payment-plan conversations.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export data
        </Button>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary-700" />
            Search and filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search requests..."
                className="pl-10"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-review">In review</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
            <CardHeader>
              <div className="mb-2 flex items-start justify-between">
                <CardTitle className="text-lg">{request.id}</CardTitle>
                <Badge className="bg-primary text-gray-950 hover:bg-primary">{request.status}</Badge>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {request.clientName}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {request.propertyTitle}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-gray-50 p-3">
                  <p className="text-gray-500">Request</p>
                  <p className="font-semibold text-gray-950">{request.requestType}</p>
                </div>
                <div className="rounded-md bg-primary-50 p-3">
                  <p className="text-gray-500">Budget</p>
                  <p className="font-semibold text-gray-950">{request.budget}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary-700" />
                  Requested {new Date(request.requestDate).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-2">
                  <WalletCards className="h-4 w-4 text-success" />
                  {request.nextStep}
                </p>
                <p className="flex items-center gap-2">
                  <MapPinned className="h-4 w-4 text-info" />
                  {request.clientEmail}
                </p>
              </div>
              <Button className="w-full bg-primary text-gray-950 hover:bg-primary-400">Open request</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
