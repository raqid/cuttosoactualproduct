import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { stripe, STRIPE_WEBHOOK_SECRET, formatCurrency } from "@/lib/stripe"
import type Stripe from "stripe"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return Response.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  if (!STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured")
    return Response.json({ error: "Webhook not configured" }, { status: 500 })
  }

  try {
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature"
    console.error("Webhook signature verification failed:", message)
    return Response.json({ error: message }, { status: 400 })
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    // Only process credit purchases
    if (session.metadata?.type !== "credit_purchase") {
      return Response.json({ received: true })
    }

    const userId = session.metadata.userId
    const amountCents = parseInt(session.metadata.amountCents || "0", 10)

    if (!userId || amountCents <= 0) {
      console.error("Invalid credit purchase metadata:", session.metadata)
      return Response.json({ error: "Invalid metadata" }, { status: 400 })
    }

    try {
      // Upsert balance and create transaction in a transaction
      await prisma.$transaction(async (tx) => {
        // Upsert balance
        const balance = await tx.creditBalance.upsert({
          where: { userId },
          update: {
            balanceCents: { increment: amountCents },
          },
          create: {
            userId,
            balanceCents: amountCents,
          },
        })

        // Create transaction record
        await tx.creditTransaction.create({
          data: {
            balanceId: balance.id,
            type: "purchase",
            amountCents,
            description: `Purchased ${formatCurrency(amountCents)} in credits`,
            referenceId: session.payment_intent as string,
          },
        })

        // Log event
        await tx.event.create({
          data: {
            type: "credit_purchased",
            meta: {
              userId,
              amountCents,
              stripeSessionId: session.id,
            },
          },
        })
      })

      console.log(`Credits added: ${amountCents} cents for user ${userId}`)
    } catch (err) {
      console.error("Failed to process credit purchase:", err)
      return Response.json({ error: "Failed to process purchase" }, { status: 500 })
    }
  }

  return Response.json({ received: true })
}
