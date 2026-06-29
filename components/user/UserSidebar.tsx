"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { AlertTriangle, Building2, CalendarCheck, Heart, Home, Mail, Settings, User, WalletCards } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: Home,
  },
  {
    title: "Properties",
    href: "/user/projects",
    icon: Building2,
  },
  {
    title: "Enquiries",
    href: "/user/enquiries",
    icon: Mail,
  },
  {
    title: "Payment Plans",
    href: "/user/wallet",
    icon: WalletCards,
  },
  {
    title: "Site Visits",
    href: "/user/consultations",
    icon: CalendarCheck,
  },
  {
    title: "Wishlist",
    href: "/user/wishlist",
    icon: Heart,
  },
  {
    title: "Complaints",
    href: "/user/complaints",
    icon: AlertTriangle,
  },
  {
    title: "Profile",
    href: "/user/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/user/settings",
    icon: Settings,
  },
]

export const UserSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-16 z-20 h-screen w-64 border-r border-gray-200 bg-white pt-6">
      <div className="h-full overflow-y-auto px-3 pb-4">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/user/dashboard" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center rounded-md p-2 text-gray-800 hover:bg-primary-50",
                    isActive && "bg-primary-100 text-gray-950",
                  )}
                >
                  <Icon className="h-5 w-5 text-gray-500 transition group-hover:text-gray-950" />
                  <span className="ml-3">{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
