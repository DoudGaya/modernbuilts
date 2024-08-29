import { db } from "@/lib/db";


export const getAccountByUserId = async (userId: string) => {
    try {
        const account = await db.account.findFirst({
            where: {
                id: userId
            }
        })

        return account
    } catch (error) {
        
    }
}