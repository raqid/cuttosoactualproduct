"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2, Gift, CheckCircle, XCircle, Clock } from "lucide-react"

interface GiftData {
  amountCents: number
  formatted: string
  message: string | null
  expiresAt: string
  status: string
}

export default function RedeemGiftPage() {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const token = params.token as string

  const [gift, setGift] = useState<GiftData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (token) {
      fetchGift()
    }
  }, [token])

  const fetchGift = async () => {
    try {
      const res = await fetch(`/api/credits/redeem/${token}`)
      const data = await res.json()

      if (!res.ok) {
        if (data.gift?.status === "expired") {
          setError("This gift has expired")
        } else if (data.gift?.status === "redeemed") {
          setError("This gift has already been redeemed")
        } else {
          setError(data.error || "Gift not found")
        }
        return
      }

      setGift(data.gift)
    } catch (err) {
      setError("Failed to load gift")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedeem = async () => {
    if (!isSignedIn) {
      // Redirect to sign in with return URL
      router.push(`/sign-in?redirect=/credits/redeem/${token}`)
      return
    }

    setIsRedeeming(true)
    setError(null)

    try {
      const res = await fetch(`/api/credits/redeem/${token}`, {
        method: "POST",
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to redeem gift")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsRedeeming(false)
    }
  }

  if (!isLoaded || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gift Redeemed!</h1>
          <p className="text-gray-600 mb-2">
            {gift?.formatted} has been added to your balance.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Use your credits to discover amazing products from American makers.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/credits">
              <Button className="bg-red-600 hover:bg-red-700">
                View My Balance
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <div className="bg-red-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            {error.includes("expired") ? (
              <Clock className="h-10 w-10 text-red-600" />
            ) : (
              <XCircle className="h-10 w-10 text-red-600" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error.includes("expired") ? "Gift Expired" : "Gift Unavailable"}
          </h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-16 max-w-lg">
        <Card className="overflow-hidden">
          {/* Gift header */}
          <div className="bg-gradient-to-r from-red-600 to-pink-600 p-8 text-white text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">You've Received a Gift!</h1>
            <p className="text-4xl font-bold">{gift?.formatted}</p>
          </div>

          <CardContent className="p-6 space-y-6">
            {gift?.message && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Personal message:</p>
                <p className="text-gray-900 italic">"{gift.message}"</p>
              </div>
            )}

            <p className="text-gray-600 text-center">
              Redeem your gift to add credits to your Cuttoso account and discover
              amazing products from American makers.
            </p>

            {!isSignedIn && (
              <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                You'll need to sign in or create an account to redeem this gift.
              </div>
            )}

            <Button
              onClick={handleRedeem}
              disabled={isRedeeming}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-lg py-6"
            >
              {isRedeeming ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Redeeming...
                </>
              ) : isSignedIn ? (
                "Redeem Gift"
              ) : (
                "Sign In to Redeem"
              )}
            </Button>

            {gift?.expiresAt && (
              <p className="text-xs text-gray-500 text-center">
                This gift expires on {new Date(gift.expiresAt).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
