// Google Analytics Configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-959D9FJV28'

// Only enable analytics in production or when explicitly enabled
export const GA_ENABLED = process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_GA_ENABLED === 'true'
