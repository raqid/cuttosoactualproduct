"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { SocialShareButtons } from "./SocialShareButtons"
import { PartyPopper } from "lucide-react"

interface ShareWishlistModalProps {
  shareToken: string
  wishlistTitle: string
}

export function ShareWishlistModal({ shareToken, wishlistTitle }: ShareWishlistModalProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setOpen(true)
      // Remove query param without reload
      const url = new URL(window.location.href)
      url.searchParams.delete("created")
      router.replace(url.pathname, { scroll: false })
    }
  }, [searchParams, router])

  const shareUrl = `${window.location.origin}/wishlist/share/${shareToken}`
  const shareText = `Check out my wishlist "${wishlistTitle}" on Cuttoso! Find the perfect gift from American makers.`

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <PartyPopper className="h-10 w-10 text-red-500" />
          </div>
          <DialogTitle className="text-center">Your wishlist is ready!</DialogTitle>
          <DialogDescription className="text-center">
            Share it with friends and family so they know exactly what you'd love.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <SocialShareButtons
            url={shareUrl}
            text={shareText}
            title={`${wishlistTitle} - Cuttoso Wishlist`}
          />
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={() => setOpen(false)} className="text-gray-500">
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
