import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, MapPin } from "lucide-react"

const recommendedProjects = [
  {
    id: "1",
    title: "Kano Shopping Mall",
    location: "Sabon Gari, Kano",
    expectedReturn: "20%",
    minInvestment: "₦750,000",
    funded: 30,
    status: "New",
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: "2",
    title: "Ibadan Mixed-Use Development",
    location: "Bodija, Ibadan",
    expectedReturn: "19%",
    minInvestment: "₦400,000",
    funded: 55,
    status: "Active",
    image: "/placeholder.svg?height=150&width=200",
  },
]

export const RecommendedProjects = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
        <CardDescription>Investment opportunities based on your preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedProjects.map((project) => (
            <div key={project.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-32 object-cover"
                />
                <Badge
                  className={`absolute top-2 right-2 ${project.status === "New" ? "bg-green-500" : "bg-blue-500"}`}
                >
                  {project.status}
                </Badge>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold">{project.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {project.location}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Expected ROI:</span>
                    <div className="font-semibold text-green-600">{project.expectedReturn}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Min Investment:</span>
                    <div className="font-semibold">{project.minInvestment}</div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Funded</span>
                    <span>{project.funded}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${project.funded}%` }}></div>
                  </div>
                </div>

                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Invest Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
