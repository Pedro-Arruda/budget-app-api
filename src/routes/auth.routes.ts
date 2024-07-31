import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import {
  AuthSignInSchema,
  AuthValidateItemIdSchema,
} from "../interfaces/auth.interface";
import { authFactory } from "../modules/auth/auth.factory";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.withTypeProvider<ZodTypeProvider>();

  fastify.post(
    "/exchange-token",
    {
      schema: {
        tags: ["Auth"],
        response: { 200: AuthSignInSchema },
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) =>
      authFactory().exchangeToken(req, reply)
  );

  fastify.post(
    "/validate-item",
    {
      schema: {
        tags: ["Auth"],
        body: AuthValidateItemIdSchema,
        response: { 200: AuthSignInSchema },
      },
    },
    async (
      req: FastifyRequest<{ Body: { itemId: string; code: string } }>,
      reply: FastifyReply
    ) => authFactory().validateItemId(req, reply)
  );

  fastify.get(
    "/connect-token",
    {
      schema: {
        tags: ["Auth"],
      },
    },
    async (req: FastifyRequest, reply: FastifyReply) =>
      authFactory().getConnectToken(req, reply)
  );

  fastify.post(
    "/sync-account",
    {
      schema: {
        tags: ["Auth"],
        body: z.object({ itemId: z.string() }),
      },
    },
    async (
      req: FastifyRequest<{ Body: { itemId: string } }>,
      reply: FastifyReply
    ) => authFactory().syncAccount(req, reply)
  );
}

export default authRoutes;
