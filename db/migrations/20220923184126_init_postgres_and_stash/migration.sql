-- CreateEnum
CREATE TYPE "StashType" AS ENUM ('Customer', 'Location', 'Job', 'Invoice', 'Estimate');

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "phones" SET NOT NULL,
ALTER COLUMN "phones" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LocationArchive" ALTER COLUMN "phones" SET NOT NULL,
ALTER COLUMN "phones" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Stash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT NOT NULL,
    "type" "StashType" NOT NULL DEFAULT 'Customer',
    "userId" INTEGER NOT NULL,
    "customerId" INTEGER,
    "locationId" INTEGER,
    "jobId" INTEGER,

    CONSTRAINT "Stash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
