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
    const certificateId = `CERT-${data.projectId.slice(0, 3).toUpperCase()}-${Date.now()}`

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
            name: true,
            email: true,
          },
        },
        project: {
          select: {
            title: true,
            expectedReturn: true,
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


// "use client"
// import { getUserById } from "@/data/user"
// import { db } from "@/lib/db";

// export const getInvestmentCountByUserId = async (userId: string) => {
//     const user = await getUserById(userId);
//     if (!user) {
//         return {error: "User does not exist"}
//     }
//     const investmentCount = await db.investment.count({
//         where: {
//             userId: user.id
//         }
//     })

//     return investmentCount
// }


// export const getAllInvestmentByUserId = async (userId: string) => {

//     const user = await getUserById(userId);
//     if (!user) {
//         return {error: "User does not exist"}
//     }
//     const investmentCount = await db.investment.findMany({
//         where: {
//             userId: user.id
//         }
//     })
//     return investmentCount
// }


