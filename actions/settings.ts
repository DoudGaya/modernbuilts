"use server"
import * as z from 'zod'
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
    await db.user.update({
        where: {id: dbUser.id},
        data: {
            ...values,
           }
    })
    return {success: "Profile Updated"}
}
