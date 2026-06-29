"use server"
import * as z from 'zod'
import { signUpSchema } from '@/lib/schema'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { sendVrificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'
import { generateReferralCode } from '@/lib/utils'
import { getAuthActionErrorMessage, databaseUnavailableMessage } from '@/lib/auth-errors'
import { getDatabaseConfigurationError } from '@/lib/db'

type RegisterResult = {
    error?: string;
    success?: string;
}

export const register = async (values: z.infer<typeof signUpSchema>): Promise<RegisterResult> => {
    const fieldValidation = signUpSchema.safeParse(values);
    if (!fieldValidation.success) {
         return { error: "Please check the form fields and try again." }
    }
    const { fullName, email, password, ref, passwordConfirmation, phone } = fieldValidation.data
    if (password !== passwordConfirmation) return {error: "Passwords do not match."}

    if (getDatabaseConfigurationError()) {
        return {error: databaseUnavailableMessage}
    }

    try {
        const emailExist = await getUserByEmail(email)

        if (emailExist) {
            return {error: "User already exists."}
        }

        if (ref) {
            await db.user.findUnique({
                where: {
                    id: ref
                }
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const referralCode = generateReferralCode(email)

        await db.user.create({
            data: {
                name: fullName,
                email,
                password: hashedPassword,
                phone,
                referralID: referralCode
            }
        })

        const verificationToken = await generateVerificationToken(email)
        await sendVrificationEmail(verificationToken.email, verificationToken.token)

        return {success: "Check your email to verify your account!"}
    } catch (error) {
        const fallback =
            error instanceof Error && (error.message.toLowerCase().includes("resend") || error.message.toLowerCase().includes("api key"))
                ? "Your account was created, but we couldn't send the verification email. Please contact support."
                : "Something went wrong while creating your account. Please try again.";
        const message = getAuthActionErrorMessage(error, fallback);

        if (message === fallback) {
            console.error("Registration failed", error)
        }

        return {
            error: message
        }
    }
}

export const regsiter = register
