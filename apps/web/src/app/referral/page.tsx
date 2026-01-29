"use client"

import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { ReferralCard } from "@/components/referral/ReferralCard"
import { ArrowLeft } from "lucide-react"

export default function ReferralPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Refer Friends, Earn Credits</h1>
          <p className="text-gray-600">
            Invite your friends to Cuttoso and earn $5 in credits when they make their first purchase.
          </p>
        </div>

        <ReferralCard />
      </div>
    </div>
  )
}
