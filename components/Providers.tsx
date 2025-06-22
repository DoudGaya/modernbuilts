"use client"

import { ThemeProvider, useTheme } from 'next-themes'
import { SessionProvider } from "next-auth/react"
import { ReactNode, useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'

interface ProvidersProps {
  children: ReactNode
  session?: any
}

export function Providers({ children, session }: ProvidersProps) {
  // Avoid rendering the ThemeProvider until mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }
    return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
    </button>
  )
}