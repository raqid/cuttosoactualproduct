import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { OfferCard } from "@/components/OfferCard";

interface PageProps {
  params: Promise<{ offerId: string }>;
}

export default async function OfferPage({ params }: PageProps) {
  const { offerId } = await params;

  const offer = await prisma.offer.findUnique({
    where: { id: offerId },
    include: {
      manufacturer: true,
    },
  });

  if (!offer) {
    notFound();
  }

  // Log offer_view event
  await prisma.event.create({
    data: {
      type: "offer_view",
      offerId: offer.id,
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4">
        <OfferCard offer={offer} manufacturer={offer.manufacturer} />
      </div>
    </main>
  );
}
