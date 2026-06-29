import Link from "next/link"
import { Building2, CheckCircle, HandshakeIcon, PackageCheck, Users } from "lucide-react"
import { Footer } from "@/components/Footer"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const partnershipTypes = [
  {
    icon: Building2,
    title: "Landowner partnerships",
    description: "Submit land for sale, joint development, layout review, or buyer-introduction opportunities.",
    benefits: ["Documentation review", "Access and route assessment", "Sales positioning", "Development feasibility"],
  },
  {
    icon: Users,
    title: "Contractor partnerships",
    description: "Work with Stablebricks on construction, finishing, inspections, and buyer service delivery.",
    benefits: ["Clear scopes", "Quality checkpoints", "Project documentation", "Repeat service opportunities"],
  },
  {
    icon: PackageCheck,
    title: "Procurement partners",
    description: "Supply materials, fixtures, equipment, and logistics support for property and construction work.",
    benefits: ["Vendor verification", "Delivery planning", "Specification alignment", "Transparent purchase records"],
  },
  {
    icon: HandshakeIcon,
    title: "Institutional partners",
    description: "Collaborate on housing delivery, staff purchase plans, commercial needs, and facility projects.",
    benefits: ["Structured payment plans", "Portfolio site visits", "Buyer support", "Construction coordination"],
  },
]

export default function PartnershipsPage() {
  return (
    <>
      <PublicNavigations />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-primary px-4 py-16 text-gray-950">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-bold uppercase">Partnerships</p>
            <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-bold tracking-normal lg:text-5xl">
              Partner with Stablebricks across land, construction, procurement, and property sales.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-800">
              We work with people and organizations who can improve how property is sold, built, supplied, inspected,
              and handed over in Nigeria.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="bg-gray-950 text-primary hover:bg-gray-800">
                <Link href="/land-submissions">Submit land</Link>
              </Button>
              <Button asChild variant="outline" className="border-gray-950 text-gray-950 hover:bg-gray-950 hover:text-primary">
                <Link href="/developer">Open developer portal</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-950">Partnership tracks</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-600">
              Choose the route that best matches your property, trade, service, or institutional need.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {partnershipTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <Card key={type.title} className="border border-gray-200 bg-white shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary-100">
                      <IconComponent className="h-7 w-7 text-gray-950" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-950">{type.title}</CardTitle>
                    <CardDescription className="text-sm leading-6">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {type.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
