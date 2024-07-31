import { FastifyReply, FastifyRequest } from "fastify";
import { InvoicesService } from "./invoice.service";

class InvoicesController {
  private invoicesService: InvoicesService;

  constructor(invoicesService: InvoicesService) {
    this.invoicesService = invoicesService;
  }

  async listInvoices(
    req: FastifyRequest<{ Body: { accountId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { accountId } = req.body;

    try {
      const data = await this.invoicesService.listInvoices(accountId);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { InvoicesController };
