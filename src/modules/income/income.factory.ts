import { IncomesRepositoryPrisma } from "../../repositories/prisma/incomes.repositoryPrisma";
import { IncomesController } from "./income.controller";
import { IncomesService } from "./income.service";

export const incomesFactory = () => {
  const incomesRepository = new IncomesRepositoryPrisma();
  const incomesService = new IncomesService(incomesRepository);
  const incomesController = new IncomesController(incomesService);
  return incomesController;
};
