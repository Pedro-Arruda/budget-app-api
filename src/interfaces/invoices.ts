import { Invoices } from "@prisma/client";

export interface InvoicesRepository {
  listInvoices(accountId: string): Promise<Invoices[]>;
}
