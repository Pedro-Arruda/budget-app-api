export function getCompoundInterest(
  monthContribution: number,
  monthTax: number,
  totalMonths: number,
  initialValue: number
) {
  monthTax = monthTax / 100;

  const totalAmount = (
    initialValue * Math.pow(1 + monthTax, totalMonths) +
    (monthContribution * (Math.pow(1 + monthTax, totalMonths) - 1)) / monthTax
  ).toFixed(2);

  const totalInvested = (
    initialValue +
    monthContribution * totalMonths
  ).toFixed(2);
  const totalFees = (Number(totalAmount) - Number(totalInvested)).toFixed(2);

  return { totalAmount, totalInvested, totalFees };
}
