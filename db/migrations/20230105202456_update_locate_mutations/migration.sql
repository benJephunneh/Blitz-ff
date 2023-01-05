-- DropForeignKey
ALTER TABLE "Locate" DROP CONSTRAINT "Locate_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Locate" DROP CONSTRAINT "Locate_jobarchiveId_fkey";

-- AlterTable
ALTER TABLE "Locate" ALTER COLUMN "jobId" DROP NOT NULL,
ALTER COLUMN "jobarchiveId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Locate" ADD CONSTRAINT "Locate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locate" ADD CONSTRAINT "Locate_jobarchiveId_fkey" FOREIGN KEY ("jobarchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;
