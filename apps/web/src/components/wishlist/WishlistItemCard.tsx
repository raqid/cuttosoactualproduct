"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ExternalLink, Check } from "lucide-react"

interface WishlistItemCardProps {
  item: {
    id: string
    note: string | null
    priority: number
    isPurchased: boolean
    purchasedBy: string | null
    purchasedAt: Date | null
    offer: {
      id: string
      title: string
      directUrl: string
      priceCents: number | null
      currency: string
      manufacturer: {
        id: string
        name: string
        verified: boolean
        madeInUsa: boolean
      }
    }
  }
  wishlistId: string
  isOwner: boolean
}

export function WishlistItemCard({ item, wishlistId, isOwner }: WishlistItemCardProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const price = item.offer.priceCents
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: item.offer.currency,
      }).format(item.offer.priceCents / 100)
    : null

  const handleDelete = async () => {
    if (!confirm("Remove this item from your wishlist?")) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/wishlist/${wishlistId}/items/${item.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        router.refresh()
      }
    } catch (err) {
      console.error("Failed to delete:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className={`${item.isPurchased ? "bg-green-50 border-green-200" : ""}`}>
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
        <p className="text-sm text-blue-700 mb-2">by {item.offer.manufacturer.name}</p>

        {item.note && (
          <p className="text-sm text-gray-600 italic mb-3 bg-gray-50 p-2 rounded">
            "{item.note}"
          </p>
        )}

        {price && <p className="text-lg font-bold text-gray-900 mb-3">{price}</p>}

        {item.isPurchased ? (
          <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm">
            <div className="flex items-center">
              <Check className="h-4 w-4 mr-2" />
              <span className="font-medium">Purchased</span>
            </div>
            {item.purchasedBy && (
              <p className="text-xs mt-1">by {item.purchasedBy}</p>
            )}
            {item.purchasedAt && (
              <p className="text-xs">on {new Date(item.purchasedAt).toLocaleDateString()}</p>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <a
              href={item.offer.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Product
              </Button>
            </a>
            {isOwner && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
