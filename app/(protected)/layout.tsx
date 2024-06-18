import { DashboardSideBar } from "./_components/DashboardSideBar";
import { auth } from '@/auth'

 
export default async function Layout({ children }: { children: React.ReactNode }) {

  const session = await auth()

  const user = session?.user.name


  return (
    <div className="flex h-screen bg-slate-50 md:flex-row md:overflow-hidden">
      <DashboardSideBar session={session} />
      <div className="flex flex-col w-full md:overflow-y-auto bg-slate-50">
        <div className="hidden lg:flex justify-between bg-white drop-shadow-sm px-6 py-6 w-full">
          <div className="">Welcome to <span>Stablebricks</span> </div>
          <div className="">
            {user}
          </div>
        </div>
       <div className=" mt-20 md:mt-0 w-full h-full">
       {children}
       </div>
      </div>
    </div>
  );
}