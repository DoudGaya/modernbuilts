"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Clock, DollarSign, MapPin } from "lucide-react"
import { formatCurrency, formatCurrencyShort, calculateFundingProgress } from "@/lib/project-utils"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useRouter } from "next/navigation"

interface InvestmentHighlightsClientProps {
  projects: any[]
}

export const InvestmentHighlightsClient = ({ projects }: InvestmentHighlightsClientProps) => {
  const user = useCurrentUser()
  const router = useRouter()

  const handleInvestClick = (projectSlug: string) => {
    if (user) {
      router.push(`/user/projects/${projectSlug}`)
    } else {
      router.push(`/login?redirectTo=/user/projects/${projectSlug}`)
    }
  }

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
          {projects.length > 0 ? (
            projects.map((project) => {
              const fundingProgress = calculateFundingProgress(project)
              const sharePrice = project.sharePrice || 0
              
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={project.coverImage || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge
                      className={`absolute top-4 right-4 ${
                        project.projectStatus === "ACTIVE" ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {project.projectStatus}
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
                        <span>Value: {formatCurrencyShort(typeof project.valuation === 'number' ? project.valuation : 0)}</span>
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
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleInvestClick(project.slug)}
                        className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                      >
                        Invest Now
                      </Button>
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
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 text-lg">No active investment opportunities available at the moment.</p>
            </div>
          )}
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
