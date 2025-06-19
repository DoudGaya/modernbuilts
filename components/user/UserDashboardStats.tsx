import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, Building2, Calendar } from "lucide-react"

const stats = [
  {
    title: "Total Invested",
    value: "₦5,250,000",
    change: "+₦1,500,000",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Investments",
    value: "3",
    change: "+1 this month",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Expected Returns",
    value: "₦1,155,000",
    change: "18.5% avg ROI",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Next Maturity",
    value: "8 months",
    change: "Mar 2025",
    icon: Calendar,
    color: "text-orange-600",
  },
]

export const UserDashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span>
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

