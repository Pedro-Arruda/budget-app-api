import {
  Account,
  Category,
  FixedExpenses,
  Incomes,
  Invoices,
  Transaction,
} from "@prisma/client";
import { z } from "zod";
import { TransactionCreateInputSchema } from "../../prisma/generated/zod";

export interface TransactionRepository {
  listTransactions(
    accountId: string,
    month?: string,
    to?: string
  ): Promise<Transaction[]>;
  createTransaction(transaction: TransactionCreateInput): Promise<Transaction>;
  listCategories(): Promise<Category[]>;
  findAccountByItemId(itemId: string): Promise<Account | null>;
  getFixedExpenses(accountId: string): Promise<FixedExpenses[]>;
  getIncomes(accountId: string): Promise<Incomes[]>;
  getInvoices(accountId: string): Promise<Invoices[]>;
}

export const ListTransactionsSchema = z.object({
  itemId: z.string(),
  month: z.string().optional(),
  year: z.string().optional(),
});

export const MonthReportSchema = z.object({
  itemId: z.string(),
});

export type TransactionCreateInput = z.infer<
  typeof TransactionCreateInputSchema
>;
