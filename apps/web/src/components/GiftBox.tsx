"use client";

import { Badge } from "./Badge";

interface Manufacturer {
  name: string;
  domain: string | null;
  supportEmail: string | null;
  returnsUrl: string | null;
  verified: boolean;
  madeInUsa: boolean;
}

interface Offer {
  id: string;
  title: string;
  directUrl: string;
  priceCents: number | null;
  currency: string;
}

interface Gift {
  id: string;
  recipientName: string | null;
  message: string | null;
}

interface GiftBoxProps {
  gift: Gift;
  offer: Offer;
  manufacturer: Manufacturer;
}

export function GiftBox({ gift, offer, manufacturer }: GiftBoxProps) {
  const handleClick = async () => {
    await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "gift_click",
        offerId: offer.id,
        giftId: gift.id,
        sessionId: crypto.randomUUID(),
      }),
    });
    window.open(offer.directUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white text-center">
        <div className="text-4xl mb-2">🎁</div>
        <h1 className="text-2xl font-bold">
          {gift.recipientName ? `A Gift for ${gift.recipientName}` : "You've received a gift!"}
        </h1>
      </div>

      <div className="p-6">
        {gift.message && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 italic text-gray-700">
            &quot;{gift.message}&quot;
          </div>
        )}

        <div className="flex gap-2 mb-4">
          {manufacturer.verified && <Badge variant="verified">Verified</Badge>}
          {manufacturer.madeInUsa && <Badge variant="usa">Made in USA</Badge>}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h2>
        <p className="text-gray-600 mb-6">by {manufacturer.name}</p>

        <button
          onClick={handleClick}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-colors"
        >
          Claim Your Gift
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          This will take you directly to the manufacturer&apos;s website.
        </p>
      </div>
    </div>
  );
}
