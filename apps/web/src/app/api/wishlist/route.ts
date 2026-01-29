import { NextRequest } from "next/server"
import { WishlistCreateInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - List user's wishlists
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const wishlists = await prisma.wishlist.findMany({
      where: { userId },
      include: {
        _count: {
          select: { items: true },
        },
        items: {
          select: {
            isPurchased: true,
          },
        },
      },
      orderBy: { updatedAt: "desc" },
    })

    // Transform to include item counts
    const result = wishlists.map((w) => ({
      id: w.id,
      title: w.title,
      description: w.description,
      occasion: w.occasion,
      privacy: w.privacy,
      shareToken: w.shareToken,
      itemCount: w._count.items,
      purchasedCount: w.items.filter((i) => i.isPurchased).length,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt,
    }))

    return withCors(Response.json({ wishlists: result }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch wishlists"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}

// POST - Create new wishlist
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const input = WishlistCreateInput.parse(await req.json())

    const wishlist = await prisma.wishlist.create({
      data: {
        userId,
        title: input.title,
        description: input.description,
        occasion: input.occasion,
        privacy: input.privacy,
      },
      select: {
        id: true,
        title: true,
        shareToken: true,
        privacy: true,
        occasion: true,
      },
    })

    return withCors(Response.json({ wishlist }), { status: 201 })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create wishlist"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
