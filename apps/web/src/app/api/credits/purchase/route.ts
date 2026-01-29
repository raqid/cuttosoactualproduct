import { NextRequest } from "next/server"
import { CreditPurchaseInput } from "@cuttoso/shared"
import { optionsResponse, withCors } from "@/lib/cors"
import { stripe, formatCurrency, isValidCreditAmount } from "@/lib/stripe"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Create Stripe checkout session for purchasing credits
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const input = CreditPurchaseInput.parse(await req.json())

    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Cuttoso Gift Credits",
              description: `$${(input.amountCents / 100).toFixed(2)} in gift credits`,
            },
            unit_amount: input.amountCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/credits?success=true`,
      cancel_url: `${origin}/credits/buy?cancelled=true`,
      metadata: {
        userId,
        amountCents: input.amountCents.toString(),
        type: "credit_purchase",
      },
    })

    return withCors(Response.json({ checkoutUrl: session.url }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to create checkout session"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
