-- AlterTable
ALTER TABLE "CustomerStash" ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "phone" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "EstimateStash" ADD COLUMN     "stashType" "StashType" NOT NULL DEFAULT 'Estimate';

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "sent" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "InvoiceStash" ADD COLUMN     "stashType" "StashType" NOT NULL DEFAULT 'Invoice';

-- AlterTable
ALTER TABLE "JobStash" ALTER COLUMN "stashType" SET DEFAULT 'Job';

-- CreateTable
CREATE TABLE "_JobStashToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_JobStashToLineItem_AB_unique" ON "_JobStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobStashToLineItem_B_index" ON "_JobStashToLineItem"("B");

-- AddForeignKey
ALTER TABLE "_JobStashToLineItem" ADD CONSTRAINT "_JobStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "JobStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobStashToLineItem" ADD CONSTRAINT "_JobStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
