import { prisma } from "./db";

export async function resolveOfferByAsin(asin: string) {
  return prisma.offer.findFirst({
    where: { asin, active: true },
    select: { id: true },
  });
}
