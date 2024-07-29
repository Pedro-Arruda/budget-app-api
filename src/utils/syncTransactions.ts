import { PluggyClient } from "pluggy-sdk";
import { generateInstallmnets } from "./generateInstallments";
import { prisma } from "./prisma";

export const syncTransactions = async (
  client: PluggyClient,
  accountId: string
) => {
  const transactions: any = await client.fetchAllTransactions(accountId);

  const prismaTransactions = await prisma.transaction.findMany();

  if (transactions.length == prismaTransactions.length) return;

  if (transactions.length > 0) {
    for (const transaction of transactions) {
      const foundTransaction = await prisma.transaction.findMany({
        where: {
          description: transaction.description,
          date: transaction.date,
        },
      });

      if (foundTransaction.length === 0) {
        const { creditCardMetadata } = transaction;

        if (creditCardMetadata && creditCardMetadata.installmentNumber === 1) {
          await generateInstallmnets(
            creditCardMetadata,
            transaction,
            accountId
          );
        } else {
          if (!creditCardMetadata) {
            console.log(`CRIANDO TRANSACAO - ${transaction.description}`);

            await prisma.transaction.create({
              data: {
                amount: String(transaction.amount),
                date: transaction.date,
                description: transaction.description,
                id: transaction.id,
                accountId,
                type: transaction.type,
                ...(transaction.category && {
                  categoryId: transaction.categoryId,
                }),
              },
            });
          }
        }
      }
    }
  }
};
