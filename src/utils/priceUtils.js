
export function displayPriceFormat(price) {
  return Number(price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });
}

export function calcSubTotalPrice(unitPrice, adultNumber, dayNumber) {
  return Number(unitPrice) * Number(adultNumber) * Number(dayNumber);
}

export function calcTotalPrice(unitPrice, adultNumber, dayNumber, effectRate, discount = 0) {
  const subTotal = calcSubTotalPrice(unitPrice, adultNumber, dayNumber);
  const ratePrice = (subTotal / 100) * Number(effectRate);
  return subTotal + ratePrice - Number(discount);
}