import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - List/filter offers
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)

    const occasion = searchParams.get("occasion")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const tags = searchParams.get("tags")?.split(",").filter(Boolean)
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50)
    const offset = parseInt(searchParams.get("offset") || "0")

    const where: Record<string, unknown> = { active: true }

    if (occasion) {
      where.occasions = { has: occasion }
    }

    if (minPrice || maxPrice) {
      const priceFilter: Record<string, number> = {}
      if (minPrice) priceFilter.gte = parseInt(minPrice) * 100
      if (maxPrice) priceFilter.lte = parseInt(maxPrice) * 100
      where.priceCents = priceFilter
    }

    if (tags && tags.length > 0) {
      where.tags = { hasSome: tags }
    }

    const [offers, total] = await Promise.all([
      prisma.offer.findMany({
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
        take: limit,
        skip: offset,
        orderBy: { createdAt: "desc" },
      }),
      prisma.offer.count({ where }),
    ])

    return withCors(
      Response.json({
        offers,
        pagination: { total, limit, offset, hasMore: offset + limit < total },
      })
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch offers"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
