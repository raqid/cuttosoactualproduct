"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Heart, Plus, Check, Loader2 } from "lucide-react"

interface Wishlist {
  id: string
  title: string
}

interface AddToWishlistButtonProps {
  offerId: string
  variant?: "default" | "icon"
}

export function AddToWishlistButton({
  offerId,
  variant = "default",
}: AddToWishlistButtonProps) {
  const { isSignedIn } = useAuth()
  const [wishlists, setWishlists] = useState<Wishlist[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [addedTo, setAddedTo] = useState<string | null>(null)
  const [fetchingLists, setFetchingLists] = useState(false)

  useEffect(() => {
    if (isSignedIn) {
      fetchWishlists()
    }
  }, [isSignedIn])

  const fetchWishlists = async () => {
    setFetchingLists(true)
    try {
      const res = await fetch("/api/wishlist")
      if (res.ok) {
        const data = await res.json()
        setWishlists(data.wishlists)
      }
    } catch (error) {
      console.error("Failed to fetch wishlists:", error)
    } finally {
      setFetchingLists(false)
    }
  }

  const addToWishlist = async (wishlistId: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/wishlist/${wishlistId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offerId }),
      })

      if (res.ok) {
        setAddedTo(wishlistId)
        setTimeout(() => setAddedTo(null), 2000)
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isSignedIn) {
    return (
      <Link href="/sign-in?redirect=/wishlist">
        <Button
          variant="outline"
          size={variant === "icon" ? "icon" : "default"}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          <Heart className="h-4 w-4" />
          {variant === "default" && <span className="ml-2">Save to Wishlist</span>}
        </Button>
      </Link>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={variant === "icon" ? "icon" : "default"}
          disabled={isLoading}
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : addedTo ? (
            <Check className="h-4 w-4 text-green-600" />
          ) : (
            <Heart className="h-4 w-4" />
          )}
          {variant === "default" && (
            <span className="ml-2">{addedTo ? "Added!" : "Save to Wishlist"}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {fetchingLists ? (
          <DropdownMenuItem disabled>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Loading...
          </DropdownMenuItem>
        ) : wishlists.length > 0 ? (
          <>
            {wishlists.map((wishlist) => (
              <DropdownMenuItem
                key={wishlist.id}
                onClick={() => addToWishlist(wishlist.id)}
                className="cursor-pointer"
              >
                {wishlist.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
          </>
        ) : (
          <DropdownMenuItem disabled className="text-gray-500">
            No wishlists yet
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/wishlist/new" className="flex items-center cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            Create New Wishlist
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
