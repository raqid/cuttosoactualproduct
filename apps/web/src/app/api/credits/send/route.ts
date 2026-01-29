import { NextRequest } from "next/server"
import { CreditSendInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { formatCurrency } from "@/lib/stripe"
import { sendGiftEmail } from "@/lib/email"
import { auth, currentUser } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Send gift credits to recipient
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const input = CreditSendInput.parse(await req.json())
    const user = await currentUser()
    const senderName = user?.firstName || user?.emailAddresses[0]?.emailAddress || "Someone"

    // Check sender has sufficient balance
    const balance = await prisma.creditBalance.findUnique({
      where: { userId },
    })

    if (!balance || balance.balanceCents < input.amountCents) {
      return withCors(Response.json({ error: "Insufficient balance" }, { status: 400 }))
    }

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    // Create gift and debit balance in a transaction
    const gift = await prisma.$transaction(async (tx) => {
      // Create gift record
      const giftCredit = await tx.giftCredit.create({
        data: {
          senderId: userId,
          recipientEmail: input.recipientEmail,
          amountCents: input.amountCents,
          message: input.message,
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      })

      // Debit sender's balance
      await tx.creditBalance.update({
        where: { userId },
        data: {
          balanceCents: { decrement: input.amountCents },
        },
      })

      // Create transaction record
      await tx.creditTransaction.create({
        data: {
          balanceId: balance.id,
          type: "gift_sent",
          amountCents: -input.amountCents,
          description: `Sent ${formatCurrency(input.amountCents)} gift to ${input.recipientEmail}`,
          referenceId: giftCredit.id,
        },
      })

      // Log event
      await tx.event.create({
        data: {
          type: "credit_gift_sent",
          meta: {
            senderId: userId,
            recipientEmail: input.recipientEmail,
            amountCents: input.amountCents,
            giftId: giftCredit.id,
          },
        },
      })

      return giftCredit
    })

    // Send email notification
    const redeemUrl = `${origin}/credits/redeem/${gift.token}`

    await sendGiftEmail({
      recipientEmail: input.recipientEmail,
      senderName,
      amountFormatted: formatCurrency(input.amountCents),
      message: input.message,
      redeemUrl,
      expiresAt: gift.expiresAt,
    })

    return withCors(
      Response.json({
        gift: {
          id: gift.id,
          token: gift.token,
          recipientEmail: input.recipientEmail,
          amountCents: input.amountCents,
        },
      }),
      { status: 201 }
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to send gift"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
