import { Incomes } from "@prisma/client";
import {
  IncomesCreateInput,
  IncomesRepository,
} from "../../interfaces/incomes.interface";
import { prisma } from "../../utils/prisma";

class IncomesRepositoryPrisma implements IncomesRepository {
  async listIncomes(): Promise<Incomes[]> {
    const result = await prisma.incomes.findMany();
    return result;
  }

  async createIncome(fixedExpense: IncomesCreateInput): Promise<Incomes> {
    const result = await prisma.incomes.create({ data: fixedExpense });

    return result;
  }
}

export { IncomesRepositoryPrisma };
