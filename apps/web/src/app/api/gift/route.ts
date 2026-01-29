import { NextRequest } from "next/server";
import { GiftCreateInput } from "@cuttoso/shared";
import { prisma } from "@/lib/db";
import { logEvent } from "@/lib/tracking";
import { optionsResponse, withCors } from "@/lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: NextRequest) {
  try {
    const input = GiftCreateInput.parse(await req.json());

    const gift = await prisma.giftLink.create({
      data: {
        offerId: input.offerId,
        recipientName: input.recipientName,
        message: input.message,
      },
      select: { id: true, offerId: true },
    });

    if (input.sessionId) {
      await logEvent({
        type: "gift_view",
        sessionId: input.sessionId,
        offerId: gift.offerId,
        giftId: gift.id,
      });
    }

    return withCors(Response.json({ giftId: gift.id }));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
