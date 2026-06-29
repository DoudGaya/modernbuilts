import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, FileCheck2, MapPinned, WalletCards } from "lucide-react"
import WhatWeDo from "@/public/img/home-yellow.svg"

const trustPoints = [
  {
    title: "Verified property information",
    description: "Listings are presented with title status, access context, features, and site visuals.",
    icon: FileCheck2,
  },
  {
    title: "Route and location intelligence",
    description: "Each featured property can include coordinates, access roads, nearby anchors, and drive times.",
    icon: MapPinned,
  },
  {
    title: "Flexible sales structure",
    description: "Qualified buyers can request structured deposits and milestone payment plans.",
    icon: WalletCards,
  },
]

export const HomeAbout = () => {
  return (
    <section className="flex w-full flex-col bg-white">
      <div className="w-full bg-primary">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-950 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h2 className="font-sans text-lg font-bold text-gray-950">Nigeria-focused real estate and construction services</h2>
          </div>
          <p className="text-sm leading-6 text-gray-900 lg:text-base">
            Stablebricks works with buyers, landowners, contractors, vendors, and property partners to sell,
            build, procure, and manage real estate transactions with clear documentation and practical site data.
          </p>
        </div>
      </div>

      <div className="w-full py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase text-primary-700">Welcome to Stablebricks</p>
              <h2 className="mt-3 text-3xl font-bold text-gray-950">A cleaner way to buy, build, and partner in Nigerian real estate.</h2>
            </div>
            <p className="text-base leading-7 text-gray-600">
              We have repositioned our business around direct property sales, land and plot sales, construction
              services, procurement, contractor relationships, and professional partnerships. Buyers can review
              listings, request site visits, inspect route/access details, and discuss payment plans with our team.
            </p>

            <div className="grid gap-3">
              {trustPoints.map((point) => {
                const Icon = point.icon
                return (
                  <div key={point.title} className="flex gap-4 rounded-md border border-gray-200 bg-white p-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-primary-50">
                      <Icon className="h-5 w-5 text-gray-950" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-950">{point.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{point.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link href="/about" className="inline-flex rounded-md bg-gray-950 px-6 py-3 text-sm font-semibold text-primary transition hover:bg-gray-800">
              Learn more
            </Link>
          </div>
          <div className="mx-auto w-full max-w-lg">
            <Image src={WhatWeDo} alt="Stablebricks property services" className="h-auto w-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
