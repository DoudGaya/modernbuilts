import { CalendarCheck, HardHat, MapPinned, Route } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { propertyListings } from "@/lib/property-data"

export default function ConsultationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">Site visits</h1>
        <p className="mt-2 text-gray-600">Request property inspections, route walkthroughs, and construction or procurement consultations.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Book a visit</CardTitle>
            <CardDescription>Stablebricks will confirm availability before scheduling.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Property or land location" />
            <Input placeholder="Preferred date and time" />
            <Input placeholder="Phone number" />
            <Textarea rows={5} placeholder="What would you like to inspect or discuss?" />
            <Button className="bg-primary text-gray-950 hover:bg-primary-400">
              <CalendarCheck className="h-4 w-4" />
              Request schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Recommended inspection checklist</CardTitle>
            <CardDescription>Use this before visiting any property.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Confirm access road and alternate route", icon: Route },
              { label: "Review title and survey documents", icon: MapPinned },
              { label: "Check finishing, services, and maintenance scope", icon: HardHat },
              { label: "Ask for deposit and payment-plan terms", icon: CalendarCheck },
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
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Properties ready for route review</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {propertyListings.slice(0, 4).map((property) => (
            <div key={property.slug} className="rounded-md bg-gray-50 p-4">
              <p className="font-semibold text-gray-950">{property.title}</p>
              <p className="mt-1 text-sm text-gray-600">{property.gis.routeSummary}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
