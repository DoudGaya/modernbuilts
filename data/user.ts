import { db } from "@/lib/db";

export const getUserByEmail = async (email: string) => {
   try {
    const user = await db.user.findUnique({
        where: {
            email,
        }
    })

    return user
   } catch (error) {
    return {error: error}
   }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        })
        return user
        
    } catch (error) {
        return {error: error}
    }
}


// export const getUserByPhone = async (phone: string) => {
//    try {
//     const user = await db.user.findUnique({
//         where: {
//             phone,
//         }
//     })
//     return user

//    } catch (error) {
//     console.log(error)
//    }
// }