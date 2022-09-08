-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "house" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
    "zipcode" TEXT NOT NULL,
    "block" TEXT,
    "lot" TEXT,
    "parcel" TEXT,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Location_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Location" ("block", "city", "createdAt", "customerId", "email", "house", "id", "lot", "parcel", "phone", "primary", "state", "street", "updatedAt", "zipcode") SELECT "block", "city", "createdAt", "customerId", "email", "house", "id", "lot", "parcel", "phone", "primary", "state", "street", "updatedAt", "zipcode" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_email_key" ON "Location"("email");
CREATE UNIQUE INDEX "Location_phone_key" ON "Location"("phone");
CREATE INDEX "Location_email_phone_house_street_city_zipcode_block_lot_parcel_idx" ON "Location"("email", "phone", "house", "street", "city", "zipcode", "block", "lot", "parcel");
CREATE TABLE "new_LocationArchive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT true,
    "house" TEXT,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'FL',
    "zipcode" TEXT NOT NULL,
    "block" TEXT,
    "lot" TEXT,
    "parcel" TEXT,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "LocationArchive_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "CustomerArchive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LocationArchive" ("block", "city", "createdAt", "customerId", "email", "house", "id", "lot", "parcel", "phone", "primary", "state", "street", "updatedAt", "zipcode") SELECT "block", "city", "createdAt", "customerId", "email", "house", "id", "lot", "parcel", "phone", "primary", "state", "street", "updatedAt", "zipcode" FROM "LocationArchive";
DROP TABLE "LocationArchive";
ALTER TABLE "new_LocationArchive" RENAME TO "LocationArchive";
CREATE UNIQUE INDEX "LocationArchive_email_key" ON "LocationArchive"("email");
CREATE UNIQUE INDEX "LocationArchive_phone_key" ON "LocationArchive"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Job_title_start_end_idx" ON "Job"("title", "start", "end");
