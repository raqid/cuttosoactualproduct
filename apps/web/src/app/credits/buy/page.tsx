"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, CreditCard, XCircle } from "lucide-react"

const presetAmounts = [
  { value: 500, label: "$5" },
  { value: 1000, label: "$10" },
  { value: 2500, label: "$25" },
  { value: 5000, label: "$50" },
]

export default function BuyCreditsPage() {
  const searchParams = useSearchParams()
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState("")
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const showCancelled = searchParams.get("cancelled") === "true"

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
    setError(null)
  }

  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setError(null)
  }

  const getAmountCents = (): number => {
    if (selectedAmount) return selectedAmount
    const parsed = parseFloat(customAmount)
    if (isNaN(parsed) || parsed < 5 || parsed > 500) return 0
    return Math.round(parsed * 100)
  }

  const handlePurchase = async () => {
    const amountCents = getAmountCents()
    if (amountCents < 500) {
      setError("Minimum amount is $5")
      return
    }
    if (amountCents > 50000) {
      setError("Maximum amount is $500")
      return
    }

    setIsPurchasing(true)
    setError(null)

    try {
      const res = await fetch("/api/credits/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountCents }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      // Redirect to Stripe checkout
      window.location.href = data.checkoutUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsPurchasing(false)
    }
  }

  const amountCents = getAmountCents()
  const isValid = amountCents >= 500 && amountCents <= 50000

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 max-w-lg">
        <Link
          href="/credits"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Credits
        </Link>

        {showCancelled && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center gap-3">
            <XCircle className="h-5 w-5 text-yellow-600" />
            <p className="text-yellow-800">Purchase was cancelled</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Buy Gift Credits</CardTitle>
            <CardDescription>
              Purchase credits to send as gifts or use at checkout
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select Amount</Label>
              <div className="grid grid-cols-4 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetSelect(preset.value)}
                    className={`p-4 rounded-lg border-2 text-center font-semibold transition-colors ${
                      selectedAmount === preset.value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom">Or enter custom amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <Input
                  id="custom"
                  type="number"
                  min="5"
                  max="500"
                  step="0.01"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-gray-500">Min: $5 | Max: $500</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
            )}

            <div className="border-t pt-4">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Amount</span>
                <span className="font-semibold">
                  {isValid ? `$${(amountCents / 100).toFixed(2)}` : "--"}
                </span>
              </div>
              <Button
                onClick={handlePurchase}
                disabled={!isValid || isPurchasing}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                {isPurchasing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Redirecting to checkout...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Continue to Payment
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Secure payment powered by Stripe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
