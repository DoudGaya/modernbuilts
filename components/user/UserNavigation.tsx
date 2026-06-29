"use client"

import Image from "next/image"
import Link from "next/link"
import { Bell, CalendarCheck, LogOut, Search, User } from "lucide-react"
import logo from "@/public/stablebricks.png"
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

export const UserNavigation = () => {
  return (
    <nav className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/user/dashboard" className="mr-6 flex">
              <Image src={logo} alt="Stablebricks" className="mr-3 h-8 w-auto object-contain object-left" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-500" />
              </div>
              <Input type="text" placeholder="Search properties, routes, enquiries..." className="w-72 py-2 pl-10 pr-4" />
            </div>

            <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
              <Link href="/user/consultations">
                <CalendarCheck className="h-5 w-5" />
                <span className="ml-2">Site visit</span>
              </Link>
            </Button>

            <Button variant="ghost" size="sm" className="mr-1">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
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
