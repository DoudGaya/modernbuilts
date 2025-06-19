import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
// import { getRouteByUserRole } from '@/routes';
import { getRouteByUserRole } from '@/routes/index';
import { TopNav } from "../_components/TopNav";
import { DeveloperSidebar } from './_components/DeveloperSidebar';
// import { DeveloperSidebar } from './_components/DeveloperSidebar';

export default async function DeveloperLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (session?.user.role === "DEVELOPER") {
    return (
      <SessionProvider session={session}>
        <div className="min-h-screen bg-gray-50">
          {/* You'll need to create these components */}
          <TopNav />
          <div className="flex">
            <DeveloperSidebar />
            <main className="flex-1 ml-64 my-20 p-8">{children}</main>
          </div>
        </div>
      </SessionProvider>
    );
  } else {
    // Redirect to appropriate dashboard based on role
    return redirect(getRouteByUserRole(session?.user.role))
  }
}