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
    "locationType" "LocationType" NOT NULL DEFAULT 'Personal',
    "customerId" INTEGER NOT NULL,
    "stashType" "StashType" NOT NULL DEFAULT 'Location',
    "userId" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,

    CONSTRAINT "LocationStash_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LocationStash" ADD CONSTRAINT "LocationStash_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
