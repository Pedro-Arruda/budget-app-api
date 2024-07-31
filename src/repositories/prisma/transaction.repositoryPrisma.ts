import {
  Account,
  Category,
  FixedExpenses,
  Incomes,
  Invoices,
  Transaction,
} from "@prisma/client";
import { randomUUID } from "node:crypto";
import {
  TransactionCreateInput,
  TransactionRepository,
} from "../../interfaces/transaction.interface";
import { prisma } from "../../utils/prisma";

class TransactionRepositoryPrisma implements TransactionRepository {
  async findAccountByItemId(itemId: string): Promise<Account | null> {
    const result = await prisma.account.findMany({ where: { itemId } });

    return result[0];
  }

  async listTransactions(
    accountId: string,
    firstDayOfMonth?: string,
    lastDayOfMonth?: string
  ): Promise<Transaction[]> {
    const result = await prisma.transaction.findMany({
      where: {
        date: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
        accountId,
        amount: {
          gte: "0",
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return result;
  }

  async createTransaction(
    transaction: TransactionCreateInput
  ): Promise<Transaction> {
    const result = await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        date: new Date(transaction.date).toISOString(),
        description: transaction.description,
        id: randomUUID(),
      },
    });

    return result;
  }

  async listCategories(): Promise<Category[]> {
    const result = await prisma.category.findMany();

    return result;
  }

  async getFixedExpenses(accountId: string): Promise<FixedExpenses[]> {
    const result = await prisma.fixedExpenses.findMany({
      where: { accountId },
    });
    return result;
  }

  async getIncomes(accountId: string): Promise<Incomes[]> {
    const result = await prisma.incomes.findMany({ where: { accountId } });

    return result;
  }

  async getInvoices(accountId: string): Promise<Invoices[]> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const monthsAndYears = [];

    for (let i = 0; i <= 6; i++) {
      const month = (currentMonth + i) % 12 || 12;
      const year = currentYear + Math.floor((currentMonth + i - 1) / 12);
      monthsAndYears.push({ month, year });
    }

    const result = await prisma.invoices.findMany({
      where: {
        accountId,
        OR: monthsAndYears.map(({ month, year }) => ({ month, year })),
      },
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });

    return result;
  }
}

export { TransactionRepositoryPrisma };
