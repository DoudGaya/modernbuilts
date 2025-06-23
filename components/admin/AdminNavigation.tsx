"use client"
import Link from "next/link"
import Image from "next/image"
import { Bell, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "next-auth/react"
import logo from "@/public/stablebricks.png"

export const AdminNavigation = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            {/* Leave space for mobile menu button */}
            <div className="w-10 md:w-0"></div>
            <Link href="/admin" className="flex mr-2 md:mr-6">
              <Image src={logo || "/placeholder.svg"} alt="StableBricks" className="h-6 md:h-8 object-contain object-left mr-2 md:mr-3" />
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search - Hidden on small mobile screens */}
            <div className="relative mr-2 md:mr-6 hidden sm:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-48 md:w-64" />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm">
              <Bell className="w-4 md:w-5 h-4 md:h-5" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-4 md:w-5 h-4 md:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
