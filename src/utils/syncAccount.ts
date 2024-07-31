import { PluggyClient } from "pluggy-sdk";
import { prisma } from "./prisma";

export const syncAccount = async (client: PluggyClient, itemId: string) => {
  const accounts = await client.fetchAccounts(itemId);

  if (!accounts || accounts.total === 0) {
    throw new Error("ItemId invalid ");
  }

  const account = accounts.results[0];

  const foundDatabaseAccount = await prisma.account.findUnique({
    where: { id: account.id },
  });

  if (!foundDatabaseAccount) {
    let formattedBalanceCloseDate = null;
    let formattedBalanceDueDate = null;

    if (account.creditData && account.creditData.balanceCloseDate) {
      formattedBalanceCloseDate = new Date(account.creditData.balanceCloseDate);
    }

    if (account.creditData && account.creditData.balanceDueDate) {
      formattedBalanceDueDate = new Date(account.creditData.balanceDueDate);
    }

    await prisma.account.create({
      data: {
        id: account.id,
        itemId,
        availableCreditLimit: account.creditData?.availableCreditLimit,
        balance: account.balance,
        balanceCloseDate: formattedBalanceCloseDate,
        balanceDueDate: formattedBalanceDueDate,
        brand: account.creditData?.brand,
        creditLimit: account.creditData?.creditLimit,
        finalNumber: Number(account.number),
        name: account.name,
      },
    });
  } else {
    await prisma.account.update({
      where: { id: account.id },
      data: {
        availableCreditLimit: account.creditData?.availableCreditLimit,
        balance: account.balance,
        creditLimit: account.creditData?.creditLimit,
      },
    });
  }

  return account;
};
