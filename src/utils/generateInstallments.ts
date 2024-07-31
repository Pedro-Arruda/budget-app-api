import { randomUUID } from "node:crypto";
import { CreditCardMetadata, Transaction } from "pluggy-sdk";
import { prisma } from "./prisma";

export const generateInstallmnets = async (
  creditCardMetadata: CreditCardMetadata,
  transaction: Transaction & { categoryId: string },
  accountId: string
) => {
  const promises = [];
  const invoicesMap = new Map();

  for (let i = 1; i <= creditCardMetadata.totalInstallments!; i++) {
    const newDate = new Date(transaction.date);
    newDate.setMonth(newDate.getMonth() + (i - 1));

    const newDescription = transaction.description.replace("1", `${i}`);
    console.log(`CRIANDO TRANSACAO (PARCELA) - ${newDescription}`);

    const transactionId = randomUUID();

    const invoiceMonth = (newDate.getMonth() + 2) % 12 || 12;
    const invoiceYear =
      newDate.getFullYear() + (newDate.getMonth() === 11 ? 1 : 0);

    let invoiceId;

    // Verifica se a fatura já foi encontrada
    if (invoicesMap.has(`${invoiceMonth}-${invoiceYear}`)) {
      invoiceId = invoicesMap.get(`${invoiceMonth}-${invoiceYear}`);
    } else {
      const foundInvoice = await prisma.invoices.findFirst({
        where: {
          month: invoiceMonth,
          year: invoiceYear,
          accountId,
        },
      });

      if (!foundInvoice) {
        const invoice = await prisma.invoices.create({
          data: {
            month: invoiceMonth,
            year: invoiceYear,
            amount: transaction.amount,
            accountId,
          },
        });

        console.log(`CRIADA FATURA DO MES ${invoiceMonth} de ${invoiceYear}`);
        invoiceId = invoice.id;
      } else {
        invoiceId = foundInvoice.id;
        await prisma.invoices.update({
          data: { amount: foundInvoice.amount + transaction.amount },
          where: { id: foundInvoice.id },
        });
      }

      // Armazena o ID da fatura no mapa
      invoicesMap.set(`${invoiceMonth}-${invoiceYear}`, invoiceId);
    }

    // Adiciona a criação da transação à lista de promessas
    promises.push(
      prisma.transaction.create({
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
          invoiceId, // Adiciona a fatura diretamente
        },
      })
    );
  }

  // Aguarda todas as promessas de transação serem concluídas
  await Promise.all(promises);
};
