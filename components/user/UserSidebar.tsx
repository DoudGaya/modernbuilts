"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building2, TrendingUp, Wallet, AlertTriangle, Mail, Settings, User, Heart, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

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
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = useState(false)

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false)
    }
  }, [pathname, isMobile])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('user-sidebar')
      const toggleButton = document.getElementById('sidebar-toggle')
      
      if (isMobile && isOpen && sidebar && toggleButton) {
        if (!sidebar.contains(event.target as Node) && !toggleButton.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobile, isOpen])

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Toggle Button */}
        <button
          id="sidebar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 p-2 text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
          aria-label="Toggle sidebar"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Backdrop */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          id="user-sidebar"
          className={cn(
            "fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 md:hidden",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
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
                        "flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors",
                        isActive && "bg-yellow-100 text-yellow-800"
                      )}
                      onClick={() => setIsOpen(false)}
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
      </>
    )
  }

  // Desktop Sidebar
  return (
    <aside className="fixed top-16 left-0 z-20 w-64 h-screen pt-6 bg-white border-r border-gray-200 hidden md:block">
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
                    "flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group transition-colors",
                    isActive && "bg-yellow-100 text-yellow-800"
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
