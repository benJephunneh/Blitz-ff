-- CreateTable
CREATE TABLE "JobArchive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "start" DATETIME,
    "end" DATETIME,
    "locationId" INTEGER NOT NULL,
    CONSTRAINT "JobArchive_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "LocationArchive" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
