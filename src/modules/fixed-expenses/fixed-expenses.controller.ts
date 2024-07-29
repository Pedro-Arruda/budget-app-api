import { FastifyReply, FastifyRequest } from "fastify";
import { FixedExpensesCreateInput } from "../../interfaces/fixed-expenses.interface";
import { FixedExpensesService } from "./fixed-expenses.service";

class FixedExpensesController {
  private fixedExpensesService: FixedExpensesService;

  constructor(fixedExpensesService: FixedExpensesService) {
    this.fixedExpensesService = fixedExpensesService;
  }

  async listFixedExpenses(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const data = await this.fixedExpensesService.listFixedExpenses();

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async createFixedExpenses(
    req: FastifyRequest<{ Body: FixedExpensesCreateInput }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const fixedExpense = req.body;
      const data = await this.fixedExpensesService.createFixedExpenses(
        fixedExpense
      );

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { FixedExpensesController };
