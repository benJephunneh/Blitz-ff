/*
  Warnings:

  - Added the required column `needBy` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "needBy" TIMESTAMP(3) NOT NULL;
