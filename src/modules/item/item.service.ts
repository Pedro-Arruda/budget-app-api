import { randomUUID } from "node:crypto";
import { Item, PluggyClient } from "pluggy-sdk";
import { prisma } from "../../database/prisma-client";
import { CLIENT_ID, CLIENT_SECRET } from "../../utils/constants";
import { generateInstallments } from "../../utils/generateInstallments";

class ItemService {
  constructor() {}

  async updateItem(itemId: string): Promise<Item> {
    const clientId = CLIENT_ID;
    const clientSecret = CLIENT_SECRET;

    const client = new PluggyClient({
      clientId,
      clientSecret,
    });

    try {
      const item = await client.updateItem(itemId);

      const accounts = await client.fetchAccounts(item.id);

      if (accounts.total == 0) throw new Error("Accout not found");

      const account = accounts.results[0];

      await prisma.account.update({
        where: { id: account.id },
        data: {
          availableCreditLimit: account.creditData?.availableCreditLimit,
          creditLimit: account.creditData?.creditLimit,
          balance: account.balance,
        },
      });

      const to = new Date();
      const from = new Date();
      from.setDate(from.getDate() - 30);

      const monthTransactions: any = await client.fetchTransactions(
        account.id,
        {
          from: from.toISOString(),
          to: to.toISOString(),
        }
      );

      const installmentsToGenerate = [];
      const transactionsToCreate = [];
      const installmentsToCreate = [];

      for (const transaction of monthTransactions.results) {
        const dbTransaction = await prisma.transaction.findMany({
          where: {
            description: transaction.description,
            ...(!transaction.description.includes("/") && {
              date: transaction.date,
            }),
          },
        });

        if (dbTransaction.length == 0) {
          console.log("NOVA TRANSACAO ", transaction.description);

          const { creditCardMetadata } = transaction;

          if (
            creditCardMetadata &&
            creditCardMetadata.installmentNumber === 1
          ) {
            installmentsToGenerate.push({
              creditCardMetadata,
              transaction,
              accountId: account.id,
            });
          } else {
            if (!creditCardMetadata) {
              transactionsToCreate.push({
                amount: String(transaction.amount),
                date: transaction.date,
                description: transaction.description,
                id: transaction.id,
                accountId: account.id,
                type: transaction.type,
                ...(transaction.category && {
                  categoryId: transaction.ca,
                }),
              });
            }
          }
        }
      }

      for (const {
        creditCardMetadata,
        transaction,
        accountId,
      } of installmentsToGenerate) {
        const { transactionsToCreate: transactionsInstallmentsToCreate } =
          await generateInstallments(
            creditCardMetadata,
            transaction,
            accountId
          );

        installmentsToCreate.push(...transactionsInstallmentsToCreate);
      }

      const lastInvoice = await prisma.invoices.findFirst({
        orderBy: [{ year: "desc" }, { month: "desc" }],
      });

      let invoicesToCreate: any = {};

      const installmentsToCreateWithInvoice: any = [];

      for (const installment of installmentsToCreate) {
        let invoiceMonth = installment.date.getMonth() + 2;
        let invoiceYear = installment.date.getFullYear();

        if (invoiceMonth === 13) {
          invoiceMonth = 1;
          invoiceYear += 1;
        }

        const invoiceDate = `${invoiceMonth}-${invoiceYear}`;
        let invoiceId = null;

        if (
          invoiceYear > lastInvoice?.year! ||
          (lastInvoice?.year === invoiceYear &&
            invoiceMonth > lastInvoice.month)
        ) {
          invoiceId = randomUUID();

          invoicesToCreate[invoiceDate] = {
            id: invoiceId,
            month: invoiceMonth,
            year: invoiceYear,
            accountId: account.id,
            amount: Number(installment.amount),
          };

          installmentsToCreateWithInvoice.push({ ...installment, invoiceId });
        } else {
          const invoice = await prisma.invoices.findFirst({
            where: { month: invoiceMonth, year: invoiceYear },
          });
          invoiceId = invoice?.id;

          await prisma.invoices.updateMany({
            where: { id: invoice?.id },
            data: {
              amount: (invoice?.amount || 0) + Number(installment.amount),
            },
          });

          console.log(
            `FATURA DE ${invoice?.month} DE ${invoice?.year} ATUALIZADA`
          );

          installmentsToCreateWithInvoice.push({
            ...installment,
            invoiceId,
            id: randomUUID(),
          });
        }
      }

      if (Object.keys(invoicesToCreate).length > 0) {
        const items: any = Object.values(invoicesToCreate);

        await prisma.invoices.createMany({
          data: items,
          skipDuplicates: true,
        });

        console.log("INVOICES INSERIDAS - ", items.length);
      }

      console.log(
        "installmentsToCreateWithInvoice",
        installmentsToCreateWithInvoice
      );

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

      return item;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { ItemService };
