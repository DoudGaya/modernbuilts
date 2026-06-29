import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Building2, MapPinned, Route, Search } from "lucide-react"
import bannerImage from "@/public/img/banner-image.jpg"

const quickFilters = ["Homes", "Land plots", "Commercial", "Construction support"]

export const Banner = () => {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-gray-950 pt-24 text-white lg:pt-28">
      <Image
        src={bannerImage}
        alt="Stablebricks real estate and construction"
        fill
        priority
        className="object-cover opacity-55"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-center px-5 pb-10">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold backdrop-blur">
            <Building2 className="h-4 w-4 text-primary" />
            Real estate sales, construction, procurement, and partnerships
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
            Stablebricks
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/85">
            Buy verified buildings, serviced plots, and commercial property with professional documentation,
            walk-around visuals, route intelligence, and flexible payment plans.
          </p>

          <div className="mt-8 max-w-2xl rounded-md border border-white/20 bg-white p-2 text-gray-950 shadow-2xl">
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3 px-3">
                <Search className="h-5 w-5 text-gray-500" />
                <span className="py-3 text-sm text-gray-600">Search by location, property type, plot size, or access road</span>
              </div>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-gray-950 transition hover:bg-primary-400"
              >
                Explore listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <Link
                key={filter}
                href="/properties"
                className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition hover:bg-white/20"
              >
                {filter}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-3 lg:max-w-4xl">
          <div className="rounded-md border border-white/15 bg-black/35 p-4 backdrop-blur">
            <MapPinned className="mb-3 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">GIS access checks</p>
            <p className="mt-1 text-xs leading-5 text-white/70">Routes, access roads, nearby anchors, and drive-time context.</p>
          </div>
          <div className="rounded-md border border-white/15 bg-black/35 p-4 backdrop-blur">
            <Route className="mb-3 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">Walk-around images</p>
            <p className="mt-1 text-xs leading-5 text-white/70">See approach, interiors, service areas, and site conditions.</p>
          </div>
          <div className="rounded-md border border-white/15 bg-black/35 p-4 backdrop-blur">
            <Building2 className="mb-3 h-5 w-5 text-primary" />
            <p className="text-sm font-semibold">Flexible payment plans</p>
            <p className="mt-1 text-xs leading-5 text-white/70">Structured payment options for qualified property buyers.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
