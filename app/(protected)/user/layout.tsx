import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
// import { getRouteByUserRole } from '@/routes';
import { getRouteByUserRole } from '@/routes/index';
import { TopNav } from "../_components/TopNav";
import { UserNavigation } from "@/components/user/UserNavigation"
import { UserSidebar } from "@/components/user/UserSidebar"
import { MobileBottomNav } from "@/components/user/MobileBottomNav"
import { UserDashboardSideBar } from './_components/UserSideBar';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (session?.user.role === "USER") {
    return (
      <SessionProvider session={session}>
         <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
            <UserNavigation />
            <div className="flex">
              <UserSidebar />
              <main className="flex-1 md:ml-64 pt-16 md:pt-20 p-4 md:p-8">{children}</main>
            </div>
            <MobileBottomNav />
          </div>
      </SessionProvider>
    );
  } else {
    // Redirect to appropriate dashboard based on role
    return redirect(getRouteByUserRole(session?.user.role))
  }
}