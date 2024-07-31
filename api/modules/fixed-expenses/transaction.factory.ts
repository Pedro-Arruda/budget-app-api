import { FixedExpensesRepositoryPrisma } from "../../repositories/prisma/fixed-expenses.repositoryPrisma";
import { FixedExpensesController } from "./fixed-expenses.controller";
import { FixedExpensesService } from "./fixed-expenses.service";

export const fixedExpensesFactory = () => {
  const fixedExpensesRepository = new FixedExpensesRepositoryPrisma();
  const fixedExpensesService = new FixedExpensesService(
    fixedExpensesRepository
  );
  const fixedExpensesController = new FixedExpensesController(
    fixedExpensesService
  );
  return fixedExpensesController;
};
