import { Account } from "@prisma/client";
import { AccountRepository } from "../../interfaces/account.interface";
import { prisma } from "../../utils/prisma";

class AccountRepositoryPrisma implements AccountRepository {
  async findAccountByItemId(itemId: string): Promise<Account | null> {
    const account = await prisma.account.findMany({ where: { itemId } });

    return account[0];
  }
}

export { AccountRepositoryPrisma };
