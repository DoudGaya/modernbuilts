// Admin Dashboard Types
import { LucideIcon } from "lucide-react"

export interface DashboardStat {
  title: string
  value: string
  change: string
  changeType: "increase" | "decrease"
  icon: LucideIcon
}

export interface ChartDataPoint {
  name: string
  value: number
}

export interface AnalyticsChartData {
  investments: ChartDataPoint[]
  projects: ChartDataPoint[]
}

export interface RecentActivity {
  action: string
  details: string
  time: string
}

export interface AnalyticsData {
  success?: boolean
  error?: string
  stats?: DashboardStat[]
  chartData?: AnalyticsChartData
  recentActivity?: RecentActivity[]
}

// Project related types
export interface ProjectWithInvestments {
  id: string
  title: string
  slug: string
  coverImage: string
  video: string
  images: string[]
  category: string
  description: string
  duration: Date
  valuation: string
  state: string
  city: string
  location: string
  projectStatus: "PENDING" | "ACTIVE" | "END" | "COMPLETED"
  features: string[]
  sharePrice: number
  roi: number
  length: string
  createdAt: Date
  updatedAt: Date
  investment: Investment[]
  _count: {
    investment: number
  }
  totalInvested: number
  fundingProgress: number
  totalInvestors: number
}

export interface Investment {
  id: string
  investmentAmount: number
  investmentReturn: number
  dateOfInvestment: Date
  status: "PENDING" | "ACTIVE" | "END" | "COMPLETED"
  dateOfreturn: Date
  shares?: number
  transactionRef?: string
  flutterwaveRef?: string
  userId: string
  projectId: string
  certificateId?: string
  verificationToken?: string
  user: {
    id: string
    name: string | null
    email: string | null
  }
  project?: {
    id: string
    title: string
    slug: string
  }
}

// User related types
export interface UserProfile {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  role: "USER" | "ADMIN" | "DEVELOPER"
  emailVerified: Date | null
  image: string | null
  referralID: string | null
  isTwoFactorEnabled: boolean
  createdAt?: Date
  updatedAt?: Date
}

// Property related types
export interface PropertyListing {
  id: string
  title: string
  description: string
  price: number
  location: string
  state: string
  slug: string
  city: string
  bedrooms: number | null
  bathrooms: number | null
  area: string | null
  type: string // For Sale, For Rent
  category: string // Residential, Commercial, Industrial
  features: string[]
  images: string[]
  coverImage: string
  status: string // Active, Sold, Rented
  createdAt: Date
  updatedAt: Date
  isInWishlist?: boolean
}

// Contact and Complaint types
export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: "Unread" | "Read" | "Responded"
  createdAt: Date
  updatedAt: Date
}

export interface ComplaintTicket {
  id: string
  subject: string
  description: string
  status: "Open" | "In Progress" | "Resolved" | "Closed"
  userId: string
  user: UserProfile
  createdAt: Date
  updatedAt: Date
  response: string | null
  respondedAt: Date | null
}

// Land submission types
export interface LandSubmission {
  id: string
  location: string
  size: string
  titleType: string
  currentUse: string | null
  description: string
  documents: string[]
  status: "Pending" | "Approved" | "Rejected"
  userId: string
  user: UserProfile
  createdAt: Date
  updatedAt: Date
  feedback: string | null
  plans: string[]
}

// Wishlist types
export interface WishlistItem {
  id: string
  userId: string
  listingId: string
  propertyListing: PropertyListing
  createdAt: Date
  updatedAt: Date
}

// API Response types
export interface ApiResponse<T = any> {
  success?: boolean
  error?: string
  data?: T
}

export interface PaginatedResponse<T> {
  success?: boolean
  error?: string
  data?: T[]
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Form types
export interface ProjectFormData {
  title: string
  category: string
  description: string
  duration: string
  valuation: string
  state: string
  city: string
  location: string
  sharePrice: string
  roi: string
  projectStatus: "PENDING" | "ACTIVE" | "END" | "COMPLETED"
  length: string
  features?: string[]
  coverImageUrl?: string
  videoUrl?: string
  imageUrls?: string[]
}

// File upload types
export interface UploadResult {
  fileUrl: string
  fileName: string
}

export interface FileUploadHook {
  uploadFile: (file: File, folder?: string) => Promise<UploadResult | null>
  uploadMultipleFiles: (files: File[], folder?: string) => Promise<UploadResult[]>
  isUploading: boolean
  progress: number
  error: string | null
  testConnectivity: () => Promise<{ success: boolean; message?: string; error?: string }>
}

// Dashboard specific types
export interface DashboardStats {
  totalProjects: number
  totalUsers: number
  totalInvestments: number
  totalRevenue: number
  activeProjects: number
  completedProjects: number
}

export interface DashboardMetric {
  label: string
  value: string | number
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: LucideIcon
}

// Chart configuration types
export interface ChartConfig {
  type: 'line' | 'bar' | 'pie' | 'area' | 'donut'
  data: ChartDataPoint[]
  xAxisKey?: string
  yAxisKey?: string
  colors?: string[]
  height?: number
  showLegend?: boolean
  showTooltip?: boolean
}

// Data table types
export interface TableColumn<T = any> {
  key: keyof T | string
  title: string
  sortable?: boolean
  render?: (value: any, record: T, index: number) => React.ReactNode
  width?: string | number
}

export interface TableProps<T = any> {
  data: T[]
  columns: TableColumn<T>[]
  loading?: boolean
  pagination?: {
    current: number
    pageSize: number
    total: number
    onChange: (page: number, pageSize: number) => void
  }
  rowKey?: keyof T | string
}

// Admin action types
export interface AdminAction {
  label: string
  icon?: LucideIcon
  onClick: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  disabled?: boolean
}

// Notification types
export interface AdminNotification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
  actionUrl?: string
}
