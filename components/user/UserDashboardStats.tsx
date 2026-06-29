import { Building2, Calendar, FileText, WalletCards } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Saved Properties",
    value: "0",
    change: "Browse listings",
    icon: Building2,
    color: "text-primary-700",
  },
  {
    title: "Open Enquiries",
    value: "0",
    change: "No active requests",
    icon: FileText,
    color: "text-info",
  },
  {
    title: "Payment Plans",
    value: "0",
    change: "Request a quote",
    icon: WalletCards,
    color: "text-success",
  },
  {
    title: "Next Site Visit",
    value: "None",
    change: "Schedule inspection",
    icon: Calendar,
    color: "text-warning",
  },
]

export const UserDashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
