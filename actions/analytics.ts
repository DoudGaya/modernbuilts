"use server"
import { db } from "@/lib/db"
import { TrendingUp, Users, Building2, DollarSign } from "lucide-react"

export const getAnalyticsData = async () => {
  try {
    // Get total counts
    const [totalUsers, totalProjects, totalInvestments, totalListings] = await Promise.all([
      db.user.count(),
      db.project.count(),
      db.investment.count(),
      db.propertyListing.count(),
    ])

    // Get investment amounts
    const investmentSum = await db.investment.aggregate({
      _sum: {
        investmentAmount: true,
      },
    })

    // Get monthly investment data for chart
    const monthlyInvestments = await db.investment.groupBy({
      by: ["dateOfInvestment"],
      _sum: {
        investmentAmount: true,
      },
      orderBy: {
        dateOfInvestment: "asc",
      },
    })

    // Get project status distribution
    const projectsByStatus = await db.project.groupBy({
      by: ["projectStatus"],
      _count: {
        projectStatus: true,
      },
    })

    // Get recent activities
    const recentInvestments = await db.investment.findMany({
      take: 5,
      orderBy: { dateOfInvestment: "desc" },
      include: {
        user: { select: { name: true } },
        project: { select: { title: true } },
      },
    })

    const stats = [
      {
        title: "Total Users",
        value: totalUsers.toString(),
        change: "+12%",
        changeType: "increase" as const,
        icon: Users,
      },
      {
        title: "Active Projects",
        value: totalProjects.toString(),
        change: "+8%",
        changeType: "increase" as const,
        icon: Building2,
      },
      {
        title: "Total Investments",
        value: `₦${(investmentSum._sum.investmentAmount || 0).toLocaleString()}`,
        change: "+23%",
        changeType: "increase" as const,
        icon: DollarSign,
      },
      {
        title: "Property Listings",
        value: totalListings.toString(),
        change: "+5%",
        changeType: "increase" as const,
        icon: TrendingUp,
      },
    ]

    const chartData = {
      investments: monthlyInvestments.map((item, index) => ({
        name: `Month ${index + 1}`,
        value: item._sum.investmentAmount || 0,
      })),
      projects: projectsByStatus.map((item) => ({
        name: item.projectStatus,
        value: item._count.projectStatus,
      })),
    }

    const recentActivity = recentInvestments.map((investment) => ({
      action: "New Investment",
      details: `${investment.user.name} invested ₦${investment.investmentAmount.toLocaleString()} in ${investment.project.title}`,
      time: new Date(investment.dateOfInvestment).toLocaleDateString(),
    }))

    return {
      success: true,
      stats,
      chartData,
      recentActivity,
    }
  } catch (error) {
    console.error("Analytics fetch error:", error)
    return { error: "Failed to fetch analytics data" }
  }
}
