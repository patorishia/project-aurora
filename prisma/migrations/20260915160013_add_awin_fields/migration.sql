/*
  Warnings:

  - A unique constraint covering the columns `[source,sourceId]` on the table `Coupon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[awinAdvertiserId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "sourceId" TEXT,
ADD COLUMN     "startsAt" TIMESTAMP(3),
ADD COLUMN     "trackingUrl" TEXT;

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "awinAdvertiserId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_source_sourceId_key" ON "Coupon"("source", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_awinAdvertiserId_key" ON "Store"("awinAdvertiserId");
