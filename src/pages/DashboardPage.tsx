import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { TopProducts } from "@/components/dashboard/TopProducts";
import type { DashboardData } from "@/types";

export default function DashboardPage() {
  // Mock data based on the structure of the Laravel response
  const mockData: DashboardData = {
    stats: {
      todayRevenue: 5240000,
      totalRevenue: 125800000,
      totalOrders: 428,
      totalProfit: 12500000,
      todayGrowth: 12.5,
    },
    chartData: {
      revenue: [1200000, 2100000, 1800000, 2400000, 3100000, 2800000, 5240000],
      label: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ Nhật"],
    },
    activityLogs: [
      {
        id: 1,
        user_name: "Admin",
        description: "Vừa cập nhật giá sản phẩm iPhone 15 Pro Max",
        created_at: "2024-03-05T10:00:00",
        time_ago: "5 phút trước",
        url: "/products/1",
      },
      {
        id: 2,
        user_name: "Nhân viên A",
        description: "Đã tạo đơn hàng mới #ORD-1234",
        created_at: "2024-03-05T09:45:00",
        time_ago: "20 phút trước",
        url: "/orders/1234",
      },
      {
        id: 3,
        user_name: "Admin",
        description: "Đã đăng nhập vào hệ thống",
        created_at: "2024-03-05T08:00:00",
        time_ago: "2 giờ trước",
      },
      {
        id: 4,
        user_name: "Nhân viên B",
        description: "Nhập kho sản phẩm Samsung S24 Ultra",
        created_at: "2024-03-05T07:30:00",
        time_ago: "3 giờ trước",
        url: "/inventory/receive/5",
      },
    ],
    topProducts: [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        sku: "IP15PM-256-BLK",
        total_quantity: 45,
        total_revenue: 1350000000,
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        sku: "SS-S24U-512-GRY",
        total_quantity: 32,
        total_revenue: 960000000,
      },
      {
        id: 3,
        name: "MacBook Air M3 13 inch",
        sku: "MBA-M3-8-256-SLV",
        total_quantity: 18,
        total_revenue: 540000000,
      },
      {
        id: 4,
        name: "AirPods Pro Gen 2",
        sku: "APP-G2-WHT",
        total_quantity: 85,
        total_revenue: 425000000,
      },
      {
        id: 5,
        name: "Apple Watch Series 9",
        sku: "AW-S9-45-MID",
        total_quantity: 24,
        total_revenue: 240000000,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <DashboardStats stats={mockData.stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart
            data={mockData.chartData.revenue}
            labels={mockData.chartData.label}
          />
        </div>
        <div>
          <RecentActivity logs={mockData.activityLogs} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TopProducts products={mockData.topProducts} />
      </div>
    </div>
  );
}
