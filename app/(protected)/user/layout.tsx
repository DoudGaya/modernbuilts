
import { auth } from '@/auth'
import { TopNav } from "../_components/TopNav";
import { SessionProvider } from "next-auth/react";
import { RoleGate } from "@/components/auth/RoleGate";
import { UserRole } from "@prisma/client";
import { redirect } from "next/navigation";
import redirrect from 'next/navigation';
import { UserDashboardSideBar } from "./_components/UserSideBar";

 
export default async function UserLayout({ children }: { children: React.ReactNode }) {

  const session = await auth()




  if (session?.user.role === "USER") {
    return (
      <SessionProvider session={session}>
        <div className="flex h-screen bg-slate-50 md:flex-row md:overflow-hidden">
          <UserDashboardSideBar/>
          <div className="flex flex-col w-full md:overflow-y-auto bg-slate-50">
           <TopNav />
          <div className=" mt-20 md:mt-0 w-full h-full">
            {children}
          </div>
          </div>
        </div>
      </SessionProvider>
    );
  } else {
    return redirect('/admin/dashboard')
    }
  }