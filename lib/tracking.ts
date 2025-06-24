import { trackEvent } from '@/components/analytics/GoogleAnalytics'

// Investment tracking events
export const trackInvestmentView = (projectId: string, projectName: string) => {
  trackEvent('view_investment', 'investment', `${projectName} (${projectId})`)
}

export const trackInvestmentInterest = (projectId: string, projectName: string, amount?: number) => {
  trackEvent('investment_interest', 'investment', `${projectName} (${projectId})`, amount)
}

export const trackInvestmentComplete = (projectId: string, projectName: string, amount: number) => {
  trackEvent('purchase', 'investment', `${projectName} (${projectId})`, amount)
}

// User engagement events
export const trackCalculatorUse = (projectType: string, amount: number) => {
  trackEvent('calculator_use', 'engagement', projectType, amount)
}

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', 'engagement', formType)
}

export const trackNewsletterSignup = (location: string) => {
  trackEvent('newsletter_signup', 'engagement', location)
}

// Property and project events
export const trackPropertyView = (propertyId: string, propertyName: string) => {
  trackEvent('view_property', 'property', `${propertyName} (${propertyId})`)
}

export const trackProjectView = (projectId: string, projectName: string) => {
  trackEvent('view_project', 'project', `${projectName} (${projectId})`)
}

// User authentication events
export const trackUserRegistration = (method: string) => {
  trackEvent('sign_up', 'auth', method)
}

export const trackUserLogin = (method: string) => {
  trackEvent('login', 'auth', method)
}

// Document downloads
export const trackDocumentDownload = (documentType: string, documentName: string) => {
  trackEvent('download', 'document', `${documentType}: ${documentName}`)
}

// Social sharing
export const trackSocialShare = (platform: string, contentType: string, contentId: string) => {
  trackEvent('share', 'social', `${platform}: ${contentType} (${contentId})`)
}
