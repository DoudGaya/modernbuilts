'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calculator, TrendingUp, DollarSign, Calendar, PieChart } from 'lucide-react'

interface CalculationResult {
  totalReturn: number
  profit: number
  annualReturn: number
  monthlyReturn: number
  breakEvenMonths: number
}

const projectTypes = [
  { value: 'residential', label: 'Residential Development', rate: 0.32 }, // 25-40%
  { value: 'commercial', label: 'Commercial Complex', rate: 0.38 }, // 30-45%
  { value: 'industrial', label: 'Industrial Facility', rate: 0.35 }, // 28-42%
  { value: 'mixed-use', label: 'Mixed-Use Development', rate: 0.40 }, // 35-45%
  { value: 'hospitality', label: 'Hospitality/Resort', rate: 0.42 }, // 40-50%
]

export default function CalculatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState<string>('')
  const [projectType, setProjectType] = useState<string>('')
  const [investmentPeriod, setInvestmentPeriod] = useState<string>('12')
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateReturns = () => {
    const amount = parseFloat(investmentAmount.replace(/,/g, ''))
    const period = parseInt(investmentPeriod)
    const selectedProject = projectTypes.find(p => p.value === projectType)
    
    if (!amount || !selectedProject || !period) return

    const annualRate = selectedProject.rate
    const totalReturn = amount * (1 + (annualRate * period / 12))
    const profit = totalReturn - amount
    const monthlyReturn = profit / period
    const breakEvenMonths = Math.ceil(12 / annualRate)

    setResult({
      totalReturn,
      profit,
      annualReturn: amount * annualRate,
      monthlyReturn,
      breakEvenMonths
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: string) => {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  useEffect(() => {
    if (investmentAmount && projectType && investmentPeriod) {
      calculateReturns()
    }
  }, [investmentAmount, projectType, investmentPeriod])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investment Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your potential returns on StableBricks construction investments. 
            Get accurate projections based on historical performance data.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Investment Details
              </CardTitle>
              <CardDescription>
                Enter your investment parameters to calculate potential returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="amount">Investment Amount (₦)</Label>
                <Input
                  id="amount"
                  type="text"
                  placeholder="e.g., 1,000,000"
                  value={investmentAmount}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (/^\d*$/.test(value)) {
                      setInvestmentAmount(formatNumber(value))
                    }
                  }}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="project-type">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{type.label}</span>
                          <Badge variant="secondary" className="ml-2">
                            ~{(type.rate * 100).toFixed(0)}% p.a.
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="period">Investment Period (Months)</Label>
                <Select value={investmentPeriod} onValueChange={setInvestmentPeriod}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                    <SelectItem value="18">18 Months</SelectItem>
                    <SelectItem value="24">24 Months</SelectItem>
                    <SelectItem value="36">36 Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calculateReturns} 
                className="w-full"
                disabled={!investmentAmount || !projectType}
              >
                Calculate Returns
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                Projected Returns
              </CardTitle>
              <CardDescription>
                Based on historical performance and project type
              </CardDescription>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <DollarSign className="w-4 h-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">Total Return</span>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {formatCurrency(result.totalReturn)}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                        <span className="text-sm font-medium text-blue-600">Total Profit</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-700">
                        {formatCurrency(result.profit)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Annual Return</span>
                      <span className="font-semibold">{formatCurrency(result.annualReturn)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Monthly Return</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyReturn)}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span className="text-gray-600">Break-even Period</span>
                      <span className="font-semibold">{result.breakEvenMonths} months</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Disclaimer:</strong> These calculations are estimates based on historical data. 
                      Actual returns may vary depending on market conditions, project performance, and other factors.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Enter your investment details to see projected returns
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Terms</h3>
              <p className="text-sm text-gray-600">
                Choose investment periods from 6 months to 3 years based on your financial goals
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Proven Track Record</h3>
              <p className="text-sm text-gray-600">
                Our calculations are based on 5+ years of successful project completions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Competitive Returns</h3>
              <p className="text-sm text-gray-600">
                Earn 25-50% annual returns significantly above traditional investment options
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
