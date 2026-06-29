import { redirect } from "next/navigation"

interface LegacyCertificatePageProps {
  params: Promise<{ token: string }>
}

export default async function LegacyCertificatePage({ params }: LegacyCertificatePageProps) {
  await params
  redirect("/properties")
}
