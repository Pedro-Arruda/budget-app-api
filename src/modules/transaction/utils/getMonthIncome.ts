import { Incomes } from "@prisma/client";

export const getMonthIncome = (
  incomes: Incomes[],
  month: number,
  year: number
) => {
  let amount = 0;

  incomes.forEach((income) => {
    if (income.everyMonth) {
      amount = amount + Number(income.amount);
    }
    console.log(income);

    if (income.month === month && income.year === year)
      amount += Number(income.amount);
  });

  return amount;
};
