-- CreateTable
CREATE TABLE "Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "x" DECIMAL NOT NULL,
    "y" DECIMAL NOT NULL
);