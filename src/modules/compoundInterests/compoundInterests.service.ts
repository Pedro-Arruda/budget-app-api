import { getCompoundInterest } from "../../utils/getCompoundInterest";

class CompoundInterestsService {
  constructor() {}
  async generateAmountCompoundInterests(
    monthContribution: number,
    monthTax: number,
    totalMonths: number,
    initialValue: number
  ): Promise<{
    totalAmount: number;
    totalFees: number;
    totalInvested: number;
  }> {
    try {
      const { totalAmount, totalFees, totalInvested } = getCompoundInterest(
        monthContribution,
        monthTax,
        totalMonths,
        initialValue
      );

      return { totalAmount, totalFees, totalInvested };
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { CompoundInterestsService };
