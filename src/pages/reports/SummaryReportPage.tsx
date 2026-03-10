import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueByMonth = [
  { month: 1, revenue: 2750000000 },
  { month: 2, revenue: 1850000000 },
  { month: 3, revenue: 480000000 },
  { month: 4, revenue: 0 },
  { month: 5, revenue: 0 },
  { month: 6, revenue: 0 },
  { month: 7, revenue: 0 },
  { month: 8, revenue: 0 },
  { month: 9, revenue: 0 },
  { month: 10, revenue: 0 },
  { month: 11, revenue: 0 },
  { month: 12, revenue: 0 },
];

const ordersByMonth = [
  { month: 1, orders: 1030 },
  { month: 2, orders: 550 },
  { month: 3, orders: 280 },
  { month: 4, orders: 0 },
  { month: 5, orders: 0 },
  { month: 6, orders: 0 },
  { month: 7, orders: 0 },
  { month: 8, orders: 0 },
  { month: 9, orders: 0 },
  { month: 10, orders: 0 },
  { month: 11, orders: 0 },
  { month: 12, orders: 0 },
];

const topProducts = [
  { name: "Que chọc sim", sku: "qcs", qty: 1536, revenue: 307200000 },
  { name: "Chai 530 V2 ( thường)", sku: "530", qty: 1461, revenue: 47092000 },
  { name: "Bao da Note 8", sku: "bdnn8", qty: 983, revenue: 130000000 },
  { name: "Dây sạc nhanh C-C", sku: "dscc", qty: 856, revenue: 64200000 },
];

const topCustomers = [
  { name: "A Định PVT", phone: "0978237915", orders: 52, spent: 862630000 },
  { name: "A Hùng Cường", phone: "0908345127", orders: 16, spent: 403701000 },
  { name: "Tý Gold SG", phone: "1566516551", orders: 14, spent: 320400000 },
  { name: "Hoàng Minh SG", phone: "0909090906", orders: 12, spent: 285000000 },
];

const formatCurrency = (v: number) =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: 2 }) + " VNĐ";

const formatShort = (v: number) => {
  if (v >= 1e9) return (v / 1e9).toFixed(1) + "B";
  if (v >= 1e6) return (v / 1e6).toFixed(0) + "M";
  return v.toString();
};

export default function SummaryReportPage() {
  const [period, setPeriod] = useState("year");
  const [year, setYear] = useState("2026");

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <BarChart2 className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold">Báo cáo tổng hợp</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-28 h-9 border-border shadow-none text-sm focus:ring-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Năm</SelectItem>
              <SelectItem value="month">Tháng</SelectItem>
              <SelectItem value="quarter">Quý</SelectItem>
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24 h-9 border-border shadow-none text-sm focus:ring-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["2026", "2025", "2024"].map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="h-9 gap-2 bg-primary hover:bg-primary/90 px-5 font-semibold">
            Xem báo cáo
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Tổng đơn hàng",
            value: "1,975",
            icon: ShoppingCart,
            color: "text-green-600 bg-green-100 dark:bg-green-500/20",
          },
          {
            label: "Tổng doanh thu",
            value: "5,102,208,300.00 VNĐ",
            icon: DollarSign,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20",
          },
          {
            label: "Tổng sản phẩm đã bán",
            value: "54,220.24",
            icon: Package,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-500/20",
          },
          {
            label: "Lợi nhuận",
            value: "922,018,703.75 VNĐ",
            icon: TrendingUp,
            color: "text-amber-600 bg-amber-100 dark:bg-amber-500/20",
          },
        ].map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-5 flex items-start gap-4"
          >
            <div className={`p-2.5 rounded-xl shrink-0 ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{label}</p>
              <p className="text-xl font-bold leading-tight">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue area chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-bold text-base mb-4">Doanh thu theo thời gian</h2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart
              data={revenueByMonth}
              margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--primary))"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={{
                  value: `Doanh thu theo tháng trong năm ${year}`,
                  position: "insideBottom",
                  offset: -12,
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <YAxis
                tickFormatter={formatShort}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={{
                  value: "Doanh thu",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <Tooltip
                formatter={(v: any) => [
                  Number(v).toLocaleString("vi-VN") + " đ",
                  "Doanh thu",
                ]}
                labelFormatter={(l) => `Tháng ${l}`}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                fill="url(#revenueGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders bar chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h2 className="font-bold text-base mb-4">
            Số đơn hàng theo thời gian
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={ordersByMonth}
              margin={{ top: 5, right: 10, left: 10, bottom: 20 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={{
                  value: `Số đơn hàng theo tháng trong năm ${year}`,
                  position: "insideBottom",
                  offset: -12,
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                label={{
                  value: "Số đơn hàng",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  fontSize: 11,
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
              <Tooltip
                formatter={(v: unknown) => [v as number, "Đơn hàng"]}
                labelFormatter={(l) => `Tháng ${l}`}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top products */}
        <div className="bg-card border border-border rounded-xl">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-base">Top sản phẩm bán chạy</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  SẢN PHẨM
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  SKU
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                  SỐ LƯỢNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                  DOANH THU
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((p) => (
                <TableRow key={p.sku} className="hover:bg-muted/30 border-b">
                  <TableCell className="text-sm font-medium text-primary hover:underline cursor-pointer py-3">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground py-3">
                    {p.sku}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3">
                    {p.qty.toLocaleString("vi-VN")}.00
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-right py-3">
                    {formatCurrency(p.revenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Top customers */}
        <div className="bg-card border border-border rounded-xl">
          <div className="px-6 py-4 border-b">
            <h2 className="font-bold text-base">Top khách hàng</h2>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  KHÁCH HÀNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                  SỐ ĐIỆN THOẠI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                  SỐ ĐƠN HÀNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                  TỔNG CHI TIÊU
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCustomers.map((c) => (
                <TableRow key={c.phone} className="hover:bg-muted/30 border-b">
                  <TableCell className="text-sm font-semibold py-3">
                    {c.name}
                  </TableCell>
                  <TableCell className="text-sm text-primary py-3">
                    {c.phone}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3">
                    {c.orders}
                  </TableCell>
                  <TableCell className="text-sm font-semibold text-primary text-right py-3">
                    {formatCurrency(c.spent)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
