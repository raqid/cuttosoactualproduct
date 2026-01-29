"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Sparkles, Menu, CreditCard, Gift, Users, ChevronDown } from "lucide-react"
import { NotificationBell } from "@/components/notifications/NotificationBell"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const occasions = [
  { id: "birthday", name: "Birthdays", icon: "🎂", href: "/occasions/birthday" },
  { id: "wedding", name: "Weddings", icon: "💒", href: "/occasions/wedding" },
  { id: "housewarming", name: "Housewarmings", icon: "🏠", href: "/occasions/housewarming" },
  { id: "holiday", name: "Holidays", icon: "🎄", href: "/occasions/holiday" },
  { id: "thank_you", name: "Thank You", icon: "🙏", href: "/occasions/thank_you" },
  { id: "just_because", name: "Just Because", icon: "💝", href: "/occasions/just_because" },
]

export function SiteHeader() {
  const { isSignedIn, isLoaded } = useAuth()
  const [creditBalance, setCreditBalance] = useState<string | null>(null)

  useEffect(() => {
    if (isSignedIn) {
      fetchBalance()
    }
  }, [isSignedIn])

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/credits")
      if (res.ok) {
        const data = await res.json()
        setCreditBalance(data.balance.formatted)
      }
    } catch (err) {
      // Silently fail - balance not critical for header
    }
  }

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/cuttoso-logo.png" alt="Cuttoso" width={140} height={40} className="h-10 w-auto" />
            </Link>
            <Badge variant="outline" className="text-xs text-red-600 border-red-600 ml-2">
              BETA
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-blue-900 font-medium outline-none">
                Shop by Occasion
                <ChevronDown className="h-4 w-4 ml-1" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {occasions.map((o) => (
                  <DropdownMenuItem key={o.id} asChild>
                    <Link href={o.href} className="flex items-center gap-2">
                      <span>{o.icon}</span>
                      <span>{o.name}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/manufacturers" className="text-gray-700 hover:text-blue-900 font-medium">
              Manufacturers
            </Link>
            <Link href="/gift-finder" className="flex items-center text-gray-700 hover:text-blue-900 font-medium group">
              <Sparkles className="h-4 w-4 mr-1 text-purple-500 group-hover:text-purple-600" />
              AI Gift Finder
            </Link>
            <Link href="/how-it-works" className="text-gray-700 hover:text-blue-900 font-medium">
              How It Works
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            {isLoaded && isSignedIn ? (
              <>
                {/* Credits Button */}
                <Link href="/credits">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex items-center bg-transparent border-green-200 hover:bg-green-50 text-green-700"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {creditBalance || "Credits"}
                  </Button>
                </Link>

                {/* Send Gift Button */}
                <Link href="/credits/send">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden xl:flex items-center bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:from-red-100 hover:to-pink-100 text-red-700"
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    Send Gift
                  </Button>
                </Link>

                {/* Wishlist Button */}
                <Link href="/wishlist">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden lg:flex items-center bg-transparent border-red-200 hover:bg-red-50 text-red-700"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Wishlist
                  </Button>
                </Link>

                {/* Notification Bell */}
                <NotificationBell />

                {/* User Menu */}
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "h-9 w-9",
                    },
                  }}
                />
              </>
            ) : isLoaded ? (
              <SignInButton mode="modal">
                <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                  Sign In
                </Button>
              </SignInButton>
            ) : (
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800" disabled>
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col space-y-4 mt-8">
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-900">Shop by Occasion</p>
                    {occasions.map((o) => (
                      <Link key={o.id} href={o.href} className="flex items-center gap-2 text-base text-gray-600 pl-2">
                        <span>{o.icon}</span>
                        <span>{o.name}</span>
                      </Link>
                    ))}
                  </div>
                  <Link href="/manufacturers" className="text-lg font-medium">
                    Manufacturers
                  </Link>
                  <Link href="/gift-finder" className="text-lg font-medium flex items-center">
                    <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                    AI Gift Finder
                  </Link>
                  <Link href="/how-it-works" className="text-lg font-medium">
                    How It Works
                  </Link>

                  {isSignedIn ? (
                    <div className="pt-4 border-t space-y-2">
                      <Link href="/credits">
                        <Button variant="outline" className="w-full justify-start border-green-200 text-green-700">
                          <CreditCard className="h-4 w-4 mr-2" />
                          {creditBalance || "My Credits"}
                        </Button>
                      </Link>
                      <Link href="/credits/send">
                        <Button variant="outline" className="w-full justify-start border-red-200 text-red-700">
                          <Gift className="h-4 w-4 mr-2" />
                          Send a Gift
                        </Button>
                      </Link>
                      <Link href="/wishlist">
                        <Button variant="outline" className="w-full justify-start border-red-200 text-red-700">
                          <Heart className="h-4 w-4 mr-2" />
                          My Wishlist
                        </Button>
                      </Link>
                      <Link href="/referral">
                        <Button variant="outline" className="w-full justify-start border-blue-200 text-blue-700">
                          <Users className="h-4 w-4 mr-2" />
                          Refer Friends
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <SignInButton mode="modal">
                        <Button className="w-full bg-blue-900">Sign In</Button>
                      </SignInButton>
                    </div>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
