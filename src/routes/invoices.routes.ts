import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { InvoicesSchema } from "../../prisma/generated/zod";
import { invoicesFactory } from "../modules/invoice/invoice.factory";

export async function invoicesRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Invoices"],
        response: { 200: z.array(InvoicesSchema) },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) =>
      invoicesFactory().listInvoices(req, reply)
  );
}

export default invoicesRoutes;
