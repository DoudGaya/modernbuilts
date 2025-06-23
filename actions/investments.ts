"use server"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
// import { generateCertificatePDF } from "@/lib/pdf-generator"
import { generateCertificatePDF } from "@/lib/pdf-generator"
// import { generateQRCode } from "@/lib/qr-generator"
import { generateQRCode } from "@/lib/qr-generator"
import { generateVerificationToken } from "@/lib/tokens"

export const createInvestment = async (data: {
  userId: string
  projectId: string
  amount: number
  shares?: number
  transactionRef?: string
  flutterwaveRef?: string
}) => {

    const user = await getUserById(data.userId);
  if (!user) {
    return { error: "User does not exist" }
  }
  try {
    const verificationToken = await generateVerificationToken(user.email || user.id )
    const certificateId = `SB-CERT-${data.projectId.slice(0, 3).toUpperCase()}-${Date.now()}`

    // Create investment and update project sold shares in a transaction
    const result = await db.$transaction(async (tx) => {
      // Create the investment
      const investment = await tx.investment.create({
        data: {
          userId: data.userId,
          projectId: data.projectId,
          investmentAmount: data.amount,
          investmentReturn: 0, // Will be calculated based on project ROI
          dateOfInvestment: new Date(),
          dateOfreturn: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)), // 1 year from now
          status: "ACTIVE",
          certificateId,
          verificationToken: verificationToken.token,
          shares: data.shares || Math.floor(data.amount / 100000), // Default calculation
          transactionRef: data.transactionRef,
          flutterwaveRef: data.flutterwaveRef,
        },
        include: {
          user: true,
          project: true,
        },
      })

      // Update project sold shares
      await tx.project.update({
        where: { id: data.projectId },
        data: {
          soldShares: {
            increment: investment.shares || 0
          }
        }
      })

      return investment
    })

    // Generate certificate PDF
    const certificatePDF = await generateCertificatePDF(result)    // Generate QR code for verification
    const qrCode = await generateQRCode(`https://stablebricks.com/user-investment/${verificationToken.token}`)

    return {
      success: true,
      investment: result,
      certificateId,
      verificationToken: verificationToken.token,
    }
  } catch (error) {
    console.error("Investment creation error:", error)
    return { error: "Failed to create investment" }
  }
}

export const generateInvestmentCertificate = async (investmentId: string) => {
  try {
    const investment = await db.investment.findUnique({
      where: { id: investmentId },
      include: {
        user: true,
        project: true,
      },
    })

    if (!investment) {
      return { error: "Investment not found" }
    }

    const certificatePDF = await generateCertificatePDF(investment)

    return {
      success: true,
      certificatePDF,
      certificateId: investment.certificateId,
    }
  } catch (error) {
    console.error("Certificate generation error:", error)
    return { error: "Failed to generate certificate" }
  }
}

export const getInvestmentByToken = async (token: string) => {
  try {
    const investment = await db.investment.findUnique({
      where: { verificationToken: token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },        project: {
          select: {
            title: true,
            roi: true,
            duration: true,
          },
        },
      },
    })

    if (!investment) {
      return { error: "Investment not found" }
    }

    return { success: true, investment }
  } catch (error) {
    console.error("Investment verification error:", error)
    return { error: "Failed to verify investment" }
  }
}

export const getUserInvestments = async (userId: string) => {
  try {
    const investments = await db.investment.findMany({
      where: { userId },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            location: true,
            roi: true,
            duration: true,
          },
        },
      },
      orderBy: { dateOfInvestment: "desc" },
    })

    return { success: true, investments }
  } catch (error) {
    console.error("Failed to fetch user investments:", error)
    return { error: "Failed to fetch investments" }
  }
}

export const getInvestmentById = async (investmentId: string, userId?: string) => {
  try {
    const whereClause: any = { id: investmentId }
    if (userId) {
      whereClause.userId = userId
    }    const investment = await db.investment.findUnique({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },        project: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            location: true,
            state: true,
            city: true,
            roi: true,
            duration: true,
            category: true,
          },
        },
      },
    })

    if (!investment) {
      return { error: "Investment not found" }
    }

    return { success: true, investment }
  } catch (error) {
    console.error("Failed to fetch investment:", error)
    return { error: "Failed to fetch investment" }
  }
}

export const getPublicInvestmentByToken = async (token: string) => {
  try {
    const investment = await db.investment.findUnique({
      where: { verificationToken: token },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },        project: {
          select: {
            id: true,
            title: true,
            slug: true,
            coverImage: true,
            location: true,
            state: true,
            city: true,
            roi: true,
            duration: true,
            category: true,
          },
        },
      },
    })

    if (!investment) {
      return { error: "Investment verification failed - Invalid token" }
    }

    // Generate certificate number for display
    const certificateNumber = investment.certificateId || `SB-CERT-${investment.id.slice(-8).toUpperCase()}`

    return { 
      success: true, 
      investment: {
        ...investment,
        certificateNumber,
      }
    }
  } catch (error) {
    console.error("Failed to verify investment:", error)
    return { error: "Investment verification failed" }
  }
}

// Admin functions for investment management
export const getAllInvestments = async (filters?: {
  search?: string
  status?: string
  projectId?: string
  page?: number
  limit?: number
}) => {
  try {
    const page = filters?.page || 1
    const limit = filters?.limit || 9 // 9 investments per page for 3x3 grid
    const skip = (page - 1) * limit

    const where: any = {}

    if (filters?.search) {
      where.OR = [
        { user: { name: { contains: filters.search, mode: "insensitive" } } },
        { user: { email: { contains: filters.search, mode: "insensitive" } } },
        { project: { title: { contains: filters.search, mode: "insensitive" } } },
        { certificateId: { contains: filters.search, mode: "insensitive" } },
      ]
    }

    if (filters?.status && filters.status !== "all") {
      // Map frontend status to backend enum
      const statusMap: { [key: string]: string } = {
        "active": "ACTIVE",
        "pending": "PENDING", 
        "completed": "COMPLETED",
        "end": "END"
      }
      where.status = statusMap[filters.status] || filters.status
    }

    if (filters?.projectId && filters.projectId !== "all") {
      where.projectId = filters.projectId
    }

    // Get total count for pagination
    const totalInvestments = await db.investment.count({ where })

    // Get investments with related data
    const investments = await db.investment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            id: true,
            title: true,
            roi: true,
            location: true,
            state: true,
            city: true,
          },
        },
      },
      orderBy: { dateOfInvestment: "desc" },
      skip,
      take: limit,
    })

    // Calculate summary statistics
    const totalInvestmentValue = await db.investment.aggregate({
      _sum: {
        investmentAmount: true,
      },
    })

    const activeInvestorsCount = await db.investment.groupBy({
      by: ['userId'],
      where: { status: "ACTIVE" },
    })

    const activeProjectsCount = await db.investment.groupBy({
      by: ['projectId'],
      where: { status: "ACTIVE" },
    })

    // Calculate this month's investments
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const thisMonthInvestments = await db.investment.aggregate({
      _sum: {
        investmentAmount: true,
      },
      where: {
        dateOfInvestment: {
          gte: startOfMonth,
        },
      },
    })

    const totalPages = Math.ceil(totalInvestments / limit)

    return {
      success: true,
      investments,
      pagination: {
        page,
        limit,
        totalInvestments,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      stats: {
        totalInvestmentValue: totalInvestmentValue._sum.investmentAmount || 0,
        activeInvestors: activeInvestorsCount.length,
        activeProjects: activeProjectsCount.length,
        thisMonthValue: thisMonthInvestments._sum.investmentAmount || 0,
      },
    }
  } catch (error) {
    console.error("Error fetching investments:", error)
    return { error: "Failed to fetch investments" }
  }
}

export const getProjectsForFilter = async () => {
  try {
    const projects = await db.project.findMany({
      select: {
        id: true,
        title: true,
      },
      orderBy: { title: "asc" },
    })

    return { success: true, projects }
  } catch (error) {
    console.error("Error fetching projects:", error)
    return { error: "Failed to fetch projects" }
  }
}


