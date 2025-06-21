"use server"
import { db } from "@/lib/db"
import { getUserById } from "@/data/user"

export const getWalletByUserId = async (userId: string) => {
  try {
    let wallet = await db.wallet.findUnique({
      where: { userId },
      include: {
        bonuses: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            referralID: true,
          }
        }
      }    })

    // Create wallet if it doesn't exist
    if (!wallet) {
      // First create the wallet
      const newWallet = await db.wallet.create({
        data: {
          userId,
          balance: 0,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              referralID: true,
            }
          }
        }
      })

      // Then create the welcome bonus
      await db.bonuses.create({
        data: {
          name: "Welcome Bonus",
          amount: 5000,
          walletId: newWallet.id,
        }
      })

      // Fetch the wallet again with bonuses
      wallet = await db.wallet.findUnique({
        where: { userId },
        include: {
          bonuses: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              referralID: true,
            }
          }
        }
      })
    }

    if (!wallet) {
      return { error: "Failed to create or retrieve wallet" }
    }

    // Calculate total bonuses
    const totalBonuses = wallet.bonuses.reduce((sum, bonus) => sum + bonus.amount, 0)
    const welcomeBonus = wallet.bonuses.find(b => b.name === "Welcome Bonus")?.amount || 0
    const referralBonus = wallet.bonuses
      .filter(b => b.name === "Referral Bonus")
      .reduce((sum, bonus) => sum + bonus.amount, 0)

    return {
      success: true,
      wallet: {
        ...wallet,
        totalBonuses,
        welcomeBonus,
        referralBonus,
      }
    }
  } catch (error) {
    console.error("Failed to fetch wallet:", error)
    return { error: "Failed to fetch wallet information" }
  }
}

export const addFunds = async (userId: string, amount: number, transactionRef?: string, flutterwaveRef?: string) => {
  try {
    if (amount <= 0) {
      return { error: "Amount must be greater than 0" }
    }

    // Verify Flutterwave transaction if reference is provided
    if (flutterwaveRef) {
      const verifyResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${flutterwaveRef}/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      })

      const verifyData = await verifyResponse.json()
      
      if (verifyData.status !== 'success' || verifyData.data.status !== 'successful') {
        return { error: "Payment verification failed" }
      }

      if (verifyData.data.amount !== amount) {
        return { error: "Amount mismatch" }
      }
    }

    const wallet = await db.wallet.upsert({
      where: { userId },
      update: {
        balance: {
          increment: amount
        }
      },
      create: {
        userId,
        balance: amount,
      },
      include: {
        bonuses: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    // Create transaction record (will be implemented when Transaction model is available)
    // For now, we'll just return success

    return {
      success: true,
      message: `Successfully added ₦${amount.toLocaleString()} to wallet`,
      newBalance: wallet.balance,
      wallet
    }
  } catch (error) {
    console.error("Failed to add funds:", error)
    return { error: "Failed to add funds to wallet" }
  }
}

export const withdrawFunds = async (userId: string, amount: number, accountDetails?: {
  accountName: string
  accountNumber: string
  bankName: string
}) => {
  try {
    if (amount <= 0) {
      return { error: "Amount must be greater than 0" }
    }

    if (!accountDetails) {
      return { error: "Account details are required for withdrawal" }
    }

    const wallet = await db.wallet.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          }
        }
      }
    })

    if (!wallet) {
      return { error: "Wallet not found" }
    }

    if (wallet.balance < amount) {
      return { error: "Insufficient balance" }
    }

    // Initiate Flutterwave transfer
    const transferData = {
      account_bank: getBankCode(accountDetails.bankName),
      account_number: accountDetails.accountNumber,
      amount: amount,
      narration: "StableBricks Wallet Withdrawal",
      currency: "NGN",
      reference: `sb_withdraw_${Date.now()}_${userId}`,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/flutterwave/transfer-callback`,
      debit_currency: "NGN"
    }

    const transferResponse = await fetch("https://api.flutterwave.com/v3/transfers", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transferData)
    })

    const transferResult = await transferResponse.json()

    if (transferResult.status !== 'success') {
      return { error: transferResult.message || "Failed to initiate transfer" }
    }

    // Deduct from wallet balance
    const updatedWallet = await db.wallet.update({
      where: { userId },
      data: {
        balance: {
          decrement: amount
        }
      },
      include: {
        bonuses: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        }
      }
    })

    // Create transaction record (will be implemented when Transaction model is available)
    // For now, we'll just return success

    return {
      success: true,
      message: `Withdrawal of ₦${amount.toLocaleString()} initiated successfully`,
      newBalance: updatedWallet.balance,
      wallet: updatedWallet,
      transferReference: transferResult.data.reference
    }
  } catch (error) {
    console.error("Failed to withdraw funds:", error)
    return { error: "Failed to process withdrawal" }
  }
}

// Helper function to get bank codes for Flutterwave
const getBankCode = (bankName: string): string => {
  const bankCodes: { [key: string]: string } = {
    "Access Bank": "044",
    "GTBank": "058",
    "First Bank": "011",
    "UBA": "033",
    "Zenith Bank": "057",
    "Ecobank": "050",
    "Fidelity Bank": "070",
    "Sterling Bank": "232",
    "Union Bank": "032",
    "Wema Bank": "035",
    "Keystone Bank": "082",
    "Polaris Bank": "076",
    "Stanbic IBTC": "221",
    "Unity Bank": "215",
    "Providus Bank": "101"
  }
    return bankCodes[bankName] || "044" // Default to Access Bank
}

export const addReferralBonus = async (userId: string, referredUserId: string, amount: number = 2000) => {
  try {
    const wallet = await db.wallet.upsert({
      where: { userId },
      update: {},
      create: {
        userId,
        balance: 0,
      }
    })

    // Add referral bonus
    await db.bonuses.create({
      data: {
        name: "Referral Bonus",
        amount,
        walletId: wallet.id,
      }
    })

    // Add bonus amount to wallet balance
    await db.wallet.update({
      where: { userId },
      data: {
        balance: {
          increment: amount
        }
      }
    })

    return {
      success: true,
      message: `Referral bonus of ₦${amount.toLocaleString()} added successfully`
    }
  } catch (error) {
    console.error("Failed to add referral bonus:", error)
    return { error: "Failed to add referral bonus" }
  }
}

export const getTransactionHistory = async (userId: string) => {
  try {
    // Mock transaction history until Transaction model is properly generated
    const mockTransactions = [
      {
        id: "1",
        type: "credit" as const,
        amount: 5000,
        description: "Welcome Bonus",
        date: new Date(),
        status: "completed" as const
      },
      {
        id: "2",
        type: "credit" as const,
        amount: 50000,
        description: "Wallet Funding",
        date: new Date(Date.now() - 86400000),
        status: "completed" as const
      }
    ]

    return {
      success: true,
      transactions: mockTransactions
    }
  } catch (error) {
    console.error("Failed to fetch transaction history:", error)
    return { error: "Failed to fetch transaction history" }
  }
}

export const getUserAccountDetails = async (userId: string) => {
  try {
    const accountDetails = await db.accountDetails.findUnique({
      where: { userId }
    })

    return {
      success: true,
      accountDetails
    }
  } catch (error) {
    console.error("Failed to fetch account details:", error)
    return { error: "Failed to fetch account details" }
  }
}

export const saveAccountDetails = async (
  userId: string, 
  details: {
    accountName: string
    accountNumber: string
    bankName: string
  }
) => {
  try {
    const accountDetails = await db.accountDetails.upsert({
      where: { userId },
      update: details,
      create: {
        userId,
        ...details
      }
    })

    return {
      success: true,
      accountDetails,
      message: "Account details saved successfully"
    }
  } catch (error) {
    console.error("Failed to save account details:", error)
    return { error: "Failed to save account details" }
  }
}