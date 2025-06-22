// Utility functions for project calculations and formatting

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount)
}

export const formatCurrencyShort = (amount: number): string => {
  if (amount >= 1000000000) {
    return `₦${(amount / 1000000000).toFixed(1)}B`
  } else if (amount >= 1000000) {
    return `₦${(amount / 1000000).toFixed(1)}M`
  } else if (amount >= 1000) {
    return `₦${(amount / 1000).toFixed(0)}K`
  }
  return `₦${amount.toLocaleString()}`
}

export const calculateFundingProgress = (project: any): number => {
  if (!project.investmentRequired || project.investmentRequired === 0) return 0
  
  // Calculate from sold shares
  const totalInvested = (project.soldShares || 0) * (project.sharePrice || 0)
  const progress = (totalInvested / project.investmentRequired) * 100
  
  return Math.min(progress, 100)
}

export const calculateRemainingShares = (project: any): number => {
  const totalShares = project.totalShares || 0
  const soldShares = project.soldShares || 0
  return Math.max(0, totalShares - soldShares)
}

export const calculateTotalInvested = (project: any): number => {
  return (project.soldShares || 0) * (project.sharePrice || 0)
}

export const calculateMinimumInvestment = (project: any): number => {
  return project.sharePrice || 0
}

export const calculateExpectedReturns = (investmentAmount: number, roi: number): number => {
  return investmentAmount * (roi / 100)
}

export const calculateTotalReturn = (investmentAmount: number, roi: number): number => {
  return investmentAmount + calculateExpectedReturns(investmentAmount, roi)
}
