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
  async listFixedExpenses(accountId: string): Promise<FixedExpenses[]> {
    try {
      const fixedExpenses =
        await this.fixedExpensesRepository.listFixedExpenses(accountId);

      return fixedExpenses;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput,
    accountId: string
  ): Promise<FixedExpenses> {
    try {
      const fixedExpenses =
        await this.fixedExpensesRepository.createFixedExpenses(
          fixedExpense,
          accountId
        );

      return fixedExpenses;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { FixedExpensesService };
