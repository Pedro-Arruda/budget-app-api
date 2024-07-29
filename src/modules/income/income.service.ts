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
  async listIncomes(): Promise<Incomes[]> {
    try {
      const income = await this.incomeRepository.listIncomes();

      return income;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async createIncomes(fixedExpense: IncomesCreateInput): Promise<Incomes> {
    try {
      const income = await this.incomeRepository.createIncome(fixedExpense);

      return income;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { IncomesService };
