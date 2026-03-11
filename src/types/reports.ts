/**
 * Types for the Reports module.
 * These are shared across multiple report pages and their sub-components.
 */

export interface ProductReportData {
  id: string;
  name: string;
  qtySold: number;
  revenue: number;
  totalCost: number;
  profit: number;
  stockStart: number;
  stockIn: number;
  stockOut: number;
  stockEnd: number;
  costPrice: number;
  sellPrice: number;
  sellValue: number;
  stockValue: number;
}

export interface EmployeeReportData {
  id: string;
  name: string;
  orderCount: number;
  revenue: number;
  discount: number;
  returnAmount: number;
  cost: number;
  profit: number;
  customerCount: number;
  debt: number;
}

export interface SupplierReportData {
  id: string;
  name: string;
  qtyImport: number;
  valImport: number;
  qtyReturn: number;
  valReturn: number;
  qtyRemain: number;
  valNet: number;
  debtStart: number;
  debtIncrease: number;
  debtPaid: number;
  debtEnd: number;
}

export interface CustomerReportData {
  id: string;
  name: string;
  revenue: number;
  discount: number;
  paid: number;
  cost: number;
  profit: number;
  debtStart: number;
  debtIncrease: number;
  debtPaid: number;
  debtEnd: number;
}

export interface DailyOrderData {
  code: string;
  customer: string;
  qty: number;
  status: string;
  cost: number;
  total: number;
  received: number;
  profit: number;
  time: string;
}

export type ReportViewMode = "chart" | "report";
export type ReportInterest = "sales" | "profit" | "debt" | "import";
