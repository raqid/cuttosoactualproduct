import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get gift details (public)
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params

  try {
    const gift = await prisma.giftCredit.findUnique({
      where: { token },
    })

    if (!gift) {
      return withCors(Response.json({ error: "Gift not found" }, { status: 404 }))
    }

    // Check if expired
    if (gift.expiresAt < new Date()) {
      return withCors(
        Response.json({
          error: "Gift has expired",
          gift: { status: "expired" },
        }, { status: 410 })
      )
    }

    // Check if already redeemed
    if (gift.status === "redeemed") {
      return withCors(
        Response.json({
          error: "Gift already redeemed",
          gift: { status: "redeemed" },
        }, { status: 410 })
      )
    }

    return withCors(
      Response.json({
        gift: {
          amountCents: gift.amountCents,
          formatted: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(gift.amountCents / 100),
          message: gift.message,
          expiresAt: gift.expiresAt,
          status: gift.status,
        },
      })
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch gift"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}

// POST - Redeem gift credits
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  const { token } = await params

  try {
    const gift = await prisma.giftCredit.findUnique({
      where: { token },
    })

    if (!gift) {
      return withCors(Response.json({ error: "Gift not found" }, { status: 404 }))
    }

    // Check if expired
    if (gift.expiresAt < new Date()) {
      // Update status to expired
      await prisma.giftCredit.update({
        where: { id: gift.id },
        data: { status: "expired" },
      })
      return withCors(Response.json({ error: "Gift has expired" }, { status: 410 }))
    }

    // Check if already redeemed
    if (gift.status === "redeemed") {
      return withCors(Response.json({ error: "Gift already redeemed" }, { status: 409 }))
    }

    // Check if cancelled
    if (gift.status === "cancelled") {
      return withCors(Response.json({ error: "Gift was cancelled" }, { status: 410 }))
    }

    // Redeem gift in a transaction
    await prisma.$transaction(async (tx) => {
      // Update gift status
      await tx.giftCredit.update({
        where: { id: gift.id },
        data: {
          status: "redeemed",
          recipientId: userId,
          redeemedAt: new Date(),
        },
      })

      // Upsert recipient's balance
      const balance = await tx.creditBalance.upsert({
        where: { userId },
        update: {
          balanceCents: { increment: gift.amountCents },
        },
        create: {
          userId,
          balanceCents: gift.amountCents,
        },
      })

      // Create transaction record
      await tx.creditTransaction.create({
        data: {
          balanceId: balance.id,
          type: "gift_received",
          amountCents: gift.amountCents,
          description: `Received $${(gift.amountCents / 100).toFixed(2)} gift`,
          referenceId: gift.id,
        },
      })

      // Log event
      await tx.event.create({
        data: {
          type: "credit_gift_redeemed",
          meta: {
            giftId: gift.id,
            recipientId: userId,
            senderId: gift.senderId,
            amountCents: gift.amountCents,
          },
        },
      })
    })

    return withCors(
      Response.json({
        success: true,
        amountCents: gift.amountCents,
        formatted: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(gift.amountCents / 100),
      })
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to redeem gift"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
