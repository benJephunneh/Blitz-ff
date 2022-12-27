/*
  Warnings:

  - Added the required column `customerArchiveId` to the `JobArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationArchiveId` to the `JobArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerArchiveId` to the `LocationArchive` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_customerId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_locationId_fkey";

-- DropForeignKey
ALTER TABLE "LocationArchive" DROP CONSTRAINT "LocationArchive_customerId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "jobArchiveId" INTEGER;

-- AlterTable
ALTER TABLE "JobArchive" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "customerArchiveId" INTEGER NOT NULL,
ADD COLUMN     "locationArchiveId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "LocationArchive" ADD COLUMN     "customerArchiveId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_JobArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobArchiveToLineItem_AB_unique" ON "_JobArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobArchiveToLineItem_B_index" ON "_JobArchiveToLineItem"("B");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationArchiveId_fkey" FOREIGN KEY ("locationArchiveId") REFERENCES "LocationArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobArchiveToLineItem" ADD CONSTRAINT "_JobArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "JobArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobArchiveToLineItem" ADD CONSTRAINT "_JobArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
