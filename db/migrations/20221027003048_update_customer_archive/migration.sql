/*
  Warnings:

  - Added the required column `phone` to the `CustomerArchive` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CustomerArchive" ADD COLUMN     "phone" TEXT NOT NULL;
