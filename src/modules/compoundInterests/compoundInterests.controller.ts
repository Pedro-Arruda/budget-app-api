import { FastifyReply, FastifyRequest } from "fastify";
import { CompoundInterestsService } from "./compoundInterests.service";

class CompoundInterestsController {
  private compoundInterestsService: CompoundInterestsService;

  constructor(compoundInterestsService: CompoundInterestsService) {
    this.compoundInterestsService = compoundInterestsService;
  }

  async generateAmountCompoundInterests(
    req: FastifyRequest<{
      Body: {
        monthContribution: number;
        monthTax: number;
        totalMonths: number;
        initialValue: number;
      };
    }>,
    reply: FastifyReply
  ): Promise<void> {
    const { monthContribution, monthTax, totalMonths, initialValue } = req.body;
    try {
      const data =
        await this.compoundInterestsService.generateAmountCompoundInterests(
          monthContribution,
          monthTax,
          totalMonths,
          initialValue
        );

      reply.status(200).send(data);
    } catch (error) {
      reply.send(error);
    }
  }
}

export { CompoundInterestsController };
