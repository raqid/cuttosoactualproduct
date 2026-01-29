import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/db"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Gift, ArrowLeft } from "lucide-react"
import { Suspense } from "react"
import { OccasionFilters } from "@/components/occasions/OccasionFilters"

interface PageProps {
  params: Promise<{ occasion: string }>
  searchParams: Promise<{ minPrice?: string; maxPrice?: string }>
}

const occasionMeta: Record<string, { title: string; icon: string; description: string }> = {
  birthday: { title: "Birthday Gifts", icon: "🎂", description: "Make their day special with thoughtful, handcrafted presents" },
  wedding: { title: "Wedding Gifts", icon: "💒", description: "Celebrate their love with meaningful, lasting gifts" },
  housewarming: { title: "Housewarming Gifts", icon: "🏠", description: "Help them make their new house a home" },
  holiday: { title: "Holiday Gifts", icon: "🎄", description: "Spread joy this season with gifts from American makers" },
  thank_you: { title: "Thank You Gifts", icon: "🙏", description: "Show your appreciation with a thoughtful gesture" },
  just_because: { title: "Just Because Gifts", icon: "💝", description: "Brighten someone's day for no reason at all" },
  baby_shower: { title: "Baby Shower Gifts", icon: "👶", description: "Welcome the little one with handcrafted treasures" },
  graduation: { title: "Graduation Gifts", icon: "🎓", description: "Celebrate their achievement with something special" },
}

export default async function OccasionPage({ params, searchParams }: PageProps) {
  const { occasion } = await params
  const { minPrice, maxPrice } = await searchParams

  const meta = occasionMeta[occasion]
  if (!meta) {
    notFound()
  }

  const where: Record<string, unknown> = {
    active: true,
    occasions: { has: occasion },
  }

  if (minPrice || maxPrice) {
    const priceFilter: Record<string, number> = {}
    if (minPrice) priceFilter.gte = parseInt(minPrice) * 100
    if (maxPrice) priceFilter.lte = parseInt(maxPrice) * 100
    where.priceCents = priceFilter
  }

  const offers = await prisma.offer.findMany({
    where,
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
    take: 24,
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-4">{meta.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{meta.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{meta.description}</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Filters */}
        <Suspense>
          <OccasionFilters occasion={occasion} />
        </Suspense>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {offers.length} {offers.length === 1 ? "Gift" : "Gifts"} Found
            </h2>
            <p className="text-gray-600">Directly from American manufacturers</p>
          </div>
          <Link href="/gift-finder">
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Gift className="mr-2 h-4 w-4" />
              AI Gift Finder
            </Button>
          </Link>
        </div>

        {offers.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No gifts tagged for this occasion yet
            </h3>
            <p className="text-gray-600 mb-6">
              We're curating more gifts for {meta.title.toLowerCase()}. Check back soon!
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button variant="outline">Browse All Products</Button>
              </Link>
              <Link href="/gift-finder">
                <Button className="bg-red-600 hover:bg-red-700">Use Gift Finder</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {offers.map((offer) => (
              <Link key={offer.id} href={`/o/${offer.id}`}>
                <Card className="group hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-4">
                    <div className="flex gap-2 mb-3">
                      {offer.manufacturer.madeInUsa && (
                        <Badge className="bg-blue-900 text-white text-xs">Made in USA</Badge>
                      )}
                      {offer.manufacturer.verified && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">Verified</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-blue-700 mb-2">
                      by {offer.manufacturer.name}
                    </p>
                    {offer.description && (
                      <p className="text-xs text-gray-500 mb-3 line-clamp-2">{offer.description}</p>
                    )}
                    {offer.priceCents && (
                      <p className="text-lg font-bold text-gray-900">
                        ${(offer.priceCents / 100).toFixed(2)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
