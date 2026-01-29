import { NextRequest } from "next/server"
import { WishlistItemPurchaseInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { logEvent } from "@/lib/tracking"
import { optionsResponse, withCors } from "@/lib/cors"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Mark item as purchased (public access for shared wishlists)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  try {
    const { id: wishlistId, itemId } = await params
    const input = WishlistItemPurchaseInput.parse(await req.json())

    // Find the item and verify wishlist is not private
    const item = await prisma.wishlistItem.findFirst({
      where: {
        id: itemId,
        wishlistId,
        wishlist: {
          privacy: { not: "private" },
        },
      },
      include: {
        wishlist: { select: { privacy: true } },
        offer: { select: { id: true, directUrl: true } },
      },
    })

    if (!item) {
      return withCors(Response.json({ error: "Item not found" }, { status: 404 }))
    }

    if (item.isPurchased) {
      return withCors(Response.json({ error: "Item already purchased" }, { status: 409 }))
    }

    // Mark as purchased
    const updated = await prisma.wishlistItem.update({
      where: { id: itemId },
      data: {
        isPurchased: true,
        purchasedAt: new Date(),
        purchasedBy: input.purchaserName || "Anonymous",
      },
      select: {
        id: true,
        isPurchased: true,
        purchasedAt: true,
        purchasedBy: true,
        offer: {
          select: {
            directUrl: true,
          },
        },
      },
    })

    // Log the purchase event
    await logEvent({
      type: "wishlist_item_purchased",
      offerId: item.offer.id,
      meta: { wishlistId, itemId, purchasedBy: input.purchaserName },
    })

    // Notify wishlist owner that someone bought a gift
    try {
      const wishlist = await prisma.wishlist.findUnique({
        where: { id: wishlistId },
        select: { userId: true, title: true },
      })
      if (wishlist) {
        await prisma.notification.create({
          data: {
            userId: wishlist.userId,
            type: "gift_purchased",
            title: "Someone bought you a gift!",
            message: `A gift from your "${wishlist.title}" wishlist has been purchased. We won't tell you which one!`,
            meta: { wishlistId, itemId },
          },
        })
      }
    } catch (notifErr) {
      console.error("Failed to create purchase notification:", notifErr)
    }

    return withCors(Response.json({ item: updated }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to mark as purchased"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
