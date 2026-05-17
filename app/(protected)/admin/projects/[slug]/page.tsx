import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, TrendingUp, Clock, DollarSign, MapPin, Calendar, Users, Building } from "lucide-react"

// This would typically come from your database based on the slug
const project = {
  id: "1",
  slug: "lagos-luxury-apartments",
  title: "Lagos Luxury Apartments",
  location: "Victoria Island, Lagos",
  expectedReturn: "18%",
  duration: "24 months",
  minInvestment: "₦500,000",
  totalValue: "₦2.5B",
  funded: 75,
  status: "Active",
  category: "Residential",
  image: "/placeholder.svg?height=400&width=600",
  description:
    "Premium luxury apartments in the heart of Victoria Island with world-class amenities including swimming pool, gym, 24/7 security, and concierge services.",
  detailedDescription: `
    This exceptional residential project offers 120 luxury apartments ranging from 2-bedroom to 4-bedroom units. 
    Located in the prestigious Victoria Island, the development provides residents with unparalleled access to Lagos's 
    business district while maintaining a serene living environment.

    The project features state-of-the-art amenities including:
    - Infinity swimming pool with city views
    - Fully equipped fitness center
    - 24/7 concierge and security services
    - Underground parking
    - Rooftop garden and lounge areas
    - High-speed internet connectivity
    - Backup power systems
  `,
  createdAt: "2024-01-15",
  updatedAt: "2024-12-10",
  startDate: "2024-03-01",
  expectedCompletionDate: "2026-03-01",
  totalInvestors: 1250,
  minInvestors: 2000,
  features: [
    "Swimming Pool",
    "Gym & Fitness Center",
    "24/7 Security",
    "Concierge Services",
    "Underground Parking",
    "Rooftop Garden",
    "High-Speed Internet",
    "Backup Power",
  ],
  financials: {
    totalRaised: "₦1.875B",
    targetAmount: "₦2.5B",
    averageInvestment: "₦1.5M",
    projectedReturns: "₦3.25B",
    managementFee: "2%",
  },
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="text-gray-600 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {project.location}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/admin/projects/edit/${project.slug}`}>
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
              <Edit className="w-4 h-4 mr-2" />
              Edit Project
            </Button>
          </Link>
          <Badge
            className={`${
              project.status === "Active"
                ? "bg-green-500"
                : project.status === "Completed"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
            } text-white px-4 py-2`}
          >
            {project.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="prose max-w-none">
                {project.detailedDescription.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-3 text-gray-700">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Project Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Building className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                  <span>Expected Return</span>
                </div>
                <span className="font-semibold">{project.expectedReturn}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Duration</span>
                </div>
                <span className="font-semibold">{project.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Min Investment</span>
                </div>
                <span className="font-semibold">{project.minInvestment}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Total Investors</span>
                </div>
                <span className="font-semibold">{project.totalInvestors.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Funding Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Funding Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{project.funded}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${project.funded}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Raised</span>
                  <span className="font-semibold">{project.financials.totalRaised}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="font-semibold">{project.financials.targetAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining</span>
                  <span className="font-semibold text-yellow-600">₦625M</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Total Value</span>
                <span className="font-semibold">{project.totalValue}</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Returns</span>
                <span className="font-semibold">{project.financials.projectedReturns}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Investment</span>
                <span className="font-semibold">{project.financials.averageInvestment}</span>
              </div>
              <div className="flex justify-between">
                <span>Management Fee</span>
                <span className="font-semibold">{project.financials.managementFee}</span>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Start Date</span>
                </div>
                <span className="font-semibold">{new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  <span>Expected Completion</span>
                </div>
                <span className="font-semibold">{new Date(project.expectedCompletionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Created</span>
                </div>
                <span className="font-semibold">{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
