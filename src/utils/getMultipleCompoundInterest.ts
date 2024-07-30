import { formatLabelMultipleCompound } from "../modules/compoundInterests/utils/formatLabelMultipleCompound";

export function getMultipleCompoundInterest(
  monthContribution: number,
  monthTax: number,
  totalMonths: number,
  initialValue: number
) {
  monthTax = monthTax / 100;

  const totalAmountDefault = (
    initialValue * Math.pow(1 + monthTax, totalMonths) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths) - 1)) / monthTax
  ).toFixed(2);

  const totalAmountX2 = (
    initialValue * Math.pow(1 + monthTax, totalMonths * 2) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths * 2) - 1)) /
      monthTax
  ).toFixed(2);

  const totalAmountX3 = (
    initialValue * Math.pow(1 + monthTax, totalMonths * 3) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths * 3) - 1)) /
      monthTax
  ).toFixed(2);

  const totalAmountX5 = (
    initialValue * Math.pow(1 + monthTax, totalMonths * 5) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths * 5) - 1)) /
      monthTax
  ).toFixed(2);

  const totalAmountX10 = (
    initialValue * Math.pow(1 + monthTax, totalMonths * 10) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths * 10) - 1)) /
      monthTax
  ).toFixed(2);

  return {
    [formatLabelMultipleCompound(totalMonths)]: totalAmountDefault,
    [formatLabelMultipleCompound(totalMonths * 2)]: totalAmountX2,
    [formatLabelMultipleCompound(totalMonths * 3)]: totalAmountX3,
    [formatLabelMultipleCompound(totalMonths * 5)]: totalAmountX5,
    [formatLabelMultipleCompound(totalMonths * 10)]: totalAmountX10,
  };
}
