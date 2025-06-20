// Main types index file for easy imports
export * from './admin'

// Re-export commonly used Prisma types
export type { User, Project, Investment, PropertyListing, Wishlist } from '@prisma/client'

// Common utility types
export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface SearchParams {
  search?: string
  status?: string
  category?: string
  location?: string
  page?: string
}

export interface FilterOptions {
  status?: string
  category?: string
  location?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

// API route types
export interface NextRequest extends Request {
  nextUrl: {
    searchParams: URLSearchParams
  }
}

export interface RouteParams {
  params: {
    [key: string]: string
  }
}

// Form state types
export interface FormState {
  success?: boolean
  error?: string
  fieldErrors?: {
    [key: string]: string[]
  }
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: NavItem[]
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'

// Status types
export type Status = 'success' | 'error' | 'warning' | 'info'

// Loading states
export interface LoadingState {
  loading: boolean
  error: string | null
}
