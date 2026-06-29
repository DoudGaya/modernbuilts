import { Metadata } from "next"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import DeveloperApplicationForm from "./components/DeveloperApplicationForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, FileText, CheckCircle, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Apply as Partner | Stablebricks",
  description: "Apply to join Stablebricks as a verified construction, procurement, property, or development partner.",
  keywords: ["contractor application", "real estate developer", "property services", "construction partner"],
}

export default function DeveloperApplyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PublicNavigations />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Apply to Become a Partner
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our network of verified developers, contractors, procurement vendors, and technical service partners.
          </p>
        </div>

        {/* Application Process */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">1. Submit Application</h3>
              <p className="text-sm text-gray-600">Complete the detailed application form with your company and project information</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">2. Review Process</h3>
              <p className="text-sm text-gray-600">Our team reviews your application and verifies your credentials (2-5 business days)</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">3. Approval</h3>
              <p className="text-sm text-gray-600">Get approved and receive access to your developer dashboard</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Building2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">4. Start Building</h3>
              <p className="text-sm text-gray-600">Submit property, service, procurement, or construction work for review</p>
            </CardContent>
          </Card>
        </div>

        {/* Application Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Partner Application Form</CardTitle>
            <CardDescription>
              Please provide accurate information about your company and development experience. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DeveloperApplicationForm />
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}
