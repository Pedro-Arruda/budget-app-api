import { randomUUID } from "node:crypto";
import { CreditCardMetadata, Transaction } from "pluggy-sdk";
import { prisma } from "./prisma";

export const generateInstallmnets = async (
  creditCardMetadata: CreditCardMetadata,
  transaction: Transaction & { categoryId: string },
  accountId: string
) => {
  for (let i = 1; i <= creditCardMetadata.totalInstallments!; i++) {
    const newDate = new Date(transaction.date);
    newDate.setMonth(newDate.getMonth() + (i - 1));

    const newDescription = transaction.description.replace("1", `${i}`);

    console.log(`CRIANDO TRANSACAO (PARCELA) - ${newDescription}`);

    const transactionId = randomUUID();

    await prisma.transaction.create({
      data: {
        amount: String(transaction.amount),
        date: newDate,
        description: newDescription,
        id: transactionId,
        accountId,
        type: "CREDIT",
        ...(transaction.category && {
          categoryId: transaction.categoryId,
        }),
      },
    });

    let invoiceMonth = newDate.getMonth() + 2;

    let invoiceYear = newDate.getFullYear();

    if (invoiceMonth == 13) {
      invoiceMonth = 1;
      invoiceYear += 1;
    }

    let foundInvoice = await prisma.invoices.findMany({
      where: {
        month: invoiceMonth,
        year: invoiceYear,
      },
    });

    if (foundInvoice.length === 0) {
      const invoice = await prisma.invoices.create({
        data: {
          month: invoiceMonth,
          year: invoiceYear,
          amount: transaction.amount,
          accountId,
        },
      });

      console.log(`CRIADA FATURA DO MES ${invoiceMonth} de ${invoiceYear}`);

      await prisma.transaction.update({
        data: { invoiceId: invoice.id },
        where: { id: transactionId },
      });
    } else {
      await prisma.transaction.update({
        data: { invoiceId: foundInvoice[0].id },
        where: { id: transactionId },
      });

      await prisma.invoices.update({
        data: { amount: foundInvoice[0].amount + transaction.amount },
        where: { id: foundInvoice[0].id },
      });
    }
  }
};
