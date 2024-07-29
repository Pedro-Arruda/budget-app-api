import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  FixedExpensesCreateInputSchema,
  FixedExpensesSchema,
} from "../../prisma/generated/zod";
import { FixedExpensesCreateInput } from "../interfaces/fixed-expenses.interface";
import { fixedExpensesFactory } from "../modules/fixed-expenses/transaction.factory";

export async function fixedExpensesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Fixed Expenses"],
        response: { 200: z.array(FixedExpensesSchema) },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) =>
      fixedExpensesFactory().listFixedExpenses(req, reply)
  );

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Fixed Expenses"],
        body: FixedExpensesCreateInputSchema,
        response: { 200: FixedExpensesSchema },
      },
    },
    async (
      req: FastifyRequest<{ Body: FixedExpensesCreateInput }>,
      reply: FastifyReply
    ) => fixedExpensesFactory().createFixedExpenses(req, reply)
  );
}

export default fixedExpensesRoutes;
