import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"
import { NextRequest } from "next/server"

export async function OPTIONS() {
  return optionsResponse()
}

// PATCH - Mark single notification as read
export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  const { id } = await params

  const notification = await prisma.notification.findFirst({
    where: { id, userId },
  })

  if (!notification) {
    return withCors(Response.json({ error: "Not found" }, { status: 404 }))
  }

  await prisma.notification.update({
    where: { id },
    data: { read: true },
  })

  return withCors(Response.json({ success: true }))
}
