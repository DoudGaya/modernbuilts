import { v4 as uuid } from "uuid"
import { db } from "./db"
import { getVerificationTokenByEmail } from "@/data/verification-token"
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token"



export const generatePasswordResetToken = async (email: string ) => {
    const token = uuid()
    const expires = new Date (new Date().getTime() + 3600 * 1000)
    const existingToken = await getPasswordResetTokenByEmail(email)

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }


    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return passwordResetToken;
}



export const generateVerificationToken = async (email: string) => {
  
  
    const token = uuid()
    const expires = new Date (new Date().getTime() + 3600 * 1000)
    const existingTokens = await getVerificationTokenByEmail(email)


    if (existingTokens) {
        await db.verificationToken.delete({
            where: {
                id: existingTokens.id
            }
        })
     }

     const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
     })

     return verificationToken
}