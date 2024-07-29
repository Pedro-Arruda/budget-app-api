import { FixedExpenses } from "@prisma/client";
import {
  FixedExpensesCreateInput,
  FixedExpensesRepository,
} from "../../interfaces/fixed-expenses.interface";

class FixedExpensesService {
  private fixedExpensesRepository: FixedExpensesRepository;

  constructor(fixedExpensesRepository: FixedExpensesRepository) {
    this.fixedExpensesRepository = fixedExpensesRepository;
  }
  async listFixedExpenses(): Promise<FixedExpenses[]> {
    try {
      const fixedExpenses =
        await this.fixedExpensesRepository.listFixedExpenses();

      return fixedExpenses;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput
  ): Promise<FixedExpenses> {
    try {
      const fixedExpenses =
        await this.fixedExpensesRepository.createFixedExpenses(fixedExpense);

      return fixedExpenses;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { FixedExpensesService };
