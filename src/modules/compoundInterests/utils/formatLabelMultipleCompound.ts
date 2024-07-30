export const formatLabelMultipleCompound = (item: number) => {
  if (item % 12 === 0) {
    return `${item / 12} ${item / 12 > 1 ? "years" : "year"}`;
  }

  if (item > 12) {
    const [integerPart, decimalPart] = (item / 12).toString().split(".");

    const formattedDecimalPart = decimalPart.slice(0, 1);

    return `${integerPart} years and ${
      Number(formattedDecimalPart) + 1
    } months`;
  }

  return `${item} months`;
};
