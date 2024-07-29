import { Incomes } from "@prisma/client";
import { z } from "zod";
import { IncomesCreateInputSchema } from "../../prisma/generated/zod";

export type IncomesCreateInput = z.infer<typeof IncomesCreateInputSchema>;

export interface IncomesRepository {
  listIncomes(): Promise<Incomes[]>;
  createIncome(fixedExpense: IncomesCreateInput): Promise<Incomes>;
}
