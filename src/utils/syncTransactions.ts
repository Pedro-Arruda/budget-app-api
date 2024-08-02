import { randomUUID } from "node:crypto";
import { PluggyClient } from "pluggy-sdk";
import { generateInstallments } from "./generateInstallments";
import { prisma } from "./prisma";

export const syncTransactions = async (
  client: PluggyClient,
  accountId: string
) => {
  const transactions: any = await client.fetchAllTransactions(accountId);

  const transactionsToCreate = [];
  const installmentsToGenerate = [];
  const installmentsToCreate = [];

  for (const transaction of transactions) {
    console.log("TRANSACAO ADICIONADA ", transaction.description);

    const { creditCardMetadata } = transaction;

    if (creditCardMetadata && creditCardMetadata.installmentNumber === 1) {
      installmentsToGenerate.push({
        creditCardMetadata,
        transaction,
        accountId,
      });
    } else {
      if (!creditCardMetadata) {
        transactionsToCreate.push({
          amount: String(transaction.amount),
          date: transaction.date,
          description: transaction.description,
          id: transaction.id,
          accountId,
          type: transaction.type,
          ...(transaction.category && {
            categoryId: transaction.categoryId,
          }),
        });
      }
    }
  }

  if (transactionsToCreate.length > 0) {
    await prisma.transaction.createMany({
      data: transactionsToCreate,
      skipDuplicates: true,
    });

    console.log("TRANSACOES INSERIDAS ", transactionsToCreate.length);
  }

  for (const {
    creditCardMetadata,
    transaction,
    accountId,
  } of installmentsToGenerate) {
    const { transactionsToCreate: transactionsInstallmentsToCreate } =
      await generateInstallments(creditCardMetadata, transaction, accountId);

    installmentsToCreate.push(...transactionsInstallmentsToCreate);
  }

  let invoicesToCreate: any = {};
  const installmentsToCreateWithInvoice = installmentsToCreate.map(
    (installment) => {
      let invoiceMonth = installment.date.getMonth() + 2;
      let invoiceYear = installment.date.getFullYear();

      if (invoiceMonth === 13) {
        invoiceMonth = 1;
        invoiceYear += 1;
      }

      const invoiceDate = `${invoiceMonth}-${invoiceYear}`;
      let invoiceId = null;

      if (!invoicesToCreate[invoiceDate]) {
        invoiceId = randomUUID();

        invoicesToCreate[invoiceDate] = {
          id: invoiceId,
          month: invoiceMonth,
          year: invoiceYear,
          accountId,
          amount: Number(installment.amount),
        };

        return { ...installment, invoiceId };
      } else {
        invoiceId = invoicesToCreate[invoiceDate].id;

        invoicesToCreate[invoiceDate] = {
          ...invoicesToCreate[invoiceDate],
          amount:
            invoicesToCreate[invoiceDate].amount + Number(installment.amount),
        };

        return { ...installment, invoiceId };
      }
    }
  );

  if (Object.keys(invoicesToCreate).length > 0) {
    const items: any = Object.values(invoicesToCreate);

    await prisma.invoices.createMany({
      data: items,
      skipDuplicates: true,
    });

    console.log("INVOICES INSERIDAS ", items.length);
  }

  if (installmentsToCreateWithInvoice.length > 0) {
    await prisma.transaction.createMany({
      data: installmentsToCreateWithInvoice,
      skipDuplicates: true,
    });

    console.log(
      "TRANSACOES INSERIDAS ",
      installmentsToCreateWithInvoice.length
    );
  }
};
