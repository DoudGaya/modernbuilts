import { BadgeCheck, Building2, HardHat, PackageCheck } from "lucide-react"

const contents = [
  {
    title: "Property and land sales",
    subtitle: "Verified opportunities",
    icon: Building2,
    contents:
      "We present homes, commercial property, and land plots with practical documentation context, payment-plan options, and route/access information for buyer review.",
  },
  {
    title: "Construction services",
    subtitle: "From site to handover",
    icon: HardHat,
    contents:
      "Our team supports planning, supervision, contractor coordination, finishing, and technical documentation for clients who want a property built or completed.",
  },
  {
    title: "Procurement and contractors",
    subtitle: "Reliable execution",
    icon: PackageCheck,
    contents:
      "We help source materials, coordinate vendors, and connect clients with contractors who understand site standards, cost control, and accountable delivery.",
  },
]

export const WhatWeDoAbout = () => {
  return (
    <section className="w-full bg-primary-50 px-10 py-20">
      <div className="w-full py-8 text-center">
        <p className="text-sm font-bold uppercase text-primary-800">Our services</p>
        <h2 className="mt-3 text-3xl font-bold text-gray-950">What Stablebricks does now</h2>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        {contents.map((content) => {
          const Icon = content.icon
          return (
            <div key={content.title} className="flex flex-col items-center rounded-md border border-primary-100 bg-white p-6 text-center shadow-sm">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-md bg-primary-100">
                <Icon className="h-8 w-8 text-gray-950" />
              </div>
              <p className="text-xs font-bold uppercase text-primary-800">{content.subtitle}</p>
              <h3 className="mt-2 text-2xl font-semibold text-gray-950">{content.title}</h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{content.contents}</p>
              <BadgeCheck className="mt-5 h-5 w-5 text-success" />
            </div>
          )
        })}
      </div>
    </section>
  )
}
