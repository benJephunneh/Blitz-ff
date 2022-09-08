-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LocationArchive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
