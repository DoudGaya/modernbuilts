import Link from "next/link"
import { Award, Clock, FileCheck2, MapPinned, Shield, Users, WalletCards } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const benefits = [
  {
    icon: FileCheck2,
    title: "Documentation-first sales",
    description: "Property and land opportunities are presented with practical title, survey, and purchase context.",
  },
  {
    icon: MapPinned,
    title: "GIS-style access insight",
    description: "Routes, access roads, nearby anchors, and drive-time notes help buyers understand movement before visits.",
  },
  {
    icon: WalletCards,
    title: "Flexible payment plans",
    description: "Qualified buyers can request deposit and instalment structures tied to clear documentation milestones.",
  },
  {
    icon: Users,
    title: "Partner network",
    description: "We work with landowners, contractors, suppliers, and professional service providers.",
  },
  {
    icon: Shield,
    title: "Practical buyer protection",
    description: "Inspections, documentation review, and service support reduce avoidable transaction surprises.",
  },
  {
    icon: Award,
    title: "Construction competence",
    description: "Our team understands site realities, procurement pressure, and finishing standards after purchase.",
  },
]

export const WhyChooseUs = () => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase text-primary-700">Why Stablebricks</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950 lg:text-4xl">Professional enough for partners. Clear enough for buyers.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
            We focus on information quality, site access, construction support, and accountable real estate service.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => {
            const IconComponent = benefit.icon
            return (
              <Card key={benefit.title} className="border border-gray-200 bg-white shadow-sm">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary-100">
                    <IconComponent className="h-6 w-6 text-gray-950" />
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-950">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-6 text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 rounded-md bg-primary p-8 text-center text-gray-950">
          <Clock className="mx-auto mb-4 h-8 w-8" />
          <h3 className="text-2xl font-bold">Ready to inspect a property or discuss a payment plan?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-gray-800">
            Create an account to keep enquiries organized, or speak with the team about site visits, land submissions,
            procurement, and construction partnerships.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register" className="rounded-md bg-gray-950 px-7 py-3 text-sm font-semibold text-primary">
              Create account
            </Link>
            <Link href="/contact" className="rounded-md border border-gray-950 px-7 py-3 text-sm font-semibold text-gray-950">
              Contact sales team
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
