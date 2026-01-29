import { NextRequest } from "next/server"
import { WishlistUpdateInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get single wishlist with items (owner only)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
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
          orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
        },
      },
    })

    if (!wishlist) {
      return withCors(Response.json({ error: "Wishlist not found" }, { status: 404 }))
    }

    return withCors(Response.json({ wishlist }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch wishlist"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}

// PATCH - Update wishlist
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { id } = await params
    const input = WishlistUpdateInput.parse(await req.json())

    // Verify ownership
    const existing = await prisma.wishlist.findFirst({
      where: { id, userId },
      select: { id: true },
    })

    if (!existing) {
      return withCors(Response.json({ error: "Wishlist not found" }, { status: 404 }))
    }

    const wishlist = await prisma.wishlist.update({
      where: { id },
      data: {
        ...(input.title && { title: input.title }),
        ...(input.description !== undefined && { description: input.description }),
        ...(input.occasion !== undefined && { occasion: input.occasion }),
        ...(input.privacy && { privacy: input.privacy }),
      },
      select: {
        id: true,
        title: true,
        description: true,
        occasion: true,
        privacy: true,
        shareToken: true,
      },
    })

    return withCors(Response.json({ wishlist }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to update wishlist"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}

// DELETE - Delete wishlist
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { id } = await params

    // Verify ownership and delete
    const deleted = await prisma.wishlist.deleteMany({
      where: { id, userId },
    })

    if (deleted.count === 0) {
      return withCors(Response.json({ error: "Wishlist not found" }, { status: 404 }))
    }

    return withCors(Response.json({ ok: true }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to delete wishlist"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
