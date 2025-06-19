import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, TrendingUp, Users, MapPin, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+12%",
    changeType: "increase",
    icon: Building2,
  },
  {
    title: "Active Investments",
    value: "₦45.8B",
    change: "+18.3%",
    changeType: "increase",
    icon: TrendingUp,
  },
  {
    title: "Total Users",
    value: "12,543",
    change: "+8.2%",
    changeType: "increase",
    icon: Users,
  },
  {
    title: "Property Listings",
    value: "156",
    change: "-2.1%",
    changeType: "decrease",
    icon: MapPin,
  },
  {
    title: "Revenue (This Month)",
    value: "₦2.4B",
    change: "+15.8%",
    changeType: "increase",
    icon: DollarSign,
  },
]

const recentActivities = [
  {
    id: 1,
    action: "New investment",
    user: "John Doe",
    amount: "₦500,000",
    project: "Lagos Luxury Apartments",
    time: "2 hours ago",
  },
  {
    id: 2,
    action: "Project completed",
    user: "System",
    amount: "₦2.5B",
    project: "Abuja Commercial Complex",
    time: "4 hours ago",
  },
  {
    id: 3,
    action: "New user registration",
    user: "Jane Smith",
    amount: "",
    project: "",
    time: "6 hours ago",
  },
  {
    id: 4,
    action: "Land submission",
    user: "Mike Johnson",
    amount: "",
    project: "Ikeja Land Plot",
    time: "8 hours ago",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, here's what's happening with StableBricks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
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
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest activities across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">
                      {activity.user} {activity.amount && `• ${activity.amount}`}{" "}
                      {activity.project && `• ${activity.project}`}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <Building2 className="h-6 w-6 mb-2 text-yellow-600" />
                <p className="font-medium">Add Project</p>
                <p className="text-sm text-gray-600">Create new investment project</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <MapPin className="h-6 w-6 mb-2 text-blue-600" />
                <p className="font-medium">Add Listing</p>
                <p className="text-sm text-gray-600">Create property listing</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <Users className="h-6 w-6 mb-2 text-green-600" />
                <p className="font-medium">Manage Users</p>
                <p className="text-sm text-gray-600">View and edit users</p>
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50 text-left">
                <TrendingUp className="h-6 w-6 mb-2 text-purple-600" />
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-gray-600">Platform performance</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
