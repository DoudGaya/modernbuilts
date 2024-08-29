"use server"
import { loginSchema } from '@/lib/schema'
import * as z from 'zod' 
import { signIn } from '@/auth'
import { DEFAULT_LOGGED_IN_REDIRRECT} from '@/routes'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token'
import { generateVerificationToken, 
        generateTwoFactorToken 
    } from '@/lib/tokens'
import { sendVrificationEmail, sendTwoFactorEmail } from '@/lib/mail'
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation'
import { redirect } from 'next/navigation'

export const login = async (values: z.infer<typeof loginSchema>) => {
    const fieldValidation = loginSchema.safeParse(values);
    if (!fieldValidation.success) {
         return {error: "field Validation failed "}
    }
 
    const { email, password, code } = fieldValidation.data


    const existingUser = await getUserByEmail(email) 

   
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = generateVerificationToken(existingUser.email)
        await sendVrificationEmail((await verificationToken).email, (await verificationToken).token)
        return {success: "Check your email to verify your account!"}
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {

        if (code) {
            const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

            if (!twoFactorToken) { 
                return {error: "Invalid OTP Code"}
            }

            if (twoFactorToken.token !== code) {
                return {error: "Invalid OTP Code"}
            }
            const hasExpired = new Date(twoFactorToken.expires) < new Date()

            if (hasExpired) {
                return {error: " OTP Code Expired"}
            }

            await db.twoFactorToken.delete({
                where: {id: twoFactorToken.id}
            })

            const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

            if (existingConfirmation) {
                await db.twoFactorConfirmation.delete({
                    where: {
                        id: existingConfirmation.id
                    }
                })
            }

            await db.twoFactorConfirmation.create({
                data: {
                    userId: existingUser.id,
                }
            })
        } else {

            const twoFactorToken = await generateTwoFactorToken(existingUser.email )
            await sendTwoFactorEmail(existingUser.email, twoFactorToken.token)
            return {twoFactor: true}
        }
    }


    try {
        await signIn("credentials", {
            email, 
            password,
            redirect: true,
            redirectTo: DEFAULT_LOGGED_IN_REDIRRECT,
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {error: "Invalid Credentials"}
                    default:
                        return {error: "Something went wrong"}
            }
        }

        throw error;
    }


}