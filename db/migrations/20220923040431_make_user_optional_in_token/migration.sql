-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_stashId_fkey";

-- DropForeignKey
ALTER TABLE "Token" DROP CONSTRAINT "Token_userId_fkey";

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "stashId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash"("id") ON DELETE SET NULL ON UPDATE CASCADE;
