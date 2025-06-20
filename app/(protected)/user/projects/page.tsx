"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, TrendingUp, Clock, DollarSign, MapPin, Heart } from "lucide-react"
import { getAllProjects } from "@/actions/project"
import { addToWishlist, removeFromWishlist } from "@/actions/wishlist"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { InvestmentModal } from "./[slug]/components/InvestmentModal"

export default function UserProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [wishlist, setWishlist] = useState<string[]>([])
  const [showInvestmentModal, setShowInvestmentModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [shares, setShares] = useState(1)
  const { toast } = useToast()

  useEffect(() => {
    loadProjects()
  }, [searchTerm, categoryFilter, sortBy])

  const loadProjects = async () => {
    setLoading(true)
    const result = await getAllProjects({
      search: searchTerm,
      category: categoryFilter,
      status: "ACTIVE", // Only show active projects to users
    })

    if (result.success) {
      setProjects(result.projects)
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
    setLoading(false)
  }
  const handleWishlistToggle = async (projectId: string) => {
    const isInWishlist = wishlist.includes(projectId)

    if (isInWishlist) {
      const result = await removeFromWishlist(projectId)
      if (result.success) {
        setWishlist(wishlist.filter((id) => id !== projectId))
        toast({ title: "Removed from wishlist" })
      }
    } else {
      const result = await addToWishlist(projectId)
      if (result.success) {
        setWishlist([...wishlist, projectId])
        toast({ title: "Added to wishlist" })
      }
    }
  }

  const handleInvestClick = (project: any) => {
    setSelectedProject(project)
    setShares(1) // Reset to 1 share
    setShowInvestmentModal(true)
  }

  if (loading) {
    return <div>Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investment Projects</h1>
          <p className="text-gray-600">Discover profitable real estate investment opportunities</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                <SelectItem value="Hospitality">Hospitality</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="roi-high">Highest ROI</SelectItem>
                <SelectItem value="roi-low">Lowest ROI</SelectItem>
                <SelectItem value="price-low">Lowest Price</SelectItem>
                <SelectItem value="price-high">Highest Price</SelectItem>
              </SelectContent>
            </Select>            <Button variant="outline" asChild>
              <Link href="/user/wishlist">
                <Heart className="w-4 h-4 mr-2" />
                View Wishlist
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={project.coverImage || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-green-500">Active</Badge>
              <Badge className="absolute top-4 left-4 bg-black/70 text-white">{project.category}</Badge>
              <Button
                size="sm"
                variant="ghost"
                className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => handleWishlistToggle(project.id)}
              >
                <Heart className={`w-4 h-4 ${wishlist.includes(project.id) ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>

            <CardHeader>
              <CardTitle className="text-lg font-poppins">{project.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {project.location}
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
                  <span>₦{project.sharePrice.toLocaleString()}/share</span>
                </div>
                <div className="text-sm text-gray-500">Value: {project.valuation}</div>
              </div>              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress</span>
                  <span>{project.fundingProgress || Math.floor(Math.random() * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.fundingProgress || Math.floor(Math.random() * 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Link href={`/user/projects/${project.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    View Details
                  </Button>
                </Link>
                <Button 
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black" 
                  size="sm"
                  onClick={() => handleInvestClick(project)}
                >
                  Invest Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found</p>
        </div>
      )}

      {/* Investment Modal */}
      {selectedProject && (
        <InvestmentModal
          isOpen={showInvestmentModal}
          onClose={() => setShowInvestmentModal(false)}
          project={selectedProject}
          initialShares={shares}
          onSharesChange={setShares}
        />
      )}
    </div>
  )
}

// import React from 'react'
// import skyScrapper from '@/public/stablebricks_calipha.svg'
// import Image from 'next/image'
// import Link from 'next/link'

// const page = () => {
//   return (
//     <div className='flex flex-col items-center w-full h-full text-center space-y-3 justify-center'>
//     <Image src={skyScrapper} height={600} width={600} className=' h-[400px] w-[400px] object-contain' alt='Stablebricks Inc' />
//     <p className=' text-2xl font-poppins bg-gray-200/70 rounded-md text-gray-700 px-2 py-1'>There is currently no active project</p>
//     <Link href={'/user/dashboard'} className=' px-6 py-2 text-lg rounded-lg font-poppins bg-primary'>Go Home</Link>
// </div>
//   )
// }

// export default page