import { prisma } from "./db";
import { EventType, Prisma } from "@prisma/client";

export async function logEvent(args: {
  type: EventType;
  sessionId?: string;
  offerId?: string;
  giftId?: string;
  meta?: Record<string, unknown>;
}) {
  return prisma.event.create({
    data: {
      type: args.type,
      sessionId: args.sessionId,
      offerId: args.offerId,
      giftId: args.giftId,
      meta: args.meta as Prisma.InputJsonValue | undefined,
    },
  });
}
