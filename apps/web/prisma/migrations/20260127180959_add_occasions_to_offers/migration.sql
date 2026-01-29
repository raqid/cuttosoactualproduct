-- CreateEnum
CREATE TYPE "Occasion" AS ENUM ('birthday', 'wedding', 'housewarming', 'holiday', 'thank_you', 'just_because', 'baby_shower', 'graduation');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "description" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "occasions" "Occasion"[],
ADD COLUMN     "tags" TEXT[];
