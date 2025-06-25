import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, MapPin, Calendar, DollarSign, TrendingUp, Building2, Target } from 'lucide-react'
import { getPortfolioProjects } from '@/actions/portfolio'

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioProjects()
  
  if (!portfolioData.success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Unable to load portfolio</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    )
  }

  const { projects, stats } = portfolioData
  
  // Format investment amounts
  const formatAmount = (amount: number) => {
    if (amount >= 1000000000) {
      return `₦${(amount / 1000000000).toFixed(1)}B`
    } else if (amount >= 1000000) {
      return `₦${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `₦${(amount / 1000).toFixed(1)}K`
    } else {
      return `₦${amount.toLocaleString()}`
    }
  }

  const portfolioStats = [
    { label: "Total Projects", value: stats?.totalProjects?.toString() || "0", icon: Building2 },
    { label: "Total Investment", value: stats?.totalInvestment ? formatAmount(stats.totalInvestment) : "₦0", icon: DollarSign },
    { label: "Average Returns", value: `${stats?.averageROI || 0}%`, icon: TrendingUp },
    { label: "Completed Projects", value: stats?.completedProjects?.toString() || "0", icon: Target },
  ]
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-600 to-yellow-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our track record of successful construction projects across Nigeria, 
              delivering exceptional returns for our investors.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {portfolioStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-yellow-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of successful construction and development projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects && projects.length > 0 ? projects.map((project) => {
              const statusColor = 
                project.projectStatus === 'COMPLETED' ? 'bg-green-500' :
                project.projectStatus === 'ACTIVE' ? 'bg-yellow-500' : 
                project.projectStatus === 'PENDING' ? 'bg-blue-500' : 'bg-gray-500'

              const expectedReturn = new Date(project.duration) > new Date() ? 'Expected' : ''
              
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={project.coverImage || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className={`absolute top-4 right-4 ${statusColor}`}>
                      {project.projectStatus}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        {project.city}, {project.state}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Target: {new Date(project.duration).getFullYear()}
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <div className="text-sm text-gray-500">Investment</div>
                          <div className="font-semibold">{formatAmount(project.investmentRequired)}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-500">Returns</div>
                          <div className="font-semibold text-green-600">
                            {expectedReturn} {project.roi}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            }) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No projects available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Success Story?
          </h2>
          <p className="text-xl mb-8">
            Invest in our upcoming projects and be part of Nigeria's construction revolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/investments">
                View Investment Opportunities
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
