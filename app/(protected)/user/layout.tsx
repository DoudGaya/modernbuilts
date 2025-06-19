import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
// import { getRouteByUserRole } from '@/routes';
import { getRouteByUserRole } from '@/routes/index';
import { TopNav } from "../_components/TopNav";
import { UserNavigation } from "@/components/user/UserNavigation"
import { UserSidebar } from "@/components/user/UserSidebar"
import { UserDashboardSideBar } from './_components/UserSideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (session?.user.role === "USER") {
    return (
      <SessionProvider session={session}>
         <div className="min-h-screen bg-gray-50">
            <UserNavigation />
            <div className="flex">
              <UserSidebar />
              <main className="flex-1 ml-64 p-8">{children}</main>
            </div>
          </div>
    
        {/* <div className="flex h-screen bg-slate-50 dark:bg-black md:flex-row md:overflow-hidden">
          <UserDashboardSideBar/>
          <div className="flex flex-col w-full md:overflow-y-auto ">
            <TopNav />
            <div className=" mt-20 md:mt-0 w-full h-full">
              {children}
            </div>
          </div>
        </div> */}
      </SessionProvider>
    );
  } else {
    // Redirect to appropriate dashboard based on role
    return redirect(getRouteByUserRole(session?.user.role))
  }
}