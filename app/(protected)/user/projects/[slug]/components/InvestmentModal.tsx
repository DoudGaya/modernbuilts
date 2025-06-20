"use client"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Minus, DollarSign, TrendingUp, Building2 } from "lucide-react"
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3'
import { useCurrentUser } from "@/hooks/use-current-user"
import { createInvestment } from "@/actions/investments"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface InvestmentModalProps {
  isOpen: boolean
  onClose: () => void
  project: any
  initialShares: number
  onSharesChange: (shares: number) => void
}

export function InvestmentModal({ 
  isOpen, 
  onClose, 
  project, 
  initialShares, 
  onSharesChange 
}: InvestmentModalProps) {
  const [shares, setShares] = useState(initialShares)
  const [isProcessing, setIsProcessing] = useState(false)
  const user = useCurrentUser()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    setShares(initialShares)
  }, [initialShares])

  const calculateInvestmentAmount = () => {
    return project ? shares * project.sharePrice : 0
  }

  const calculateExpectedReturns = () => {
    if (!project) return 0
    const investmentAmount = calculateInvestmentAmount()
    return investmentAmount * (project.roi / 100)
  }

  const calculateTotalReturn = () => {
    return calculateInvestmentAmount() + calculateExpectedReturns()
  }

  const handleSharesChange = (delta: number) => {
    const newShares = Math.max(1, shares + delta)
    setShares(newShares)
    onSharesChange(newShares)
  }
  const config = {
    public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
    tx_ref: `INV-${Date.now()}-${user?.id}`,
    amount: calculateInvestmentAmount(),
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: user?.email || '',
      phone_number: user?.phone || '',
      name: user?.name || '',
    },
    customizations: {
      title: 'StableBricks Investment',
      description: `Investment in ${project?.title}`,
      logo: 'https://stablebricks.com/logo.png',
    },
  }

  const handleFlutterPayment = useFlutterwave(config)
  const handleInvestment = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make an investment",
        variant: "destructive",
      })
      return
    }

    if (!config.public_key || config.public_key === 'FLWPUBK_TEST-SANDBOXDEMOKEY-X') {
      toast({
        title: "Payment Configuration Error",
        description: "Payment system is not properly configured. Please contact support.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    
    handleFlutterPayment({
      callback: async (response) => {
        console.log(response)
        
        if (response.status === 'successful') {
          // Create investment record
          try {            const investmentData = {
              userId: user.id!,
              projectId: project.id,
              amount: calculateInvestmentAmount(),
              shares: shares,
              transactionRef: response.tx_ref,
              flutterwaveRef: response.transaction_id?.toString()
            }

            const result = await createInvestment(investmentData)
            
            if (result.success) {
              toast({
                title: "Investment Successful!",
                description: `You have successfully invested ₦${calculateInvestmentAmount().toLocaleString()} in ${project.title}`,
              })
              
              // Redirect to success page
              router.push(`/user/investments/success?ref=${response.tx_ref}&amount=${calculateInvestmentAmount()}`)
            } else {
              toast({
                title: "Investment Failed",
                description: result.error || "Something went wrong",
                variant: "destructive",
              })
            }
          } catch (error) {
            console.error("Investment creation error:", error)
            toast({
              title: "Investment Failed",
              description: "Failed to record investment",
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
        
        closePaymentModal()
        setIsProcessing(false)
        onClose()
      },
      onClose: () => {
        setIsProcessing(false)
      },
    })
  }

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Invest in {project.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Shares Selector */}
          <div>
            <label className="block text-sm font-medium mb-3">Number of Shares</label>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSharesChange(-1)}
                disabled={shares <= 1 || isProcessing}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold">{shares}</span>
                <p className="text-sm text-gray-600">shares</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSharesChange(1)}
                disabled={isProcessing}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Investment Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-sm font-medium">Investment Amount</span>
              </div>
              <span className="font-bold">₦{calculateInvestmentAmount().toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm font-medium">Expected Returns ({project.roi}%)</span>
              </div>
              <span className="font-bold">₦{calculateExpectedReturns().toLocaleString()}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border-2 border-yellow-200">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium">Total Return</span>
              </div>
              <span className="font-bold text-lg">₦{calculateTotalReturn().toLocaleString()}</span>
            </div>
          </div>

          {/* Project Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">{project.title}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-600">Share Price:</span>
                <span className="ml-1 font-medium">₦{project.sharePrice.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-gray-600">Duration:</span>
                <span className="ml-1 font-medium">{project.length}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleInvestment}
              disabled={isProcessing}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
            >
              {isProcessing ? "Processing..." : `Pay ₦${calculateInvestmentAmount().toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
