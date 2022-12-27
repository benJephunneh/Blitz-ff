-- DropForeignKey
ALTER TABLE "InvoiceArchive" DROP CONSTRAINT "InvoiceArchive_jobArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceArchive" DROP CONSTRAINT "InvoiceArchive_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_customerArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_customerId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_locationArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_locationId_fkey";

-- DropForeignKey
ALTER TABLE "LocationArchive" DROP CONSTRAINT "LocationArchive_customerArchiveId_fkey";

-- DropForeignKey
ALTER TABLE "LocationArchive" DROP CONSTRAINT "LocationArchive_customerId_fkey";

-- AlterTable
ALTER TABLE "InvoiceArchive" ALTER COLUMN "jobId" DROP NOT NULL,
ALTER COLUMN "jobArchiveId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JobArchive" ALTER COLUMN "locationId" DROP NOT NULL,
ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "customerArchiveId" DROP NOT NULL,
ALTER COLUMN "locationArchiveId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LocationArchive" ALTER COLUMN "customerId" DROP NOT NULL,
ALTER COLUMN "customerArchiveId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationArchiveId_fkey" FOREIGN KEY ("locationArchiveId") REFERENCES "LocationArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
