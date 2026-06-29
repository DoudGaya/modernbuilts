import Image from "next/image"
import Link from "next/link"
import { ClipboardCheck, HardHat, PackageCheck, Ruler, Wrench } from "lucide-react"
import { Footer } from "@/components/Footer"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Button } from "@/components/ui/button"
import site from "@/public/img/construction-site.jpg"
import engineers from "@/public/img/engineering-team.jpg"

const services = [
  {
    title: "Construction supervision",
    description: "Site planning, contractor coordination, progress documentation, and quality checkpoints.",
    icon: HardHat,
  },
  {
    title: "Procurement support",
    description: "Materials sourcing, vendor checks, delivery planning, and cost-sensitive purchasing.",
    icon: PackageCheck,
  },
  {
    title: "Fit-out and finishing",
    description: "Technical scoping, finishing standards, snag lists, and handover preparation.",
    icon: Wrench,
  },
  {
    title: "Land and plot development",
    description: "Survey review, layout interpretation, access planning, and staged construction guidance.",
    icon: Ruler,
  },
]

export default function ProjectsPage() {
  return (
    <>
      <PublicNavigations />
      <main className="min-h-screen bg-gray-50 pt-20">
        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase text-primary-700">Construction and procurement</p>
              <h1 className="mt-3 text-4xl font-bold tracking-normal text-gray-950 lg:text-5xl">
                Build, finish, and procure with Stablebricks.
              </h1>
              <p className="mt-5 text-lg leading-8 text-gray-600">
                We support buyers, landowners, and commercial clients with practical construction coordination,
                materials procurement, contractor management, and handover-focused execution.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
                  <Link href="/contact">Request consultation</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/partnerships">Become a partner</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image src={site} alt="Construction site" className="mt-10 h-[360px] rounded-md object-cover shadow-md" />
              <Image src={engineers} alt="Stablebricks engineers" className="h-[360px] rounded-md object-cover shadow-md" />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <div key={service.title} className="rounded-md border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md bg-primary-100">
                    <Icon className="h-6 w-6 text-gray-950" />
                  </div>
                  <h2 className="font-bold text-gray-950">{service.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 rounded-md bg-gray-950 p-8 text-white">
            <ClipboardCheck className="mb-4 h-8 w-8 text-primary" />
            <h2 className="text-2xl font-bold">Need contractor or procurement support for a property purchase?</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-white/70">
              Stablebricks can scope site needs after inspection and help you plan materials, people, timeline,
              and documentation before execution starts.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
