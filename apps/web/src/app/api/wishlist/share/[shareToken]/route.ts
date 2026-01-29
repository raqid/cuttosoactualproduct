import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { logEvent } from "@/lib/tracking"
import { optionsResponse, withCors } from "@/lib/cors"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get shared wishlist (public access)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ shareToken: string }> }
) {
  try {
    const { shareToken } = await params
    const sessionId = req.headers.get("x-session-id") || undefined

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

    if (!wishlist) {
      return withCors(Response.json({ error: "Wishlist not found" }, { status: 404 }))
    }

    // Check privacy settings
    if (wishlist.privacy === "private") {
      return withCors(Response.json({ error: "This wishlist is private" }, { status: 403 }))
    }

    // Log view event
    if (sessionId) {
      await logEvent({
        type: "wishlist_view",
        sessionId,
        meta: { wishlistId: wishlist.id, shareToken },
      })
    }

    // Return sanitized data (hide personal notes for shared view)
    const result = {
      id: wishlist.id,
      title: wishlist.title,
      description: wishlist.description,
      occasion: wishlist.occasion,
      items: wishlist.items.map((item) => ({
        id: item.id,
        offerId: item.offerId,
        offer: {
          id: item.offer.id,
          title: item.offer.title,
          directUrl: item.offer.directUrl,
          priceCents: item.offer.priceCents,
          currency: item.offer.currency,
          manufacturer: item.offer.manufacturer,
        },
        isPurchased: item.isPurchased,
        priority: item.priority,
        // Note: Personal notes and purchaser info are intentionally NOT exposed in shared view
      })),
    }

    return withCors(Response.json({ wishlist: result }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch wishlist"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
