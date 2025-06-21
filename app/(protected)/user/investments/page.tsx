"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Eye, 
  Download,
  Search,
  Filter,
  Loader2,
  FileText,
  Award
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/hooks/use-current-user"
import { getUserInvestments } from "@/actions/investments"
import { Investment } from "@/types/admin"

export default function UserInvestmentsPage() {
  const user = useCurrentUser()
  const [investments, setInvestments] = useState<Investment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    if (user?.id) {
      loadInvestments()
    }
  }, [user?.id])

  const loadInvestments = async () => {
    if (!user?.id) return
    
    setLoading(true)
    try {
      const result = await getUserInvestments(user.id)
      if (result.success && result.investments) {
        setInvestments(result.investments)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load investments",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load investments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.project?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         investment.certificateId?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || investment.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const totalInvestmentAmount = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
  const activeInvestments = investments.filter(inv => inv.status === "ACTIVE").length
  const completedInvestments = investments.filter(inv => inv.status === "COMPLETED").length

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Investments</h1>
          <p className="text-gray-600">Track and manage your investment portfolio</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{totalInvestmentAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {investments.length} investment{investments.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInvestments}</div>
            <p className="text-xs text-muted-foreground">
              Currently generating returns
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedInvestments}</div>
            <p className="text-xs text-muted-foreground">
              Successfully matured
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by project name or certificate ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="end">Ended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Investments List */}
      {filteredInvestments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Investments Found</h3>
            <p className="text-gray-600 text-center mb-4">
              {investments.length === 0 
                ? "You haven't made any investments yet. Start your investment journey today!"
                : "No investments match your current search criteria."
              }
            </p>
            {investments.length === 0 && (
              <Link href="/investments">
                <Button>Browse Investment Opportunities</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInvestments.map((investment) => (
            <Card key={investment.id} className="hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={investment.project?.coverImage || "/placeholder.svg"}
                  alt={investment.project?.title || "Investment Project"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-4 right-4 ${
                    investment.status === "ACTIVE" ? "bg-green-600" :
                    investment.status === "COMPLETED" ? "bg-blue-600" :
                    investment.status === "PENDING" ? "bg-yellow-600" :
                    "bg-gray-600"
                  }`}
                >
                  {investment.status}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-lg">{investment.project?.title}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {investment.project?.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Investment Amount</p>
                    <p className="font-semibold text-green-600">
                      ₦{investment.investmentAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Expected Return</p>
                    <p className="font-semibold">
                      {investment.project?.roi || 18}% ROI
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Investment Date</p>
                    <p className="font-semibold">
                      {new Date(investment.dateOfInvestment).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Maturity Date</p>
                    <p className="font-semibold">
                      {new Date(investment.dateOfreturn).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {investment.shares && (
                  <div className="text-sm">
                    <p className="text-gray-600">Shares Owned</p>
                    <p className="font-semibold">{investment.shares} shares</p>
                  </div>
                )}

                {investment.certificateId && (
                  <div className="text-sm">
                    <p className="text-gray-600">Certificate ID</p>
                    <p className="font-semibold font-mono text-xs">{investment.certificateId}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2 border-t">
                  <Link href={`/user/investments/${investment.id}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                  </Link>
                  {investment.certificateId && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Certificate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}