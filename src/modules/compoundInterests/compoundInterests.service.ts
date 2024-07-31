import { getCompoundInterest } from "../../utils/getCompoundInterest";
import { getMultipleCompoundInterest } from "../../utils/getMultipleCompoundInterest";

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

      let multipleCompoundInterest: any = [
        monthContribution,
        monthContribution * 2,
        monthContribution * 3,
        monthContribution * 5,
        monthContribution * 10,
      ];

      multipleCompoundInterest = multipleCompoundInterest.map(
        (item: number) => {
          return {
            amount: item,
            ...getMultipleCompoundInterest(
              item,
              monthTax,
              totalMonths,
              initialValue
            ),
          };
        }
      );

      return {
        totalAmount: Number(totalAmount),
        totalFees: Number(totalFees),
        totalInvested: Number(totalInvested),
      };
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }

  async generateMultipleCompoundInterests(
    monthContribution: number,
    monthTax: number,
    totalMonths: number,
    initialValue: number
  ) {
    try {
      let multipleCompoundInterest: any = [
        monthContribution,
        monthContribution * 2,
        monthContribution * 3,
        monthContribution * 5,
        monthContribution * 10,
      ];

      multipleCompoundInterest = multipleCompoundInterest.map(
        (item: number) => {
          return {
            "Month Investment": String(item),
            ...getMultipleCompoundInterest(
              item,
              monthTax,
              totalMonths,
              initialValue
            ),
          };
        }
      );

      return multipleCompoundInterest;
    } catch (error: any) {
      throw new Error("Failed to lit expenses: " + error.message);
    }
  }
}

export { CompoundInterestsService };
