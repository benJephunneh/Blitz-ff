-- CreateEnum
CREATE TYPE "StashType" AS ENUM ('Customer', 'Location', 'Job', 'Invoice', 'Estimate');

-- CreateTable
CREATE TABLE "Stash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "body" TEXT,
    "type" "StashType" NOT NULL DEFAULT 'Customer',
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stash_pkey" PRIMARY KEY ("id")
);
