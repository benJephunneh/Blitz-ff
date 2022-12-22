-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "locateRequired" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Locate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,

    CONSTRAINT "Locate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Locate_jobId_key" ON "Locate"("jobId");

-- AddForeignKey
ALTER TABLE "Locate" ADD CONSTRAINT "Locate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
