import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Eye, BarChart3 } from "lucide-react"

const investments = [
  {
    id: "1",
    investmentId: "INV-2024-001",
    project: "Lagos Luxury Apartments",
    amount: "₦2,500,000",
    expectedReturn: "18%",
    status: "Active",
    progress: 75,
    maturityDate: "2026-01-15",
  },
  {
    id: "2",
    investmentId: "INV-2024-002",
    project: "Abuja Commercial Complex",
    amount: "₦1,750,000",
    expectedReturn: "22%",
    status: "Active",
    progress: 60,
    maturityDate: "2025-08-10",
  },
  {
    id: "3",
    investmentId: "INV-2024-003",
    project: "Port Harcourt Estate",
    amount: "₦1,000,000",
    expectedReturn: "16%",
    status: "Completed",
    progress: 100,
    maturityDate: "2024-12-15",
  },
]

export const UserInvestments = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>My Investments</CardTitle>
            <CardDescription>Track your investment portfolio</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investments.map((investment) => (
            <div key={investment.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold">{investment.project}</h4>
                  <p className="text-sm text-gray-600">{investment.investmentId}</p>
                </div>
                <Badge
                  className={`${
                    investment.status === "Active"
                      ? "bg-green-500"
                      : investment.status === "Completed"
                        ? "bg-blue-500"
                        : "bg-yellow-500"
                  }`}
                >
                  {investment.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                <div>
                  <span className="text-gray-500">Amount:</span>
                  <div className="font-semibold">{investment.amount}</div>
                </div>
                <div>
                  <span className="text-gray-500">Expected ROI:</span>
                  <div className="font-semibold text-green-600">{investment.expectedReturn}</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Project Progress</span>
                  <span>{investment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${investment.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button size="sm" className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
                  <Download className="w-4 h-4 mr-1" />
                  Certificate
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
