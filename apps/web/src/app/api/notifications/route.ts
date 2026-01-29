import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - List notifications
export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  const url = new URL(req.url)
  const unreadOnly = url.searchParams.get("unread") === "true"

  if (unreadOnly) {
    const count = await prisma.notification.count({
      where: { userId, read: false },
    })
    return withCors(Response.json({ unreadCount: count }))
  }

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return withCors(Response.json({ notifications }))
}

// PATCH - Mark all as read
export async function PATCH() {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  })

  return withCors(Response.json({ success: true }))
}
