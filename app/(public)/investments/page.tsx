import { Metadata } from "next"
import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Shield, Clock, DollarSign, MapPin, Search, Filter } from "lucide-react"
import { getAllProjects } from "@/actions/project"
import Link from "next/link"
import Image from "next/image"
import { formatCurrency, formatCurrencyShort, calculateFundingProgress } from "@/lib/project-utils"

export const metadata: Metadata = {
  title: "Investment Opportunities - StableBricks",
  description: "Discover high-yield real estate investment opportunities with guaranteed returns, transparent processes, and professional management. Start investing in Nigerian real estate today.",
  keywords: [
    "real estate investment opportunities",
    "property investment Nigeria",
    "high-yield investments",
    "real estate portfolio",
    "investment projects",
    "property crowdfunding",
    "real estate returns",
    "investment platform Nigeria",
    "property investment returns",
    "real estate deals",
    "investment opportunities Lagos",
    "property investment Abuja",
    "real estate investment platform",
    "guaranteed returns property",
    "commercial real estate investment",
    "residential property investment"
  ],
  openGraph: {
    title: "Investment Opportunities - StableBricks",
    description: "Discover high-yield real estate investment opportunities with guaranteed returns, transparent processes, and professional management.",
    url: "/investments",
    siteName: "StableBricks",
    images: [
      {
        url: "/og-investments.jpg",
        width: 1200,
        height: 630,
        alt: "StableBricks Investment Opportunities - High-Yield Real Estate",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Investment Opportunities - StableBricks",
    description: "Discover high-yield real estate investment opportunities with guaranteed returns, transparent processes, and professional management.",
    images: ["/og-investments.jpg"],
    creator: "@stablebricks",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/investments",
  },
}

export default async function InvestmentsPage() {
  const projectsResult = await getAllProjects()
  const projects = projectsResult.success ? projectsResult.projects : []

  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 text-black">Investment Opportunities</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-8">
              Discover high-yield real estate investments with guaranteed returns, transparent processes, and
              professional management
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link href="/user/projects">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  Start Investing
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Download Brochure
              </Button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Investments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search projects..." className="pl-10" />
                </div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="lagos">Lagos</SelectItem>
                    <SelectItem value="abuja">Abuja</SelectItem>
                    <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    <SelectItem value="kano">Kano</SelectItem>
                    <SelectItem value="ibadan">Ibadan</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Min Investment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any Amount</SelectItem>
                    <SelectItem value="300000">₦300,000+</SelectItem>
                    <SelectItem value="500000">₦500,000+</SelectItem>
                    <SelectItem value="1000000">₦1,000,000+</SelectItem>
                    <SelectItem value="1500000">₦1,500,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Investment Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0 ? (
              projects.map((project: any) => {
                const fundingProgress = calculateFundingProgress(project)
                const sharePrice = project.sharePrice || 0
                
                return (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <Image
                        src={project.coverImage || "/placeholder.svg"}
                        alt={project.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <Badge
                        className={`absolute top-4 right-4 ${
                          project.projectStatus === "ACTIVE" ? "bg-green-500" : 
                          project.projectStatus === "COMPLETED" ? "bg-blue-500" : "bg-yellow-500"
                        }`}
                      >
                        {project.projectStatus}
                      </Badge>
                      <Badge className="absolute top-4 left-4 bg-black/70 text-white">
                        {project.category}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl font-poppins">{project.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {project.city}, {project.state}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                          <span className="font-semibold">{project.roi}% ROI</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{project.length}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                          <span>Min: {formatCurrency(sharePrice)}</span>
                        </div>
                        <div className="flex items-center">
                          <Shield className="w-4 h-4 mr-2 text-purple-500" />
                          <span>Value: {formatCurrencyShort(project.valuation || 0)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>{Math.round(fundingProgress)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${fundingProgress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Raised: {formatCurrencyShort((project.soldShares || 0) * sharePrice)}</span>
                          <span>Goal: {formatCurrencyShort(project.investmentRequired || 0)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/user/projects/${project.slug}`} className="flex-1">
                          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                            Invest Now
                          </Button>
                        </Link>
                        <Link href={`/projects/${project.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Investment Projects Available</h3>
                <p className="text-gray-500">Check back soon for exciting investment opportunities.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Projects
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
