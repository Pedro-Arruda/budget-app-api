import { Incomes } from "@prisma/client";
import { z } from "zod";
import { IncomesCreateInputSchema } from "../../prisma/generated/zod";

export type IncomesCreateInput = z.infer<typeof IncomesCreateInputSchema>;

export interface IncomesRepository {
  listIncomes(accountId: string): Promise<Incomes[]>;
  createIncome(income: IncomesCreateInput, accountId: string): Promise<Incomes>;
}
