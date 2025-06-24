import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, MapPin, Calendar, DollarSign, TrendingUp } from 'lucide-react'

const portfolioProjects = [
  {
    id: 1,
    title: "Lagos Modern Residential Complex",
    description: "250-unit luxury residential development in Victoria Island",
    location: "Victoria Island, Lagos",
    completionDate: "2024",
    investment: "₦2.5B",
    returns: "35%",
    status: "Completed",
    image: "/placeholder.svg",
    category: "Residential"
  },
  {
    id: 2,
    title: "Abuja Commercial Plaza",  
    description: "Mixed-use commercial development with retail and office spaces",
    location: "Central Business District, Abuja",
    completionDate: "2023",
    investment: "₦1.8B",
    returns: "42%",
    status: "Completed",
    image: "/placeholder.svg",
    category: "Commercial"
  },
  {
    id: 3,
    title: "Kano Industrial Park",
    description: "Modern industrial facility for manufacturing and logistics",
    location: "Tarauni, Kano",
    completionDate: "2024",
    investment: "₦3.2B", 
    returns: "38%",
    status: "In Progress",
    image: "/placeholder.svg",
    category: "Industrial"
  },
  {
    id: 4,
    title: "Port Harcourt Housing Estate",
    description: "Affordable housing project with 180 units",
    location: "Port Harcourt, Rivers State",
    completionDate: "2023",
    investment: "₦1.2B",
    returns: "29%",
    status: "Completed",
    image: "/placeholder.svg",
    category: "Residential"
  },
  {
    id: 5,
    title: "Ibadan Tech Hub",
    description: "State-of-the-art technology and innovation center",
    location: "Ibadan, Oyo State",
    completionDate: "2025",
    investment: "₦2.1B",
    returns: "Expected 40%",
    status: "Planning",
    image: "/placeholder.svg",
    category: "Commercial"
  },
  {
    id: 6,
    title: "Calabar Resort Development",
    description: "Luxury resort and hospitality complex",
    location: "Calabar, Cross River State",
    completionDate: "2025",
    investment: "₦2.8B",
    returns: "Expected 45%",
    status: "In Progress",
    image: "/placeholder.svg",
    category: "Hospitality"
  }
]

const stats = [
  { label: "Total Projects", value: "24", icon: TrendingUp },
  { label: "Total Investment", value: "₦18.5B", icon: DollarSign },
  { label: "Average Returns", value: "37%", icon: TrendingUp },
  { label: "Completed Projects", value: "18", icon: Calendar },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
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
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-blue-600" />
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
            {portfolioProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      project.status === 'Completed' ? 'bg-green-500' :
                      project.status === 'In Progress' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}
                  >
                    {project.status}
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
                      {project.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Completed: {project.completionDate}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div>
                        <div className="text-sm text-gray-500">Investment</div>
                        <div className="font-semibold">{project.investment}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Returns</div>
                        <div className="font-semibold text-green-600">{project.returns}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
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
