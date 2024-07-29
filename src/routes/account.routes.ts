import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AccountSchema } from "../../prisma/generated/zod";
import { ListAccountSchema } from "../interfaces/account.interface";
import { accountFactory } from "../modules/account/transaction.factory";

export async function accountRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Account"],
        body: ListAccountSchema,
        response: { 200: AccountSchema },
      },
    },
    async (
      req: FastifyRequest<{
        Body: { itemId: string };
      }>,
      reply: FastifyReply
    ) => accountFactory().listAccount(req, reply)
  );
}

export default accountRoutes;
