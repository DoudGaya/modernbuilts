"use server"
import { loginSchema } from '@/lib/schema'
import * as z from 'zod' 
import { signIn } from '@/auth'
import { DEFAULT_LOGGED_IN_REDIRRECT } from '@/routes'
import { AuthError } from 'next-auth'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { User } from '@prisma/client'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVrificationEmail } from '@/lib/mail'

export const login = async (values: z.infer<typeof loginSchema>) => {
    const fieldValidation = loginSchema.safeParse(values);
    if (!fieldValidation.success) {
         return {error: "field Validation failed "}
    }
 
    const { email, password } = fieldValidation.data



    const existingUser = await getUserByEmail(email) as User


    // if (!existingUser.email)
 
   
    if (!existingUser || !existingUser.email || !existingUser.password) {
        return {error: "Email does not exist!" }
    }

    if (!existingUser.emailVerified) {
        const verificationToken = generateVerificationToken(existingUser.email)
        await sendVrificationEmail((await verificationToken).email, (await verificationToken).token)
        return {success: "Check your email to verify your account!"}
    }
    
    try {
        await signIn("credentials", {
            email, 
            password,
            redirrectTo: DEFAULT_LOGGED_IN_REDIRRECT
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