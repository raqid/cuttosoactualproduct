import { NextRequest } from "next/server"
import { ReferralTrackInput } from "@cuttoso/shared"
import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"

export async function OPTIONS() {
  return optionsResponse()
}

// POST - Track referral signup
export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  try {
    const input = ReferralTrackInput.parse(await req.json())

    // Find the referral code
    const referral = await prisma.referral.findUnique({
      where: { referralCode: input.referralCode },
    })

    if (!referral) {
      return withCors(Response.json({ error: "Invalid referral code" }, { status: 400 }))
    }

    // Don't allow self-referral
    if (referral.referrerId === userId) {
      return withCors(Response.json({ error: "Cannot use own referral code" }, { status: 400 }))
    }

    // Check if this user already has a referral
    const existing = await prisma.referral.findFirst({
      where: { referredId: userId },
    })

    if (existing) {
      return withCors(Response.json({ error: "Already referred" }, { status: 409 }))
    }

    // Link referral
    await prisma.referral.update({
      where: { id: referral.id },
      data: { referredId: userId },
    })

    // Notify referrer
    await prisma.notification.create({
      data: {
        userId: referral.referrerId,
        type: "referral_signup",
        title: "Your friend signed up!",
        message: "Someone you referred just joined Cuttoso. You'll earn $5 when they make their first purchase!",
        meta: { referredUserId: userId },
      },
    })

    // Log event
    await prisma.event.create({
      data: {
        type: "referral_signup",
        meta: {
          referrerId: referral.referrerId,
          referredId: userId,
          referralCode: input.referralCode,
        },
      },
    })

    return withCors(Response.json({ success: true }))
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to track referral"
    return withCors(Response.json({ error: message }, { status: 400 }))
  }
}
