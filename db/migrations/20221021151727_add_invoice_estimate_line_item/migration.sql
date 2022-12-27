-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "InvoiceStash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Estimate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Estimate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EstimateStash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateTemplate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "total" INTEGER NOT NULL,

    CONSTRAINT "EstimateTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "notes" TEXT,
    "estimateId" INTEGER,
    "estimateStashId" INTEGER,
    "estimateTemplateId" INTEGER,
    "estimateArchiveId" INTEGER,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "jobArchiveId" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "InvoiceArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EstimateArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "total" INTEGER NOT NULL DEFAULT 0,
    "jobId" INTEGER,
    "jobArchiveId" INTEGER,

    CONSTRAINT "EstimateArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InvoiceStashToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InvoiceArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToLineItem_AB_unique" ON "_InvoiceToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToLineItem_B_index" ON "_InvoiceToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceStashToLineItem_AB_unique" ON "_InvoiceStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceStashToLineItem_B_index" ON "_InvoiceStashToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceArchiveToLineItem_AB_unique" ON "_InvoiceArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceArchiveToLineItem_B_index" ON "_InvoiceArchiveToLineItem"("B");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceStash" ADD CONSTRAINT "InvoiceStash_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceStash" ADD CONSTRAINT "InvoiceStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Estimate" ADD CONSTRAINT "Estimate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateStash" ADD CONSTRAINT "EstimateStash_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateStash" ADD CONSTRAINT "EstimateStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_estimateId_fkey" FOREIGN KEY ("estimateId") REFERENCES "Estimate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_estimateStashId_fkey" FOREIGN KEY ("estimateStashId") REFERENCES "EstimateStash"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_estimateTemplateId_fkey" FOREIGN KEY ("estimateTemplateId") REFERENCES "EstimateTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_estimateArchiveId_fkey" FOREIGN KEY ("estimateArchiveId") REFERENCES "EstimateArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateArchive" ADD CONSTRAINT "EstimateArchive_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateArchive" ADD CONSTRAINT "EstimateArchive_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToLineItem" ADD CONSTRAINT "_InvoiceToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToLineItem" ADD CONSTRAINT "_InvoiceToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceStashToLineItem" ADD CONSTRAINT "_InvoiceStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "InvoiceStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceStashToLineItem" ADD CONSTRAINT "_InvoiceStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceArchiveToLineItem" ADD CONSTRAINT "_InvoiceArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "InvoiceArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceArchiveToLineItem" ADD CONSTRAINT "_InvoiceArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
