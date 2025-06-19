"use client"

import * as React from "react"
import { forwardRef } from "react"
import {
  DropdownMenu as OriginalDropdownMenu,
  DropdownMenuTrigger as OriginalDropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"

// Create properly ref-forwarded components
const SafeDropdownMenu = forwardRef((props, ref) => {
  return <OriginalDropdownMenu {...props} />
})
SafeDropdownMenu.displayName = "SafeDropdownMenu"

const SafeDropdownMenuTrigger = forwardRef((props, ref) => {
  return <OriginalDropdownMenuTrigger {...props} />
})
SafeDropdownMenuTrigger.displayName = "SafeDropdownMenuTrigger"

// Re-export all components with the safe versions
export {
  SafeDropdownMenu as DropdownMenu,
  SafeDropdownMenuTrigger as DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
}