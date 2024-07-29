import { Invoices } from "@prisma/client";
import { InvoicesRepository } from "../../interfaces/invoices";

class InvoicesService {
  private invoicesRepository: InvoicesRepository;

  constructor(invoicesRepository: InvoicesRepository) {
    this.invoicesRepository = invoicesRepository;
  }
  async listInvoices(): Promise<Invoices[]> {
    try {
      const invoices = await this.invoicesRepository.listInvoices();

      return invoices;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { InvoicesService };
