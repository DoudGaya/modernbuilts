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

    const investment = await db.investment.create({
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

    // Generate certificate PDF
    const certificatePDF = await generateCertificatePDF(investment)

    // Generate QR code for verification
    const qrCode = await generateQRCode(`https://stablebricks.com/user-investment/${verificationToken.token}`)

    return {
      success: true,
      investment,
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


