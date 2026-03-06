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
export const TYPES_STUB = true;
