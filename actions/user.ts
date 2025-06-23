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

// Admin functions for user management
export const getAllUsers = async (filters?: {
  search?: string
  role?: string
  status?: string
  page?: number
  limit?: number
}) => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const page = filters?.page || 1
    const limit = filters?.limit || 10
    const skip = (page - 1) * limit

    const where: any = {}

    if (filters?.search) {
      where.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { email: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    if (filters?.role && filters.role !== "all") {
      where.role = filters.role
    }

    // Get total count for pagination
    const totalUsers = await db.user.count({ where })

    // Get users
    const users = await db.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        phone: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            investments: true,
            complaints: true,
            landSubmissions: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    })

    const totalPages = Math.ceil(totalUsers / limit)

    return {
      success: true,
      users,
      pagination: {
        page,
        limit,
        totalUsers,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  } catch (error) {
    console.error("Error fetching users:", error)
    return { error: "Failed to fetch users" }
  }
}

export const getUserById = async (id: string) => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const user = await db.user.findUnique({
      where: { id },
      include: {
        wallet: true,
        accoutDetails: true,
        investments: {
          include: {
            project: {
              select: {
                title: true,
                projectStatus: true,
              },
            },
          },
          orderBy: { dateOfInvestment: "desc" },
        },
        complaints: {
          orderBy: { createdAt: "desc" },
        },
        landSubmissions: {
          orderBy: { createdAt: "desc" },
        },
        _count: {
          select: {
            investments: true,
            complaints: true,
            landSubmissions: true,
          },
        },
      },
    })

    if (!user) {
      return { error: "User not found" }
    }

    return { user }
  } catch (error) {
    console.error("Error fetching user:", error)
    return { error: "Failed to fetch user" }
  }
}

export const updateUserRole = async (userId: string, role: "USER" | "ADMIN" | "DEVELOPER") => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const user = await db.user.update({
      where: { id: userId },
      data: { role },
    })

    return { success: "User role updated successfully", user }
  } catch (error) {
    console.error("Error updating user role:", error)
    return { error: "Failed to update user role" }
  }
}

export const verifyUserEmail = async (userId: string) => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const user = await db.user.update({
      where: { id: userId },
      data: { emailVerified: new Date() },
    })

    return { success: "User email verified successfully", user }
  } catch (error) {
    console.error("Error verifying user email:", error)
    return { error: "Failed to verify user email" }
  }
}

export const deleteUser = async (userId: string) => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    // Don't allow deleting the current admin user
    if (session.user.id === userId) {
      return { error: "Cannot delete your own account" }
    }

    await db.user.delete({
      where: { id: userId },
    })

    return { success: "User deleted successfully" }
  } catch (error) {
    console.error("Error deleting user:", error)
    return { error: "Failed to delete user" }
  }
}

export const updateUserInfo = async (userId: string, data: {
  name?: string
  email?: string
  phone?: string
}) => {
  try {
    const session = await auth()

    if (!session?.user?.id || session.user.role !== "ADMIN") {
      return { error: "Unauthorized" }
    }

    const user = await db.user.update({
      where: { id: userId },
      data,
    })

    return { success: "User information updated successfully", user }
  } catch (error) {
    console.error("Error updating user info:", error)
    return { error: "Failed to update user information" }
  }
}
