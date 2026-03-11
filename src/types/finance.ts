
export type TransactionType = "receipt" | "payment";

export interface FinanceTransaction {
  id: number;
  code: string;
  type: TransactionType;
  amount: number;
  status: string;
  creator: string;
  created_at: string;
  updated_by: string;
  updated_at: string;
  subject: string;
  customer: string;
  note: string;
}

export interface FinanceForm {
  type: TransactionType;
  subject: string;
  customer: string;
  date: string;
  amount: string;
  note: string;
}
