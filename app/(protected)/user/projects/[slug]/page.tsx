"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { 
  MapPin, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Building2, 
  Users, 
  Clock,
  Heart,
  Plus,
  Minus,
  ArrowLeft
} from "lucide-react"
import { getProjectBySlug } from "@/actions/project-detail"
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/actions/wishlist"
import { useToast } from "@/components/ui/use-toast"
import { formatCurrency, formatCurrencyShort, calculateFundingProgress } from "@/lib/project-utils"
import Link from "next/link"
import { InvestmentModal } from "./components/InvestmentModal"

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [shares, setShares] = useState(1)
  const [isInWishlistState, setIsInWishlistState] = useState(false)
  const [showInvestmentModal, setShowInvestmentModal] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadProject()
  }, [slug])

  useEffect(() => {
    if (project) {
      checkWishlistStatus()
    }
  }, [project])

  const loadProject = async () => {
    setLoading(true)
    const result = await getProjectBySlug(slug)
    
    if (result.success) {
      setProject(result.project)
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
    setLoading(false)
  }
  const checkWishlistStatus = async () => {
    if (project) {
      const result = await isInWishlist(project.id)
      if (!result.error) {
        setIsInWishlistState(result.inWishlist)
      }
    }
  }

  const handleWishlistToggle = async () => {
    if (!project) return

    if (isInWishlistState) {
      const result = await removeFromWishlist(project.id)
      if (result.success) {
        setIsInWishlistState(false)
        toast({ title: "Removed from wishlist" })
      }
    } else {
      const result = await addToWishlist(project.id)
      if (result.success) {
        setIsInWishlistState(true)
        toast({ title: "Added to wishlist" })
      }
    }
  }

  const calculateInvestmentAmount = () => {
    return project ? shares * project.sharePrice : 0
  }

  const calculateExpectedReturns = () => {
    if (!project) return 0
    const investmentAmount = calculateInvestmentAmount()
    return investmentAmount * (project.roi / 100)
  }

  const calculateTotalReturn = () => {
    return calculateInvestmentAmount() + calculateExpectedReturns()
  }

  const handleSharesChange = (delta: number) => {
    const newShares = Math.max(1, shares + delta)
    setShares(newShares)
  }

  const handleInvestClick = () => {
    setShowInvestmentModal(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Project Not Found</h1>
          <p className="mt-2 text-gray-600">The project you're looking for doesn't exist.</p>
          <Link href="/user/projects">
            <Button className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    )  }
  const fundingProgress = calculateFundingProgress(project)
  const totalInvestors = project.totalInvestors || project.investment?.length || 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/user/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleWishlistToggle}
        >
          <Heart className={`w-4 h-4 mr-2 ${isInWishlistState ? "fill-red-500 text-red-500" : ""}`} />
          {isInWishlistState ? "Remove from Wishlist" : "Add to Wishlist"}
        </Button>
      </div>

      {/* Project Hero */}
      <Card className="overflow-hidden">
        <div className="relative h-96">
          <Image
            src={project.coverImage || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-green-500">{project.projectStatus}</Badge>
            <Badge variant="secondary">{project.category}</Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{project.location}</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 mx-auto text-green-500 mb-1" />
                  <p className="text-sm text-gray-600">Expected ROI</p>
                  <p className="font-bold text-lg">{project.roi}%</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto text-blue-500 mb-1" />
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-bold text-lg">{project.length}</p>
                </div>
              </div>
              
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Share Price</span>
                  <span className="text-lg font-bold">₦{project.sharePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Value</span>
                  <span className="text-sm">{project.valuation}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investment Calculator */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Investment Calculator</CardTitle>
              <CardDescription>Calculate your potential returns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Number of Shares</label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSharesChange(-1)}
                    disabled={shares <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-2xl font-bold">{shares}</span>
                    <p className="text-sm text-gray-600">shares</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSharesChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                  <p className="text-sm text-gray-600">Investment Amount</p>
                  <p className="text-xl font-bold">₦{calculateInvestmentAmount().toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 mx-auto text-green-500 mb-2" />
                  <p className="text-sm text-gray-600">Expected Returns</p>
                  <p className="text-xl font-bold">₦{calculateExpectedReturns().toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <Building2 className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
                  <p className="text-sm text-gray-600">Total Return</p>
                  <p className="text-xl font-bold">₦{calculateTotalReturn().toLocaleString()}</p>
                </div>
              </div>

              <Button 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3"
                onClick={handleInvestClick}
              >
                Invest Now - ₦{calculateInvestmentAmount().toLocaleString()}
              </Button>
            </CardContent>
          </Card>

          {/* Project Details */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Category</p>
                  <p className="font-semibold">{project.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">State</p>
                  <p className="font-semibold">{project.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">City</p>
                  <p className="font-semibold">{project.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">
                    {new Date(project.duration).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.images.map((image: string, index: number) => (
                    <div key={index} className="relative aspect-square">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Project image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                Project Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Funding Progress</span>
                  <span>{fundingProgress}%</span>
                </div>
                <Progress value={fundingProgress} className="h-2" />
              </div>
                <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Investors</span>
                  <span className="font-semibold">{totalInvestors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Min Investment</span>
                  <span className="font-semibold">{formatCurrency(project.sharePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Investment Required</span>
                  <span className="font-semibold">{formatCurrencyShort(project.investmentRequired)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Project Value</span>
                  <span className="font-semibold">{formatCurrencyShort(project.valuation)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Remaining Shares</span>
                  <span className="font-semibold">{((project.totalShares || 0) - (project.soldShares || 0)).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full">
                <Users className="w-4 h-4 mr-2" />
                View Investors
              </Button>
              <Button variant="outline" className="w-full">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
              </Button>
              <Button variant="outline" className="w-full">
                <Building2 className="w-4 h-4 mr-2" />
                Download Brochure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={showInvestmentModal}
        onClose={() => setShowInvestmentModal(false)}
        project={project}
        initialShares={shares}
        onSharesChange={setShares}
      />
    </div>
  )
}
