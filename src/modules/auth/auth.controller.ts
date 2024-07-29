import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "./auth.service";

class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async exchangeToken(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = await this.authService.exchangeToken();

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async validateItemId(
    req: FastifyRequest<{ Body: { itemId: string; code: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { itemId, code } = req.body;

    try {
      const data = await this.authService.validateItemId(itemId, code);

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { AuthController };
