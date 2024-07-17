import { NextRequest } from "next/server";
import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { DEFAULT_LOGGED_IN_REDIRRECT, publicRoutes, apiRoutesPrefix, authRoutes } from "./routes"
const { auth } = NextAuth(authConfig)
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


// @ts-ignore
export default auth((req) => {
   const { nextUrl } = req  

   const isLoggedIn = !!req.auth

   const isAPIAuthRoute = nextUrl.pathname.startsWith(apiRoutesPrefix)
   const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
   const isAuthRoutes = authRoutes.includes(nextUrl.pathname)

   if ( isAPIAuthRoute ) {
    return null;
   }

   if( isAuthRoutes ) {
      if ( isLoggedIn ) {
        return Response.redirect(new URL(DEFAULT_LOGGED_IN_REDIRRECT, nextUrl))
      }
    return null;
   }

   if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/", nextUrl))
   }
})


// export async function middleware(request: any) {
//   const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });

//   if (!token) return NextResponse.redirect(new URL("/login", request.url));

//   // Check the role and redirect based on the role

//   console.log(token)
//   switch (token.role) {
//     case "ADMIN":
//       if (!request.nextUrl.pathname.startsWith("/admin")) {
//         return NextResponse.redirect(new URL("/admin", request.url));
//       }
//       break;
//     case "USER":
//       if (!request.nextUrl.pathname.startsWith("/user") ) {
//         return NextResponse.redirect(new URL("/user", request.url));
//       }
//       break;
   
//       // Add the paths that the pathologist can access here
//       if (!request.nextUrl.pathname.startsWith("/image")) {
//         return NextResponse.redirect(new URL("/image", request.url));
//       }
//       break;
//     default:
//       return NextResponse.redirect(new URL("/login", request.url));
//   }
// }


// Optionally, don't invoke Middleware on some paths 09039441148
export const config = {
  matcher: [ '/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)' ],
}