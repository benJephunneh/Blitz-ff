/*
  Warnings:

  - Added the required column `title` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `LocationArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `LocationArchive` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `JobArchive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "Job_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("createdAt", "end", "id", "locationId", "start", "updatedAt") SELECT "createdAt", "end", "id", "locationId", "start", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE TABLE "new_LocationArchive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
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
INSERT INTO "new_LocationArchive" ("block", "city", "createdAt", "customerId", "house", "id", "lot", "parcel", "primary", "state", "street", "updatedAt", "zipcode") SELECT "block", "city", "createdAt", "customerId", "house", "id", "lot", "parcel", "primary", "state", "street", "updatedAt", "zipcode" FROM "LocationArchive";
DROP TABLE "LocationArchive";
ALTER TABLE "new_LocationArchive" RENAME TO "LocationArchive";
CREATE UNIQUE INDEX "LocationArchive_email_key" ON "LocationArchive"("email");
CREATE TABLE "new_Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
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
INSERT INTO "new_Location" ("block", "city", "createdAt", "customerId", "house", "id", "lot", "parcel", "primary", "state", "street", "updatedAt", "zipcode") SELECT "block", "city", "createdAt", "customerId", "house", "id", "lot", "parcel", "primary", "state", "street", "updatedAt", "zipcode" FROM "Location";
DROP TABLE "Location";
ALTER TABLE "new_Location" RENAME TO "Location";
CREATE UNIQUE INDEX "Location_email_key" ON "Location"("email");
CREATE INDEX "Location_email_phone_house_street_city_zipcode_block_lot_parcel_idx" ON "Location"("email", "phone", "house", "street", "city", "zipcode", "block", "lot", "parcel");
CREATE TABLE "new_JobArchive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationArchive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_JobArchive" ("createdAt", "end", "id", "locationId", "start", "updatedAt") SELECT "createdAt", "end", "id", "locationId", "start", "updatedAt" FROM "JobArchive";
DROP TABLE "JobArchive";
ALTER TABLE "new_JobArchive" RENAME TO "JobArchive";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE INDEX "Customer_firstname_lastname_idx" ON "Customer"("firstname", "lastname");
