-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('resolve', 'offer_view', 'offer_click', 'gift_view', 'gift_click');

-- CreateTable
CREATE TABLE "Manufacturer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "domain" TEXT,
    "supportEmail" TEXT,
    "returnsUrl" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "madeInUsa" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Manufacturer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "manufacturerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "directUrl" TEXT NOT NULL,
    "priceCents" INTEGER,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "asin" VARCHAR(16),
    "identifiers" JSONB,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftLink" (
    "id" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "recipientName" TEXT,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "sessionId" TEXT,
    "offerId" TEXT,
    "giftId" TEXT,
    "meta" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SourceRequest" (
    "id" TEXT NOT NULL,
    "asin" TEXT,
    "amazonUrl" TEXT NOT NULL,
    "title" TEXT,
    "userEmail" TEXT,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedOfferId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SourceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Offer_asin_idx" ON "Offer"("asin");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_sessionId_idx" ON "Event"("sessionId");

-- CreateIndex
CREATE INDEX "Event_offerId_idx" ON "Event"("offerId");

-- CreateIndex
CREATE INDEX "Event_giftId_idx" ON "Event"("giftId");

-- CreateIndex
CREATE INDEX "SourceRequest_asin_idx" ON "SourceRequest"("asin");

-- CreateIndex
CREATE INDEX "SourceRequest_amazonUrl_idx" ON "SourceRequest"("amazonUrl");

-- CreateIndex
CREATE INDEX "SourceRequest_resolved_idx" ON "SourceRequest"("resolved");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "Manufacturer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GiftLink" ADD CONSTRAINT "GiftLink_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "GiftLink"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SourceRequest" ADD CONSTRAINT "SourceRequest_resolvedOfferId_fkey" FOREIGN KEY ("resolvedOfferId") REFERENCES "Offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
