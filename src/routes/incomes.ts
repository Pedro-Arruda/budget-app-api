import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  FixedExpensesSchema,
  IncomesCreateInputSchema,
  IncomesSchema,
} from "../../prisma/generated/zod";
import { FixedExpensesCreateInput } from "../interfaces/fixed-expenses.interface";
import { incomesFactory } from "../modules/income/income.factory";

export async function incomesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Incomes"],
        response: { 200: z.array(IncomesSchema) },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) =>
      incomesFactory().listIncomes(req, reply)
  );

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Incomes"],
        body: IncomesCreateInputSchema,
        response: { 200: FixedExpensesSchema },
      },
    },
    async (
      req: FastifyRequest<{ Body: FixedExpensesCreateInput }>,
      reply: FastifyReply
    ) => incomesFactory().createIncome(req, reply)
  );
}

export default incomesRoutes;
