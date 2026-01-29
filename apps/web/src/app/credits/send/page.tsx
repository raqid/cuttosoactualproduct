"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2, Gift, Send, CheckCircle } from "lucide-react"

const presetAmounts = [
  { value: 1000, label: "$10" },
  { value: 2500, label: "$25" },
  { value: 5000, label: "$50" },
  { value: 10000, label: "$100" },
]

export default function SendGiftPage() {
  const router = useRouter()
  const [balance, setBalance] = useState<number>(0)
  const [isLoadingBalance, setIsLoadingBalance] = useState(true)
  const [selectedAmount, setSelectedAmount] = useState<number | null>(2500)
  const [customAmount, setCustomAmount] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchBalance()
  }, [])

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/credits")
      if (res.ok) {
        const data = await res.json()
        setBalance(data.balance.balanceCents)
      }
    } catch (err) {
      console.error("Failed to fetch balance:", err)
    } finally {
      setIsLoadingBalance(false)
    }
  }

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

  const handleSend = async () => {
    const amountCents = getAmountCents()

    if (!recipientEmail) {
      setError("Please enter recipient's email")
      return
    }
    if (amountCents < 500) {
      setError("Minimum amount is $5")
      return
    }
    if (amountCents > balance) {
      setError("Insufficient balance")
      return
    }

    setIsSending(true)
    setError(null)

    try {
      const res = await fetch("/api/credits/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail,
          amountCents,
          message: message || undefined,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to send gift")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setIsSending(false)
    }
  }

  const amountCents = getAmountCents()
  const isValid = amountCents >= 500 && amountCents <= balance && recipientEmail.includes("@")

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-16 max-w-lg text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Gift Sent!</h1>
          <p className="text-gray-600 mb-8">
            We've sent an email to {recipientEmail} with instructions to redeem their gift.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/credits">
              <Button variant="outline">View Balance</Button>
            </Link>
            <Button
              onClick={() => {
                setSuccess(false)
                setRecipientEmail("")
                setMessage("")
                setSelectedAmount(2500)
                fetchBalance()
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Send Another Gift
            </Button>
          </div>
        </div>
      </div>
    )
  }

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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-red-600" />
              Send a Gift
            </CardTitle>
            <CardDescription>
              Send Cuttoso credits to someone special
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Balance indicator */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Your balance</p>
              <p className="text-2xl font-bold">
                {isLoadingBalance ? (
                  <Loader2 className="h-5 w-5 animate-spin inline" />
                ) : (
                  `$${(balance / 100).toFixed(2)}`
                )}
              </p>
            </div>

            {/* Recipient email */}
            <div className="space-y-2">
              <Label htmlFor="email">Recipient's email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="friend@example.com"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
              />
            </div>

            {/* Amount selection */}
            <div className="space-y-3">
              <Label>Gift amount</Label>
              <div className="grid grid-cols-4 gap-3">
                {presetAmounts.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handlePresetSelect(preset.value)}
                    disabled={preset.value > balance}
                    className={`p-3 rounded-lg border-2 text-center font-semibold transition-colors ${
                      selectedAmount === preset.value
                        ? "border-red-600 bg-red-50 text-red-700"
                        : preset.value > balance
                        ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
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
                  max={balance / 100}
                  step="0.01"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>

            {/* Personal message */}
            <div className="space-y-2">
              <Label htmlFor="message">Personal message (optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal note to your gift..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                rows={3}
              />
              <p className="text-xs text-gray-500 text-right">{message.length}/500</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>
            )}

            <Button
              onClick={handleSend}
              disabled={!isValid || isSending}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              {isSending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send ${(amountCents / 100).toFixed(2)} Gift
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
