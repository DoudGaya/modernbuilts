import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, Shield, Clock, DollarSign, MapPin, Search, Filter } from "lucide-react"

const investmentProjects = [
  {
    id: 1,
    title: "Lagos Luxury Apartments",
    location: "Victoria Island, Lagos",
    expectedReturn: "18%",
    duration: "24 months",
    minInvestment: "₦500,000",
    totalValue: "₦2.5B",
    funded: 75,
    status: "Active",
    category: "Residential",
    image: "/placeholder.svg?height=200&width=300",
    description: "Premium luxury apartments in the heart of Victoria Island with world-class amenities.",
  },
  {
    id: 2,
    title: "Abuja Commercial Complex",
    location: "Central Business District, Abuja",
    expectedReturn: "22%",
    duration: "18 months",
    minInvestment: "₦1,000,000",
    totalValue: "₦1.8B",
    funded: 60,
    status: "Active",
    category: "Commercial",
    image: "/placeholder.svg?height=200&width=300",
    description: "Modern commercial complex in Abuja's prime business district.",
  },
  {
    id: 3,
    title: "Port Harcourt Residential Estate",
    location: "GRA Phase 2, Port Harcourt",
    expectedReturn: "16%",
    duration: "30 months",
    minInvestment: "₦300,000",
    totalValue: "₦1.2B",
    funded: 45,
    status: "New",
    category: "Residential",
    image: "/placeholder.svg?height=200&width=300",
    description: "Exclusive residential estate with modern infrastructure and security.",
  },
  {
    id: 4,
    title: "Kano Shopping Mall",
    location: "Sabon Gari, Kano",
    expectedReturn: "20%",
    duration: "36 months",
    minInvestment: "₦750,000",
    totalValue: "₦3.2B",
    funded: 30,
    status: "New",
    category: "Commercial",
    image: "/placeholder.svg?height=200&width=300",
    description: "Large-scale shopping mall project in Kano's commercial hub.",
  },
  {
    id: 5,
    title: "Ibadan Mixed-Use Development",
    location: "Bodija, Ibadan",
    expectedReturn: "19%",
    duration: "28 months",
    minInvestment: "₦400,000",
    totalValue: "₦1.5B",
    funded: 55,
    status: "Active",
    category: "Mixed-Use",
    image: "/placeholder.svg?height=200&width=300",
    description: "Mixed-use development combining residential and commercial spaces.",
  },
  {
    id: 6,
    title: "Calabar Resort Development",
    location: "Calabar, Cross River",
    expectedReturn: "25%",
    duration: "42 months",
    minInvestment: "₦1,500,000",
    totalValue: "₦4.0B",
    funded: 20,
    status: "New",
    category: "Hospitality",
    image: "/placeholder.svg?height=200&width=300",
    description: "Luxury resort development in the beautiful city of Calabar.",
  },
]

export default function InvestmentsPage() {
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
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Start Investing
              </Button>
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
            {investmentProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${project.status === "New" ? "bg-green-500" : "bg-blue-500"}`}
                  >
                    {project.status}
                  </Badge>
                  <Badge className="absolute top-4 left-4 bg-black/70 text-white">{project.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-poppins">{project.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      <span className="font-semibold">{project.expectedReturn} ROI</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{project.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>Min: {project.minInvestment}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-purple-500" />
                      <span>Value: {project.totalValue}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>{project.funded}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.funded}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                      Invest Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="px-8">
              Load More Projects
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
