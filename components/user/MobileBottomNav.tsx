"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, TrendingUp, Wallet, User } from "lucide-react"
import { cn } from "@/lib/utils"

const bottomNavItems = [
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
    title: "Investments",
    href: "/user/investments",
    icon: TrendingUp,
  },
  {
    title: "Wallet",
    href: "/user/wallet",
    icon: Wallet,
  },
  {
    title: "Profile",
    href: "/user/profile",
    icon: User,
  },
]

export const MobileBottomNav = () => {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
      <div className="grid grid-cols-5">
        {bottomNavItems.map((item) => {
          const Icon = item.icon
          const isActive = 
            pathname === item.href || 
            (item.href !== "/user/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors",
                isActive 
                  ? "text-yellow-600 bg-yellow-50" 
                  : "text-gray-600 hover:text-gray-900"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mb-1",
                isActive ? "text-yellow-600" : "text-gray-400"
              )} />
              <span className={cn(
                "truncate",
                isActive ? "font-medium text-yellow-600" : ""
              )}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
