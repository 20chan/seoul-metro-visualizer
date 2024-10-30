-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Station" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL
);
INSERT INTO "new_Station" ("id", "line", "name", "x", "y") SELECT "id", "line", "name", "x", "y" FROM "Station";
DROP TABLE "Station";
ALTER TABLE "new_Station" RENAME TO "Station";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
