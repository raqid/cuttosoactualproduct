import { prisma } from "@/lib/db"
import { optionsResponse, withCors } from "@/lib/cors"
import { auth } from "@clerk/nextjs/server"
import crypto from "crypto"

export async function OPTIONS() {
  return optionsResponse()
}

// GET - Get or create referral code + stats
export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }))
  }

  // Find existing referral or create one
  let referral = await prisma.referral.findFirst({
    where: { referrerId: userId, referredId: null },
  })

  if (!referral) {
    referral = await prisma.referral.create({
      data: {
        referrerId: userId,
        referralCode: crypto.randomBytes(4).toString("hex"),
      },
    })
  }

  // Get stats
  const totalReferrals = await prisma.referral.count({
    where: { referrerId: userId, referredId: { not: null } },
  })

  const completedReferrals = await prisma.referral.count({
    where: { referrerId: userId, hasPurchased: true },
  })

  const earnedCents = completedReferrals * 500 // $5 per referral

  return withCors(
    Response.json({
      referralCode: referral.referralCode,
      stats: {
        totalReferrals,
        completedReferrals,
        earnedCents,
        earnedFormatted: `$${(earnedCents / 100).toFixed(2)}`,
      },
    })
  )
}
