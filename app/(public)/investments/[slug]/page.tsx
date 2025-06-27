import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { getProjectBySlug } from "@/actions/project"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, TrendingUp, Shield, Users, Calendar, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { formatCurrency, formatCurrencyShort, calculateFundingProgress } from "@/lib/project-utils"
import type { Metadata } from 'next'
import { InvestmentButton } from "./components/InvestmentButton"

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>
}

export default async function PublicProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params
  const result = await getProjectBySlug(slug)

  if (!result.success || !result.project) {
    notFound()
  }
  const project = result.project

  const calculateProjectFundingProgress = () => {
    return calculateFundingProgress(project)
  }

  const sharePrice = project.sharePrice || 0
  const fundingProgress = calculateProjectFundingProgress()

  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{project.category}</Badge>              <Badge 
                className={
                  project.projectStatus === "ACTIVE" ? "bg-green-500" : 
                  project.projectStatus === "COMPLETED" ? "bg-blue-500" : "bg-yellow-500"
                }
              >
                {project.projectStatus}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{project.city}, {project.state}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={project.coverImage || "/placeholder.svg"}
                      alt={project.title}
                      width={800}
                      height={400}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-4 right-4"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                    {project.video && (
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Project Video</h3>
                      <div className="aspect-video">
                        <video
                          src={project.video}
                          controls
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Project Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Investment Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-green-500" />
                      <div>
                        <div className="font-semibold">{project.roi}%</div>
                        <div className="text-gray-500">Expected ROI</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      <div>                        <div className="font-semibold">{project.length}</div>
                        <div className="text-gray-500">Duration</div>
                      </div>
                    </div>                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2 text-purple-500" />
                      <div>
                        <div className="font-semibold">{formatCurrencyShort(project.valuation || 0)}</div>
                        <div className="text-gray-500">Project Value</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-orange-500" />
                      <div>
                        <div className="font-semibold">{project.investment?.length || 0}</div>
                        <div className="text-gray-500">Investors</div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Funding Progress</span>
                      <span>{Math.round(fundingProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${fundingProgress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Raised: {formatCurrencyShort((project.soldShares || 0) * sharePrice)}</span>
                      <span>Goal: {formatCurrencyShort(project.investmentRequired || 0)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Share Price</span>
                      <span className="font-semibold">{formatCurrency(sharePrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Available Shares</span>
                      <span className="font-semibold">{(project.totalShares || 0) - (project.soldShares || 0)}</span>
                    </div>
                  </div>

                  <InvestmentButton projectSlug={project.slug} />
                </CardContent>
              </Card>

              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Get More Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                  <Button variant="outline" className="w-full">
                    Download Brochure
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Team
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const result = await getProjectBySlug(slug)

  if (!result.success || !result.project) {
    return {
      title: 'Project Not Found | StableBricks',
      description: 'The requested project could not be found.',
    }
  }

  const project = result.project
  const sharePrice = project.sharePrice || 0
  const fundingProgress = calculateFundingProgress(project)

  return {
    title: `${project.title} | StableBricks Investment Opportunity`,
    description: `Invest in ${project.title} in ${project.city}, ${project.state}. ${project.roi}% ROI expected. Starting from ${formatCurrency(sharePrice)}. ${project.description.slice(0, 150)}...`,
    keywords: [
      'real estate investment',
      'property investment',
      project.category.toLowerCase(),
      project.city.toLowerCase(),
      project.state.toLowerCase(),
      'high yield investment',
      'stable returns',
      `${project.roi}% ROI`,
    ],
    authors: [{ name: 'StableBricks' }],
    openGraph: {
      title: `${project.title} | Investment Opportunity`,
      description: `${project.roi}% ROI • ${project.city}, ${project.state} • Starting from ${formatCurrency(sharePrice)}`,
      type: 'website',
      url: `https://stablebricks.com/projects/${slug}`,
      siteName: 'StableBricks',
      images: [
        {
          url: project.coverImage || '/placeholder.svg',
          width: 1200,
          height: 630,
          alt: `${project.title} - Real Estate Investment Opportunity`,
          type: 'image/jpeg',
        },
        ...(project.images?.slice(0, 3).map((image: string, index: number) => ({
          url: image,
          width: 800,
          height: 600,
          alt: `${project.title} - Image ${index + 1}`,
          type: 'image/jpeg',
        })) || [])
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Investment Opportunity`,
      description: `${project.roi}% ROI • ${project.city}, ${project.state} • Starting from ${formatCurrency(sharePrice)}`,
      images: [project.coverImage || '/placeholder.svg'],
      site: '@stablebricks',
      creator: '@stablebricks',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://stablebricks.com/projects/${slug}`,
    },
  }
}