"use server"
import * as z from 'zod'
import { ResetSchema } from '@/lib/schema'
import { getUserByEmail } from '@/data/user'
import { sendPasswordResetEmail } from '@/lib/mail'
import { generatePasswordResetToken } from '../lib/tokens';



export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const valiatedFields = ResetSchema.safeParse(values);

    if (!valiatedFields.success) {
        return {error: "Invalid Email"}
    }

    const {email} = valiatedFields .data

    const existingUser = await getUserByEmail(email)


    if (!existingUser) {
        return {error: "Email not found"}
    } 

    const passwordResetToken = await generatePasswordResetToken(email)
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)
    return {success: "Reset Email Sent"}

}