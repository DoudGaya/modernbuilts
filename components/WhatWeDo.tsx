import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ClipboardCheck, HardHat, Map, Ruler } from "lucide-react"
import bg from "@/public/img/bg.jpg"
import completed from "@/public/img/completed_homes.jpg"
import site from "@/public/img/construction-site.jpg"
import unCompleted from "@/public/img/uncompleted.jpg"
import slideer1 from "@/public/img/slider1.jpeg"

const capabilities = [
  "Property sales and buyer due diligence",
  "Land submissions, plot sales, and partnership reviews",
  "Construction planning, supervision, and contractor coordination",
  "Procurement support for verified materials and site logistics",
]

export const HomeWhatWeDo = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bg.src})` }}
      className="w-full bg-primary-50 bg-cover bg-fixed bg-center bg-no-repeat bg-blend-overlay"
    >
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            <Image src={site} className="h-[280px] rounded-md object-cover object-center shadow-md" alt="Stablebricks construction site" />
            <Image src={unCompleted} className="mt-10 h-[280px] rounded-md object-cover object-center shadow-md" alt="Building under construction" />
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase text-primary-800">What we do</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Professional real estate and construction operations.</h2>
            </div>
            <p className="text-base leading-7 text-gray-700">
              Stablebricks helps buyers and partners move from interest to inspection, documentation, purchase,
              construction, and handover. Our role is practical: verify what is being sold, show how to access it,
              coordinate trusted people, and keep the process clear.
            </p>
            <div className="grid gap-3">
              {capabilities.map((capability) => (
                <div key={capability} className="flex items-center gap-3 rounded-md bg-white/90 p-3 shadow-sm">
                  <ClipboardCheck className="h-5 w-5 text-primary-700" />
                  <span className="text-sm font-medium text-gray-800">{capability}</span>
                </div>
              ))}
            </div>
            <Link href="/properties" className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gray-800">
              View available property
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase text-primary-800">From route to handover</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">Buyers get location context, not just photos.</h2>
            </div>
            <p className="text-base leading-7 text-gray-700">
              Property decisions depend on access, surrounding development, road conditions, services, and practical
              movement. Our listing details support walk-around review and GIS-style route notes for each featured asset.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-md bg-white p-4 shadow-sm">
                <Map className="mb-3 h-5 w-5 text-primary-700" />
                <p className="text-sm font-semibold">Routes</p>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <Ruler className="mb-3 h-5 w-5 text-primary-700" />
                <p className="text-sm font-semibold">Plot data</p>
              </div>
              <div className="rounded-md bg-white p-4 shadow-sm">
                <HardHat className="mb-3 h-5 w-5 text-primary-700" />
                <p className="text-sm font-semibold">Site support</p>
              </div>
            </div>
          </div>
          <div className="grid h-[420px] grid-cols-2 gap-4">
            <Image src={completed} className="mt-10 h-full rounded-md object-cover object-center shadow-md" alt="Completed property" />
            <Image src={slideer1} className="h-full rounded-md object-cover object-center shadow-md" alt="Modern property interior" />
          </div>
        </div>
      </div>
    </section>
  )
}
