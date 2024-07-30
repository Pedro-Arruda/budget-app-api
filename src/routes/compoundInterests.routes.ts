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
            totalAmount: z.number(),
            totalInvested: z.number(),
            totalFees: z.number(),
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

  fastify.post(
    "/multiple",
    {
      schema: {
        tags: ["Compound Interests"],
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
    ) =>
      compoundInterestsFactory().generateMultipleCompoundInterests(req, reply)
  );
}

export default compoundInterestsRoutes;
