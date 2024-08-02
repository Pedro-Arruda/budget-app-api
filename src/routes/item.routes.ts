import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { itemsFactory } from "../modules/item/item.factory";

export async function itemRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Item"],
        body: z.object({ itemId: z.string() }),
      },
    },
    async (
      req: FastifyRequest<{ Body: { itemId: string } }>,
      reply: FastifyReply
    ) => itemsFactory().updateItem(req, reply)
  );
}

export default itemRoutes;
