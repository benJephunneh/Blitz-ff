/*
  Warnings:

  - The `email` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `email` column on the `CustomerStash` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "phone" TEXT[],
DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];

-- AlterTable
ALTER TABLE "CustomerStash" ADD COLUMN     "phone" TEXT[],
DROP COLUMN "email",
ADD COLUMN     "email" TEXT[];
