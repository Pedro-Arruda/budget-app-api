import { FastifyReply, FastifyRequest } from "fastify";
import { TransactionCreateInput } from "../../interfaces/transaction.interface";
import { TransactionService } from "./transaction.service";

class TransactionController {
  private transactionService: TransactionService;

  constructor(authService: TransactionService) {
    this.transactionService = authService;
  }

  async listTransactions(
    req: FastifyRequest<{
      Body: { itemId: string; month?: string; year?: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { itemId, month, year } = req.body;

    try {
      const data = await this.transactionService.listTransactions(
        itemId,
        month,
        year
      );

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async createTransaction(
    req: FastifyRequest<{
      Body: TransactionCreateInput;
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const transaction = req.body;

    try {
      const data = await this.transactionService.createTransaction(transaction);

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async monthReport(
    req: FastifyRequest<{
      Body: { itemId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { itemId } = req.body;

    try {
      const data = await this.transactionService.monthsReport(itemId);

      reply.status(201).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { TransactionController };
