import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Clock, DollarSign } from "lucide-react"

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
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
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
    image: "/placeholder.svg?height=200&width=300",
  },
]

export const InvestmentHighlights = () => {
  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Featured Investment Opportunities</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover high-yield real estate investments with guaranteed returns and transparent processes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-poppins">{project.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {project.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                  Invest Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/investments">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
              View All Investment Opportunities
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
