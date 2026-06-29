import Link from "next/link"
import { Building2, FileText, MapPinned } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SellAssetsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">Submit property or land</h1>
        <p className="mt-2 text-gray-600">Start a sale, land review, or partnership conversation with Stablebricks.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { title: "Land for sale", icon: MapPinned, description: "Submit plot details, survey status, access, and preferred sales terms." },
          { title: "Finished property", icon: Building2, description: "Share property details for listing, inspection, and buyer review." },
          { title: "Documents review", icon: FileText, description: "Ask the team to review title, survey, and availability for onboarding." },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <Icon className="mb-3 h-7 w-7 text-primary-700" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <Button asChild className="bg-primary text-gray-950 hover:bg-primary-400">
        <Link href="/land-submissions">Open land submission form</Link>
      </Button>
    </div>
  )
}
