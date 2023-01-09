/*
  Warnings:

  - Added the required column `customerId` to the `JobArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobArchive" ADD COLUMN     "customerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
