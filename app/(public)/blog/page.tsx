import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarDays, Clock, User, ArrowRight, TrendingUp } from 'lucide-react'

const blogPosts = [
  {
    id: 1,
    title: "The Future of Real Estate Investment in Nigeria",
    excerpt: "Exploring emerging trends and opportunities in Nigeria's evolving real estate landscape.",
    content: "Nigeria's real estate sector is experiencing unprecedented growth...",
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
    content: "Return on Investment (ROI) in construction requires careful analysis...",
    author: "Fatima Abdullahi",
    publishDate: "2024-06-18",
    readTime: "7 min read",
    category: "Education",
    featured: true,
    image: "/placeholder.svg",
    slug: "understanding-construction-roi-guide"
  },
  {
    id: 3,
    title: "Sustainable Building Practices in Nigerian Construction",
    excerpt: "How StableBricks is leading the way in environmentally conscious construction.",
    content: "Sustainability in construction is no longer optional...",
    author: "Ibrahim Musa",
    publishDate: "2024-06-15",
    readTime: "6 min read",
    category: "Sustainability",
    featured: false,
    image: "/placeholder.svg",
    slug: "sustainable-building-practices-nigeria"
  },
  {
    id: 4,
    title: "Market Analysis: Northern Nigeria Real Estate Boom",
    excerpt: "Analyzing the rapid growth of real estate markets in Kano, Kaduna, and surrounding areas.",
    content: "The northern Nigerian real estate market is witnessing remarkable growth...",
    author: "Aisha Garba",
    publishDate: "2024-06-12",
    readTime: "8 min read",
    category: "Market Analysis",
    featured: false,
    image: "/placeholder.svg",
    slug: "northern-nigeria-real-estate-boom"
  },
  {
    id: 5,
    title: "Technology Integration in Modern Construction",
    excerpt: "How digital tools and smart systems are revolutionizing the construction industry.",
    content: "The integration of technology in construction has transformed...",
    author: "Yusuf Aliyu",
    publishDate: "2024-06-10",
    readTime: "5 min read",
    category: "Technology",
    featured: false,
    image: "/placeholder.svg",
    slug: "technology-integration-modern-construction"
  },
  {
    id: 6,
    title: "Investment Strategies for First-Time Real Estate Investors",
    excerpt: "Essential tips and strategies for beginners looking to enter the real estate investment market.",
    content: "Starting your real estate investment journey can be daunting...",
    author: "Halima Umar",
    publishDate: "2024-06-08",
    readTime: "10 min read",
    category: "Investment",
    featured: false,
    image: "/placeholder.svg",
    slug: "investment-strategies-first-time-investors"
  }
]

const categories = ["All", "Investment", "Education", "Sustainability", "Market Analysis", "Technology"]

export default function BlogPage() {
  const featuredPosts = blogPosts.filter(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              StableBricks Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Insights, analysis, and expert perspectives on real estate investment, 
              construction trends, and market opportunities in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-blue-600">
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="text-base">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-sm text-gray-600">{post.author}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/blog/${post.slug}`}>
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Latest Articles
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                size="sm"
                className="hover:bg-blue-600 hover:text-white"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-blue-600 transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(post.publishDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <TrendingUp className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Stay Updated
          </h2>
          <p className="text-xl mb-8">
            Subscribe to our newsletter for the latest insights on real estate investment and construction trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
