"use client"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db";

export const getInvestmentCountByUserId = async (userId: string) => {
    const user = await getUserById(userId);
    if (!user) {
        return {error: "User does not exist"}
    }
    const investmentCount = await db.investment.count({
        where: {
            userId: user.id
        }
    })

    return investmentCount
}


export const getAllInvestmentByUserId = async (userId: string) => {

    const user = await getUserById(userId);
    if (!user) {
        return {error: "User does not exist"}
    }
    const investmentCount = await db.investment.findMany({
        where: {
            userId: user.id
        }
    })
    return investmentCount
}


