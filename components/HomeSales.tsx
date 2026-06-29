import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, MapPin } from "lucide-react"
import { propertyListings } from "@/lib/property-data"

export const HomeSales = () => {
  const walkthrough = propertyListings[0].walkthrough

  return (
    <section className="w-full bg-primary-50 px-5 py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <p className="text-sm font-bold uppercase text-primary-800">Walk-around preview</p>
            <h2 className="mt-3 text-3xl font-bold text-gray-950">See a property from the street, the room, and the service side.</h2>
            <p className="mt-4 text-base leading-7 text-gray-700">
              Every featured listing can carry a practical image sequence so buyers understand the approach,
              interior condition, access, and utility areas before requesting a physical inspection.
            </p>
          </div>
          <div className="flex justify-start lg:justify-end">
            <Link
              href={`/properties/${propertyListings[0].slug}`}
              className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gray-800"
            >
              View walkthrough
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {walkthrough.map((shot) => (
            <div key={shot.label} className="overflow-hidden rounded-md border border-primary-100 bg-white shadow-sm">
              <div className="relative h-[260px]">
                <Image src={shot.image} alt={shot.label} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="absolute left-3 top-3 rounded-md bg-gray-950/85 px-3 py-2 text-xs font-semibold text-primary">
                  <Camera className="mr-1 inline h-3.5 w-3.5" />
                  {shot.label}
                </div>
              </div>
              <div className="p-4">
                <p className="flex items-center gap-2 text-sm font-semibold text-gray-950">
                  <MapPin className="h-4 w-4 text-primary-700" />
                  {propertyListings[0].location}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{shot.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
