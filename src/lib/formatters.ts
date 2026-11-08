/**
 * NARA ESTATE — Currency and Dimension Formatters
 * Formats numbers into Indonesian Rupiah (IDR) and architectural unit standards.
 */

/**
 * Formats a numeric amount to standard Indonesian Rupiah notation.
 * e.g. 38500000000 -> "Rp 38.500.000.000"
 */
export function formatCurrencyIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a numeric IDR amount to an editorial compact string.
 * e.g.
 * - 38500000000 -> "Rp 38,5 Miliar"
 * - 45000000000 -> "Rp 45,0 Miliar"
 * - 850000000   -> "Rp 850 Juta"
 * - 450000000   -> "Rp 450 Juta"
 */
export function formatCompactIDR(amount: number): string {
  if (amount >= 1_000_000_000) {
    const billions = amount / 1_000_000_000;
    const rounded = Number(billions.toFixed(1));
    const formatted =
      rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1).replace(".", ",");
    return `Rp ${formatted} Miliar`;
  }

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const rounded = Number(millions.toFixed(1));

    // Values that round up to 1.000 million transition cleanly to "Rp 1 Miliar"
    if (rounded >= 1_000) {
      return "Rp 1 Miliar";
    }

    const formatted =
      rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1).replace(".", ",");
    return `Rp ${formatted} Juta`;
  }

  return formatCurrencyIDR(amount);
}

/**
 * Formats a price with an optional rental period suffix.
 * e.g. (850000000, "tahun") -> "Rp 850 Juta / tahun"
 */
export function formatPropertyPrice(
  amount: number,
  pricePeriod?: "tahun" | "bulan"
): string {
  const compact = formatCompactIDR(amount);
  return pricePeriod ? `${compact} / ${pricePeriod}` : compact;
}

/**
 * Formats an area in square meters.
 * e.g. 620 -> "620 m²"
 */
export function formatAreaSqm(area: number): string {
  return `${new Intl.NumberFormat("id-ID").format(area)} m²`;
}

