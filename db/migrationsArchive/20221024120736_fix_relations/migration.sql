/*
  Warnings:

  - You are about to drop the column `estimateArchiveId` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `estimateId` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `estimateStashId` on the `LineItem` table. All the data in the column will be lost.
  - You are about to drop the column `estimateTemplateId` on the `LineItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_estimateArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_estimateId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_estimateStashId_fkey";

-- DropForeignKey
ALTER TABLE "LineItem" DROP CONSTRAINT "LineItem_estimateTemplateId_fkey";

-- AlterTable
ALTER TABLE "LineItem" DROP COLUMN "estimateArchiveId",
DROP COLUMN "estimateId",
DROP COLUMN "estimateStashId",
DROP COLUMN "estimateTemplateId";

-- CreateTable
CREATE TABLE "LineItemTemplate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "LineItemTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EstimateToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateStashToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateTemplateToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LineItemToLineItemTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateToLineItem_AB_unique" ON "_EstimateToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateToLineItem_B_index" ON "_EstimateToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateStashToLineItem_AB_unique" ON "_EstimateStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateStashToLineItem_B_index" ON "_EstimateStashToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateTemplateToLineItem_AB_unique" ON "_EstimateTemplateToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateTemplateToLineItem_B_index" ON "_EstimateTemplateToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LineItemToLineItemTemplate_AB_unique" ON "_LineItemToLineItemTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_LineItemToLineItemTemplate_B_index" ON "_LineItemToLineItemTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateArchiveToLineItem_AB_unique" ON "_EstimateArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateArchiveToLineItem_B_index" ON "_EstimateArchiveToLineItem"("B");

-- AddForeignKey
ALTER TABLE "_EstimateToLineItem" ADD CONSTRAINT "_EstimateToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Estimate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateToLineItem" ADD CONSTRAINT "_EstimateToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateStashToLineItem" ADD CONSTRAINT "_EstimateStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateStashToLineItem" ADD CONSTRAINT "_EstimateStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateTemplateToLineItem" ADD CONSTRAINT "_EstimateTemplateToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateTemplateToLineItem" ADD CONSTRAINT "_EstimateTemplateToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineItemToLineItemTemplate" ADD CONSTRAINT "_LineItemToLineItemTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineItemToLineItemTemplate" ADD CONSTRAINT "_LineItemToLineItemTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItemTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateArchiveToLineItem" ADD CONSTRAINT "_EstimateArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateArchiveToLineItem" ADD CONSTRAINT "_EstimateArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
