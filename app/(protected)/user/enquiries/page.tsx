import { FileText, Mail, MapPinned, MessageSquare } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EnquiriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">Enquiries</h1>
        <p className="mt-2 text-gray-600">Ask for documents, route clarification, inspection slots, or payment-plan details.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>What you can request</CardTitle>
            <CardDescription>Stablebricks sales and services team can follow up on:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Property documents", icon: FileText },
              { label: "GIS route and access details", icon: MapPinned },
              { label: "Payment plan quotation", icon: Mail },
              { label: "Construction or procurement support", icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center gap-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                  <Icon className="h-4 w-4 text-primary-700" />
                  {item.label}
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>New enquiry</CardTitle>
            <CardDescription>Tell us what property or service you need help with.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Property name or location" />
            <Input placeholder="Phone number" />
            <Textarea rows={6} placeholder="Message, documents needed, preferred inspection date, or payment-plan question" />
            <Button className="bg-primary text-gray-950 hover:bg-primary-400">Submit enquiry</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
