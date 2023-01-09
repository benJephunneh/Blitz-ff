/*
  Warnings:

  - Added the required column `paid` to the `InvoiceArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "InvoiceArchive" ADD COLUMN     "paid" BOOLEAN NOT NULL;
