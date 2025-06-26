
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { DEFAULT_LOGGED_IN_REDIRRECT, publicRoutes, apiRoutesPrefix, authRoutes } from "./routes"
const { auth } = NextAuth(authConfig)



// @ts-ignore
export default auth((req) => {
   const { nextUrl } = req  

   const isLoggedIn = !!req.auth

   const isAPIAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix)
   const isAPIUploadRoute = nextUrl.pathname.startsWith('/api/upload')
   const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
   const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

   if ( isAPIAuthRoute || isAPIUploadRoute ) {
    return null;
   }

   if( isAuthRoutes ) {
      if ( isLoggedIn ) {

        // handle ADMIN/USER redirrect 

        return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRRECT, nextUrl))
      }
    return null;
   }

   if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/", nextUrl))
   }
})



export const config = {
  matcher: [ '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)' ],
}