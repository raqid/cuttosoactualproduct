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

    const gift = await prisma.giftLink.findUnique({
      where: { id },
      include: {
        offer: {
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
        },
      },
    });

    if (!gift) {
      return withCors(Response.json({ error: "Gift not found" }, { status: 404 }));
    }

    return withCors(Response.json(gift));
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Bad Request";
    return withCors(Response.json({ error: message }, { status: 400 }));
  }
}
