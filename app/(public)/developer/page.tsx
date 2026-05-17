import { Metadata } from "next"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, TrendingUp, Users, Shield, Briefcase, CheckCircle, ArrowRight, MapPin, DollarSign } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Real Estate Developer Portal | StableBricks",
  description: "Join StableBricks as a real estate developer. Submit your projects, raise capital from investors, and grow your development business with our trusted platform.",
  keywords: ["real estate developer", "property development", "project funding", "real estate investment", "property developer Nigeria", "development funding", "real estate capital"],
  openGraph: {
    title: "Real Estate Developer Portal | StableBricks",
    description: "Join StableBricks as a real estate developer. Submit your projects, raise capital from investors, and grow your development business.",
    url: "https://stablebricks.com/developer",
    siteName: "StableBricks",
    type: "website",
    images: [
      {
        url: "https://stablebricks.com/stablebricks.png",
        width: 1200,
        height: 630,
        alt: "StableBricks Developer Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Estate Developer Portal | StableBricks",
    description: "Join StableBricks as a real estate developer. Submit your projects, raise capital from investors, and grow your development business.",
    images: ["https://stablebricks.com/stablebricks.png"],
  },
  alternates: {
    canonical: "https://stablebricks.com/developer",
  },
}

// Sample success stories
const successStories = [
  {
    developer: "Landmark Properties",
    project: "Executive Towers Lagos",
    raised: "₦2.5B",
    investors: 150,
    image: "/img/project-1.jpg"
  },
  {
    developer: "Crown Development",
    project: "Smart Homes Abuja",
    raised: "₦1.8B", 
    investors: 120,
    image: "/img/project-2.jpg"
  },
  {
    developer: "Metro Builders",
    project: "Luxury Gardens Kano",
    raised: "₦1.2B",
    investors: 85,
    image: "/img/project-3.jpg"
  }
]

const benefits = [
  {
    icon: DollarSign,
    title: "Access to Capital",
    description: "Raise funds from a network of verified investors for your development projects"
  },
  {
    icon: Users,
    title: "Investor Network",
    description: "Connect with thousands of investors looking for real estate opportunities"
  },
  {
    icon: Shield,
    title: "Trusted Platform",
    description: "Benefit from our reputation and compliance framework to build investor confidence"
  },
  {
    icon: TrendingUp,
    title: "Growth Support",
    description: "Get marketing support and project visibility to maximize your funding potential"
  },
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Use our tools to manage projects, communicate with investors, and track progress"
  },
  {
    icon: CheckCircle,
    title: "Due Diligence",
    description: "We handle investor verification and compliance, so you can focus on development"
  }
]

const requirements = [
  "Registered real estate development company in Nigeria",
  "Valid CAC registration and tax clearance",
  "Minimum 3 years of development experience",
  "Completed or ongoing projects portfolio",
  "Professional qualifications and certifications",
  "Financial statements and references"
]

export default function DeveloperPortalPage() {
  return (
    <>
      <PublicNavigations />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-to-br from-yellow-600 to-yellow-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-yellow-100 text-yellow-800 border-yellow-200">
                  <Building2 className="mr-2 h-4 w-4" />
                  Real Estate Developer Portal
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Fund Your Development Projects
                </h1>
                <p className="text-xl text-yellow-100 mb-8">
                  Join Nigeria's leading real estate investment platform. 
                  Submit your projects, raise capital from verified investors, 
                  and grow your development business with StableBricks.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/developer/apply">
                    <Button size="lg" variant="secondary" className="bg-white text-yellow-800 hover:bg-gray-100">
                      Apply as Developer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-yellow-800">
                    View Requirements
                  </Button>
                </div>
              </div>
              <div className="lg:text-right">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Platform Statistics</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">₦15B+</div>
                      <div className="text-yellow-200">Capital Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">50+</div>
                      <div className="text-yellow-200">Projects Funded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">200+</div>
                      <div className="text-yellow-200">Active Developers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">5000+</div>
                      <div className="text-yellow-200">Investors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose StableBricks?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join hundreds of successful developers who have raised capital and grown their businesses through our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how developers have successfully raised capital for their projects
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <Building2 className="h-16 w-16 text-yellow-600" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{story.project}</h3>
                    <p className="text-gray-600 mb-4">by {story.developer}</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Raised:</span>
                        <div className="font-semibold text-green-600">{story.raised}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Investors:</span>
                        <div className="font-semibold">{story.investors}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Requirements Section */}
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Developer Requirements
              </h2>
              <p className="text-xl text-gray-600">
                To ensure quality and investor confidence, we have specific requirements for developers
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600">
                Simple steps to get your development project funded
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Apply", description: "Submit your developer application with required documents" },
                { step: "2", title: "Verification", description: "Our team reviews and verifies your credentials and experience" },
                { step: "3", title: "Project Submission", description: "Submit your project details, financials, and development plans" },
                { step: "4", title: "Go Live", description: "Your project goes live and starts raising capital from investors" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-yellow-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-yellow-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Fund Your Next Project?
            </h2>
            <p className="text-xl text-yellow-100 mb-8">
              Join successful developers who are building the future of Nigerian real estate. 
              Apply today and start raising capital for your development projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/developer/apply">
                <Button size="lg" variant="secondary" className="bg-white text-yellow-800 hover:bg-gray-100">
                  Apply as Developer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-yellow-800">
                  Contact Our Team
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
