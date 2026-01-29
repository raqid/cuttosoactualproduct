"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Share2, Copy, Check, Lock } from "lucide-react"

interface WishlistShareButtonProps {
  shareToken: string
  privacy: string
}

export function WishlistShareButton({ shareToken, privacy }: WishlistShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/wishlist/share/${shareToken}`
      : `/wishlist/share/${shareToken}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  if (privacy === "private") {
    return (
      <Button variant="outline" size="sm" disabled>
        <Lock className="h-4 w-4 mr-2" />
        Private
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Wishlist</DialogTitle>
          <DialogDescription>
            Anyone with this link can view your wishlist and mark items as purchased
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 mt-4">
          <Input value={shareUrl} readOnly className="flex-1" />
          <Button onClick={handleCopy} variant="outline">
            {copied ? (
              <>
                <Check className="h-4 w-4 mr-2 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          {privacy === "link_only"
            ? "Only people with this link can view your wishlist"
            : "This wishlist is public and can be found by anyone"}
        </p>
      </DialogContent>
    </Dialog>
  )
}
