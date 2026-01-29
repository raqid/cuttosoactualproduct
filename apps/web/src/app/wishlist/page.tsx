import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Heart, Lock, Globe, Link as LinkIcon } from "lucide-react"

const occasionLabels: Record<string, string> = {
  birthday: "Birthday",
  holiday: "Holiday",
  wedding: "Wedding",
  housewarming: "Housewarming",
  baby_shower: "Baby Shower",
  graduation: "Graduation",
  other: "Other",
}

export default async function WishlistDashboard() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in?redirect=/wishlist")
  }

  const wishlists = await prisma.wishlist.findMany({
    where: { userId },
    include: {
      _count: { select: { items: true } },
      items: { select: { isPurchased: true } },
    },
    orderBy: { updatedAt: "desc" },
  })

  const privacyIcons: Record<string, React.ReactNode> = {
    public: <Globe className="h-4 w-4 text-green-600" />,
    private: <Lock className="h-4 w-4 text-gray-600" />,
    link_only: <LinkIcon className="h-4 w-4 text-blue-600" />,
  }

  const privacyLabels: Record<string, string> = {
    public: "Public",
    private: "Private",
    link_only: "Link only",
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlists</h1>
            <p className="text-gray-600 mt-1">Create and manage your gift wishlists</p>
          </div>
          <Link href="/wishlist/new">
            <Button className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              New Wishlist
            </Button>
          </Link>
        </div>

        {wishlists.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No wishlists yet</h2>
              <p className="text-gray-600 mb-6">Create your first wishlist to start saving products</p>
              <Link href="/wishlist/new">
                <Button className="bg-red-600 hover:bg-red-700">Create Wishlist</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlists.map((wishlist) => {
              const purchasedCount = wishlist.items.filter((i) => i.isPurchased).length
              const totalCount = wishlist._count.items

              return (
                <Link key={wishlist.id} href={`/wishlist/${wishlist.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{wishlist.title}</CardTitle>
                        <div className="flex items-center gap-1" title={privacyLabels[wishlist.privacy]}>
                          {privacyIcons[wishlist.privacy]}
                        </div>
                      </div>
                      {wishlist.occasion && (
                        <Badge variant="outline" className="w-fit mt-2">
                          {occasionLabels[wishlist.occasion]}
                        </Badge>
                      )}
                    </CardHeader>
                    <CardContent>
                      {wishlist.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{wishlist.description}</p>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          {totalCount} {totalCount === 1 ? "item" : "items"}
                          {purchasedCount > 0 && (
                            <span className="text-green-600 ml-1">({purchasedCount} purchased)</span>
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Updated {new Date(wishlist.updatedAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
