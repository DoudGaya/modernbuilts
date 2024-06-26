import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import {PrismaAdapter } from '@auth/prisma-adapter'
import { getUserById } from "./data/user"
import { User } from "@prisma/client"
import { UserRole } from "@prisma/client"


type ExtendedUser = DefaultSession['user'] & {
    role: UserRole
}
declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

 
export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/login",
        error: '/error'
    },
    events: {
        async linkAccount( { user }) {
            await db.user.update({
                where: {  id: user.id, },
                data: {
                    emailVerified: new Date()
                }
            })
        },
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== 'credentials') return true
            
            // @ts-ignore
            const existingUser: User = await getUserById(user.id)
            if (!existingUser?.emailVerified) return false 
            return true
        }, 
        async jwt({ token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            // @ts-ignore
            token.role = existingUser.role;
            return token
        },
        async session({token, session}) {

            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            return session
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})