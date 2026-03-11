export interface Supplier {
  id: number;
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  group: string;
  total_bought: number;
  debt: number;
  note: string;
}

export interface PurchaseOrder {
  id: number;
  code: string;
  supplier: string;
  date: string;
  total_amount: number;
  paid_amount: number;
  status: string;
  creator: string;
  created_at: string;
}

export interface InventoryDisposal {
  id: number;
  code: string;
  date: string;
  total_value: number;
  status: string;
  creator: string;
  created_at: string;
}

export interface SupplierReturn {
  id: number;
  code: string;
  subId: string;
  supplier: string;
  date: string;
  total_amount: number;
  paid_amount: number;
  discount: number;
  due_from_supplier: number;
  received_from_supplier: number;
  status: string;
  creator: string;
  created_at: string;
}

export interface InventoryAudit {
  id: number;
  code: string;
  time: string;
  balance_date: string;
  actual_qty: number;
  actual_total: number;
  total_diff: number;
  increase_qty: number;
  decrease_qty: number;
  status: string;
  creator: string;
  created_date: string;
}

export interface InventoryTransfer {
  id: number;
  code: string;
  subId: string;
  date: string;
  time: string;
  from: string;
  to: string;
  status: string;
  creator: string;
  created_at: string;
}
