"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SocialShareButtons } from "./SocialShareButtons"
import { Share2, X } from "lucide-react"

interface SharePurchaseCardProps {
  manufacturerName: string
  productUrl?: string
}

export function SharePurchaseCard({ manufacturerName, productUrl }: SharePurchaseCardProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const shareUrl = productUrl || window.location.origin
  const shareText = `I just supported ${manufacturerName} directly! Skip the middleman. Support American makers at @Cuttoso`

  return (
    <Card className="mt-4 border-0 bg-gradient-to-r from-red-600 to-pink-600 text-white overflow-hidden">
      <CardContent className="p-6 relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 text-white/70 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center mb-4">
          <Share2 className="h-8 w-8 mx-auto mb-2 opacity-90" />
          <p className="text-lg font-bold">
            I just supported {manufacturerName} directly!
          </p>
          <p className="text-sm text-white/80 mt-1">
            Skip the middleman. Support American makers.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-3">
          <SocialShareButtons
            url={shareUrl}
            text={shareText}
            title={`I supported ${manufacturerName} on Cuttoso`}
          />
        </div>

        <p className="text-center text-xs text-white/60 mt-3">
          <button onClick={() => setDismissed(true)} className="hover:text-white/80">
            Maybe later
          </button>
        </p>
      </CardContent>
    </Card>
  )
}
