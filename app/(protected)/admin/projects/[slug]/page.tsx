import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, TrendingUp, Clock, DollarSign, MapPin, Calendar, Users, Building } from "lucide-react"
import { notFound } from "next/navigation"
import { formatCurrency } from "@/lib/utils"
import { formatCurrencyShort } from "@/lib/project-utils"
import { db } from "@/lib/db"
import { ProjectStatus } from "@prisma/client"
import ImageGallery, { CoverImage, VideoPlayer } from "./components/ImageGallery"

// Helper function to calculate funding percentage based on investments
const calculateFundingPercentage = (investments: any[], investmentRequired: number) => {
  if (!investments?.length || !investmentRequired) return 0;
  
  const totalInvested = investments.reduce(
    (sum, inv) => sum + inv.investmentAmount,
    0
  );
  
  return Math.min(100, (totalInvested / investmentRequired) * 100);
};

// Function to generate features from project description
const generateFeatures = (description: string) => {
  // Extract features from description or use default features
  const features = [];
  
  // Look for bullet points in the description
  const bulletPoints = description.match(/[-•]\s+(.*?)(?=[-•]|$)/g);
  
  if (bulletPoints && bulletPoints.length > 0) {
    // Clean up the bullet points and add them to features
    bulletPoints.forEach(point => {
      const cleanPoint = point.replace(/^[-•]\s+/, '').trim();
      if (cleanPoint) features.push(cleanPoint);
    });
  }
  
  // Add some default features if none were found
  if (features.length === 0) {
    features.push(
      "Premium Location",
      "Quality Construction",
      "Modern Design",
      "Investment Opportunity"
    );
  }

  
  return features;
};

async function getProjectBySlug(slug: string) {
  try {
    const project = await db.project.findUnique({
      where: { slug },
      include: {
        investment: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
    
    if (!project) {
      return null;
    }
    
    return project;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  // In Next.js App Router, params need to be awaited
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }    // Calculate funding percentage
  const fundingPercentage = calculateFundingPercentage(project.investment, project.investmentRequired || 0);
  
  // Use features from database or generate them if not available
  const features = project.features && project.features.length > 0 
    ? project.features 
    : (project.description ? generateFeatures(project.description) : []);
  // Format dates for display
  const createdAt = project.createdAt.toLocaleDateString();
  const updatedAt = project.updatedAt.toLocaleDateString();
  const durationDate = project.duration.toLocaleDateString();
  
  // Calculate financial metrics
  const totalRaised = project.investment?.reduce(
    (sum, inv) => sum + inv.investmentAmount,
    0
  ) || 0;
  
  const totalInvestors = project.investment?.length || 0;
  const averageInvestment = totalInvestors > 0 
    ? Math.round(totalRaised / totalInvestors) 
    : 0;
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
          </Link>          <Badge
            className={`${
              project.projectStatus === "ACTIVE"
                ? "bg-green-500"
                : project.projectStatus === "COMPLETED"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
            } text-white px-4 py-2`}
          >
            {project.projectStatus}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">          {/* Project Cover Image */}
          <Card>
            <CardContent className="p-0">
              <CoverImage 
                src={project.coverImage || "/placeholder.svg"} 
                alt={project.title}
              />
            </CardContent>
          </Card>
          
          {/* Project Video */}
          {project.video && (
            <VideoPlayer 
              src={project.video} 
              poster={project.coverImage}
            />
          )}
          
          {/* Project Gallery */}
          {project.images && project.images.length > 0 && (
            <ImageGallery 
              images={project.images}
              title={project.title}
            />
          )}

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="prose max-w-none">
                {project.description.split("\n").map((paragraph: string, index: number) => (
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
                {features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Building className="w-4 h-4 mr-2 text-yellow-600" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>        {/* Sidebar */}
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
                <span className="font-semibold">{project.roi}%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Duration</span>
                </div>
                <span className="font-semibold">{durationDate}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Share Price</span>
                </div>
                <span className="font-semibold">₦{project.sharePrice.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Total Investors</span>
                </div>
                <span className="font-semibold">{totalInvestors.toLocaleString()}</span>
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
                  <span>{fundingPercentage.toFixed(2)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${fundingPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Raised</span>
                  <span className="font-semibold">₦{totalRaised.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target</span>
                  <span className="font-semibold">{project.valuation}</span>
                </div>
                {project.valuation && (
                  <div className="flex justify-between">
                    <span>Remaining</span>
                    <span className="font-semibold text-yellow-600">
                      {(() => {
                        try {
                          // Remove currency and commas
                          const cleanVal = project.valuation.replace(/[₦,]/g, "");
                          let valNumber = 0;
                          
                          // Handle if the valuation has B (billions) or M (millions)
                          if (cleanVal.includes("B")) {
                            valNumber = parseFloat(cleanVal) * 1000000000;
                          } else if (cleanVal.includes("M")) {
                            valNumber = parseFloat(cleanVal) * 1000000;
                          } else {
                            valNumber = parseFloat(cleanVal);
                          }
                          
                          const remaining = Math.max(0, valNumber - totalRaised);
                          
                          if (remaining >= 1000000000) {
                            return `₦${(remaining / 1000000000).toFixed(2)}B`;
                          } else if (remaining >= 1000000) {
                            return `₦${(remaining / 1000000).toFixed(2)}M`;
                          } else {
                            return `₦${remaining.toLocaleString()}`;
                          }
                        } catch (e) {
                          return "N/A";
                        }
                      })()}
                    </span>
                  </div>
                )}
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
                <span className="font-semibold">{project.valuation}</span>
              </div>
              <div className="flex justify-between">
                <span>Projected Returns</span>
                <span className="font-semibold">
                  {(() => {
                    try {
                      const projectedReturns = totalRaised * (1 + project.roi / 100);
                      if (projectedReturns >= 1000000000) {
                        return `₦${(projectedReturns / 1000000000).toFixed(2)}B`;
                      } else if (projectedReturns >= 1000000) {
                        return `₦${(projectedReturns / 1000000).toFixed(2)}M`;
                      } else {
                        return `₦${projectedReturns.toLocaleString()}`;
                      }
                    } catch (e) {
                      return "N/A";
                    }
                  })()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Average Investment</span>
                <span className="font-semibold">₦{averageInvestment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Category</span>
                <span className="font-semibold">{project.category}</span>
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
                  <span>Duration</span>
                </div>
                <span className="font-semibold">{durationDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  <span>Last Updated</span>
                </div>
                <span className="font-semibold">{updatedAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  <span>Created</span>
                </div>
                <span className="font-semibold">{createdAt}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
