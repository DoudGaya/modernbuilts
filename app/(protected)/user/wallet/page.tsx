import { CheckCircle2, FileText, WalletCards } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { propertyListings } from "@/lib/property-data"

export default function PaymentPlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-950">Payment plans</h1>
        <p className="mt-2 text-gray-600">Request flexible payment-plan guidance for available property and land sales.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>How plans are reviewed</CardTitle>
            <CardDescription>Payment plans are tied to documentation and sales milestones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Buyer KYC and contact verification",
              "Property availability and document review",
              "Deposit confirmation and reservation terms",
              "Milestone or instalment schedule agreement",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-gray-50 p-3 text-sm text-gray-700">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-gray-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle>Request payment-plan quote</CardTitle>
            <CardDescription>Share the listing and preferred payment structure.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Property or land listing" />
            <Input placeholder="Preferred deposit percentage" />
            <Input placeholder="Preferred tenor, e.g. 12 months" />
            <Textarea rows={5} placeholder="Notes, budget range, or documentation questions" />
            <Button className="bg-primary text-gray-950 hover:bg-primary-400">
              <WalletCards className="h-4 w-4" />
              Request quote
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle>Current flexible options</CardTitle>
          <CardDescription>Indicative terms shown on featured listings.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {propertyListings.map((property) => (
            <div key={property.slug} className="rounded-md border border-gray-100 bg-gray-50 p-4">
              <div className="mb-3 flex items-start gap-3">
                <FileText className="mt-1 h-4 w-4 text-primary-700" />
                <div>
                  <p className="font-semibold text-gray-950">{property.title}</p>
                  <p className="text-sm text-gray-600">{property.price}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">{property.paymentPlan.deposit}</p>
              <p className="mt-1 text-sm text-gray-600">{property.paymentPlan.tenor} - {property.paymentPlan.monthly}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
