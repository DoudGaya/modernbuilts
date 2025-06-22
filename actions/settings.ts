"use server"
import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { SettingsSchema, settingsSecurityDetailsSchema } from '@/lib/schema'
import { handleUsersProfileImages } from './images'
// import 

export const profileRecordsUpdate = async (values: z.infer<typeof SettingsSchema>) => {




    const user = await currentUser();
    if (!user) {
        return {error: "Unauthorized"}
    }

    console.log(user)

    if ( user.isOAuth ) {
        values.email = undefined 
    }

    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return {error: "Unauthorized"}
    }



    if (values.image) {
        // @ts-ignore
        const imagePath = await handleUsersProfileImages(values)
        if (!imagePath) {
            return {error: "No Image Found"}
        }
        await db.user.update({
            where: {id: dbUser.id},
            data: {
                ...values,
                image: imagePath
            }
        })

    }

    if (!values.image) {
        await db.user.update({
            where: {id: dbUser.id},
            data: {
                ...values
            }
        })
    }


   
    

   
    return {success: "Profile Updated"}
}

export const securityRecordsUpdate = async ( values: z.infer<typeof settingsSecurityDetailsSchema>) => {
    const user = await currentUser();
    if (!user) {
        return {error: "Unauthorized"}
    }
   
    const dbUser = await getUserById(user.id);
    if (!dbUser) {
        return {error: "Unauthorized"}
    }

    // Check if user is OAuth - they shouldn't be able to update passwords
    if (user.isOAuth) {
        // Only allow 2FA updates for OAuth users
        if (values.oldPassword || values.newPassword || values.newPasswordConfirmation) {
            return {error: "Cannot update password for social login accounts"}
        }
        
        // Update only 2FA setting
        await db.user.update({
            where: {id: dbUser.id},
            data: {
                isTwoFactorEnabled: values.isTwoFactorEnabled
            }
        })
        return {success: "Security settings updated"}
    }

    // For regular users, handle password changes
    const updateData: any = {};
    
    if (values.isTwoFactorEnabled !== undefined) {
        updateData.isTwoFactorEnabled = values.isTwoFactorEnabled;
    }    // If password fields are provided, validate them
    if (values.newPassword || values.newPasswordConfirmation) {
        if (!values.oldPassword) {
            return {error: "Current password is required"}
        }
        
        if (values.newPassword !== values.newPasswordConfirmation) {
            return {error: "New passwords do not match"}
        }
        
        // Verify old password
        if (dbUser.password) {
            const passwordsMatch = await bcrypt.compare(values.oldPassword, dbUser.password);
            if (!passwordsMatch) {
                return {error: "Current password is incorrect"}
            }
        }
        
        // Hash new password
        if (values.newPassword) {
            const hashedPassword = await bcrypt.hash(values.newPassword, 12);
            updateData.password = hashedPassword;
        }
    }

    await db.user.update({
        where: {id: dbUser.id},
        data: updateData
    })
    
    return {success: "Security settings updated"}
}
