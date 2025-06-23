"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Share2, MessageCircle, Mail, Users, Gift } from "lucide-react"
import { getUserReferralInfo, shareReferralLink } from '@/actions/referral'
import { toast } from '@/hooks/use-toast'

interface ReferralInfo {
  referralCode: string
  referralLink: string
  totalReferrals: number
  referralBonus: number
}

export const ReferralCard = () => {
  const [referralInfo, setReferralInfo] = useState<ReferralInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [copying, setCopying] = useState(false)

  useEffect(() => {
    loadReferralInfo()
  }, [])

  const loadReferralInfo = async () => {
    try {
      const result = await getUserReferralInfo()
      if (result.success) {
        setReferralInfo({
          referralCode: result.referralCode,
          referralLink: result.referralLink,
          totalReferrals: result.totalReferrals,
          referralBonus: result.referralBonus,
        })
      }
    } catch (error) {
      console.error("Failed to load referral info:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCopyLink = async () => {
    if (!referralInfo) return
    
    setCopying(true)
    try {
      await navigator.clipboard.writeText(referralInfo.referralLink)
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      })
    } catch (error) {
      console.error("Failed to copy:", error)
      toast({
        title: "Error",
        description: "Failed to copy referral link",
        variant: "destructive",
      })
    } finally {
      setCopying(false)
    }
  }

  const handleShare = async (method: 'whatsapp' | 'email') => {
    try {
      const result = await shareReferralLink(method)
      if (result.success && result.url) {
        window.open(result.url, '_blank')
      }
    } catch (error) {
      console.error("Failed to share:", error)
      toast({
        title: "Error",
        description: "Failed to share referral link",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Referral Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-full bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!referralInfo) {
    return null
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
          <Users className="w-4 md:w-5 h-4 md:h-5" />
          Referral Program
        </CardTitle>
        <CardDescription className="text-sm">
          Invite friends and earn rewards for every successful referral
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6">
        {/* Referral Stats */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div className="text-center p-3 md:p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 bg-blue-100 rounded-full mx-auto mb-2">
              <Users className="w-3 md:w-4 h-3 md:h-4 text-blue-600" />
            </div>
            <div className="text-lg md:text-2xl font-bold text-blue-600">{referralInfo.totalReferrals}</div>
            <div className="text-xs md:text-sm text-gray-600">Total Referrals</div>
          </div>
          <div className="text-center p-3 md:p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center w-6 md:w-8 h-6 md:h-8 bg-green-100 rounded-full mx-auto mb-2">
              <Gift className="w-3 md:w-4 h-3 md:h-4 text-green-600" />
            </div>
            <div className="text-lg md:text-2xl font-bold text-green-600">₦{referralInfo.referralBonus.toLocaleString()}</div>
            <div className="text-xs md:text-sm text-gray-600">Earned Bonus</div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <Label htmlFor="referral-code" className="text-sm">Your Referral Code</Label>
          <div className="flex gap-2">
            <Input
              id="referral-code"
              value={referralInfo.referralCode}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              disabled={copying}
              className="flex-shrink-0"
            >
              <Copy className="w-3 md:w-4 h-3 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="space-y-2">
          <Label htmlFor="referral-link" className="text-sm">Your Referral Link</Label>
          <div className="flex gap-2">
            <Input
              id="referral-link"
              value={referralInfo.referralLink}
              readOnly
              className="text-xs md:text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              disabled={copying}
              className="flex-shrink-0"
            >
              <Copy className="w-3 md:w-4 h-3 md:h-4" />
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="space-y-3">
          <Label className="text-sm">Share Your Link</Label>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => handleShare('whatsapp')}
              className="flex-1 text-xs md:text-sm"
              size="sm"
            >
              <MessageCircle className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => handleShare('email')}
              className="flex-1 text-xs md:text-sm"
              size="sm"
            >
              <Mail className="w-3 md:w-4 h-3 md:h-4 mr-1 md:mr-2" />
              Email
            </Button>
          </div>
        </div>

        {/* How it Works */}
        <div className="p-3 md:p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2 text-sm md:text-base">How it Works</h4>
          <ul className="text-xs md:text-sm space-y-1 text-gray-600">
            <li>• Share your referral link with friends</li>
            <li>• They sign up and make their first investment</li>
            <li>• You both earn ₦2,000 bonus</li>
            <li>• No limit on referrals!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
