import { FastifyReply, FastifyRequest } from "fastify";
import { IncomesCreateInput } from "../../interfaces/incomes.interface";
import { IncomesService } from "./income.service";

class IncomesController {
  private incomeService: IncomesService;

  constructor(incomeService: IncomesService) {
    this.incomeService = incomeService;
  }

  async listIncomes(
    req: FastifyRequest<{ Body: { accountId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { accountId } = req.body;

    try {
      const data = await this.incomeService.listIncomes(accountId);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async createIncome(
    req: FastifyRequest<{
      Body: { income: IncomesCreateInput; accountId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { income, accountId } = req.body;
      const data = await this.incomeService.createIncomes(income, accountId);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { IncomesController };
