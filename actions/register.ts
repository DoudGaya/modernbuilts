"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { generateReferralCode } from '@/lib/utils'


export const regsiter = async (values: z.infer<typeof signUpSchema>) => {
    const fieldValidation = signUpSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { fullName, email, password, ref, passwordConfirmation, phone } = fieldValidation.data
    if (password !== passwordConfirmation) return {error: "Password doesn not match"}
    const hashedPassword = await bcrypt.hash(password, 10)
    
    // checking for an existing user
    const emailExist = await getUserByEmail(email)


    if (ref) {
        const refUser = await db.user.findUnique({
            where: {
                id: ref // Assuming ref is an email, otherwise use a unique identifier like id
            }
        })


    }
    
    if (emailExist) {
        return {error: "User already Exist"}
    }

    const referralCode = generateReferralCode(email)

    await db.user.create({
        data: {
            name: fullName,
            email,
            password: hashedPassword,
            phone,
            referralCode
        }
    })

    const verificationToken = await generateVerificationToken(email)
    await sendVrificationEmail(verificationToken.email, verificationToken.token)
    return {success: "Check your email to verify your account!"}
}