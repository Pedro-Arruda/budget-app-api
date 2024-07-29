-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "finalNumber" INTEGER,
    "balance" REAL,
    "availableCreditLimit" REAL,
    "balanceCloseDate" DATETIME,
    "balanceDueDate" TEXT,
    "brand" TEXT,
    "creditLimit" REAL
);
INSERT INTO "new_accounts" ("availableCreditLimit", "balance", "balanceCloseDate", "balanceDueDate", "brand", "creditLimit", "finalNumber", "id", "name") SELECT "availableCreditLimit", "balance", "balanceCloseDate", "balanceDueDate", "brand", "creditLimit", "finalNumber", "id", "name" FROM "accounts";
DROP TABLE "accounts";
ALTER TABLE "new_accounts" RENAME TO "accounts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
