"use client"

import * as React from "react"
import { forwardRef, ComponentPropsWithRef } from "react"
import {
  Select as OriginalSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Create a version of the Select component that properly handles refs in React 19
const SafeSelect = forwardRef<HTMLElement, ComponentPropsWithRef<typeof OriginalSelect>>(({ children, ...props }, ref) => {
  // Don't pass ref to OriginalSelect as it doesn't accept it
  return <OriginalSelect {...props}>{children}</OriginalSelect>
})
SafeSelect.displayName = "SafeSelect"

// Re-export all the other select components
export {
  SafeSelect as Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
}