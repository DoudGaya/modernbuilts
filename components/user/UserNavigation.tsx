"use client"
import Link from "next/link"
import Image from "next/image"
import { Bell, Search, User, LogOut, Wallet } from "lucide-react"
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
import { useCurrentUser } from "@/hooks/use-current-user"
import { getWalletByUserId } from "@/actions/wallet"
import { useState, useEffect } from "react"
import logo from "@/public/stablebricks.png"

export const UserNavigation = () => {
  const user = useCurrentUser()
  const [balance, setBalance] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.id) {
      loadWalletBalance()
    }
  }, [user?.id])

  const loadWalletBalance = async () => {
    if (!user?.id) return
    
    try {
      const result = await getWalletByUserId(user.id)
      if (result.success && result.wallet) {
        setBalance(result.wallet.balance || 0)
      }
    } catch (error) {
      console.error("Failed to load wallet balance:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatBalance = (amount: number) => {
    if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`
    } else {
      return `₦${amount.toLocaleString()}`
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Link href="/user/dashboard" className="flex mr-6">
              <Image src={logo || "/placeholder.svg"} alt="StableBricks" className="h-8 object-contain object-left mr-3" />
              {/* <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap">Dashboard</span> */}
            </Link>
          </div>

          <div className="flex items-center">
            <div className="relative mr-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <Input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 w-64" />
            </div>            <Link href="/user/wallet">
              <Button variant="ghost" size="sm" className="mr-2">
                <Wallet className="w-5 h-5" />
                <span className="ml-2">
                  {loading ? "..." : formatBalance(balance)}
                </span>
              </Button>
            </Link>

            <Button variant="ghost" size="sm" className="mr-2">
              <Bell className="w-5 h-5" />
            </Button>

            <DropdownMenu>              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user/profile" className="cursor-pointer">
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
