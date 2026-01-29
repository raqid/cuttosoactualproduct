"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CreditCard, Gift, Loader2, ArrowUpRight, ArrowDownLeft, CheckCircle } from "lucide-react"

interface Transaction {
  id: string
  type: string
  amountCents: number
  formatted: string
  description: string
  createdAt: string
}

const transactionTypeLabels: Record<string, string> = {
  purchase: "Credit Purchase",
  gift_sent: "Gift Sent",
  gift_received: "Gift Received",
  redemption: "Used at Checkout",
  refund: "Refund",
}

export default function CreditsDashboard() {
  const searchParams = useSearchParams()
  const [balance, setBalance] = useState<{ balanceCents: number; formatted: string } | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 5000)
    }
    fetchData()
  }, [searchParams])

  const fetchData = async () => {
    try {
      const [balanceRes, transactionsRes] = await Promise.all([
        fetch("/api/credits"),
        fetch("/api/credits/transactions?limit=10"),
      ])

      if (balanceRes.ok) {
        const data = await balanceRes.json()
        setBalance(data.balance)
      }

      if (transactionsRes.ok) {
        const data = await transactionsRes.json()
        setTransactions(data.transactions)
      }
    } catch (error) {
      console.error("Failed to fetch credits data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <SiteHeader />
        <div className="container mx-auto px-4 py-8 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800">Credits added successfully!</p>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gift Credits</h1>
          <p className="text-gray-600 mt-1">Manage your credits and send gifts to loved ones</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-red-600 to-pink-600 text-white">
          <CardContent className="p-8">
            <p className="text-red-100 text-sm mb-2">Available Balance</p>
            <p className="text-5xl font-bold mb-6">{balance?.formatted || "$0.00"}</p>
            <div className="flex gap-4">
              <Link href="/credits/buy">
                <Button className="bg-white text-red-600 hover:bg-red-50">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Buy Credits
                </Button>
              </Link>
              <Link href="/credits/send">
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  <Gift className="h-4 w-4 mr-2" />
                  Send a Gift
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your credit history</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No transactions yet</p>
                <p className="text-sm mt-1">Buy credits to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${t.amountCents > 0 ? "bg-green-100" : "bg-red-100"}`}>
                        {t.amountCents > 0 ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transactionTypeLabels[t.type] || t.type}</p>
                        <p className="text-sm text-gray-500">{t.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${t.amountCents > 0 ? "text-green-600" : "text-red-600"}`}>
                        {t.formatted}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(t.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
