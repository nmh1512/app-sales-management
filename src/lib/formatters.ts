/**
 * Shared number/currency formatting helpers used across the application.
 * All formatters follow Vietnamese locale conventions.
 */

/** Format a number as Vietnamese currency with 2 decimal places: "1,234,567.89 VNĐ" */
export const formatCurrency = (v: number): string =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " VNĐ";

/** Format a number as Vietnamese currency with no decimal places: "1,234,567 VNĐ" */
export const formatCurrencyInt = (v: number): string =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + " VNĐ";

/** Format a number with 2 decimal places using en-US grouping: "1,234.56" */
export const formatNumber = (v: number): string =>
  v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Format a number as a short readable string: 1_200_000 → "1.2M", 2_500_000_000 → "2.5B" */
export const formatShort = (v: number): string => {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(0) + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(0) + "K";
  return v.toString();
};
