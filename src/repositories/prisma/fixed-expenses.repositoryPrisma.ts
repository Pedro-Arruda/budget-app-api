import { FixedExpenses } from "@prisma/client";
import {
  FixedExpensesCreateInput,
  FixedExpensesRepository,
} from "../../interfaces/fixed-expenses.interface";
import { prisma } from "../../utils/prisma";

class FixedExpensesRepositoryPrisma implements FixedExpensesRepository {
  async listFixedExpenses(): Promise<FixedExpenses[]> {
    const result = await prisma.fixedExpenses.findMany();
    return result;
  }

  async createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput
  ): Promise<FixedExpenses> {
    const result = await prisma.fixedExpenses.create({ data: fixedExpense });

    return result;
  }
}

export { FixedExpensesRepositoryPrisma };
