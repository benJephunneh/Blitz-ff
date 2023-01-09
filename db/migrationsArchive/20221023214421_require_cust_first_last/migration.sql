/*
  Warnings:

  - Made the column `firstname` on table `Customer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastname` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "firstname" SET NOT NULL,
ALTER COLUMN "lastname" SET NOT NULL;
