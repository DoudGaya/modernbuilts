import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { HandshakeIcon, Building2, Users, TrendingUp, Shield, Award, CheckCircle } from "lucide-react"

const partnershipTypes = [
  {
    icon: Building2,
    title: "Development Partners",
    description: "Join us as a construction or development partner and access our network of investors and projects.",
    benefits: ["Access to funding", "Project management support", "Marketing assistance", "Legal framework"],
    requirements: [
      "Valid CAC registration",
      "Proven track record",
      "Professional certifications",
      "Financial capacity",
    ],
  },
  {
    icon: Users,
    title: "Investment Partners",
    description: "Partner with us to co-invest in large-scale real estate projects with shared risks and returns.",
    benefits: ["Diversified portfolio", "Shared expertise", "Risk mitigation", "Higher returns"],
    requirements: [
      "Minimum investment capacity",
      "Due diligence clearance",
      "Investment experience",
      "Long-term commitment",
    ],
  },
  {
    icon: HandshakeIcon,
    title: "Strategic Partners",
    description: "Form strategic alliances with us for mutual business growth and market expansion.",
    benefits: ["Market expansion", "Resource sharing", "Brand collaboration", "Network access"],
    requirements: ["Complementary services", "Market presence", "Quality standards", "Alignment of values"],
  },
]

const partnerBenefits = [
  {
    icon: TrendingUp,
    title: "Guaranteed Returns",
    description: "Enjoy competitive returns on your partnership investments with our proven track record.",
  },
  {
    icon: Shield,
    title: "Risk Mitigation",
    description: "Benefit from our comprehensive risk assessment and management strategies.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "All projects meet international standards with professional oversight and quality control.",
  },
  {
    icon: Users,
    title: "Network Access",
    description: "Gain access to our extensive network of investors, developers, and industry professionals.",
  },
]

export default function PartnershipsPage() {
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 text-black">Partnership Opportunities</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-8">
              Join forces with StableBricks to create exceptional real estate projects and build lasting business
              relationships
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Become a Partner
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Download Partnership Guide
              </Button>
            </div>
          </div>
        </div>

        {/* Partnership Types */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Partnership Types</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the partnership model that best fits your business goals and capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {partnershipTypes.map((type, index) => {
              const IconComponent = type.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl font-poppins">{type.title}</CardTitle>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-green-600">Benefits</h4>
                      <ul className="space-y-2">
                        {type.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3 text-blue-600">Requirements</h4>
                      <ul className="space-y-2">
                        {type.requirements.map((requirement, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-2 text-blue-500" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      Apply for {type.title}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Why Partner With Us */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Why Partner With StableBricks?</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We offer comprehensive support and proven strategies to ensure mutual success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {partnerBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h3 className="text-xl font-poppins font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                )
              })}
            </div>

            {/* Stats Section */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">50+</div>
                  <div className="text-gray-600">Active Partners</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">₦25B+</div>
                  <div className="text-gray-600">Partnership Value</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">95%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">100+</div>
                  <div className="text-gray-600">Joint Projects</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Application Form */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-poppins">Partnership Application</CardTitle>
              <CardDescription>Fill out this form to start your partnership journey with StableBricks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name *</label>
                  <Input placeholder="Enter your company name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Person *</label>
                  <Input placeholder="Enter contact person name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <Input placeholder="Enter phone number" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Partnership Type *</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select partnership type</option>
                    <option value="development">Development Partner</option>
                    <option value="investment">Investment Partner</option>
                    <option value="strategic">Strategic Partner</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Size</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="">Select company size</option>
                    <option value="startup">Startup (1-10 employees)</option>
                    <option value="small">Small (11-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (200+ employees)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company Description *</label>
                <Textarea placeholder="Tell us about your company, services, and experience" rows={4} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Partnership Goals</label>
                <Textarea placeholder="Describe your partnership goals and what you hope to achieve" rows={3} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Previous Experience</label>
                <Textarea placeholder="Share your relevant experience in real estate or related industries" rows={3} />
              </div>

              <div className="flex items-center space-x-2">
                <input type="checkbox" id="terms" className="rounded" />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions and privacy policy
                </label>
              </div>

              <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3">
                Submit Partnership Application
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  )
}
