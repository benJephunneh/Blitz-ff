-- CreateEnum
CREATE TYPE "CustomerType" AS ENUM ('Owner', 'Manager', 'Realtor', 'Builder');

-- CreateEnum
CREATE TYPE "EmailType" AS ENUM ('Personal', 'Business');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('Primary', 'Secondary', 'Office');

-- CreateEnum
CREATE TYPE "Permit" AS ENUM ('None', 'PendingNotPaid', 'PendingPaid', 'Received', 'Active', 'Expired');

-- CreateEnum
CREATE TYPE "StashType" AS ENUM ('Customer', 'Location', 'Job', 'Invoice', 'Estimate');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('Personal', 'Business', 'Managed');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Owner', 'Admin', 'Tech');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "companyname" TEXT,
    "displayname" TEXT NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "companyname" TEXT,
    "displayname" TEXT,
    "notes" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "stashType" "StashType" NOT NULL DEFAULT 'Customer',
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "CustomerStash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "house" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
    "zipcode" TEXT NOT NULL,
    "phones" TEXT NOT NULL,
    "block" TEXT,
    "lot" TEXT,
    "parcel" TEXT,
    "locationType" "LocationType" NOT NULL DEFAULT 'Personal',
    "customerId" INTEGER NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "house" TEXT,
    "street" TEXT,
    "city" TEXT,
    "state" TEXT DEFAULT 'FL',
    "zipcode" TEXT,
    "phones" TEXT,
    "block" TEXT,
    "lot" TEXT,
    "parcel" TEXT,
    "locationType" "LocationType" NOT NULL DEFAULT 'Personal',
    "customerId" INTEGER NOT NULL,
    "stashType" "StashType" NOT NULL DEFAULT 'Location',
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "LocationStash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "locationId" INTEGER NOT NULL,
    "notes" TEXT,
    "userId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "locationId" INTEGER NOT NULL,
    "stashType" "StashType" NOT NULL DEFAULT 'Job',
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "JobStash_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "notes" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "sent" BOOLEAN NOT NULL DEFAULT false,
    "jobArchiveId" INTEGER,

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
    "stashType" "StashType" NOT NULL DEFAULT 'Invoice',

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
    "stashType" "StashType" NOT NULL DEFAULT 'Estimate',

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

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItemTemplate" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "LineItemTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "companyname" TEXT,
    "displayname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "notes" TEXT,
    "phone" TEXT NOT NULL,

    CONSTRAINT "CustomerArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "house" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
    "zipcode" TEXT NOT NULL,
    "phones" TEXT NOT NULL,
    "block" TEXT,
    "lot" TEXT,
    "parcel" TEXT,
    "customerId" INTEGER,
    "locationType" "LocationType" NOT NULL DEFAULT 'Personal',
    "notes" TEXT,
    "customerArchiveId" INTEGER,

    CONSTRAINT "LocationArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "locationId" INTEGER,
    "notes" TEXT,
    "customerId" INTEGER,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "customerArchiveId" INTEGER,
    "locationArchiveId" INTEGER,

    CONSTRAINT "JobArchive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceArchive" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "jobId" INTEGER,
    "jobArchiveId" INTEGER,
    "notes" TEXT,
    "paid" BOOLEAN NOT NULL,

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
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'Tech',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_JobToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JobStashToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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
CREATE TABLE "_EstimateToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateStashToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateTemplateToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_LineItemToLineItemTemplate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_JobArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_InvoiceArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_EstimateArchiveToLineItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "_JobToLineItem_AB_unique" ON "_JobToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobToLineItem_B_index" ON "_JobToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JobStashToLineItem_AB_unique" ON "_JobStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobStashToLineItem_B_index" ON "_JobStashToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToLineItem_AB_unique" ON "_InvoiceToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToLineItem_B_index" ON "_InvoiceToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceStashToLineItem_AB_unique" ON "_InvoiceStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceStashToLineItem_B_index" ON "_InvoiceStashToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateToLineItem_AB_unique" ON "_EstimateToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateToLineItem_B_index" ON "_EstimateToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateStashToLineItem_AB_unique" ON "_EstimateStashToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateStashToLineItem_B_index" ON "_EstimateStashToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateTemplateToLineItem_AB_unique" ON "_EstimateTemplateToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateTemplateToLineItem_B_index" ON "_EstimateTemplateToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_LineItemToLineItemTemplate_AB_unique" ON "_LineItemToLineItemTemplate"("A", "B");

-- CreateIndex
CREATE INDEX "_LineItemToLineItemTemplate_B_index" ON "_LineItemToLineItemTemplate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_JobArchiveToLineItem_AB_unique" ON "_JobArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_JobArchiveToLineItem_B_index" ON "_JobArchiveToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceArchiveToLineItem_AB_unique" ON "_InvoiceArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceArchiveToLineItem_B_index" ON "_InvoiceArchiveToLineItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EstimateArchiveToLineItem_AB_unique" ON "_EstimateArchiveToLineItem"("A", "B");

-- CreateIndex
CREATE INDEX "_EstimateArchiveToLineItem_B_index" ON "_EstimateArchiveToLineItem"("B");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerStash" ADD CONSTRAINT "CustomerStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationArchive" ADD CONSTRAINT "LocationArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerArchiveId_fkey" FOREIGN KEY ("customerArchiveId") REFERENCES "CustomerArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationArchiveId_fkey" FOREIGN KEY ("locationArchiveId") REFERENCES "LocationArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobArchive" ADD CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceArchive" ADD CONSTRAINT "InvoiceArchive_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateArchive" ADD CONSTRAINT "EstimateArchive_jobArchiveId_fkey" FOREIGN KEY ("jobArchiveId") REFERENCES "JobArchive"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EstimateArchive" ADD CONSTRAINT "EstimateArchive_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToLineItem" ADD CONSTRAINT "_JobToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobToLineItem" ADD CONSTRAINT "_JobToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobStashToLineItem" ADD CONSTRAINT "_JobStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "JobStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobStashToLineItem" ADD CONSTRAINT "_JobStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToLineItem" ADD CONSTRAINT "_InvoiceToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToLineItem" ADD CONSTRAINT "_InvoiceToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceStashToLineItem" ADD CONSTRAINT "_InvoiceStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "InvoiceStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceStashToLineItem" ADD CONSTRAINT "_InvoiceStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateToLineItem" ADD CONSTRAINT "_EstimateToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Estimate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateToLineItem" ADD CONSTRAINT "_EstimateToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateStashToLineItem" ADD CONSTRAINT "_EstimateStashToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateStash"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateStashToLineItem" ADD CONSTRAINT "_EstimateStashToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateTemplateToLineItem" ADD CONSTRAINT "_EstimateTemplateToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateTemplateToLineItem" ADD CONSTRAINT "_EstimateTemplateToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineItemToLineItemTemplate" ADD CONSTRAINT "_LineItemToLineItemTemplate_A_fkey" FOREIGN KEY ("A") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LineItemToLineItemTemplate" ADD CONSTRAINT "_LineItemToLineItemTemplate_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItemTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobArchiveToLineItem" ADD CONSTRAINT "_JobArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "JobArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JobArchiveToLineItem" ADD CONSTRAINT "_JobArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceArchiveToLineItem" ADD CONSTRAINT "_InvoiceArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "InvoiceArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceArchiveToLineItem" ADD CONSTRAINT "_InvoiceArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateArchiveToLineItem" ADD CONSTRAINT "_EstimateArchiveToLineItem_A_fkey" FOREIGN KEY ("A") REFERENCES "EstimateArchive"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EstimateArchiveToLineItem" ADD CONSTRAINT "_EstimateArchiveToLineItem_B_fkey" FOREIGN KEY ("B") REFERENCES "LineItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
