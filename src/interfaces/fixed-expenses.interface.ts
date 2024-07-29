import { FixedExpenses } from "@prisma/client";
import { z } from "zod";
import { FixedExpensesCreateInputSchema } from "../../prisma/generated/zod";

export type FixedExpensesCreateInput = z.infer<
  typeof FixedExpensesCreateInputSchema
>;

export interface FixedExpensesRepository {
  listFixedExpenses(): Promise<FixedExpenses[]>;
  createFixedExpenses(
    fixedExpense: FixedExpensesCreateInput
  ): Promise<FixedExpenses>;
}
