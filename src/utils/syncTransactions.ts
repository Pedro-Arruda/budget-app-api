import { PluggyClient } from "pluggy-sdk";
import { generateInstallmnets } from "./generateInstallments";
import { prisma } from "./prisma";

export const syncTransactions = async (
  client: PluggyClient,
  accountId: string
) => {
  const transactions: any = await client.fetchAllTransactions(accountId);

  if (transactions.length > 0) {
    const promises = transactions.map(async (transaction: any) => {
      const { creditCardMetadata } = transaction;

      if (creditCardMetadata && creditCardMetadata.installmentNumber === 1) {
        await generateInstallmnets(creditCardMetadata, transaction, accountId);
      } else if (!creditCardMetadata) {
        console.log(`CRIANDO TRANSACAO - ${transaction.description}`);

        return prisma.transaction.create({
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
      return null;
    });

    await Promise.all(promises);
  }
};
