import { Transaction } from "@prisma/client";
import { TransactionFilters } from "pluggy-sdk";
import {
  TransactionCreateInput,
  TransactionRepository,
} from "../../interfaces/transaction.interface";
import { months } from "../../utils/months";
import { prisma } from "../../utils/prisma";
import { getMonthIncome } from "./utils/getMonthIncome";

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
class TransactionService {
  private transactionRepository: TransactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  async listTransactions(
    itemId: string,
    month?: string,
    year?: string
  ): Promise<any> {
    try {
      const firstDayOfMonth = new Date(
        Number(year),
        Number(month) - 1,
        1
      ).toISOString();

      const lastDayOfMonth = new Date(
        Number(year),
        Number(month),
        0
      ).toISOString();

      const account = await this.transactionRepository.findAccountByItemId(
        itemId
      );

      if (!account) throw new Error("ItemId invalid ");

      let optionsTransations: TransactionFilters = {};

      if (month) optionsTransations.from = firstDayOfMonth;
      if (month) optionsTransations.to = lastDayOfMonth;

      const transactions = await this.transactionRepository.listTransactions(
        account.id,
        firstDayOfMonth,
        lastDayOfMonth
      );

      const categories = await this.transactionRepository.listCategories();

      const transactionsWithTransalatedCategory = transactions.map(
        (transaction: any) => {
          let transactionWithTransalatedCategory: any = { ...transaction };

          const category: any = categories.find(
            (categorie) => categorie.id === transaction.categoryId
          );

          if (!category) return transaction;

          transactionWithTransalatedCategory.category =
            category.descriptionTranslated;

          return transactionWithTransalatedCategory;
        }
      );

      return transactionsWithTransalatedCategory;
    } catch (error: any) {
      throw new Error("Failed to exchange token: " + error.message);
    }
  }

  async createTransaction(
    transaction: TransactionCreateInput
  ): Promise<Transaction> {
    console.log(transaction);

    try {
      const result = await this.transactionRepository.createTransaction(
        transaction
      );

      return result;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async monthsReport(itemId: string): Promise<any> {
    try {
      const account = await this.transactionRepository.findAccountByItemId(
        itemId
      );

      if (!account) throw new Error("ItemId invalid ");

      const fixedExpenses = await this.transactionRepository.getFixedExpenses();
      const incomes = await this.transactionRepository.getIncomes();

      const totalFixedExpenses = fixedExpenses.reduce((acumulador, current) => {
        return acumulador + Number(current.amount);
      }, 0);

      await prisma.invoices.updateMany({
        data: { amount: Number(account.balance) },
        where: { month: new Date().getMonth() + 2 },
      });

      const invoices = await this.transactionRepository.getInvoices();

      const report = invoices.map((invoice) => {
        const expenses = totalFixedExpenses + invoice.amount;
        const income = getMonthIncome(incomes, invoice.month, invoice.year);
        const profit = income - expenses;

        return {
          month: months[invoice.month - 1].label,
          expenses,
          invoiceBalance: invoice.amount,
          income,
          profit,
        };
      });

      return report;
    } catch (error: any) {
      throw new Error("Failed to exchange token: " + error.message);
    }
  }
}

export { TransactionService };
