"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, TrendingUp, Users, MapPin, AlertTriangle, Mail, BarChart3, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Building2,
  },
  {
    title: "Listings",
    href: "/admin/listings",
    icon: MapPin,
  },
  {
    title: "Investments",
    href: "/admin/investments",
    icon: TrendingUp,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Contacts",
    href: "/admin/contacts",
    icon: Mail,
  },
  {
    title: "Land Submissions",
    href: "/admin/land-submissions",
    icon: MapPin,
  },
  {
    title: "Complaints",
    href: "/admin/complaints",
    icon: AlertTriangle,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="fixed top-16 left-0 z-20 w-64 h-screen pt-6 bg-white border-r border-gray-200">
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group",
                    isActive && "bg-yellow-100 text-yellow-800",
                  )}
                >
                  <Icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
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
