import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { InvoicesSchema } from "../../prisma/generated/zod";
import { invoicesFactory } from "../modules/invoice/invoice.factory";

export async function invoicesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/",
    {
      schema: {
        tags: ["Invoices"],
        response: { 200: z.array(InvoicesSchema) },
        body: z.object({ accountId: z.string() }),
      },
    },
    async (
      req: FastifyRequest<{ Body: { accountId: string } }>,
      reply: FastifyReply
    ) => invoicesFactory().listInvoices(req, reply)
  );
}

export default invoicesRoutes;
