import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, Clock, CheckCircle, AlertCircle } from "lucide-react"
import LandSubmissionForm from "./_components/LandSubmissionForm"

const submissionProcess = [
  {
    step: 1,
    title: "Submit Land Details",
    description: "Provide comprehensive information about your land including location, size, and documentation.",
    icon: FileText,
  },
  {
    step: 2,
    title: "Property Evaluation",
    description: "Our team conducts thorough due diligence including site visits and legal verification.",
    icon: CheckCircle,
  },
  {
    step: 3,
    title: "Development Proposal",
    description: "We create a detailed development proposal with projected returns and timeline.",
    icon: DollarSign,
  },
  {
    step: 4,
    title: "Agreement & Development",
    description: "Upon approval, we sign agreements and begin the development process.",
    icon: Clock,
  },
]

const requirements = [
  "Valid Certificate of Occupancy (C of O) or Governor's Consent",
  "Survey plan and deed of assignment",
  "Clear title with no encumbrances",
  "Minimum land size of 500 square meters",
  "Strategic location with development potential",
  "Access to basic infrastructure (roads, utilities)",
]

const benefits = [
  {
    title: "Guaranteed Returns",
    description: "Earn 15-30% of the project value upon completion",
    icon: DollarSign,
  },
  {
    title: "Professional Development",
    description: "Your land is developed by experienced professionals",
    icon: CheckCircle,
  },
  {
    title: "No Upfront Costs",
    description: "We handle all development costs and project management",
    icon: AlertCircle,
  },
  {
    title: "Legal Protection",
    description: "All agreements are legally binding with proper documentation",
    icon: FileText,
  },
]

export default function LandSubmissionsPage() {
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 text-black">Land Submissions</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-8">
              Partner with us to develop your land into profitable real estate projects. Submit your land for evaluation
              and earn guaranteed returns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Submit Your Land
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Download Guidelines
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Why Submit Your Land to StableBricks?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your unused land into a profitable investment with our proven development expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-lg font-poppins">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Our Submission Process</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A simple, transparent process from submission to development completion
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {submissionProcess.map((process, index) => {
                const IconComponent = process.icon
                return (
                  <div key={index} className="text-center relative">
                    <div className="mx-auto w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mb-4 relative z-10">
                      <IconComponent className="w-8 h-8 text-black" />
                    </div>
                    <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10 hidden lg:block">
                      {index < submissionProcess.length - 1 && <div className="w-full h-full bg-yellow-400"></div>}
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <div className="text-sm font-bold text-yellow-600 mb-2">STEP {process.step}</div>
                      <h3 className="text-lg font-poppins font-semibold mb-2">{process.title}</h3>
                      <p className="text-gray-600 text-sm">{process.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Land Submission Requirements</h2>
              <p className="text-lg text-gray-600">
                Ensure your land meets these requirements for a successful submission
              </p>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  Required Documentation & Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Submission Form */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <LandSubmissionForm />
        </div>
      </div>
    </>
  )
}
