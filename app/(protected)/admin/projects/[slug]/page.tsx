import Link from "next/link"
import { ArrowLeft, Building, Calendar, Clock, Edit, MapPin, Users, WalletCards, type LucideIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const project = {
  id: "1",
  slug: "lagos-luxury-apartments",
  title: "Lagos Luxury Apartments",
  location: "Victoria Island, Lagos",
  salesMargin: "18%",
  duration: "24 months",
  guidePrice: "NGN 500,000 per sqm guide",
  totalValue: "NGN 2.5B",
  progress: 75,
  status: "Active",
  category: "Residential",
  image: "/placeholder.svg?height=400&width=600",
  description:
    "Premium residential development record used to track documentation, construction progress, sales readiness, and buyer service activity.",
  createdAt: "2024-01-15",
  updatedAt: "2024-12-10",
  startDate: "2024-03-01",
  expectedCompletionDate: "2026-03-01",
  activeEnquiries: 125,
  features: [
    "Swimming Pool",
    "Gym and Fitness Center",
    "24/7 Security",
    "Concierge Services",
    "Underground Parking",
    "Rooftop Garden",
    "High-Speed Internet",
    "Backup Power",
  ],
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  await params

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <p className="flex items-center text-gray-600">
              <MapPin className="mr-1 h-4 w-4" />
              {project.location}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Link href={`/admin/projects/edit/${project.slug}`}>
            <Button className="bg-primary text-gray-950 hover:bg-primary-400">
              <Edit className="mr-2 h-4 w-4" />
              Edit project
            </Button>
          </Link>
          <Badge className="bg-success px-4 py-2 text-white">{project.status}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img src={project.image} alt={project.title} className="h-64 w-full rounded-t-lg object-cover" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-gray-600">{project.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Project features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-center rounded-md bg-gray-50 p-3">
                    <Building className="mr-2 h-4 w-4 text-primary-700" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Key metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Metric icon={WalletCards} label="Sales margin" value={project.salesMargin} />
              <Metric icon={Clock} label="Duration" value={project.duration} />
              <Metric icon={WalletCards} label="Guide price" value={project.guidePrice} />
              <Metric icon={Users} label="Active enquiries" value={project.activeEnquiries.toLocaleString()} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Construction progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-200">
                <div className="h-3 rounded-full bg-primary transition-all duration-300" style={{ width: `${project.progress}%` }} />
              </div>
              <Metric icon={WalletCards} label="Total value" value={project.totalValue} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <Timeline label="Start date" value={project.startDate} />
              <Timeline label="Expected completion" value={project.expectedCompletionDate} />
              <Timeline label="Created" value={project.createdAt} />
              <Timeline label="Last updated" value={project.updatedAt} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Icon className="mr-2 h-4 w-4 text-primary-700" />
        <span>{label}</span>
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  )
}

function Timeline({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Calendar className="mr-2 h-4 w-4 text-primary-700" />
        <span>{label}</span>
      </div>
      <span className="font-semibold">{new Date(value).toLocaleDateString()}</span>
    </div>
  )
}
