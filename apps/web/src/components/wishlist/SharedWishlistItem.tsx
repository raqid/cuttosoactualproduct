"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ExternalLink, ShoppingBag, Check, Loader2 } from "lucide-react"
import { SharePurchaseCard } from "@/components/sharing/SharePurchaseCard"

interface SharedWishlistItemProps {
  item: {
    id: string
    priority: number
    offer: {
      id: string
      title: string
      directUrl: string
      priceCents: number | null
      currency: string
      manufacturer: {
        id: string
        name: string
        domain: string | null
        verified: boolean
        madeInUsa: boolean
      }
    }
  }
  wishlistId: string
}

export function SharedWishlistItem({ item, wishlistId }: SharedWishlistItemProps) {
  const [showModal, setShowModal] = useState(false)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const [purchaserName, setPurchaserName] = useState("")

  const price = item.offer.priceCents
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: item.offer.currency,
      }).format(item.offer.priceCents / 100)
    : null

  const handleBuyClick = () => {
    setShowModal(true)
  }

  const handleConfirmPurchase = async () => {
    setIsPurchasing(true)
    try {
      const res = await fetch(`/api/wishlist/${wishlistId}/items/${item.id}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchaserName: purchaserName || undefined }),
      })

      if (res.ok) {
        setIsPurchased(true)
        // Open manufacturer URL in new tab
        window.open(item.offer.directUrl, "_blank", "noopener,noreferrer")
      } else {
        const data = await res.json()
        if (data.error === "Item already purchased") {
          setIsPurchased(true)
        }
      }
    } catch (error) {
      console.error("Failed to mark as purchased:", error)
    } finally {
      setIsPurchasing(false)
      setShowModal(false)
    }
  }

  if (isPurchased) {
    return (
      <div>
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <Check className="h-12 w-12 mx-auto text-green-600 mb-3" />
            <p className="font-semibold text-green-800">Thank you!</p>
            <p className="text-sm text-green-600">
              This item has been marked as purchased
            </p>
          </CardContent>
        </Card>
        <SharePurchaseCard
          manufacturerName={item.offer.manufacturer.name}
          productUrl={item.offer.directUrl}
        />
      </div>
    )
  }

  return (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex gap-2 mb-3">
            {item.offer.manufacturer.verified && (
              <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
            )}
            {item.offer.manufacturer.madeInUsa && (
              <Badge className="bg-red-100 text-red-800 text-xs">Made in USA</Badge>
            )}
            {item.priority > 5 && (
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">High Priority</Badge>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 mb-1">{item.offer.title}</h3>
          <p className="text-sm text-blue-700 mb-3">by {item.offer.manufacturer.name}</p>

          {price && <p className="text-xl font-bold text-gray-900 mb-4">{price}</p>}

          <Button
            onClick={handleBuyClick}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Buy This Gift
            <ExternalLink className="h-4 w-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ready to buy this gift?</DialogTitle>
            <DialogDescription>
              You'll be redirected to {item.offer.manufacturer.name}'s website to complete your
              purchase. We'll mark this item as purchased so others know it's been taken care of.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="font-semibold">{item.offer.title}</p>
              {price && <p className="text-lg font-bold text-green-600">{price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Your name (optional)</Label>
              <Input
                id="name"
                placeholder="Let them know who sent it"
                value={purchaserName}
                onChange={(e) => setPurchaserName(e.target.value)}
                maxLength={100}
              />
              <p className="text-xs text-gray-500">
                This will be shown to the wishlist owner
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmPurchase}
              disabled={isPurchasing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPurchasing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue to Purchase
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
