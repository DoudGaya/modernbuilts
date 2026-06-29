import Link from "next/link"
import { BadgeCheck, CalendarCheck, MapPinned, SearchCheck, UserRound } from "lucide-react"

const steps = [
  {
    title: "Create an account",
    icon: UserRound,
    message: "Keep property enquiries, inspection requests, payment-plan discussions, and profile details in one place.",
  },
  {
    title: "Shortlist property",
    icon: SearchCheck,
    message: "Browse homes, land plots, and commercial spaces by location, access, price, and service needs.",
  },
  {
    title: "Review walk-around and GIS",
    icon: MapPinned,
    message: "Check approach images, route notes, access roads, nearby anchors, and practical site context.",
  },
  {
    title: "Book inspection",
    icon: CalendarCheck,
    message: "Request a visit, title review, payment-plan quote, procurement support, or contractor consultation.",
  },
]

export const HomeIcons = () => {
  return (
    <section className="w-full bg-white px-5 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase text-primary-700">How it works</p>
          <h2 className="mt-3 text-3xl font-bold text-gray-950">A more useful property journey</h2>
          <p className="mt-4 text-base leading-7 text-gray-600">
            From search to site visit, the account experience is designed around property service, inspection, and support.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.title} className="rounded-md border border-gray-200 bg-white p-5 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-md bg-primary-100">
                  <Icon className="h-7 w-7 text-gray-950" />
                </div>
                <p className="text-xs font-bold uppercase text-primary-800">Step {index + 1}</p>
                <h3 className="mt-2 font-semibold text-gray-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">{step.message}</p>
              </div>
            )
          })}
        </div>
        <div className="mt-10 flex justify-center">
          <Link href="/register" className="inline-flex items-center gap-2 rounded-md bg-gray-950 px-8 py-3 text-sm font-semibold text-primary transition hover:bg-gray-800">
            <BadgeCheck className="h-4 w-4" />
            Start with an account
          </Link>
        </div>
      </div>
    </section>
  )
}
