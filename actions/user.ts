"use server"
import { db } from "@/lib/db"
import { auth } from "@/auth"

export const getUserDashboardData = async () => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    const userId = session.user.id

    // Get user's investments
    const userInvestments = await db.investment.findMany({
      where: { userId },
      include: {
        project: {
          select: {
            title: true,
            location: true,
          },
        },
      },
      orderBy: { dateOfInvestment: "desc" },
      take: 5,
    })

    // Get user's wallet
    const wallet = await db.wallet.findUnique({
      where: { userId },
    })

    // Get top projects
    const topProjects = await db.project.findMany({
      where: { projectStatus: "ACTIVE" },
      orderBy: { roi: "desc" },
      take: 5,
    })

    // Calculate stats
    const totalInvestments = userInvestments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
    const activeProjects = userInvestments.length
    const expectedReturns = userInvestments.reduce((sum, inv) => sum + inv.investmentReturn, 0)

    const stats = {
      totalInvestments,
      activeProjects,
      expectedReturns,
    }

    return {
      success: true,
      stats,
      recentInvestments: userInvestments,
      topProjects,
      walletBalance: wallet?.balance || 0,
    }
  } catch (error) {
    console.error("Dashboard data fetch error:", error)
    return { error: "Failed to fetch dashboard data" }
  }
}

export const getUserInvestmentStats = async () => {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return { error: "Unauthorized" }
    }

    const userId = session.user.id

    // Get user's investments
    const userInvestments = await db.investment.findMany({
      where: { userId },
      include: {
        project: {
          select: {
            projectStatus: true,
          },
        },
      },
    })

    // Calculate stats
    const totalInvestments = userInvestments.length
    const activeProjects = userInvestments.filter(inv => inv.project.projectStatus === "ACTIVE").length

    return {
      success: true,
      stats: {
        totalInvestments,
        activeProjects,
      }
    }
  } catch (error) {
    console.error("Investment stats fetch error:", error)
    return { error: "Failed to fetch investment stats" }
  }
}
