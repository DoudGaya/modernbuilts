import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateReferralCode(input: string): string {
  // Create a referral code based on input (email or name) and hash
  const hash = crypto.createHash("md5").update(input).digest("hex")
  return hash.substring(0, 8).toUpperCase()
}

export function generateInvestmentToken(): string {
  return crypto.randomBytes(32).toString("hex")
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}


// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }


// export const generateReferralCode = (email: string) => {
//   const rand = Math.random().toString(36).substring(7)
//   return `${email.split('@')[0]}-${rand}`
// } 


export const isProduction = process.env.NODE_ENV === "production"
export const isLocal = process.env.NODE_ENV === 'development'