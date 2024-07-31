import { FixedExpenses } from "@prisma/client";
import {
  FixedExpensesCreateInput,
  FixedExpensesRepository,
} from "../../interfaces/fixed-expenses.interface";
import { prisma } from "../../utils/prisma";

class FixedExpensesRepositoryPrisma implements FixedExpensesRepository {
  async listFixedExpenses(accountId: string): Promise<FixedExpenses[]> {
    const result = await prisma.fixedExpenses.findMany({
      where: { accountId },
    });
    return result;
  }

  async createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput,
    accountId: string
  ): Promise<FixedExpenses> {
    const result = await prisma.fixedExpenses.create({
      data: {
        amount: fixedExpense.amount,
        description: fixedExpense.description,
        accountId,
      },
    });

    return result;
  }
}

export { FixedExpensesRepositoryPrisma };
