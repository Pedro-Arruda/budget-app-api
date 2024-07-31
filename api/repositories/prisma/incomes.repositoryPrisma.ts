import { Incomes } from "@prisma/client";
import {
  IncomesCreateInput,
  IncomesRepository,
} from "../../interfaces/incomes.interface";
import { prisma } from "../../utils/prisma";

class IncomesRepositoryPrisma implements IncomesRepository {
  async listIncomes(accountId: string): Promise<Incomes[]> {
    const result = await prisma.incomes.findMany({ where: { accountId } });
    return result;
  }

  async createIncome(
    fixedExpense: IncomesCreateInput,
    accountId: string
  ): Promise<Incomes> {
    const result = await prisma.incomes.create({
      data: {
        amount: fixedExpense.amount,
        description: fixedExpense.description,
        everyMonth: fixedExpense.everyMonth,
        month: fixedExpense.month,
        year: fixedExpense.year,
        accountId,
      },
    });

    return result;
  }
}

export { IncomesRepositoryPrisma };
