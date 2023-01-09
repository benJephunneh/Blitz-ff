/*
  Warnings:

  - A unique constraint covering the columns `[jobarchiveId]` on the table `Locate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobarchiveId` to the `Locate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobArchive" ADD COLUMN     "locateId" INTEGER;

-- AlterTable
ALTER TABLE "Locate" ADD COLUMN     "jobarchiveId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "customerId" INTEGER,
    "locationId" INTEGER,
    "jobId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locate_jobarchiveId_key" ON "Locate"("jobarchiveId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locate" ADD CONSTRAINT "Locate_jobarchiveId_fkey" FOREIGN KEY ("jobarchiveId") REFERENCES "JobArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
