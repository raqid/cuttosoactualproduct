import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get user's credit balance
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    // Upsert to create balance record if it doesn't exist
    const balance = await prisma.creditBalance.upsert({
      where: { userId },
      update: {},
      create: { userId, balanceCents: 0 },
    })

    return withCors(
      Response.json({
        balance: {
          balanceCents: balance.balanceCents,
          formatted: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(balance.balanceCents / 100),
        },
      })
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch balance"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
