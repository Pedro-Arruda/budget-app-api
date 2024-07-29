import {
  Account,
  Category,
  FixedExpenses,
  Incomes,
  Invoices,
  Transaction,
} from "@prisma/client";
import { z } from "zod";

export interface TransactionRepository {
  listTransactions(
    accountId: string,
    month?: string,
    to?: string
  ): Promise<Transaction[]>;
  listCategories(): Promise<Category[]>;
  findAccountByItemId(itemId: string): Promise<Account | null>;
  getFixedExpenses(): Promise<FixedExpenses[]>;
  getIncomes(): Promise<Incomes[]>;
  getInvoices(): Promise<Invoices[]>;
}

export const ListTransactionsSchema = z.object({
  itemId: z.string(),
  month: z.string().optional(),
  year: z.string().optional(),
});

export const MonthReportSchema = z.object({
  itemId: z.string(),
});
