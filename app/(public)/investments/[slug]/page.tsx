import { redirect } from "next/navigation"

interface LegacyInvestmentDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function LegacyInvestmentDetailPage({ params }: LegacyInvestmentDetailPageProps) {
  await params
  redirect("/properties")
}
