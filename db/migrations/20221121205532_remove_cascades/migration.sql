-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_locationId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_customerId_fkey";

-- DropForeignKey
ALTER TABLE "JobArchive" DROP CONSTRAINT "JobArchive_locationId_fkey";

-- DropForeignKey
ALTER TABLE "JobStash" DROP CONSTRAINT "JobStash_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_customerId_fkey";

-- DropForeignKey
ALTER TABLE "LocationArchive" DROP CONSTRAINT "LocationArchive_customerId_fkey";

-- DropForeignKey
ALTER TABLE "LocationStash" DROP CONSTRAINT "LocationStash_customerId_fkey";

-- DropIndex
DROP INDEX "Customer_email_key";

-- DropIndex
DROP INDEX "CustomerArchive_email_key";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
