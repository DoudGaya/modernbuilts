import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Bath,
  Bed,
  CalendarCheck,
  Compass,
  ExternalLink,
  FileCheck2,
  MapPinned,
  Navigation,
  Route,
  Square,
  WalletCards,
  type LucideIcon,
} from "lucide-react"
import { Footer } from "@/components/Footer"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getPropertyBySlug, propertyListings } from "@/lib/property-data"

interface PropertyDetailPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return propertyListings.map((property) => ({ slug: property.slug }))
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const { slug } = await params
  const property = getPropertyBySlug(slug)

  if (!property) {
    notFound()
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.gis.mapsQuery)}`

  return (
    <>
      <PublicNavigations />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6">
            <Link href="/properties" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-950">
              <ArrowLeft className="h-4 w-4" />
              Back to properties
            </Link>
          </div>
          <div className="mx-auto grid max-w-7xl gap-8 px-4 pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge className="bg-primary text-gray-950 hover:bg-primary">{property.type}</Badge>
                <Badge variant="secondary">{property.category}</Badge>
              </div>
              <h1 className="text-4xl font-bold tracking-normal text-gray-950 lg:text-5xl">{property.title}</h1>
              <p className="mt-4 flex items-center gap-2 text-base text-gray-600">
                <MapPinned className="h-5 w-5 text-primary-700" />
                {property.location}
              </p>
              <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600">{property.description}</p>
            </div>
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm font-bold uppercase text-primary-800">Guide price</p>
                <p className="mt-2 text-3xl font-bold text-gray-950">{property.price}</p>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <span className="rounded-md bg-primary-50 p-3 font-semibold text-gray-950">{property.paymentPlan.deposit}</span>
                  <span className="rounded-md bg-gray-100 p-3 text-gray-700">{property.paymentPlan.tenor}</span>
                </div>
                <Button asChild className="mt-5 w-full bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href="/contact">
                    <CalendarCheck className="h-4 w-4" />
                    Request inspection
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-8">
            <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
              <div className="relative h-[420px]">
                <Image src={property.coverImage} alt={property.title} fill className="object-cover" sizes="(min-width: 1024px) 70vw, 100vw" />
              </div>
              <CardContent className="grid gap-3 p-4 md:grid-cols-3">
                {property.gallery.map((image) => (
                  <div key={image} className="relative h-36 overflow-hidden rounded-md">
                    <Image src={image} alt={`${property.title} gallery`} fill className="object-cover" sizes="(min-width: 768px) 25vw, 100vw" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-950">Walk-around images</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-3">
                {property.walkthrough.map((shot) => (
                  <div key={shot.label} className="overflow-hidden rounded-md border border-gray-200">
                    <div className="relative h-56">
                      <Image src={shot.image} alt={shot.label} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-950">{shot.label}</h3>
                      <p className="mt-2 text-sm leading-6 text-gray-600">{shot.note}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-950">Property information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  {property.bedrooms ? (
                    <InfoTile icon={Bed} label="Bedrooms" value={`${property.bedrooms}`} />
                  ) : null}
                  {property.bathrooms ? (
                    <InfoTile icon={Bath} label="Bathrooms" value={`${property.bathrooms}`} />
                  ) : null}
                  <InfoTile icon={Square} label="Area" value={property.area} />
                  <InfoTile icon={FileCheck2} label="Plot/title" value={property.plotSize || property.category} />
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2">
                  {property.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-950">GIS route and access</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative min-h-[330px] overflow-hidden rounded-md border border-gray-200 bg-primary-50 p-5">
                  <div className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-950/15" />
                  <div className="absolute bottom-8 left-10 top-8 w-1 rounded-full bg-gray-950/15" />
                  <div className="absolute bottom-12 right-12 top-16 w-1 rotate-12 rounded-full bg-primary-600" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="max-w-xs rounded-md bg-white p-4 shadow-sm">
                      <p className="flex items-center gap-2 text-sm font-bold text-gray-950">
                        <Compass className="h-4 w-4 text-primary-700" />
                        Coordinates
                      </p>
                      <p className="mt-1 text-sm text-gray-600">{property.gis.coordinates}</p>
                    </div>
                    <div className="ml-auto max-w-xs rounded-md bg-gray-950 p-4 text-white shadow-sm">
                      <p className="flex items-center gap-2 text-sm font-bold">
                        <Navigation className="h-4 w-4 text-primary" />
                        Access summary
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/70">{property.gis.routeSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-950">
                      <Route className="h-5 w-5 text-primary-700" />
                      Access roads
                    </h3>
                    <div className="mt-3 grid gap-2">
                      {property.gis.accessRoads.map((road) => (
                        <span key={road} className="rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700">{road}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-950">Nearby anchors</h3>
                    <div className="mt-3 grid gap-2">
                      {property.gis.nearby.map((place) => (
                        <span key={place} className="rounded-md bg-primary-50 px-3 py-2 text-sm text-gray-700">{place}</span>
                      ))}
                    </div>
                  </div>

                  <Button asChild variant="outline" className="w-full">
                    <Link href={mapsUrl} target="_blank" rel="noreferrer">
                      Open on maps
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-24 border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-950">Payment plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <PlanRow label="Deposit" value={property.paymentPlan.deposit} />
                <PlanRow label="Tenor" value={property.paymentPlan.tenor} />
                <PlanRow label="Schedule" value={property.paymentPlan.monthly} />
                <div className="rounded-md bg-primary-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-gray-950">
                    <WalletCards className="h-4 w-4" />
                    Payment note
                  </p>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{property.paymentPlan.note}</p>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-bold text-gray-950">Drive-time context</h3>
                  <div className="mt-3 space-y-2">
                    {property.gis.driveTimes.map((time) => (
                      <div key={time.label} className="flex justify-between rounded-md bg-gray-50 px-3 py-2 text-sm">
                        <span className="text-gray-600">{time.label}</span>
                        <span className="font-semibold text-gray-950">{time.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button asChild className="w-full bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href="/contact">Talk to sales</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  )
}

function InfoTile({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-md bg-gray-50 p-4">
      <Icon className="mb-3 h-5 w-5 text-primary-700" />
      <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-950">{value}</p>
    </div>
  )
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-right text-sm font-semibold text-gray-950">{value}</span>
    </div>
  )
}
