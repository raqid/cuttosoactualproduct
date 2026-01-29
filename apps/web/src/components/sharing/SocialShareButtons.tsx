"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, Mail } from "lucide-react"

interface SocialShareButtonsProps {
  url: string
  text: string
  title?: string
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

export function SocialShareButtons({ url, text, title }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  const emailUrl = `mailto:?subject=${encodeURIComponent(title || text)}&body=${encodeURIComponent(`${text}\n\n${url}`)}`

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="border-gray-300"
      >
        {copied ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
        {copied ? "Copied!" : "Copy Link"}
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-gray-300"
      >
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <TwitterIcon className="h-4 w-4 mr-2" />
          Twitter
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-gray-300"
      >
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FacebookIcon className="h-4 w-4 mr-2" />
          Facebook
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        asChild
        className="border-gray-300"
      >
        <a href={emailUrl}>
          <Mail className="h-4 w-4 mr-2" />
          Email
        </a>
      </Button>
    </div>
  )
}
