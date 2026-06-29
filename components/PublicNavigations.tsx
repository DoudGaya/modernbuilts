"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import {
  Building2,
  Handshake,
  Hammer,
  LayoutDashboard,
  LogIn,
  MapPinned,
  Menu,
  UserRound,
} from "lucide-react"
import logo from "@/public/stablebricks.png"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const propertyLinks = [
  { name: "Buildings for sale", url: "/properties", description: "Finished homes, apartments, and commercial spaces." },
  { name: "Land and plots", url: "/properties?category=land", description: "Surveyed residential and mixed-use plots." },
  { name: "Walk-around tours", url: "/properties", description: "View approach, interiors, service yard, and site access." },
  { name: "GIS access checks", url: "/properties", description: "Review routes, nearby anchors, and access roads." },
]

const serviceLinks = [
  { name: "Construction", url: "/projects", description: "Design coordination, build supervision, and delivery." },
  { name: "Procurement", url: "/about", description: "Materials sourcing, verification, logistics, and supply." },
  { name: "Contractors", url: "/developer", description: "Work with vetted construction and trade partners." },
  { name: "Flexible payment plans", url: "/properties", description: "Structured sales plans for qualified buyers." },
]

const partnershipLinks = [
  { name: "Submit land", url: "/land-submissions", description: "Propose land for sale, development, or joint work." },
  { name: "Become a partner", url: "/partnerships", description: "For landowners, contractors, vendors, and institutions." },
  { name: "Developer portal", url: "/developer", description: "Construction partner onboarding and submissions." },
]

const companyLinks = [
  { name: "About Stablebricks", url: "/about", description: "How we sell, build, procure, and support buyers." },
  { name: "Contact", url: "/contact", description: "Book a visit, request documents, or speak with our team." },
]

const menuGroups = [
  { label: "Properties", icon: Building2, links: propertyLinks },
  { label: "Services", icon: Hammer, links: serviceLinks },
  { label: "Partnerships", icon: Handshake, links: partnershipLinks },
  { label: "Company", icon: MapPinned, links: companyLinks },
]

function DesktopMenuGroup({ group }: { group: (typeof menuGroups)[number] }) {
  const Icon = group.icon

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="gap-2 bg-transparent font-poppins text-sm font-semibold text-gray-900 hover:bg-primary-50">
        <Icon className="h-4 w-4" />
        {group.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[560px] gap-2 p-4 md:grid-cols-2">
          {group.links.map((item) => (
            <li key={item.name}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.url}
                  className="block rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary-50 focus:bg-primary-50"
                >
                  <div className="text-sm font-semibold text-gray-950">{item.name}</div>
                  <p className="mt-2 line-clamp-2 text-sm leading-snug text-gray-600">{item.description}</p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

export const PublicNavigations = () => {
  const session = useSession()
  const user = session.data?.user?.name

  return (
    <>
      <header className="fixed left-0 top-0 z-50 hidden w-full border-b border-primary/40 bg-white/95 py-3 shadow-sm backdrop-blur lg:block">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center" aria-label="Stablebricks home">
            <Image src={logo} alt="Stablebricks" className="h-10 w-auto object-contain" priority />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {menuGroups.map((group) => (
                <DesktopMenuGroup key={group.label} group={group} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            {user ? (
              <Link
                href="/user/dashboard"
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 transition hover:border-primary hover:bg-primary-50"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-100"
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-gray-950 transition hover:bg-primary-400"
                >
                  <UserRound className="h-4 w-4" />
                  Create account
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <Sheet>
        <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-primary/40 bg-white px-5 py-3 shadow-sm lg:hidden">
          <Link href="/" aria-label="Stablebricks home">
            <Image src={logo} alt="Stablebricks" className="h-10 w-auto object-contain" priority />
          </Link>
          <SheetTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-200">
            <Menu className="h-5 w-5" />
          </SheetTrigger>
        </div>
        <SheetContent side="left" className="w-[320px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center">
              <Image alt="Stablebricks" className="h-10 w-auto object-contain" src={logo} />
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 space-y-7">
            {menuGroups.map((group) => {
              const Icon = group.icon
              return (
                <div key={group.label} className="space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase text-gray-950">
                    <Icon className="h-4 w-4 text-primary-700" />
                    {group.label}
                  </div>
                  <div className="space-y-2 pl-6">
                    {group.links.map((link) => (
                      <Link key={link.name} href={link.url} className="block text-sm font-medium text-gray-600 hover:text-gray-950">
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}

            <div className="border-t border-gray-200 pt-5">
              {user ? (
                <Link
                  href="/user/dashboard"
                  className="flex items-center justify-center gap-2 rounded-md bg-gray-950 px-4 py-3 text-sm font-semibold text-primary"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Open dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" className="rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-900">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-gray-950">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
