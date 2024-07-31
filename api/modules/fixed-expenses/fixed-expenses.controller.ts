import { FastifyReply, FastifyRequest } from "fastify";
import { FixedExpensesCreateInput } from "../../interfaces/fixed-expenses.interface";
import { FixedExpensesService } from "./fixed-expenses.service";

class FixedExpensesController {
  private fixedExpensesService: FixedExpensesService;

  constructor(fixedExpensesService: FixedExpensesService) {
    this.fixedExpensesService = fixedExpensesService;
  }

  async listFixedExpenses(
    req: FastifyRequest<{ Body: { accountId: string } }>,
    reply: FastifyReply
  ): Promise<void> {
    const { accountId } = req.body;
    try {
      const data = await this.fixedExpensesService.listFixedExpenses(accountId);

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }

  async createFixedExpenses(
    req: FastifyRequest<{
      Body: { fixedExpense: FixedExpensesCreateInput; accountId: string };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const { fixedExpense, accountId } = req.body;
      const data = await this.fixedExpensesService.createFixedExpenses(
        fixedExpense,
        accountId
      );

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { FixedExpensesController };
