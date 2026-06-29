import Link from "next/link"
import { Building2, CalendarCheck, FileText, MapPinned, MessageSquare, WalletCards } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { propertyListings } from "@/lib/property-data"

const stats = [
  { label: "Saved properties", value: "0", detail: "Start from listings", icon: Building2 },
  { label: "Open enquiries", value: "0", detail: "Sales team replies appear here", icon: MessageSquare },
  { label: "Site visits", value: "0", detail: "Book an inspection", icon: CalendarCheck },
  { label: "Payment plans", value: "0", detail: "Requests and quotes", icon: WalletCards },
]

const tasks = [
  { title: "Browse available property", href: "/user/projects", icon: Building2 },
  { title: "Book a site visit", href: "/user/consultations", icon: CalendarCheck },
  { title: "Ask about payment plans", href: "/user/wallet", icon: WalletCards },
  { title: "Update your profile", href: "/user/profile", icon: FileText },
]

export default async function UserDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">Welcome back</h1>
        <p className="mt-2 text-gray-600">Track property enquiries, site visits, route checks, and payment-plan requests.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="border border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-primary-700" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-950">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.detail}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Recommended listings</CardTitle>
            <CardDescription>Property and land options with walkthrough and GIS access details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {propertyListings.slice(0, 3).map((property) => (
              <div key={property.slug} className="flex items-start justify-between gap-4 border-b border-gray-100 pb-4 last:border-0">
                <div>
                  <p className="font-medium text-gray-950">{property.title}</p>
                  <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                    <MapPinned className="h-3.5 w-3.5" />
                    {property.location}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary-800">{property.price}</p>
                </div>
                <Button asChild size="sm" variant="outline">
                  <Link href={`/properties/${property.slug}`}>Open</Link>
                </Button>
              </div>
            ))}
            <Button asChild className="w-full bg-primary text-gray-950 hover:bg-primary-400">
              <Link href="/user/projects">Browse all properties</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Common buyer and partner tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {tasks.map((task) => {
                const Icon = task.icon
                return (
                  <Link
                    key={task.title}
                    href={task.href}
                    className="flex items-center gap-3 rounded-md border border-gray-200 p-4 text-sm font-semibold text-gray-800 transition hover:border-primary hover:bg-primary-50"
                  >
                    <Icon className="h-5 w-5 text-primary-700" />
                    {task.title}
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 bg-gray-950 text-white shadow-sm">
        <CardContent className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Need documents, inspection, or route clarification?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/70">
              Send an enquiry and the Stablebricks team can follow up with site visit windows, payment-plan
              requirements, procurement support, or property documentation.
            </p>
          </div>
          <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
            <Link href="/user/enquiries">Start enquiry</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
