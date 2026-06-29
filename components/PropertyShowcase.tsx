import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, CheckCircle2, Hammer, MapPinned, Route, Truck } from "lucide-react"
import { propertyListings } from "@/lib/property-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const serviceLanes = [
  {
    title: "Property sales",
    description: "Finished homes, commercial shells, and verified resale opportunities.",
    icon: Building2,
  },
  {
    title: "Land and plot sales",
    description: "Surveyed allocations, title review, estate layouts, and buyer documentation.",
    icon: MapPinned,
  },
  {
    title: "Construction delivery",
    description: "Build planning, supervision, contractor coordination, and finishing support.",
    icon: Hammer,
  },
  {
    title: "Procurement",
    description: "Materials sourcing, vendor checks, logistics, and site-ready delivery.",
    icon: Truck,
  },
]

export const PropertyShowcase = () => {
  const leadProperty = propertyListings[0]
  const secondaryProperties = propertyListings.slice(1, 4)

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-8">
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase text-primary-700">Sales, land, construction</p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-gray-950 lg:text-4xl">
              Real estate services with the details buyers actually need.
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Stablebricks now focuses on professional property sales, land transactions, procurement, contractor
              partnerships, and construction support with clear documentation and flexible payment paths.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {serviceLanes.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="rounded-md border border-gray-200 bg-off-white p-4">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-primary-100">
                    <Icon className="h-5 w-5 text-gray-950" />
                  </div>
                  <h3 className="font-semibold text-gray-950">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
              <Link href="/properties">
                Browse properties
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/partnerships">Partner with Stablebricks</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          <Link href={`/properties/${leadProperty.slug}`} className="group overflow-hidden rounded-md border border-gray-200 bg-gray-950 text-white">
            <div className="relative h-[330px]">
              <Image
                src={leadProperty.coverImage}
                alt={leadProperty.title}
                fill
                className="object-cover opacity-80 transition duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Badge className="mb-3 bg-primary text-gray-950 hover:bg-primary">{leadProperty.type}</Badge>
                <h3 className="text-2xl font-bold">{leadProperty.title}</h3>
                <p className="mt-2 text-sm text-white/80">{leadProperty.location}</p>
                <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-white/90">
                  <span className="rounded-md bg-white/10 px-3 py-2">{leadProperty.price}</span>
                  <span className="rounded-md bg-white/10 px-3 py-2">{leadProperty.paymentPlan.tenor}</span>
                  <span className="rounded-md bg-white/10 px-3 py-2">Walk-around ready</span>
                </div>
              </div>
            </div>
          </Link>

          <div className="grid gap-4 md:grid-cols-3">
            {secondaryProperties.map((property) => (
              <Link
                key={property.slug}
                href={`/properties/${property.slug}`}
                className="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between">
                  <Badge variant="secondary" className="rounded-md">{property.category}</Badge>
                  <Route className="h-4 w-4 text-primary-700" />
                </div>
                <h3 className="text-sm font-bold text-gray-950">{property.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{property.location}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  GIS route and access
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
