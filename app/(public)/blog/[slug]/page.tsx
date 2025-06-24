import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CalendarDays, Clock, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

// Mock blog posts data (in a real app, this would come from a database or CMS)
const blogPosts = [
  {
    id: 1,
    title: "The Future of Real Estate Investment in Nigeria",
    excerpt: "Exploring emerging trends and opportunities in Nigeria's evolving real estate landscape.",
    content: `
      <p>Nigeria's real estate sector is experiencing unprecedented growth, driven by urbanization, population growth, and increasing foreign investment. As Africa's most populous nation continues to develop, savvy investors are positioning themselves to capitalize on emerging opportunities.</p>
      
      <h2>Current Market Trends</h2>
      <p>The Nigerian real estate market has shown remarkable resilience despite economic challenges. Key trends include:</p>
      <ul>
        <li>Increasing demand for affordable housing solutions</li>
        <li>Growth in commercial real estate development</li>
        <li>Rising interest in mixed-use developments</li>
        <li>Technology integration in property management</li>
      </ul>
      
      <h2>Investment Opportunities</h2>
      <p>Several sectors present attractive investment opportunities:</p>
      
      <h3>Residential Development</h3>
      <p>With Nigeria's housing deficit estimated at over 20 million units, residential development remains a priority. Focus areas include:</p>
      <ul>
        <li>Affordable housing projects</li>
        <li>Middle-income housing estates</li>
        <li>Luxury residential developments in prime locations</li>
      </ul>
      
      <h3>Commercial Real Estate</h3>
      <p>The demand for modern office spaces, retail centers, and industrial facilities continues to grow, particularly in major cities like Lagos, Abuja, and Port Harcourt.</p>
      
      <h2>Challenges and Solutions</h2>
      <p>While opportunities abound, investors must navigate several challenges:</p>
      <ul>
        <li><strong>Infrastructure:</strong> Improving power, water, and transportation infrastructure</li>
        <li><strong>Financing:</strong> Limited access to long-term financing solutions</li>
        <li><strong>Regulatory Environment:</strong> Complex land acquisition and title registration processes</li>
      </ul>
      
      <h2>The Road Ahead</h2>
      <p>The future of Nigerian real estate looks promising. Government initiatives to improve infrastructure, combined with private sector innovation, are creating a more favorable investment climate. Companies like StableBricks are leading the way by offering transparent, profitable investment opportunities that benefit both investors and communities.</p>
      
      <p>As Nigeria continues to urbanize and modernize, real estate investment will remain a cornerstone of economic growth. The key is partnering with experienced developers who understand the market and have a proven track record of delivering results.</p>
    `,
    author: "Aminu Hassan",
    publishDate: "2024-06-20",
    readTime: "5 min read",
    category: "Investment",
    featured: true,
    image: "/placeholder.svg",
    slug: "future-real-estate-investment-nigeria"
  },
  {
    id: 2,
    title: "Understanding Construction ROI: A Comprehensive Guide",
    excerpt: "Learn how to calculate and maximize returns on construction investments with expert insights.",
    content: `
      <p>Return on Investment (ROI) in construction requires careful analysis of multiple factors. Understanding these elements is crucial for making informed investment decisions.</p>
      
      <h2>What is Construction ROI?</h2>
      <p>Construction ROI measures the efficiency of an investment in construction projects. It's calculated as:</p>
      <blockquote>ROI = (Net Profit / Total Investment) × 100</blockquote>
      
      <h2>Factors Affecting Construction ROI</h2>
      <ul>
        <li>Location and market conditions</li>
        <li>Project type and scale</li>
        <li>Construction timeline</li>
        <li>Material and labor costs</li>
        <li>Market demand</li>
      </ul>
      
      <h2>Maximizing Your Returns</h2>
      <p>To optimize your construction investment returns:</p>
      <ol>
        <li>Choose prime locations with growth potential</li>
        <li>Partner with experienced developers</li>
        <li>Diversify across project types</li>
        <li>Monitor market trends closely</li>
        <li>Maintain realistic timeline expectations</li>
      </ol>
    `,
    author: "Fatima Abdullahi",
    publishDate: "2024-06-18",
    readTime: "7 min read",
    category: "Education",
    featured: true,
    image: "/placeholder.svg",
    slug: "understanding-construction-roi-guide"
  }
]

// Related posts
const relatedPosts = [
  {
    title: "Sustainable Building Practices in Nigerian Construction",
    slug: "sustainable-building-practices-nigeria",
    image: "/placeholder.svg"
  },
  {
    title: "Market Analysis: Northern Nigeria Real Estate Boom",
    slug: "northern-nigeria-real-estate-boom",
    image: "/placeholder.svg"
  },
  {
    title: "Technology Integration in Modern Construction",
    slug: "technology-integration-modern-construction",
    image: "/placeholder.svg"
  }
]

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Image */}
      <div className="relative h-64 md:h-96">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <Button variant="ghost" size="sm" className="mb-4 text-white hover:text-gray-200" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <Badge className="mb-4 bg-blue-600">{post.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-gray-200 mb-6">{post.excerpt}</p>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {post.author}
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-2" />
                {new Date(post.publishDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Share Buttons */}
              <div className="border-t pt-8 mt-8">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <Button size="sm" variant="outline">
                    <Facebook className="w-4 h-4 mr-2" />
                    Facebook
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Author Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">About the Author</h3>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium">{post.author}</div>
                    <div className="text-sm text-gray-500">Senior Analyst</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Expert in real estate investment and market analysis with over 10 years of experience in the Nigerian construction industry.
                </p>
              </CardContent>
            </Card>

            {/* Related Posts */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link key={index} href={`/blog/${relatedPost.slug}`} className="block group">
                      <div className="flex space-x-3">
                        <div className="relative w-16 h-16 flex-shrink-0">
                          <Image
                            src={relatedPost.image}
                            alt={relatedPost.title}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Investing?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of investors who trust StableBricks with their construction investments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/investments">
                View Investment Opportunities
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
