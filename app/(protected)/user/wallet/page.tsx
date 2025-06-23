"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReferralCard } from "@/components/ReferralCard"
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Gift, 
  Users, 
  CreditCard, 
  History, 
  Eye, 
  EyeOff,
  Copy,
  TrendingUp,
  DollarSign,
  PlusCircle,
  MinusCircle,
  Star,
  Settings,
  RefreshCw,
  AlertCircle
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useCurrentUser } from "@/hooks/use-current-user"
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { 
  getWalletByUserId, 
  addFunds, 
  withdrawFunds, 
  getTransactionHistory,
  getUserAccountDetails,
  saveAccountDetails 
} from "@/actions/wallet"

interface WalletData {
  id: string
  balance: number
  userId: string
  bonuses: Array<{
    id: string
    name: string
    amount: number
    walletId: string
  }>
  totalBonuses: number
  welcomeBonus: number
  referralBonus: number
  user: {
    id: string
    name: string | null
    email: string | null
    referralID: string | null
  }
}

interface Transaction {
  id: string
  type: "credit" | "debit"
  amount: number
  description: string
  date: Date
  status: "completed" | "pending" | "failed"
}

interface AccountDetails {
  id: string
  accountName: string
  accountNumber: string
  bankName: string
  userId: string
}

export default function WalletPage() {
  const user = useCurrentUser()
  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accountDetails, setAccountDetails] = useState<AccountDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  
  // Modal states
  const [fundModalOpen, setFundModalOpen] = useState(false)
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false)
  const [accountModalOpen, setAccountModalOpen] = useState(false)
  
  // Form states
  const [fundAmount, setFundAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [accountForm, setAccountForm] = useState({
    accountName: "",
    accountNumber: "",
    bankName: ""
  })

  useEffect(() => {
    if (user?.id) {
      loadWalletData()
      loadTransactionHistory()
      loadAccountDetails()
    }
  }, [user?.id])

  const loadWalletData = async () => {
    if (!user?.id) return
      try {
      const result = await getWalletByUserId(user.id)
      if (result.success && result.wallet) {
        setWallet({
          id: result.wallet.id,
          balance: result.wallet.balance,
          userId: result.wallet.userId,
          bonuses: result.wallet.bonuses,
          totalBonuses: result.wallet.totalBonuses,
          welcomeBonus: result.wallet.welcomeBonus,
          referralBonus: result.wallet.referralBonus,
          user: result.wallet.user
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load wallet data",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load wallet data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const loadTransactionHistory = async () => {
    if (!user?.id) return
      try {
      const result = await getTransactionHistory(user.id)
      if (result.success && result.transactions) {
        setTransactions(result.transactions)
      }
    } catch (error) {
      console.error("Failed to load transaction history:", error)
    }
  }

  const loadAccountDetails = async () => {
    if (!user?.id) return
    
    try {
      const result = await getUserAccountDetails(user.id)
      if (result.success && result.accountDetails) {
        setAccountDetails(result.accountDetails)
        setAccountForm(result.accountDetails)
      }
    } catch (error) {
      console.error("Failed to load account details:", error)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await Promise.all([
      loadWalletData(),
      loadTransactionHistory(),
      loadAccountDetails()
    ])
    setRefreshing(false)
    toast({
      title: "Success",
      description: "Wallet data refreshed successfully",
    })
  }
  const handleFund = async () => {
    if (!user?.id || !fundAmount) return
    
    const amount = parseInt(fundAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    // Configure Flutterwave payment
    const config = {
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE!,
      tx_ref: Date.now().toString(),
      amount: amount,
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: user.email || '',
        phone_number: user.phone || '',
        name: user.name || '',
      },
      customizations: {
        title: 'StableBricks Wallet Funding',
        description: 'Add money to your StableBricks wallet',
        logo: '/stablebricks.png',
      },
    }

    const handleFlutterPayment = useFlutterwave(config)

    handleFlutterPayment({
      callback: async (response) => {
        console.log(response)
        closePaymentModal()
        
        if (response.status === 'successful') {
          try {
            const result = await addFunds(user.id, amount, response.tx_ref, response.flw_ref)
            if (result.success) {
              toast({
                title: "Success",
                description: result.message,
              })
              setFundAmount("")
              setFundModalOpen(false)
              await loadWalletData()
            } else {
              toast({
                title: "Error",
                description: result.error,
                variant: "destructive",
              })
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to add funds",
              variant: "destructive",
            })
          }
        } else {
          toast({
            title: "Payment Failed",
            description: "Your payment was not successful",
            variant: "destructive",
          })
        }
      },
      onClose: () => {
        console.log("Payment modal closed")
      },
    })
  }

  const handleWithdraw = async () => {
    if (!user?.id || !withdrawAmount) return
    
    const amount = parseInt(withdrawAmount)
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (!accountDetails) {
      toast({
        title: "Error",
        description: "Please add your account details first",
        variant: "destructive",
      })
      setAccountModalOpen(true)
      return
    }

    try {
      const result = await withdrawFunds(user.id, amount, accountDetails)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setWithdrawAmount("")
        setWithdrawModalOpen(false)
        await loadWalletData()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process withdrawal",
        variant: "destructive",
      })
    }
  }

  const handleSaveAccountDetails = async () => {
    if (!user?.id || !accountForm.accountName || !accountForm.accountNumber || !accountForm.bankName) {
      toast({
        title: "Error",
        description: "Please fill in all account details",
        variant: "destructive",
      })
      return
    }

    try {
      const result = await saveAccountDetails(user.id, accountForm)
      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        })
        setAccountModalOpen(false)
        await loadAccountDetails()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save account details",
        variant: "destructive",
      })
    }
  }

  const copyReferralLink = () => {
    const referralLink = `https://stablebricks.com/register?ref=${wallet?.user.referralID}`
    navigator.clipboard.writeText(referralLink)
    toast({
      title: "Success",
      description: "Referral link copied to clipboard",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading wallet...</p>
        </div>
      </div>
    )
  }

  if (!wallet) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="text-center pt-6">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Wallet Not Found</h2>
            <p className="text-gray-600 mb-4">
              Unable to load your wallet. Please try refreshing the page.
            </p>
            <Button onClick={handleRefresh}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">StableBricks Wallet</h1>
          <p className="text-gray-600">Manage your investments and earnings</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Wallet Card */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-yellow-400 to-yellow-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Wallet className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-xl">Main Balance</CardTitle>
                    <CardDescription className="text-yellow-100">
                      Available funds
                    </CardDescription>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white hover:bg-white/20"
                >
                  {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-4xl font-bold">
                  {balanceVisible ? formatCurrency(wallet.balance) : "****"}
                </div>
                
                <div className="flex space-x-4">
                  <Dialog open={fundModalOpen} onOpenChange={setFundModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="flex-1">
                        <ArrowDownLeft className="w-4 h-4 mr-2" />
                        Fund Wallet
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Fund Your Wallet</DialogTitle>                        <DialogDescription>
                          Add money to your StableBricks wallet using Flutterwave
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fundAmount">Amount (NGN)</Label>
                          <Input
                            id="fundAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={fundAmount}
                            onChange={(e) => setFundAmount(e.target.value)}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setFundModalOpen(false)}>
                            Cancel
                          </Button>                          <Button onClick={handleFund}>
                            Proceed to Payment
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
                    <DialogTrigger asChild>
                      <Button variant="secondary" className="flex-1">
                        <ArrowUpRight className="w-4 h-4 mr-2" />
                        Withdraw
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                        <DialogDescription>
                          Withdraw money from your wallet to your bank account
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="withdrawAmount">Amount (NGN)</Label>
                          <Input
                            id="withdrawAmount"
                            type="number"
                            placeholder="Enter amount"
                            value={withdrawAmount}
                            onChange={(e) => setWithdrawAmount(e.target.value)}
                          />
                          <p className="text-sm text-gray-500 mt-1">
                            Available: {formatCurrency(wallet.balance)}
                          </p>
                        </div>
                        {accountDetails && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm font-medium">Withdrawal Account:</p>
                            <p className="text-sm">{accountDetails.accountName}</p>
                            <p className="text-sm">{accountDetails.bankName} - {accountDetails.accountNumber}</p>
                          </div>
                        )}
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" onClick={() => setWithdrawModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleWithdraw}>
                            Withdraw
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonuses Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="w-5 h-5 mr-2 text-yellow-600" />
                Bonuses & Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Welcome Bonus</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(wallet.welcomeBonus)}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Referral Bonus</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(wallet.referralBonus)}
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Total Bonuses</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {formatCurrency(wallet.totalBonuses)}
                  </div>
                </div>
              </div>

              {/* Referral Section */}
              {wallet.user.referralID && (
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Refer Friends & Earn
                  </h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Share your referral link and earn ₦2,000 for each successful referral
                  </p>
                  <div className="flex space-x-2">
                    <Input
                      value={`https://stablebricks.com/register?ref=${wallet.user.referralID}`}
                      readOnly
                      className="text-sm"
                    />
                    <Button size="sm" onClick={copyReferralLink}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Available Balance</span>
                <span className="font-semibold">
                  {balanceVisible ? formatCurrency(wallet.balance) : "****"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Earned</span>
                <span className="font-semibold text-green-600">
                  {formatCurrency(wallet.totalBonuses)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Invested</span>
                <span className="font-semibold text-blue-600">
                  ₦0
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Dialog open={accountModalOpen} onOpenChange={setAccountModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="w-4 h-4 mr-2" />
                    {accountDetails ? "Update" : "Add"} Bank Details
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Bank Account Details</DialogTitle>
                    <DialogDescription>
                      Add or update your bank account for withdrawals
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="accountName">Account Name</Label>
                      <Input
                        id="accountName"
                        placeholder="Account holder name"
                        value={accountForm.accountName}
                        onChange={(e) => setAccountForm({...accountForm, accountName: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        id="accountNumber"
                        placeholder="10-digit account number"
                        value={accountForm.accountNumber}
                        onChange={(e) => setAccountForm({...accountForm, accountNumber: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Select 
                        value={accountForm.bankName}
                        onValueChange={(value) => setAccountForm({...accountForm, bankName: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Access Bank">Access Bank</SelectItem>
                          <SelectItem value="GTBank">GTBank</SelectItem>
                          <SelectItem value="First Bank">First Bank</SelectItem>
                          <SelectItem value="UBA">UBA</SelectItem>
                          <SelectItem value="Zenith Bank">Zenith Bank</SelectItem>
                          <SelectItem value="Ecobank">Ecobank</SelectItem>
                          <SelectItem value="Fidelity Bank">Fidelity Bank</SelectItem>
                          <SelectItem value="Sterling Bank">Sterling Bank</SelectItem>
                          <SelectItem value="Union Bank">Union Bank</SelectItem>
                          <SelectItem value="Wema Bank">Wema Bank</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setAccountModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveAccountDetails}>
                        Save Details
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              {accountDetails && (
                <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                  <p className="font-medium">{accountDetails.accountName}</p>
                  <p>{accountDetails.bankName}</p>
                  <p>{accountDetails.accountNumber}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <History className="w-4 h-4 mr-2" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              {transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        {transaction.type === "credit" ? (
                          <PlusCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <MinusCircle className="w-4 h-4 text-red-600" />
                        )}
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-gray-500 text-xs">
                            {new Date(transaction.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}>
                          {transaction.type === "credit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <Badge 
                          variant={transaction.status === "completed" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No transactions yet
                </p>
              )}
            </CardContent>          </Card>
        </div>
      </div>

      {/* Referral Section */}
      <div className="mt-8">
        <ReferralCard />
      </div>
    </div>
  )
}
