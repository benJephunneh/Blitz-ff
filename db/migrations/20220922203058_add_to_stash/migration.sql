/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Stash` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Stash` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashedToken]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - Made the column `body` on table `Stash` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `stashId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "TokenType" ADD VALUE 'STASH_EXPIRATION';

-- DropIndex
DROP INDEX "Token_hashedToken_type_key";

-- AlterTable
ALTER TABLE "Stash" DROP COLUMN "expiresAt",
DROP COLUMN "type",
ADD COLUMN     "customerId" INTEGER,
ADD COLUMN     "jobId" INTEGER,
ADD COLUMN     "locationId" INTEGER,
ALTER COLUMN "body" SET NOT NULL;

-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "stashId" INTEGER NOT NULL,
ALTER COLUMN "sentTo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_key" ON "Token"("hashedToken");

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
