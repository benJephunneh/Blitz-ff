-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "companyname" TEXT,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;
