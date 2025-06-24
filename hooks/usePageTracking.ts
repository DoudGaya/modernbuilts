'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackPageView } from '@/components/analytics/GoogleAnalytics'

export const usePageTracking = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      const url = pathname + searchParams.toString()
      trackPageView(url)
    }
  }, [pathname, searchParams])
}
