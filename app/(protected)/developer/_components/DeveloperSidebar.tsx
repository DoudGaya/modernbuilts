"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LuLayoutDashboard } from "react-icons/lu"
import { FaRegBuilding, FaTools } from "react-icons/fa"
import { MdLandscape, MdOutlineDocumentScanner } from "react-icons/md"
import { LuCalendarClock } from "react-icons/lu"
import { IoDocumentTextOutline } from "react-icons/io5"
import { BsClipboardData } from "react-icons/bs"
import { SlSettings } from "react-icons/sl"
import { TbMessages } from "react-icons/tb"
import { cn } from '@/lib/utils'

const navigation = [
  {
    name: "Dashboard",
    href: "/developer/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    name: "Projects",
    href: "/developer/projects",
    icon: FaRegBuilding,
  },
  {
    name: "Land Submissions",
    href: "/developer/land-submissions",
    icon: MdLandscape,
  },
  {
    name: "Construction Progress",
    href: "/developer/construction-progress",
    icon: FaTools,
  },
  {
    name: "Schedule",
    href: "/developer/schedule",
    icon: LuCalendarClock,
  },
  {
    name: "Documents",
    href: "/developer/documents",
    icon: IoDocumentTextOutline,
  },
  {
    name: "Reports",
    href: "/developer/reports",
    icon: BsClipboardData,
  },
  {
    name: "Communications",
    href: "/developer/messages",
    icon: TbMessages,
  },
  {
    name: "Settings",
    href: "/developer/settings",
    icon: SlSettings,
  },
]

export function DeveloperSidebar() {
  const pathname = usePathname()
  
  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-md z-10 pt-20">
      <nav className="px-2 py-5">
        <div className="space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                pathname === item.href
                  ? "bg-yellow-50 text-yellow-800"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center rounded-md px-3 py-3 text-sm font-medium"
              )}
            >
              <item.icon
                className={cn(
                  pathname === item.href
                    ? "text-yellow-600"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 h-5 w-5 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="px-3">
            <h3 className="text-sm font-medium text-gray-500">Development Status</h3>
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span>Current Projects</span>
                <span className="font-medium">3</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}