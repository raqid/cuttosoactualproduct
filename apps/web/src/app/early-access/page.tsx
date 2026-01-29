"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Sparkles, Gift, Factory, Heart, CheckCircle } from "lucide-react"

export default function EarlyAccessPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [interest, setInterest] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate submission — replace with real API when ready
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <section className="bg-gradient-to-br from-red-600 to-pink-600 py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-white/20 text-white border-none text-sm mb-6">
            Limited Spots Available
          </Badge>
          <h1 className="text-5xl font-bold text-white mb-6">
            Get Early Access to Cuttoso
          </h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Be among the first to discover thoughtful, handcrafted gifts from American makers.
            Early members get exclusive perks and $10 in free gift credits.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <div>
            {submitted ? (
              <Card className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">You're on the list!</h2>
                <p className="text-gray-600 mb-6">
                  We'll send you an invite soon. Keep an eye on your inbox at <strong>{email}</strong>.
                </p>
                <Link href="/">
                  <Button className="bg-red-600 hover:bg-red-700">Back to Home</Button>
                </Link>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Early Access</h2>
                  <p className="text-gray-600 mb-6">
                    Join our waitlist and be the first to know when we launch.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                        What excites you most about Cuttoso?
                      </label>
                      <select
                        id="interest"
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none bg-white"
                      >
                        <option value="">Select one...</option>
                        <option value="gifting">Finding unique gifts for loved ones</option>
                        <option value="makers">Supporting American makers</option>
                        <option value="wishlists">Creating and sharing wishlists</option>
                        <option value="ai">AI-powered gift recommendations</option>
                        <option value="all">All of the above!</option>
                      </select>
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-red-600 hover:bg-red-700 text-lg py-6"
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Apply for Early Access
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-gray-500 text-center">
                      No spam. We'll only email you when your spot is ready.
                    </p>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Perks */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Early Access Perks</h3>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">$10 Free Gift Credits</h4>
                    <p className="text-sm text-gray-600">Start gifting right away with credits on us</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">First Access to AI Gift Finder</h4>
                    <p className="text-sm text-gray-600">Be the first to try our personalized gift recommendations</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Factory className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Exclusive Maker Collections</h4>
                    <p className="text-sm text-gray-600">Access curated collections before they go public</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Shape the Product</h4>
                    <p className="text-sm text-gray-600">Your feedback directly influences what we build next</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
