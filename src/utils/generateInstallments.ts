import { Transaction } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CreditCardMetadata } from "pluggy-sdk";

type TransactionCreate = {
  id: string;
  date: Date;
  description: string;
  amount: string;
  type: string | null;
  invoiceId?: string | null;
  accountId: string | null;
  categoryId?: string | null;
};

export const generateInstallments = async (
  creditCardMetadata: CreditCardMetadata,
  transaction: Transaction & { categoryId: string },
  accountId: string
) => {
  const transactionsToCreate: TransactionCreate[] = [];

  for (let i = 1; i <= creditCardMetadata.totalInstallments!; i++) {
    const newDate = new Date(transaction.date);
    newDate.setMonth(newDate.getMonth() + (i - 1));

    const newDescription = transaction.description.replace("1", `${i}`);
    const transactionId = randomUUID();

    transactionsToCreate.push({
      amount: String(transaction.amount),

      date: newDate,
      description: newDescription,
      id: transactionId,
      accountId,
      type: "CREDIT",
      ...(transaction.categoryId && {
        categoryId: transaction.categoryId,
      }),
    });
  }

  console.log("ADICIONADO TRANSACTIONS ", transactionsToCreate.length);

  return { transactionsToCreate };
};
