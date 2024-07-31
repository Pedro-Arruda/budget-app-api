import { PluggyClient } from "pluggy-sdk";
import { prisma } from "./prisma";

export const syncAccount = async (client: PluggyClient, itemId: string) => {
  console.log("ADICIONANDO ACCOUNT");

  const accounts = await client.fetchAccounts(itemId);

  if (!accounts || accounts.total === 0) {
    throw new Error("ItemId invalid ");
  }

  const account = accounts.results[0];

  console.log(await prisma.account.findMany());

  const existingAccount = await prisma.account.findUnique({
    where: { id: account.id },
  });

  if (existingAccount) {
    console.log(`Account with ID ${account.id} already exists.`);
    return existingAccount; // Retorna a conta existente, se necessário
  }

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

  console.log("ACCOUNT ADICIONADA");

  return account;
};
