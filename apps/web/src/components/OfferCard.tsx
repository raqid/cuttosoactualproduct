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

interface OfferCardProps {
  offer: Offer;
  manufacturer: Manufacturer;
}

export function OfferCard({ offer, manufacturer }: OfferCardProps) {
  const handleClick = async () => {
    // Log click event before redirect
    await fetch("/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "offer_click",
        offerId: offer.id,
        sessionId: crypto.randomUUID(),
      }),
    });
    window.open(offer.directUrl, "_blank", "noopener,noreferrer");
  };

  const price = offer.priceCents
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: offer.currency,
      }).format(offer.priceCents / 100)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          {manufacturer.verified && <Badge variant="verified">Verified</Badge>}
          {manufacturer.madeInUsa && <Badge variant="usa">Made in USA</Badge>}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h1>
        <p className="text-gray-600 mb-4">by {manufacturer.name}</p>

        {price && <p className="text-3xl font-bold text-indigo-600 mb-6">{price}</p>}

        <button
          onClick={handleClick}
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors"
        >
          Buy Direct from Manufacturer
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Support & Returns</h3>
          <div className="space-y-2 text-sm text-gray-600">
            {manufacturer.supportEmail && (
              <p>
                Email:{" "}
                <a
                  href={`mailto:${manufacturer.supportEmail}`}
                  className="text-indigo-600 hover:underline"
                >
                  {manufacturer.supportEmail}
                </a>
              </p>
            )}
            {manufacturer.returnsUrl && (
              <p>
                Returns:{" "}
                <a
                  href={manufacturer.returnsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  View Return Policy
                </a>
              </p>
            )}
            {manufacturer.domain && (
              <p>
                Website:{" "}
                <a
                  href={`https://${manufacturer.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  {manufacturer.domain}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
