export type Gender = "Nam" | "Nữ" | "Khác";

export interface Stats {
  todayRevenue: number;
  totalRevenue: number;
  totalOrders: number;
  totalProfit: number;
  todayGrowth: number;
}

export interface ActivityLog {
  id: number;
  user_name: string;
  description: string;
  created_at: string;
  time_ago: string;
  url?: string;
}

export interface ProductRanking {
  id: number;
  name: string;
  code: string;
  total_quantity: number;
  total_revenue: number;
}

export interface DashboardData {
  stats: Stats;
  chartData: {
    revenue: number[];
    label: string[];
  };
  activityLogs: ActivityLog[];
  topProducts: ProductRanking[];
}

export interface Product {
  id: number;
  code: string;
  name: string;
  price: number;
  cost_price: number;
  stock: number;
  unit?: string;
  category_name?: string;
  brand_name?: string;
  image_url?: string;
  created_at: string;
  properties?: string;
  barcode?: string;
  description?: string;
  order_note?: string;
  supplier?: string;
  min_stock?: number;
  max_stock?: number;
  note_template?: string;
  is_variant: boolean;
  variants_count?: number;
}
export interface Category {
  id: number;
  name: string;
  code?: string;
  description?: string;
  parent_id?: number;
  created_at: string;
  products_count?: number;
}

export interface Brand {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  products_count?: number;
}
export interface Order {
  id: number;
  code: string;
  customer_name: string;
  customer_phone?: string;
  total_amount: number;
  discount: number;
  final_amount: number;
  paid_amount: number;
  payment_method: string;
  status: "completed" | "pending" | "cancelled";
  seller_name: string;
  created_at: string;
}

export interface ReturnOrder {
  id: number;
  code: string;
  order_code?: string;
  customer_name: string;
  customer_phone?: string;
  amount_due: number;
  amount_paid: number;
  status: "completed" | "pending";
  seller_name: string;
  created_at: string;
}

export interface Branch {
  id: number;
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  ward: string;
  active: boolean;
  created_at: string;
}

export interface BranchForm {
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  ward: string;
  active: boolean;
}
