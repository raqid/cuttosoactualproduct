import { NextRequest } from "next/server";
import { RequestCreateInput } from "@cuttoso/shared";
import { prisma } from "@/lib/db";
import { optionsResponse, withCors } from "@/lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function POST(req: NextRequest) {
  try {
    const input = RequestCreateInput.parse(await req.json());

    const created = await prisma.sourceRequest.create({
      data: {
        asin: input.asin,
        amazonUrl: input.amazonUrl,
        title: input.title,
        userEmail: input.userEmail,
      },
      select: { id: true },
    });

    return withCors(Response.json({ ok: true, requestId: created.id }));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
