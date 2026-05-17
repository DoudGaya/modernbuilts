// @ts-nocheck
import  Credentials  from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from 'bcryptjs' 
import { loginSchema } from "./lib/schema"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import { getUserByEmail } from "./data/user"
 
export default { 
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Credentials({
            async authorize( credentials) {
                const validatedFields = loginSchema.safeParse(credentials)

                if (validatedFields.success) {
                    const {email, password } = validatedFields.data
                    const user = await getUserByEmail(email)

                    if(!user || !user?.password) return null 
                    
                    const passwordMatched = await bcrypt.compare( password, user?.password )

                    if(passwordMatched) return user 
                }

                return null
            }
        })
    ]

} satisfies NextAuthConfig