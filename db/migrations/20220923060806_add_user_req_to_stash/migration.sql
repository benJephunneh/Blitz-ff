/*
  Warnings:

  - Added the required column `userId` to the `Stash` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stash" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Stash" ADD CONSTRAINT "Stash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
