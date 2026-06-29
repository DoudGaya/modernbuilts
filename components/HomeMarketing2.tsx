import Link from "next/link"
import { CheckCircle2, ClipboardList, HardHat, PackageCheck } from "lucide-react"
import badAss from "@/public/img/female-engineer-standing-like-a-baddass.jpg"

const operations = [
  { label: "Material procurement", icon: PackageCheck },
  { label: "Contractor coordination", icon: HardHat },
  { label: "Site documentation", icon: ClipboardList },
]

export const HomeMarketing2 = () => {
  return (
    <section
      style={{ backgroundImage: `url(${badAss.src})` }}
      className="w-full bg-cover bg-fixed bg-center bg-no-repeat"
    >
      <div className="w-full bg-black/60">
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-2">
          <div className="min-h-[420px]" />
          <div className="flex flex-col justify-center bg-gray-950/90 px-6 py-16 text-white lg:px-10">
            <p className="text-sm font-bold uppercase text-primary">Procurement and contractor support</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight">
              Build with a team that understands the property after the sale.
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              Stablebricks supports buyers, landowners, and partners with practical construction coordination:
              materials, vetted contractors, technical documentation, and handover planning.
            </p>

            <div className="mt-7 grid gap-3">
              {operations.map((operation) => {
                const Icon = operation.icon
                return (
                  <div key={operation.label} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/5 p-3">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-semibold">{operation.label}</span>
                    <CheckCircle2 className="ml-auto h-4 w-4 text-success" />
                  </div>
                )
              })}
            </div>

            <div className="mt-8">
              <Link href="/partnerships" className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-semibold text-gray-950 transition hover:bg-primary-400">
                Work with Stablebricks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
