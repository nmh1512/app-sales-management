import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, DollarSign, ShoppingCart, BarChart3 } from "lucide-react";
import type { Stats } from "@/types";

interface DashboardStatsProps {
  stats: Stats;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const items = [
    {
      title: "Doanh thu hôm nay",
      value: `${stats.todayRevenue.toLocaleString()} VNĐ`,
      description: `${stats.todayGrowth >= 0 ? "+" : ""}${stats.todayGrowth}% so hôm qua`,
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
      growth: stats.todayGrowth,
    },
    {
      title: "Tổng doanh thu",
      value: `${stats.totalRevenue.toLocaleString()} VNĐ`,
      description: "Tất cả thời gian",
      icon: DollarSign,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Tổng đơn hàng",
      value: stats.totalOrders.toLocaleString(),
      description: "Tất cả đơn hàng",
      icon: ShoppingCart,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Tổng lợi nhuận",
      value: `${stats.totalProfit.toLocaleString()} VNĐ`,
      description: "Tháng này",
      icon: BarChart3,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <Card key={index} className="border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="font-medium text-muted-foreground">
              {item.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${item.bg}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
