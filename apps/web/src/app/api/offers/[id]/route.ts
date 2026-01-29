import { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { optionsResponse, withCors } from "@/lib/cors";

export async function OPTIONS() {
  return optionsResponse();
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const offer = await prisma.offer.findUnique({
      where: { id },
      include: {
        manufacturer: {
          select: {
            name: true,
            domain: true,
            supportEmail: true,
            returnsUrl: true,
            verified: true,
            madeInUsa: true,
          },
        },
      },
    });

    if (!offer) {
      return withCors(Response.json({ error: "Offer not found" }, { status: 404 }));
    }

    return withCors(Response.json(offer));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
