import { NextRequest } from "next/server";
import { RequestResolveInput } from "@cuttoso/shared";
import { prisma } from "@/lib/db";
import { optionsResponse, withCors } from "@/lib/cors";
import { auth } from "@clerk/nextjs/server";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: NextRequest) {
  // Admin only
  const { userId } = await auth();
  if (!userId) {
    return withCors(Response.json({ error: "Unauthorized" }, { status: 401 }));
  }

  try {
    const input = RequestResolveInput.parse(await req.json());

    await prisma.sourceRequest.update({
      where: { id: input.requestId },
      data: { resolved: true, resolvedOfferId: input.offerId },
    });

    return withCors(Response.json({ ok: true }));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
