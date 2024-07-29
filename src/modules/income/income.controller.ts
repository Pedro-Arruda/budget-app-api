import { FastifyReply, FastifyRequest } from "fastify";
import { IncomesCreateInput } from "../../interfaces/incomes.interface";
import { IncomesService } from "./income.service";

class IncomesController {
  private incomeService: IncomesService;

  constructor(incomeService: IncomesService) {
    this.incomeService = incomeService;
  }

  async listIncomes(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const data = await this.incomeService.listIncomes();

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async createIncome(
    req: FastifyRequest<{ Body: IncomesCreateInput }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const fixedExpense = req.body;
      const data = await this.incomeService.createIncomes(fixedExpense);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { IncomesController };
