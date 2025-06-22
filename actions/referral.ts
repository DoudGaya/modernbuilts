"use server"

import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { generateReferralCode } from "@/lib/utils"

export async function getUserReferralInfo() {
  try {
    const user = await currentUser()
    if (!user?.id) {
      return { error: "Unauthorized" }
    }

    const dbUser = await db.user.findUnique({
      where: { id: user.id },
      select: {
        referralID: true,
        name: true,
      }
    })

    if (!dbUser) {
      return { error: "User not found" }
    }

    // Generate referral code if user doesn't have one
    let referralCode = dbUser.referralID
    if (!referralCode) {
      referralCode = generateReferralCode(dbUser.name || "USER")
      await db.user.update({
        where: { id: user.id },
        data: { referralID: referralCode }
      })
    }

    // Generate referral link
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const referralLink = `${baseUrl}/register?ref=${referralCode}`    // Get referral stats
    const referralStats = await db.user.findMany({
      where: {
        // This would need to be implemented based on how referrals are tracked
        // For now, we'll return mock data
      },
      select: {
        id: true,
        name: true,
      }
    })

    return {
      success: true,
      referralCode,
      referralLink,
      totalReferrals: 0, // Mock data for now
      referralBonus: 0, // Mock data for now
    }
  } catch (error) {
    console.error("Failed to get referral info:", error)
    return { error: "Failed to get referral information" }
  }
}

export async function shareReferralLink(method: 'copy' | 'whatsapp' | 'email') {
  try {
    const referralInfo = await getUserReferralInfo()
    
    if (referralInfo.error) {
      return referralInfo
    }

    const { referralLink } = referralInfo
    const message = `Join StableBricks and start investing in real estate projects! Use my referral link: ${referralLink}`

    switch (method) {
      case 'whatsapp':
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
        return { success: true, url: whatsappUrl }
      
      case 'email':
        const emailUrl = `mailto:?subject=${encodeURIComponent('Join StableBricks')}&body=${encodeURIComponent(message)}`
        return { success: true, url: emailUrl }
      
      case 'copy':
        return { success: true, text: referralLink }
      
      default:
        return { error: "Invalid sharing method" }
    }
  } catch (error) {
    console.error("Failed to share referral link:", error)
    return { error: "Failed to share referral link" }
  }
}
