import { Invoices } from "@prisma/client";

export interface InvoicesRepository {
  listInvoices(): Promise<Invoices[]>;
}
