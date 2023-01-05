/*
  Warnings:

  - You are about to drop the column `stashId` on the `CustomerStash` table. All the data in the column will be lost.
  - You are about to drop the `Stash` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `CustomerStash` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `notes` to the `CustomerStash` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CustomerStash` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CustomerStash" DROP CONSTRAINT "CustomerStash_stashId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_userId_fkey";

-- DropIndex
DROP INDEX "CustomerStash_stashId_key";

-- AlterTable
ALTER TABLE "CustomerStash" DROP COLUMN "stashId",
ADD COLUMN     "notes" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Stash";

-- CreateIndex
CREATE UNIQUE INDEX "CustomerStash_userId_key" ON "CustomerStash"("userId");

-- AddForeignKey
ALTER TABLE "CustomerStash" ADD CONSTRAINT "CustomerStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
