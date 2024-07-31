import { Incomes } from "@prisma/client";
import {
  IncomesCreateInput,
  IncomesRepository,
} from "../../interfaces/incomes.interface";

class IncomesService {
  private incomeRepository: IncomesRepository;

  constructor(incomeRepository: IncomesRepository) {
    this.incomeRepository = incomeRepository;
  }
  async listIncomes(accountId: string): Promise<Incomes[]> {
    try {
      const income = await this.incomeRepository.listIncomes(accountId);

      return income;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async createIncomes(
    fixedExpense: IncomesCreateInput,
    accountId: string
  ): Promise<Incomes> {
    try {
      const income = await this.incomeRepository.createIncome(
        fixedExpense,
        accountId
      );

      return income;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { IncomesService };
