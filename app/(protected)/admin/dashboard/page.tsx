import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react"
import { AnalyticsChart } from "@/components/admin/AnalyticsChart"
import { getAnalyticsData } from "@/actions/analytics"
import { AnalyticsData } from "@/types/admin"

export default async function AnalyticsPage() {
  const analyticsData: AnalyticsData = await getAnalyticsData()

  if (analyticsData.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Error Loading Dashboard</h2>
          <p className="text-gray-600 mt-2">{analyticsData.error}</p>
        </div>
      </div>
    )
  }

  const { stats = [], chartData, recentActivity = [] } = analyticsData

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-600">Platform performance and insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                    {stat.change}
                  </span>
                  <span className="ml-1">from last period</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Trends</CardTitle>
            <CardDescription>Monthly investment amounts over time</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData?.investments ? (
              <AnalyticsChart data={chartData.investments} type="line" />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No investment data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Performance</CardTitle>
            <CardDescription>Projects by status</CardDescription>
          </CardHeader>
          <CardContent>
            {chartData?.projects ? (
              <AnalyticsChart data={chartData.projects} type="pie" />
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                No project data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
          <CardDescription>Latest activities across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                No recent activity to display
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Building2, TrendingUp, Users, MapPin, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

// const stats = [
//   {
//     title: "Total Projects",
//     value: "24",
//     change: "+12%",
//     changeType: "increase",
//     icon: Building2,
//   },
//   {
//     title: "Active Investments",
//     value: "₦45.8B",
//     change: "+18.3%",
//     changeType: "increase",
//     icon: TrendingUp,
//   },
//   {
//     title: "Total Users",
//     value: "12,543",
//     change: "+8.2%",
//     changeType: "increase",
//     icon: Users,
//   },
//   {
//     title: "Property Listings",
//     value: "156",
//     change: "-2.1%",
//     changeType: "decrease",
//     icon: MapPin,
//   },
//   {
//     title: "Revenue (This Month)",
//     value: "₦2.4B",
//     change: "+15.8%",
//     changeType: "increase",
//     icon: DollarSign,
//   },
// ]

// const recentActivities = [
//   {
//     id: 1,
//     action: "New investment",
//     user: "John Doe",
//     amount: "₦500,000",
//     project: "Lagos Luxury Apartments",
//     time: "2 hours ago",
//   },
//   {
//     id: 2,
//     action: "Project completed",
//     user: "System",
//     amount: "₦2.5B",
//     project: "Abuja Commercial Complex",
//     time: "4 hours ago",
//   },
//   {
//     id: 3,
//     action: "New user registration",
//     user: "Jane Smith",
//     amount: "",
//     project: "",
//     time: "6 hours ago",
//   },
//   {
//     id: 4,
//     action: "Land submission",
//     user: "Mike Johnson",
//     amount: "",
//     project: "Ikeja Land Plot",
//     time: "8 hours ago",
//   },
// ]

// export default function AdminDashboard() {
//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-bold">Dashboard Overview</h1>
//         <p className="text-gray-600">Welcome back, here's what's happening with StableBricks</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//         {stats.map((stat) => {
//           const Icon = stat.icon
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <Icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <div className="flex items-center text-xs text-muted-foreground">
//                   {stat.changeType === "increase" ? (
//                     <ArrowUpRight className="h-4 w-4 text-green-500" />
//                   ) : (
//                     <ArrowDownRight className="h-4 w-4 text-red-500" />
//                   )}
//                   <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
//                     {stat.change}
//                   </span>
//                   <span className="ml-1">from last month</span>
//                 </div>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       {/* Recent Activities */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Activities</CardTitle>
//             <CardDescription>Latest activities across the platform</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div key={activity.id} className="flex items-center justify-between border-b pb-2">
//                   <div>
//                     <p className="font-medium">{activity.action}</p>
//                     <p className="text-sm text-gray-600">
//                       {activity.user} {activity.amount && `• ${activity.amount}`}{" "}
//                       {activity.project && `• ${activity.project}`}
//                     </p>
//                   </div>
//                   <span className="text-xs text-gray-500">{activity.time}</span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>Common administrative tasks</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
//                 <Building2 className="h-6 w-6 mb-2 text-yellow-600" />
//                 <p className="font-medium">Add Project</p>
//                 <p className="text-sm text-gray-600">Create new investment project</p>
//               </button>
//               <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
//                 <MapPin className="h-6 w-6 mb-2 text-blue-600" />
//                 <p className="font-medium">Add Listing</p>
//                 <p className="text-sm text-gray-600">Create property listing</p>
//               </button>
//               <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
//                 <Users className="h-6 w-6 mb-2 text-green-600" />
//                 <p className="font-medium">Manage Users</p>
//                 <p className="text-sm text-gray-600">View and edit users</p>
//               </button>
//               <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
//                 <TrendingUp className="h-6 w-6 mb-2 text-purple-600" />
//                 <p className="font-medium">View Analytics</p>
//                 <p className="text-sm text-gray-600">Platform performance</p>
//               </button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
