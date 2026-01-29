"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SocialShareButtons } from "@/components/sharing/SocialShareButtons"
import { Users, DollarSign, UserPlus, Loader2 } from "lucide-react"

interface ReferralData {
  referralCode: string
  stats: {
    totalReferrals: number
    completedReferrals: number
    earnedCents: number
    earnedFormatted: string
  }
}

export function ReferralCard() {
  const [data, setData] = useState<ReferralData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchReferral()
  }, [])

  const fetchReferral = async () => {
    try {
      const res = await fetch("/api/referral")
      if (res.ok) {
        setData(await res.json())
      }
    } catch {} finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    )
  }

  if (!data) return null

  const shareUrl = `${window.location.origin}?ref=${data.referralCode}`
  const shareText = "Join Cuttoso and discover amazing gifts from American makers! Use my referral link to sign up."

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Your Referral Program
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <UserPlus className="h-5 w-5 mx-auto text-blue-600 mb-1" />
            <p className="text-2xl font-bold text-blue-900">{data.stats.totalReferrals}</p>
            <p className="text-xs text-blue-600">Friends Joined</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <DollarSign className="h-5 w-5 mx-auto text-green-600 mb-1" />
            <p className="text-2xl font-bold text-green-900">{data.stats.completedReferrals}</p>
            <p className="text-xs text-green-600">Purchased</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <DollarSign className="h-5 w-5 mx-auto text-purple-600 mb-1" />
            <p className="text-2xl font-bold text-purple-900">{data.stats.earnedFormatted}</p>
            <p className="text-xs text-purple-600">Earned</p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-900 mb-2">How it works</p>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Share your unique link with friends</li>
            <li>They sign up and browse amazing products</li>
            <li>When they make their first purchase, you earn $5 in credits!</li>
          </ol>
        </div>

        {/* Share */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Share your link</p>
          <SocialShareButtons
            url={shareUrl}
            text={shareText}
            title="Join Cuttoso - Gifts from American Makers"
          />
        </div>
      </CardContent>
    </Card>
  )
}
