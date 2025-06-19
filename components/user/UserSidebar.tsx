"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, TrendingUp, Wallet, AlertTriangle, Mail, Settings, User, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/user/projects",
    icon: Building2,
  },
  {
    title: "My Investments",
    href: "/user/investments",
    icon: TrendingUp,
  },
  {
    title: "Wallet",
    href: "/user/wallet",
    icon: Wallet,
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
    title: "Contact",
    href: "/user/contact",
    icon: Mail,
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
    <aside className="fixed top-16 left-0 z-20 w-64 h-screen pt-6 bg-white border-r border-gray-200">
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href || (item.href !== "/user/dashboard" && pathname.startsWith(item.href))

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
