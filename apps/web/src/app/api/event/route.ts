import { NextRequest } from "next/server";
import { EventInput } from "@cuttoso/shared";
import { logEvent } from "@/lib/tracking";
import { optionsResponse, withCors } from "@/lib/cors";
import { EventType } from "@prisma/client";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: NextRequest) {
  try {
    const input = EventInput.parse(await req.json());

    // Require sessionId in v1 to reduce junk
    if (!input.sessionId) {
      return withCors(Response.json({ error: "sessionId required" }, { status: 400 }));
    }

    await logEvent({
      type: input.type as EventType,
      sessionId: input.sessionId,
      offerId: input.offerId,
      giftId: input.giftId,
      meta: input.meta,
    });

    return withCors(Response.json({ ok: true }));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
