export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number') {
    amount = parseFloat(String(amount).replace(/[^\d.-]/g, '')) || 0;
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export function formatCurrencyShort(amount: number | string): string {
  let numVal = typeof amount === 'number' ? amount : parseFloat(String(amount).replace(/[^\d.-]/g, ''));
  if (isNaN(numVal)) numVal = 0;
  
  if (numVal >= 1000000000) {
    return `₦${(numVal / 1000000000).toFixed(2)}B`;
  }
  if (numVal >= 1000000) {
    return `₦${(numVal / 1000000).toFixed(2)}M`;
  }
  if (numVal >= 1000) {
    return `₦${(numVal / 1000).toFixed(2)}K`;
  }
  return `₦${numVal.toFixed(2)}`;
}

export const calculateFundingProgress = (project: any) => {
  if (!project) return 0;
  const totalInvested = project.investment?.reduce((sum: number, inv: any) => sum + (Number(inv.investmentAmount) || 0), 0) || 0;
  let targetAmount = 1;
  if (typeof project.valuation === 'string') {
    targetAmount = parseFloat(project.valuation.replace(/[^\d.]/g, '')) || 1;
  } else if (typeof project.valuation === 'number') {
    targetAmount = project.valuation || 1;
  } else if (project.investmentRequired) {
    targetAmount = Number(project.investmentRequired) || 1;
  }
  return Math.min((totalInvested / targetAmount) * 100, 100);
}
