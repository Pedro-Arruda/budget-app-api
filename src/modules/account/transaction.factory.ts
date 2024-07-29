import { AccountRepositoryPrisma } from "../../repositories/prisma/account.repositoryPrisma";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

export const accountFactory = () => {
  const accountRepository = new AccountRepositoryPrisma();
  const accountService = new AccountService(accountRepository);
  const accountController = new AccountController(accountService);
  return accountController;
};
