import { TransactionRepositoryPrisma } from "../../repositories/prisma/transaction.repositoryPrisma";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

export const transactionFactory = () => {
  const transactionRepository = new TransactionRepositoryPrisma();
  const transactionService = new TransactionService(transactionRepository);
  const authController = new TransactionController(transactionService);
  return authController;
};
