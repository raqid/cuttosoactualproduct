import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { GiftBox } from "@/components/GiftBox";

interface PageProps {
  params: Promise<{ giftId: string }>;
}

export default async function GiftPage({ params }: PageProps) {
  const { giftId } = await params;

  const gift = await prisma.giftLink.findUnique({
    where: { id: giftId },
    include: {
      offer: {
        include: {
          manufacturer: true,
        },
      },
    },
  });

  if (!gift) {
    notFound();
  }

  // Log gift_view event
  await prisma.event.create({
    data: {
      type: "gift_view",
      offerId: gift.offerId,
      giftId: gift.id,
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <GiftBox gift={gift} offer={gift.offer} manufacturer={gift.offer.manufacturer} />
      </div>
    </main>
  );
}
