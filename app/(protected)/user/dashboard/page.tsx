import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Wallet, Building2, Eye, Download } from "lucide-react"
import { getUserDashboardData } from "@/actions/user"
import Link from "next/link"

export default async function UserDashboard() {
  const dashboardData = await getUserDashboardData()
  if (dashboardData.error) {
    return <div>Error loading dashboard data</div>
  }

  const { stats, recentInvestments, topProjects, walletBalance } = dashboardData

  // Provide default values if data is undefined
  const safeStats = stats || { totalInvestments: 0, activeProjects: 0, expectedReturns: 0 }
  const safeWalletBalance = walletBalance || 0
  const safeRecentInvestments = recentInvestments || []
  const safeTopProjects = topProjects || []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome back!</h1>
        <p className="text-gray-600">Here's an overview of your investment portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{safeStats.totalInvestments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safeStats.activeProjects}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{safeWalletBalance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available for investment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expected Returns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{safeStats.expectedReturns.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Projected earnings</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Investments */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Investments</CardTitle>
            <CardDescription>Your latest investment activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeRecentInvestments.map((investment) => (
                <div key={investment.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{investment.project.title}</p>
                    <p className="text-sm text-gray-600">₦{investment.investmentAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(investment.dateOfInvestment).toLocaleDateString()}
                    </p>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/user/investments">
                <Button variant="outline" className="w-full">
                  View All Investments
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Top Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Top Projects</CardTitle>
            <CardDescription>High-performing investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {safeTopProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{project.title}</p>
                    <p className="text-sm text-gray-600">{project.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">{project.roi}% ROI</p>
                    <p className="text-sm text-gray-500">₦{project.sharePrice.toLocaleString()}/share</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/user/projects">
                <Button variant="outline" className="w-full">
                  Browse All Projects
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/user/projects">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Building2 className="w-6 h-6 mb-2" />
                Browse Projects
              </Button>
            </Link>
            <Link href="/user/wallet">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Wallet className="w-6 h-6 mb-2" />
                Fund Wallet
              </Button>
            </Link>
            <Link href="/user/investments">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <TrendingUp className="w-6 h-6 mb-2" />
                View Investments
              </Button>
            </Link>
            <Link href="/user/profile">
              <Button variant="outline" className="w-full h-20 flex flex-col">
                <Eye className="w-6 h-6 mb-2" />
                Update Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// import React from 'react'
// import { DashboadTopCard, DashboardTopcardProps } from './_components/DashboadTopCard'
// import { DashboardWallet } from './_components/DashboardWallet'
// import { DashboardProfile } from './_components/DashboardProfile'


// const cards = [
//   {
//     title: "Active Project",
//     amount: 12,
//     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
//   </svg>,
//   urlTo: "/user/projects"
  
//   },
//   {
//     title: "All Projects",
//     amount: 30,
//     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary ">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
//   </svg>,
//   urlTo: "/user/projects"
  
//   },
//   {
//     title: "Active Investment",
//     amount: 20_000_000 ,
//     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
//   </svg>,
//   urlTo: "/user/projects"
  
//   },
//   {
//     title: "Total Return",
//     amount: 4_000_000,
//     icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-primary">
//     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
//   </svg>,
//   urlTo: "/user/projects"
  
//   },
// ]

// const page = async () => {
//   return (
//     <div className=' bg-gray-50 flex flex-col h-full p-6 dark:bg-black/80 w-full'>
//       <div className=" grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 py-10 gap-6">
//         {
//           cards.map((item: DashboardTopcardProps) => {
//             return <DashboadTopCard 
//             key={item.title}
//             title={item.title} 
//             amount={item.amount} 
//             icon={item.icon} 
//             urlTo={item.urlTo} 
//             />
//           })
//         }
//       </div>
//       <div className=" grid grid-cols-1 md:grid-cols-2 gap-6">
//         <DashboardWallet
//           balance={2500000}
//           referralBonus={2000}
//           welcomeBonus={5000}
//           totalRewards={7500}
//           />
//           <DashboardProfile />
//       </div>
//     </div>
//   )
// }

// export default page