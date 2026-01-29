import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Get gift recommendations based on quiz answers
export async function POST(req: NextRequest) {
  try {
    const { occasion, interests, budgetMin, budgetMax } = await req.json()

    const where: Record<string, unknown> = { active: true }

    if (occasion) {
      where.occasions = { has: occasion }
    }

    if (budgetMin || budgetMax) {
      const priceFilter: Record<string, number> = {}
      if (budgetMin) priceFilter.gte = budgetMin * 100
      if (budgetMax) priceFilter.lte = budgetMax * 100
      where.priceCents = priceFilter
    }

    if (interests && interests.length > 0) {
      where.tags = { hasSome: interests }
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
      take: 12,
      orderBy: { createdAt: "desc" },
    })

    if (offers.length === 0) {
      // Fallback: return all active offers
      const fallback = await prisma.offer.findMany({
        where: { active: true },
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
        take: 12,
        orderBy: { createdAt: "desc" },
      })

      return withCors(
        Response.json({
          offers: fallback,
          isFiltered: false,
          message: "Showing all available products",
        })
      )
    }

    return withCors(Response.json({ offers, isFiltered: true }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to get recommendations"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
