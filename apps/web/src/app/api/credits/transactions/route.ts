import { NextRequest } from "next/server"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get user's transaction history
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100)
    const offset = parseInt(searchParams.get("offset") || "0", 10)

    const balance = await prisma.creditBalance.findUnique({
      where: { userId },
      include: {
        transactions: {
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
        },
      },
    })

    if (!balance) {
      return withCors(Response.json({ transactions: [], total: 0 }))
    }

    // Get total count for pagination
    const total = await prisma.creditTransaction.count({
      where: { balanceId: balance.id },
    })

    const transactions = balance.transactions.map((t) => ({
      id: t.id,
      type: t.type,
      amountCents: t.amountCents,
      formatted: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        signDisplay: "always",
      }).format(t.amountCents / 100),
      description: t.description,
      createdAt: t.createdAt,
    }))

    return withCors(
      Response.json({
        transactions,
        total,
        hasMore: offset + limit < total,
      })
    )
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to fetch transactions"
    return withCors(Response.json({ error: message }, { status: 500 }))
  }
}
