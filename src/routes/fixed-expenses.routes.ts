import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FixedExpensesSchema } from "../../prisma/generated/zod";
import { FixedExpensesCreateInput } from "../interfaces/fixed-expenses.interface";
import { fixedExpensesFactory } from "../modules/fixed-expenses/transaction.factory";

export async function fixedExpensesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Fixed Expenses"],
        response: { 200: z.array(FixedExpensesSchema) },
        body: z.object({ accountId: z.string() }),
      },
    },
    async (
      req: FastifyRequest<{ Body: { accountId: string } }>,
      reply: FastifyReply
    ) => fixedExpensesFactory().listFixedExpenses(req, reply)
  );

  fastify.post(
    "/create",
    {
      schema: {
        tags: ["Fixed Expenses"],
        body: z.object({
          fixedExpense: z.object({
            description: z.string(),
            amount: z.string(),
          }),
          accountId: z.string(),
        }),
        response: { 200: FixedExpensesSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: { fixedExpense: FixedExpensesCreateInput; accountId: string };
      }>,
      reply: FastifyReply
    ) => fixedExpensesFactory().createFixedExpenses(req, reply)
  );
}

export default fixedExpensesRoutes;
