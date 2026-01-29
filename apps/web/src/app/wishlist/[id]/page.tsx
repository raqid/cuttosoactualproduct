import { auth } from "@clerk/nextjs/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Suspense } from "react"
import { ArrowLeft, Share2, Settings, Heart, Check, Trash2, ExternalLink } from "lucide-react"
import { WishlistShareButton } from "@/components/wishlist/WishlistShareButton"
import { WishlistItemCard } from "@/components/wishlist/WishlistItemCard"
import { ShareWishlistModal } from "@/components/sharing/ShareWishlistModal"

interface PageProps {
  params: Promise<{ id: string }>
}

const occasionLabels: Record<string, string> = {
  birthday: "Birthday",
  holiday: "Holiday",
  wedding: "Wedding",
  housewarming: "Housewarming",
  baby_shower: "Baby Shower",
  graduation: "Graduation",
  other: "Other",
}

const privacyLabels: Record<string, string> = {
  public: "Public",
  private: "Private",
  link_only: "Link Only",
}

export default async function ManageWishlistPage({ params }: PageProps) {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in?redirect=/wishlist")
  }

  const { id } = await params

  const wishlist = await prisma.wishlist.findFirst({
    where: { id, userId },
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

  if (!wishlist) {
    notFound()
  }

  const unpurchasedItems = wishlist.items.filter((i) => !i.isPurchased)
  const purchasedItems = wishlist.items.filter((i) => i.isPurchased)

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <Link href="/wishlist" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Wishlists
        </Link>

        {/* Share modal after creation */}
        <Suspense>
          <ShareWishlistModal shareToken={wishlist.shareToken} wishlistTitle={wishlist.title} />
        </Suspense>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{wishlist.title}</h1>
                {wishlist.occasion && (
                  <Badge variant="outline">{occasionLabels[wishlist.occasion]}</Badge>
                )}
                <Badge variant="secondary">{privacyLabels[wishlist.privacy]}</Badge>
              </div>
              {wishlist.description && <p className="text-gray-600">{wishlist.description}</p>}
              <p className="text-sm text-gray-400 mt-2">
                {wishlist.items.length} {wishlist.items.length === 1 ? "item" : "items"} •{" "}
                {purchasedItems.length} purchased
              </p>
            </div>
            <div className="flex gap-2">
              <WishlistShareButton
                shareToken={wishlist.shareToken}
                privacy={wishlist.privacy}
              />
              <Link href={`/wishlist/${wishlist.id}/edit`}>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Items */}
        {wishlist.items.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No items yet</h2>
              <p className="text-gray-600 mb-6">
                Start adding products to your wishlist from the catalog
              </p>
              <Link href="/products">
                <Button className="bg-red-600 hover:bg-red-700">Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Unpurchased Items */}
            {unpurchasedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Items ({unpurchasedItems.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {unpurchasedItems.map((item) => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      wishlistId={wishlist.id}
                      isOwner
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Purchased Items */}
            {purchasedItems.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Check className="h-5 w-5 mr-2 text-green-600" />
                  Purchased ({purchasedItems.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {purchasedItems.map((item) => (
                    <WishlistItemCard
                      key={item.id}
                      item={item}
                      wishlistId={wishlist.id}
                      isOwner
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
