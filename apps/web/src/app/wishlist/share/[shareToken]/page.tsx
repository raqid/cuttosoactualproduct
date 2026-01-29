import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, Check, Heart } from "lucide-react"
import { SharedWishlistItem } from "@/components/wishlist/SharedWishlistItem"

interface PageProps {
  params: Promise<{ shareToken: string }>
}

const occasionLabels: Record<string, string> = {
  birthday: "Birthday Wishlist",
  holiday: "Holiday Wishlist",
  wedding: "Wedding Registry",
  housewarming: "Housewarming Wishlist",
  baby_shower: "Baby Shower Registry",
  graduation: "Graduation Wishlist",
  other: "Wishlist",
}

export default async function SharedWishlistPage({ params }: PageProps) {
  const { shareToken } = await params

  const wishlist = await prisma.wishlist.findUnique({
    where: { shareToken },
    include: {
      items: {
        include: {
          offer: {
            include: {
              manufacturer: {
                select: {
                  id: true,
                  name: true,
                  domain: true,
                  verified: true,
                  madeInUsa: true,
                },
              },
            },
          },
        },
        orderBy: [{ isPurchased: "asc" }, { priority: "desc" }, { createdAt: "asc" }],
      },
    },
  })

  if (!wishlist || wishlist.privacy === "private") {
    notFound()
  }

  // Log view event (server-side)
  await prisma.event.create({
    data: {
      type: "wishlist_view",
      meta: { wishlistId: wishlist.id, shareToken },
    },
  })

  const unpurchasedItems = wishlist.items.filter((i) => !i.isPurchased)
  const purchasedItems = wishlist.items.filter((i) => i.isPurchased)

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-pink-500 mb-4">
            <Gift className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{wishlist.title}</h1>
          {wishlist.occasion && (
            <Badge className="bg-red-100 text-red-800 mb-4">
              {occasionLabels[wishlist.occasion]}
            </Badge>
          )}
          {wishlist.description && (
            <p className="text-gray-600 max-w-2xl mx-auto mt-4">{wishlist.description}</p>
          )}
        </div>

        {/* Available Items */}
        {unpurchasedItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Gift Ideas ({unpurchasedItems.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {unpurchasedItems.map((item) => (
                <SharedWishlistItem key={item.id} item={item} wishlistId={wishlist.id} />
              ))}
            </div>
          </div>
        )}

        {/* Purchased Items */}
        {purchasedItems.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-600" />
              Already Purchased ({purchasedItems.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-60">
              {purchasedItems.map((item) => (
                <Card key={item.id} className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-green-50 bg-opacity-80 flex items-center justify-center z-10">
                    <Badge className="bg-green-600 text-white">
                      <Check className="h-4 w-4 mr-1" />
                      Purchased
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-900">{item.offer.title}</h3>
                    <p className="text-sm text-gray-600">by {item.offer.manufacturer.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {wishlist.items.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                This wishlist is empty
              </h2>
              <p className="text-gray-600">No items have been added yet</p>
            </CardContent>
          </Card>
        )}

        {/* All purchased message */}
        {wishlist.items.length > 0 && unpurchasedItems.length === 0 && (
          <Card className="text-center py-12 bg-green-50 border-green-200">
            <CardContent>
              <Check className="h-16 w-16 mx-auto text-green-600 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                All gifts have been purchased!
              </h2>
              <p className="text-gray-600">
                Every item on this wishlist has found a generous giver
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
