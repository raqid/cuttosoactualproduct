import { NextRequest } from "next/server"
import { WishlistItemAddInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Add item to wishlist
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { id: wishlistId } = await params
    const input = WishlistItemAddInput.parse(await req.json())

    // Verify wishlist ownership
    const wishlist = await prisma.wishlist.findFirst({
      where: { id: wishlistId, userId },
      select: { id: true },
    })

    if (!wishlist) {
      return withCors(Response.json({ error: "Wishlist not found" }, { status: 404 }))
    }

    // Verify offer exists and is active
    const offer = await prisma.offer.findUnique({
      where: { id: input.offerId, active: true },
      select: { id: true },
    })

    if (!offer) {
      return withCors(Response.json({ error: "Offer not found" }, { status: 404 }))
    }

    // Create or update item (upsert to handle duplicates gracefully)
    const item = await prisma.wishlistItem.upsert({
      where: {
        wishlistId_offerId: {
          wishlistId,
          offerId: input.offerId,
        },
      },
      create: {
        wishlistId,
        offerId: input.offerId,
        note: input.note,
        priority: input.priority,
      },
      update: {
        note: input.note,
        priority: input.priority,
      },
      include: {
        offer: {
          include: {
            manufacturer: {
              select: { id: true, name: true, verified: true, madeInUsa: true },
            },
          },
        },
      },
    })

    return withCors(Response.json({ item }), { status: 201 })
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to add item"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
