"use server"
import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { newPasswordSchema } from '@/lib/schema'
import * as z from 'zod'
import bcrypt from 'bcryptjs'
export const newPassword = async (
    values: z.infer<typeof newPasswordSchema>,
    token?: string | null, 
) => {

    if (!token) {
        return {error: "Missing Tokens "}
    }

    const validateFields = newPasswordSchema.safeParse(values)

    if (!validateFields.success) {
        return {error: "Invalid Fields"}
    }

    const { password } = validateFields.data


    const existingToken = await getPasswordResetTokenByToken(token)


    if (!existingToken) {
        return {error: "invalid Token"}
    }


    const expires = new Date(existingToken.expires) < new Date()

    if (expires) {
        return {error: "Token has expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email)

    if (!existingUser) {
         return {error: "User does not exist"}
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            password: hashedPassword
        }
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    })

    return {success: "Password Updated Successfully"}

}