import { FileText, MapPinned, WalletCards } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const enquiries = [
  {
    id: 1,
    reference: "ENQ-2026-001",
    property: "Tarauni Court 4-Bedroom Duplex",
    request: "Payment plan",
    status: "Draft",
  },
  {
    id: 2,
    reference: "ENQ-2026-002",
    property: "Epe Growth Corridor Plots",
    request: "Route access",
    status: "Draft",
  },
]

export const UserInvestments = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent enquiries</CardTitle>
        <CardDescription>Property requests, route questions, and payment-plan conversations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div key={enquiry.id} className="rounded-md bg-gray-50 p-4">
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h4 className="font-semibold">{enquiry.property}</h4>
                  <p className="text-sm text-gray-600">{enquiry.reference}</p>
                </div>
                <Badge variant="secondary">{enquiry.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-700" />
                  {enquiry.request}
                </div>
                <div className="flex items-center gap-2">
                  {enquiry.request === "Payment plan" ? (
                    <WalletCards className="h-4 w-4 text-success" />
                  ) : (
                    <MapPinned className="h-4 w-4 text-info" />
                  )}
                  Awaiting submission
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
