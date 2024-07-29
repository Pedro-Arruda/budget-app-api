import { Account } from "@prisma/client";
import { z } from "zod";

export interface AccountRepository {
  findAccountByItemId(itemId: string): Promise<Account | null>;
}

export const ListAccountSchema = z.object({
  itemId: z.string(),
});
