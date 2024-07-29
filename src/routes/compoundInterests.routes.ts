import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { compoundInterestsFactory } from "../modules/compoundInterests/compoundInterests.factory";

export async function compoundInterestsRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Compound Interests"],
        response: {
          200: z.object({
            totalAmount: z.string(),
            totalInvested: z.string(),
            totalFees: z.string(),
          }),
        },
        body: z.object({
          monthContribution: z.number(),
          monthTax: z.number(),
          totalMonths: z.number(),
          initialValue: z.number(),
        }),
      },
    },
    async (
      req: FastifyRequest<{
        Body: {
          monthContribution: number;
          monthTax: number;
          totalMonths: number;
          initialValue: number;
        };
      }>,
      reply: FastifyReply
    ) => compoundInterestsFactory().generateAmountCompoundInterests(req, reply)
  );
}

export default compoundInterestsRoutes;
