import { Incomes, Transaction } from "@prisma/client";
import { months } from "../../../utils/months";
import { getMonthIncome } from "./getMonthIncome";

export const groupTransactionsByMonth = (
  transactions: Transaction[],
  totalFixedExpenses: number,
  incomes: Incomes[]
) => {
  const groupedTransactions = [];
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setMonth(currentDate.getMonth() + 6);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();

    const month = currentDate.getMonth();
    const key = `${months[month].label}/${year}`;
    const income = getMonthIncome(incomes, month, year);

    let expenses = transactions
      .map((transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transaction.type === "CREDIT") {
          transactionDate.setMonth(transactionDate.getMonth() + 1);
        }
        return {
          ...transaction,
          adjustedDate: transactionDate,
        };
      })
      .filter((transaction) => {
        const transactionDate = transaction.adjustedDate;
        return (
          transactionDate.getFullYear() === year &&
          transactionDate.getMonth() === month
        );
      })
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

    expenses += totalFixedExpenses;

    const profit = income - expenses;

    groupedTransactions.push({
      month: key,
      expenses: expenses,
      income,
      profit: profit,
    });

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return groupedTransactions;
};
