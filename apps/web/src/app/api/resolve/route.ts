import { NextRequest } from "next/server";
import { ResolveInput } from "@cuttoso/shared";
import { resolveOfferByAsin } from "@/lib/resolver";
import { logEvent } from "@/lib/tracking";
import { optionsResponse, withCors } from "@/lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = ResolveInput.parse(body);

    const offer = await resolveOfferByAsin(input.asin);

    await logEvent({
      type: "resolve",
      sessionId: input.sessionId,
      offerId: offer?.id,
      meta: {
        amazonUrl: input.amazonUrl,
        title: input.title,
        brandHint: input.brandHint,
      },
    });

    const out = offer
      ? { matched: true as const, offerId: offer.id }
      : { matched: false as const };

    return withCors(Response.json(out));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
