import type { Metadata } from "next"
import Link from "next/link"
import { BadgeCheck, Building2, ClipboardCheck, HardHat, PackageCheck, Users } from "lucide-react"
import { Footer } from "@/components/Footer"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Contractor and Developer Partners | Stablebricks",
  description:
    "Join Stablebricks as a construction, procurement, or development partner for property sales and delivery work in Nigeria.",
}

const partnerTracks = [
  {
    title: "Construction contractors",
    description: "Submit your company profile, trade capabilities, certifications, and completed work.",
    icon: HardHat,
  },
  {
    title: "Material suppliers",
    description: "Support verified procurement for cement, steel, finishes, fixtures, tools, and site logistics.",
    icon: PackageCheck,
  },
  {
    title: "Design and technical teams",
    description: "Collaborate on drawings, inspections, site reports, fit-out scopes, and handover documentation.",
    icon: ClipboardCheck,
  },
  {
    title: "Property developers",
    description: "List completed or near-complete property for sale with walkthrough, access, and documentation data.",
    icon: Building2,
  },
]

export default function DeveloperPage() {
  return (
    <>
      <PublicNavigations />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-gray-950 px-4 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase text-primary">Partner portal</p>
              <h1 className="mt-3 text-4xl font-bold tracking-normal lg:text-5xl">
                Work with Stablebricks on property, construction, and procurement delivery.
              </h1>
              <p className="mt-5 text-lg leading-8 text-white/75">
                We onboard credible developers, contractors, suppliers, and technical professionals who can support
                property sales, inspections, construction services, and buyer handover.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href="/developer/apply">Apply as a partner</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-gray-950">
                  <Link href="/partnerships">View partnership tracks</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase text-primary-700">Who we work with</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">Partner tracks for real delivery</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {partnerTracks.map((track) => {
              const Icon = track.icon
              return (
                <Card key={track.title} className="border border-gray-200 bg-white shadow-sm">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary-100">
                      <Icon className="h-6 w-6 text-gray-950" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-950">{track.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-6 text-gray-600">{track.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="mt-12 rounded-md bg-white p-8 shadow-sm">
            <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div>
                <Users className="mb-4 h-8 w-8 text-primary-700" />
                <h2 className="text-2xl font-bold text-gray-950">What we review</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  We assess track record, compliance, quality standards, site capacity, documentation discipline,
                  and fit with Stablebricks client service expectations.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {["CAC and tax records", "Completed project evidence", "Insurance or safety process", "Trade/service capacity"].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                    <BadgeCheck className="h-4 w-4 text-success" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
