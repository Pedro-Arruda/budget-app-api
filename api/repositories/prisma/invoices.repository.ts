import { Invoices } from "@prisma/client";
import { InvoicesRepository } from "../../interfaces/invoices";
import { prisma } from "../../utils/prisma";

class InvoicesRepositoryPrisma implements InvoicesRepository {
  async listInvoices(accountId: string): Promise<Invoices[]> {
    const result = await prisma.invoices.findMany({
      orderBy: { year: "asc" },
      where: { accountId },
    });
    return result;
  }
}

export { InvoicesRepositoryPrisma };
