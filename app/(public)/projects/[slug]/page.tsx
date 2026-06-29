import { redirect } from "next/navigation"

interface LegacyProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function LegacyProjectDetailPage({ params }: LegacyProjectDetailPageProps) {
  await params
  redirect("/projects")
}
