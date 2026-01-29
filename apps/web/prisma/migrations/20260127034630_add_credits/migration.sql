-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('purchase', 'gift_sent', 'gift_received', 'redemption', 'refund');

-- CreateEnum
CREATE TYPE "GiftStatus" AS ENUM ('pending', 'redeemed', 'expired', 'cancelled');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'credit_purchased';
ALTER TYPE "EventType" ADD VALUE 'credit_gift_sent';
ALTER TYPE "EventType" ADD VALUE 'credit_gift_redeemed';
ALTER TYPE "EventType" ADD VALUE 'credit_used';

-- CreateTable
CREATE TABLE "CreditBalance" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "balanceCents" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditBalance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditTransaction" (
    "id" TEXT NOT NULL,
    "balanceId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "referenceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GiftCredit" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "recipientId" TEXT,
    "amountCents" INTEGER NOT NULL,
    "message" TEXT,
    "token" TEXT NOT NULL,
    "status" "GiftStatus" NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "redeemedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GiftCredit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditBalance_userId_key" ON "CreditBalance"("userId");

-- CreateIndex
CREATE INDEX "CreditTransaction_balanceId_idx" ON "CreditTransaction"("balanceId");

-- CreateIndex
CREATE INDEX "CreditTransaction_type_idx" ON "CreditTransaction"("type");

-- CreateIndex
CREATE INDEX "CreditTransaction_createdAt_idx" ON "CreditTransaction"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "GiftCredit_token_key" ON "GiftCredit"("token");

-- CreateIndex
CREATE INDEX "GiftCredit_senderId_idx" ON "GiftCredit"("senderId");

-- CreateIndex
CREATE INDEX "GiftCredit_recipientEmail_idx" ON "GiftCredit"("recipientEmail");

-- CreateIndex
CREATE INDEX "GiftCredit_token_idx" ON "GiftCredit"("token");

-- CreateIndex
CREATE INDEX "GiftCredit_status_idx" ON "GiftCredit"("status");

-- AddForeignKey
ALTER TABLE "CreditTransaction" ADD CONSTRAINT "CreditTransaction_balanceId_fkey" FOREIGN KEY ("balanceId") REFERENCES "CreditBalance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
