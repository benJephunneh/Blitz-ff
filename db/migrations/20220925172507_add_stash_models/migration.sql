-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Stash" DROP CONSTRAINT "Stash_locationId_fkey";

-- CreateTable
CREATE TABLE "CustomerStash" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstname" TEXT,
    "lastname" TEXT,
    "companyname" TEXT,
    "displayname" TEXT,
    "email" TEXT,
    "stashId" INTEGER NOT NULL,

    CONSTRAINT "CustomerStash_pkey" PRIMARY KEY ("id")
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
    "type" "LocationType" NOT NULL DEFAULT 'Personal',
    "customerId" INTEGER NOT NULL,
    "stashId" INTEGER NOT NULL,

    CONSTRAINT "LocationStash_pkey" PRIMARY KEY ("id")
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
    "stashId" INTEGER NOT NULL,

    CONSTRAINT "JobStash_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerStash_stashId_key" ON "CustomerStash"("stashId");

-- CreateIndex
CREATE UNIQUE INDEX "LocationStash_stashId_key" ON "LocationStash"("stashId");

-- CreateIndex
CREATE UNIQUE INDEX "JobStash_stashId_key" ON "JobStash"("stashId");

-- AddForeignKey
ALTER TABLE "CustomerStash" ADD CONSTRAINT "CustomerStash_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobStash" ADD CONSTRAINT "JobStash_stashId_fkey" FOREIGN KEY ("stashId") REFERENCES "Stash"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
