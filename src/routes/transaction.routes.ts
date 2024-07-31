import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { TransactionSchema } from "../../prisma/generated/zod";
import {
  ListTransactionsSchema,
  MonthReportSchema,
  TransactionCreateInput,
} from "../interfaces/transaction.interface";
import { transactionFactory } from "../modules/transaction/transaction.factory";

export async function transactionRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Transactions"],
        body: ListTransactionsSchema,
        response: { 200: TransactionSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: { itemId: string; month?: string; year?: string };
      }>,
      reply: FastifyReply
    ) => transactionFactory().listTransactions(req, reply)
  );

  fastify.post(
    "/create",
    {
      schema: {
        tags: ["Transactions"],
        body: z.object({
          date: z.string(),
          description: z.string(),
          amount: z.string(),
        }),
        response: { 200: TransactionSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: TransactionCreateInput;
      }>,
      reply: FastifyReply
    ) => transactionFactory().createTransaction(req, reply)
  );

  fastify.post(
    "/months-report",
    {
      schema: {
        tags: ["Transactions"],
        body: MonthReportSchema,
        response: { 200: TransactionSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: { itemId: string };
      }>,
      reply: FastifyReply
    ) => transactionFactory().monthReport(req, reply)
  );
}

export default transactionRoutes;
