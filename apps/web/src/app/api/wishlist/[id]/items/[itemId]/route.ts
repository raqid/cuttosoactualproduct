import { NextRequest } from "next/server"
import { WishlistItemUpdateInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// PATCH - Update item (note, priority)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { id: wishlistId, itemId } = await params
    const input = WishlistItemUpdateInput.parse(await req.json())

    // Verify ownership through wishlist
    const item = await prisma.wishlistItem.findFirst({
      where: {
        id: itemId,
        wishlistId,
        wishlist: { userId },
      },
      select: { id: true },
    })

    if (!item) {
      return withCors(Response.json({ error: "Item not found" }, { status: 404 }))
    }

    const updated = await prisma.wishlistItem.update({
      where: { id: itemId },
      data: {
        ...(input.note !== undefined && { note: input.note }),
        ...(input.priority !== undefined && { priority: input.priority }),
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

    return withCors(Response.json({ item: updated }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update item"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}

// DELETE - Remove item from wishlist
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; itemId: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { id: wishlistId, itemId } = await params

    // Verify ownership through wishlist and delete
    const deleted = await prisma.wishlistItem.deleteMany({
      where: {
        id: itemId,
        wishlistId,
        wishlist: { userId },
      },
    })

    if (deleted.count === 0) {
      return withCors(Response.json({ error: "Item not found" }, { status: 404 }))
    }

    return withCors(Response.json({ ok: true }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to delete item"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
