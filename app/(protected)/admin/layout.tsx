import { auth } from '@/auth'
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { getRouteByUserRole } from '@/routes/index';  // Updated import
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
    if (session?.user.role === "ADMIN") {
    return (
      <SessionProvider session={session}>
          <div className="min-h-screen bg-gray-50">
            <AdminNavigation />
            <div className="flex">
              <AdminSidebar />
              <main className="flex-1 md:ml-64 pt-16 md:pt-20 p-4 md:p-8">{children}</main>
            </div>
          </div>
      </SessionProvider>
    );
  } else {
    // Redirect to appropriate dashboard based on role
    return redirect(getRouteByUserRole(session?.user.role))
  }
}