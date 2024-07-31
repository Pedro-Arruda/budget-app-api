import { FixedExpenses } from "@prisma/client";
import { z } from "zod";
import { FixedExpensesCreateInputSchema } from "../../prisma/generated/zod";

export type FixedExpensesCreateInput = z.infer<
  typeof FixedExpensesCreateInputSchema
>;

export interface FixedExpensesRepository {
  listFixedExpenses(accountId: string): Promise<FixedExpenses[]>;
  createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput,
    accountId: string
  ): Promise<FixedExpenses>;
}
