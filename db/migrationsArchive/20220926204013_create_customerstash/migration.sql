/*
  Warnings:

  - You are about to drop the column `body` on the `Stash` table. All the data in the column will be lost.
  - You are about to drop the `JobStash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LocationStash` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `notes` to the `Stash` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "JobStash" DROP CONSTRAINT "JobStash_locationId_fkey";

-- DropForeignKey
ALTER TABLE "JobStash" DROP CONSTRAINT "JobStash_stashId_fkey";

-- DropForeignKey
ALTER TABLE "LocationStash" DROP CONSTRAINT "LocationStash_customerId_fkey";

-- DropForeignKey
ALTER TABLE "LocationStash" DROP CONSTRAINT "LocationStash_stashId_fkey";

-- AlterTable
ALTER TABLE "Stash" DROP COLUMN "body",
ADD COLUMN     "notes" TEXT NOT NULL;

-- DropTable
DROP TABLE "JobStash";

-- DropTable
DROP TABLE "LocationStash";
