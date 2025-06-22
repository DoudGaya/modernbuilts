"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Eye, Edit, Trash2, TrendingUp, Clock, DollarSign, MapPin } from "lucide-react"
import { getAllProjects, deleteProject } from "@/actions/project"
import { toast } from "@/components/ui/use-toast"
import { formatCurrency, formatCurrencyShort, calculateFundingProgress } from "@/lib/project-utils"

type ProjectWithProgress = {
  id: string
  title: string
  slug: string
  coverImage: string
  video: string
  images: string[]
  category: string
  description: string
  duration: Date
  valuation: number
  investmentRequired: number
  totalShares: number
  soldShares: number
  state: string
  city: string
  location: string
  projectStatus: "PENDING" | "ACTIVE" | "END" | "COMPLETED"
  features: string[]
  sharePrice: number
  roi: number
  length: string
  createdAt: Date
  updatedAt: Date
  investment: { investmentAmount: number }[]
  _count: { investment: number }
  totalInvested: number
  fundingProgress: number
  totalInvestors: number
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithProgress[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [searchTerm, statusFilter, categoryFilter])

  const loadProjects = async () => {
    setLoading(true)
    const result = await getAllProjects({
      search: searchTerm,
      status: statusFilter,
      category: categoryFilter,
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

  const handleDelete = async (id: string) => {
    try {
      setIsDeleting(id)
      const result = await deleteProject(id)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      })

      loadProjects()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(null)
    }
  }

  if (loading) {
    return <div>Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investment Projects</h1>
          <p className="text-gray-600">Manage all investment projects and opportunities</p>
        </div>
        <Link href="/admin/projects/create">
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
            <Plus className="w-4 h-4 mr-2" />
            Add New Project
          </Button>
        </Link>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="END">Ended</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
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
            <Button variant="outline">Export Data</Button>
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
              <Badge
                className={`absolute top-4 right-4 ${
                  project.projectStatus === "ACTIVE"
                    ? "bg-green-500"
                    : project.projectStatus === "COMPLETED"
                      ? "bg-blue-500"
                      : "bg-yellow-500"
                }`}
              >
                {project.projectStatus}
              </Badge>
              <Badge className="absolute top-4 left-4 bg-black/70 text-white">{project.category}</Badge>
            </div>

            <CardHeader>
              <CardTitle className="text-lg font-poppins">{project.title}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {project.location}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>              <div className="grid grid-cols-2 gap-4 text-sm">
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
                  <span>{formatCurrency(project.sharePrice)}</span>
                </div>
                <div className="text-sm text-gray-500">Value: {formatCurrencyShort(project.valuation)}</div>
              </div>

              {/* Funding Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress</span>
                  <span>{Math.round(calculateFundingProgress(project))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${calculateFundingProgress(project)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Raised: {formatCurrencyShort((project.soldShares || 0) * project.sharePrice)}</span>
                  <span>Target: {formatCurrencyShort(project.investmentRequired)}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t">
                <Link href={`/admin/projects/${project.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </Link>
                <Link href={`/admin/projects/edit/${project.slug}`} className="flex-1">
                  <Button variant="outline" className="w-full" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(project.id)}
                  disabled={isDeleting === project.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found</p>
        </div>
      )}
    </div>
  )
}


// "use client"
// import { useState } from "react"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Filter, Plus, Eye, Edit, Trash2, TrendingUp, Clock, DollarSign, MapPin } from "lucide-react"

// const projects = [
//   {
//     id: "1",
//     slug: "lagos-luxury-apartments",
//     title: "Lagos Luxury Apartments",
//     location: "Victoria Island, Lagos",
//     expectedReturn: "18%",
//     duration: "24 months",
//     minInvestment: "₦500,000",
//     totalValue: "₦2.5B",
//     funded: 75,
//     status: "Active",
//     category: "Residential",
//     image: "/placeholder.svg?height=200&width=300",
//     description: "Premium luxury apartments in the heart of Victoria Island with world-class amenities.",
//     createdAt: "2024-01-15",
//     updatedAt: "2024-12-10",
//   },
//   {
//     id: "2",
//     slug: "abuja-commercial-complex",
//     title: "Abuja Commercial Complex",
//     location: "Central Business District, Abuja",
//     expectedReturn: "22%",
//     duration: "18 months",
//     minInvestment: "₦1,000,000",
//     totalValue: "₦1.8B",
//     funded: 60,
//     status: "Active",
//     category: "Commercial",
//     image: "/placeholder.svg?height=200&width=300",
//     description: "Modern commercial complex in Abuja's prime business district.",
//     createdAt: "2024-02-20",
//     updatedAt: "2024-12-08",
//   },
//   // Add more projects...
// ]

// export default function ProjectsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [categoryFilter, setCategoryFilter] = useState("all")

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.location.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter
//     const matchesCategory = categoryFilter === "all" || project.category.toLowerCase() === categoryFilter

//     return matchesSearch && matchesStatus && matchesCategory
//   })

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Investment Projects</h1>
//           <p className="text-gray-600">Manage all investment projects and opportunities</p>
//         </div>
//         <Link href="/admin/projects/create">
//           <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
//             <Plus className="w-4 h-4 mr-2" />
//             Add New Project
//           </Button>
//         </Link>
//       </div>

//       {/* Search and Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center">
//             <Filter className="w-5 h-5 mr-2" />
//             Search & Filter
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search projects..."
//                 className="pl-10"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="residential">Residential</SelectItem>
//                 <SelectItem value="commercial">Commercial</SelectItem>
//                 <SelectItem value="mixed-use">Mixed-Use</SelectItem>
//                 <SelectItem value="hospitality">Hospitality</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline">Export Data</Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Projects Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProjects.map((project) => (
//           <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="relative">
//               <img src={project.image || "/placeholder.svg"} alt={project.title} className="w-full h-48 object-cover" />
//               <Badge
//                 className={`absolute top-4 right-4 ${
//                   project.status === "Active"
//                     ? "bg-green-500"
//                     : project.status === "Completed"
//                       ? "bg-blue-500"
//                       : "bg-yellow-500"
//                 }`}
//               >
//                 {project.status}
//               </Badge>
//               <Badge className="absolute top-4 left-4 bg-black/70 text-white">{project.category}</Badge>
//             </div>

//             <CardHeader>
//               <CardTitle className="text-lg font-poppins">{project.title}</CardTitle>
//               <CardDescription className="flex items-center">
//                 <MapPin className="w-4 h-4 mr-1" />
//                 {project.location}
//               </CardDescription>
//             </CardHeader>

//             <CardContent className="space-y-4">
//               <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>

//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div className="flex items-center">
//                   <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
//                   <span className="font-semibold">{project.expectedReturn} ROI</span>
//                 </div>
//                 <div className="flex items-center">
//                   <Clock className="w-4 h-4 mr-2 text-blue-500" />
//                   <span>{project.duration}</span>
//                 </div>
//                 <div className="flex items-center">
//                   <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
//                   <span>Min: {project.minInvestment}</span>
//                 </div>
//                 <div className="text-sm text-gray-500">Value: {project.totalValue}</div>
//               </div>

//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span>Funding Progress</span>
//                   <span>{project.funded}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2">
//                   <div
//                     className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
//                     style={{ width: `${project.funded}%` }}
//                   ></div>
//                 </div>
//               </div>

//               <div className="flex gap-2 pt-2 border-t">
//                 <Link href={`/admin/projects/${project.slug}`} className="flex-1">
//                   <Button variant="outline" className="w-full" size="sm">
//                     <Eye className="w-4 h-4 mr-1" />
//                     View
//                   </Button>
//                 </Link>
//                 <Link href={`/admin/projects/edit/${project.slug}`} className="flex-1">
//                   <Button variant="outline" className="w-full" size="sm">
//                     <Edit className="w-4 h-4 mr-1" />
//                     Edit
//                   </Button>
//                 </Link>
//                 <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
//                   <Trash2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-center pt-6">
//         <div className="flex gap-2">
//           <Button variant="outline" size="sm">
//             Previous
//           </Button>
//           <Button variant="outline" size="sm" className="bg-yellow-400 text-black">
//             1
//           </Button>
//           <Button variant="outline" size="sm">
//             2
//           </Button>
//           <Button variant="outline" size="sm">
//             3
//           </Button>
//           <Button variant="outline" size="sm">
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
