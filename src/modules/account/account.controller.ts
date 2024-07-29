import { FastifyReply, FastifyRequest } from "fastify";
import { AccountService } from "./account.service";

class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  async listAccount(
    req: FastifyRequest<{
      Body: { itemId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { itemId } = req.body;

    try {
      const data = await this.accountService.listAccount(itemId);

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { AccountController };
