import { PublicNavigations } from "@/components/PublicNavigations"
import { Footer } from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, FileText, Calendar, Users, Download, BarChart3, PieChart, DollarSign } from "lucide-react"

const financialHighlights = [
  {
    title: "Total Assets Under Management",
    value: "₦75.2B",
    change: "+12.5%",
    period: "YoY Growth",
  },
  {
    title: "Active Investments",
    value: "₦45.8B",
    change: "+18.3%",
    period: "This Quarter",
  },
  {
    title: "Completed Projects",
    value: "156",
    change: "+24",
    period: "This Year",
  },
  {
    title: "Average ROI",
    value: "22.4%",
    change: "+2.1%",
    period: "Annual Average",
  },
]

const reports = [
  {
    title: "Q4 2024 Financial Report",
    description: "Comprehensive quarterly financial performance and project updates",
    date: "December 2024",
    type: "Financial Report",
    size: "2.4 MB",
  },
  {
    title: "Annual Investment Summary 2024",
    description: "Complete overview of all investment activities and returns for 2024",
    date: "December 2024",
    type: "Annual Report",
    size: "5.1 MB",
  },
  {
    title: "Market Analysis Report",
    description: "In-depth analysis of Nigerian real estate market trends and opportunities",
    date: "November 2024",
    type: "Market Report",
    size: "3.2 MB",
  },
  {
    title: "Project Portfolio Update",
    description: "Status updates on all active development projects and timelines",
    date: "November 2024",
    type: "Project Report",
    size: "4.7 MB",
  },
]

const upcomingEvents = [
  {
    title: "Annual Investor Meeting 2025",
    date: "March 15, 2025",
    time: "10:00 AM",
    location: "Lagos Continental Hotel",
    type: "Annual Meeting",
  },
  {
    title: "Q1 2025 Performance Review",
    date: "April 20, 2025",
    time: "2:00 PM",
    location: "Virtual Meeting",
    type: "Quarterly Review",
  },
  {
    title: "New Project Launch Presentation",
    date: "May 10, 2025",
    time: "11:00 AM",
    location: "Abuja Sheraton Hotel",
    type: "Project Launch",
  },
]

const keyMetrics = [
  {
    icon: TrendingUp,
    title: "Portfolio Performance",
    value: "18.7%",
    description: "Average annual return across all investments",
  },
  {
    icon: PieChart,
    title: "Diversification",
    value: "85%",
    description: "Portfolio spread across multiple asset classes",
  },
  {
    icon: BarChart3,
    title: "Occupancy Rate",
    value: "94.2%",
    description: "Average occupancy across completed projects",
  },
  {
    icon: DollarSign,
    title: "Dividend Yield",
    value: "12.5%",
    description: "Annual dividend yield to investors",
  },
]

export default function InvestorRelationsPage() {
  return (
    <>
      <PublicNavigations />
      <div className="pt-20 min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold font-poppins mb-6 text-black">Investor Relations</h1>
            <p className="text-xl text-black/80 max-w-3xl mx-auto mb-8">
              Stay informed with comprehensive financial reports, performance updates, and strategic insights from
              StableBricks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                Access Investor Portal
              </Button>
              <Button size="lg" variant="outline" className="border-black text-black hover:bg-black hover:text-white">
                Subscribe to Updates
              </Button>
            </div>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Financial Highlights</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Key performance indicators and financial metrics for our investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {financialHighlights.map((highlight, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-sm text-gray-600 font-normal">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-black mb-2">{highlight.value}</div>
                  <div className="flex items-center justify-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">{highlight.change}</Badge>
                    <span className="text-sm text-gray-500">{highlight.period}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {keyMetrics.map((metric, index) => {
              const IconComponent = metric.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                    <IconComponent className="w-6 h-6 text-yellow-600" />
                    <CardTitle className="text-sm font-medium ml-2">{metric.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Reports & Documents */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Reports & Documents</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Access our latest financial reports, market analysis, and investment documentation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {reports.map((report, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-8 h-8 text-yellow-600" />
                        <div>
                          <CardTitle className="text-lg font-poppins">{report.title}</CardTitle>
                          <CardDescription>{report.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline">{report.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <div>{report.date}</div>
                        <div>{report.size}</div>
                      </div>
                      <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Upcoming Events</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for investor meetings, project launches, and performance reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-yellow-600" />
                    <Badge variant="outline">{event.type}</Badge>
                  </div>
                  <CardTitle className="text-lg font-poppins">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <Button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black">Register Now</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact IR Team */}
        <div className="bg-gray-100 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold font-poppins mb-4">Contact Our Investor Relations Team</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about your investments or need additional information? Our IR team is here to help.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">investors@stablebricks.com</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-gray-600">+234 806 224 9834</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold mb-2">Office Hours</h3>
                <p className="text-gray-600">Mon - Fri, 9:00 AM - 5:00 PM</p>
              </div>
            </div>
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Schedule a Meeting
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
