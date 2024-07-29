-- CreateTable
CREATE TABLE "incomes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "every_month" BOOLEAN DEFAULT false,
    "month" INTEGER,
    "year" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
