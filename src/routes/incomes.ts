import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { FixedExpensesSchema, IncomesSchema } from "../../prisma/generated/zod";
import { FixedExpensesCreateInput } from "../interfaces/fixed-expenses.interface";
import { incomesFactory } from "../modules/income/income.factory";

export async function incomesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Incomes"],
        response: { 200: z.array(IncomesSchema) },
        body: z.object({ accountId: z.string() }),
      },
    },
    async (
      req: FastifyRequest<{ Body: { accountId: string } }>,
      reply: FastifyReply
    ) => incomesFactory().listIncomes(req, reply)
  );

  fastify.post(
    "/create",
    {
      schema: {
        tags: ["Incomes"],
        body: z.object({
          income: z.object({
            description: z.string(),
            amount: z.string(),
            everyMonth: z.boolean().optional().nullable(),
            month: z.number().int().optional().nullable(),
            year: z.number().int().optional().nullable(),
          }),
          accountId: z.string(),
        }),
        response: { 200: FixedExpensesSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: { income: FixedExpensesCreateInput; accountId: string };
      }>,
      reply: FastifyReply
    ) => incomesFactory().createIncome(req, reply)
  );
}

export default incomesRoutes;
