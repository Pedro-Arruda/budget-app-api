import { InvoicesRepositoryPrisma } from "../../repositories/prisma/invoices.repository";
import { InvoicesController } from "./invoice.controller";
import { InvoicesService } from "./invoice.service";

export const invoicesFactory = () => {
  const invoicesRepository = new InvoicesRepositoryPrisma();
  const invoicesService = new InvoicesService(invoicesRepository);
  const invoicesController = new InvoicesController(invoicesService);
  return invoicesController;
};
