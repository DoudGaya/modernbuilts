"use server"
import * as z from 'zod'
import { ResetSchema } from '@/lib/schema'
import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '../lib/tokens';
import { databaseUnavailableMessage, getAuthActionErrorMessage } from '@/lib/auth-errors';
import { getDatabaseConfigurationError } from '@/lib/db';



export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const valiatedFields = ResetSchema.safeParse(values);

    if (!valiatedFields.success) {
        return {error: "Invalid Email"}
    }

    const {email} = valiatedFields .data

    if (getDatabaseConfigurationError()) {
        return {error: databaseUnavailableMessage}
    }

    try {
        const existingUser = await getUserByEmail(email)

        if (!existingUser) {
            return {error: "Email not found"}
        }

        const passwordResetToken = await generatePasswordResetToken(email)
        await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
        return {success: "Reset Email Sent"}
    } catch (error) {
        const fallback = "Something went wrong while sending the reset email.";
        const message = getAuthActionErrorMessage(error, fallback);

        if (message === fallback) {
            console.error("Password reset request failed", error)
        }

        return {error: message}
    }

}
