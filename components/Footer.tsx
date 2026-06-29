import Image from "next/image"
import Link from "next/link"
import { Building2, ChevronRight, Mail, MapPin, Phone } from "lucide-react"
import logo from "@/public/stable-bricks-white.png"

const footerLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Land submissions", href: "/land-submissions" },
  { label: "Partnerships", href: "/partnerships" },
  { label: "Developer portal", href: "/developer" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

const services = ["Property sales", "Land and plot sales", "Construction", "Procurement", "Contractors", "Payment plans"]

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-950 px-4 py-12 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="border-b border-white/15 pb-4">
            <Image src={logo} className="h-16 w-auto object-contain object-left" alt="Stablebricks" />
          </div>
          <p className="mt-5 text-sm leading-7 text-white/70">
            Stablebricks is a Nigerian real estate and construction company focused on property sales, land and plot
            sales, procurement, contractor partnerships, and buyer support with clear documentation.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-sm text-primary">
            <Building2 className="h-4 w-4" />
            Stable. Professional. Built for real property decisions.
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary">Useful links</h2>
          <ul className="mt-5 grid gap-3">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link className="flex items-center gap-2 text-sm text-white/75 transition hover:text-primary" href={link.href}>
                  <ChevronRight className="h-4 w-4" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary">Office location</h2>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" />
              Hamisu Abba Plaza, Tarauni, Kano
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" />
              080 6224 9834
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" />
              Contact the sales and services team
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {services.map((service) => (
              <span key={service} className="rounded-md border border-white/10 px-3 py-2 text-xs text-white/70">
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
