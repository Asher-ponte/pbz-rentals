export function formatPeso(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatQty(qty: number, unit = "pc"): string {
  return `${qty} ${unit}${qty === 1 ? "" : "s"}`;
}
