import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  FileDown,
  Calendar,
} from "lucide-react";

const mockOrders = [
  {
    code: "DH008429",
    customer: "Hoàng Minh SG -(4)",
    qty: 3,
    status: "Hoàn thành",
    cost: 507598.28,
    total: 905000,
    received: 0,
    profit: 397411.72,
    time: "19:01",
  },
  {
    code: "DH008428",
    customer: "Thành Trung SG",
    qty: 1,
    status: "Hoàn thành",
    cost: 40000,
    total: 80000,
    received: 0,
    profit: 40000,
    time: "16:56",
  },
  {
    code: "DH008427",
    customer: "A Tuấn Black SG (H)",
    qty: 1,
    status: "Hoàn thành",
    cost: 15888.79,
    total: 23000,
    received: 0,
    profit: 7111.21,
    time: "16:34",
  },
  {
    code: "DH008426",
    customer: "Hiệp NTL (H) 3",
    qty: 12,
    status: "Hoàn thành",
    cost: 124155.6,
    total: 174000,
    received: 0,
    profit: 49844.4,
    time: "16:50",
  },
  {
    code: "DH008425",
    customer: "Trần Q7",
    qty: 2,
    status: "Hoàn thành",
    cost: 298245.66,
    total: 493000,
    received: 0,
    profit: 184754.34,
    time: "16:21",
  },
  {
    code: "DH008424",
    customer: "A Luân (a đăng lhp)",
    qty: 1,
    status: "Hoàn thành",
    cost: 110836.36,
    total: 220000,
    received: 220000,
    profit: 109163.64,
    time: "16:19",
  },
  {
    code: "DH008423",
    customer: "Trần Shoppe",
    qty: 25,
    status: "Hoàn thành",
    cost: 781005.67,
    total: 888200,
    received: 0,
    profit: 107194.33,
    time: "15:48",
  },
  {
    code: "DH008422",
    customer: "Thủy Hưng Thịnh PT",
    qty: 30,
    status: "Hoàn thành",
    cost: 6169968.1,
    total: 8700000,
    received: 0,
    profit: 2531031.9,
    time: "15:43",
  },
  {
    code: "DH008421",
    customer: "Thành Thảo SG",
    qty: 1,
    status: "Hoàn thành",
    cost: 566000,
    total: 610000,
    received: 0,
    profit: 44000,
    time: "15:41",
  },
];

const formatCurrency = (v: number) =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: 2 }) + " VND";

const sellers = ["Tất cả", "Admin", "Hà Tảo LK", "Nguyễn Văn B"];

export default function DailyReportPage() {
  const [seller, setSeller] = useState("");
  const [date, setDate] = useState("10/03/2026");

  const totalOrders = mockOrders.length;
  const totalRevenue = mockOrders.reduce((s, r) => s + r.total, 0);
  const totalReceived = mockOrders.reduce((s, r) => s + r.received, 0);
  const totalProfit = mockOrders.reduce((s, r) => s + r.profit, 0);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-xl font-bold">Báo cáo ngày: {date}</h1>

        <div className="flex flex-wrap items-center gap-3">
          <Select value={seller} onValueChange={setSeller}>
            <SelectTrigger className="w-44 h-9 border-border shadow-none text-sm focus:ring-1">
              <SelectValue placeholder="Chọn người bán" />
            </SelectTrigger>
            <SelectContent>
              {sellers.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-9 border border-border rounded-lg px-3 pr-10 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-36"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>

          <Button className="h-9 gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5">
            <FileDown className="h-4 w-4" /> Export PDF
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Tổng đơn hàng",
            value: totalOrders.toString(),
            icon: ShoppingCart,
            color: "text-green-600 bg-green-100 dark:bg-green-500/20",
          },
          {
            label: "Tổng doanh thu",
            value: formatCurrency(totalRevenue),
            icon: DollarSign,
            color: "text-blue-600 bg-blue-100 dark:bg-blue-500/20",
          },
          {
            label: "Tổng thực thu",
            value: formatCurrency(totalReceived),
            icon: Package,
            color: "text-purple-600 bg-purple-100 dark:bg-purple-500/20",
          },
          {
            label: "Lợi nhuận",
            value: formatCurrency(totalProfit),
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

      {/* Orders table */}
      <div className="bg-card rounded-lg border border-border shadow-none">
        <div className="px-6 py-4 border-b">
          <h2 className="font-bold text-base">Danh sách đơn hàng</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                {[
                  "MÃ ĐƠN HÀNG",
                  "KHÁCH HÀNG",
                  "SL",
                  "TRẠNG THÁI",
                  "GIÁ VỐN",
                  "TỔNG TIỀN",
                  "THỰC THU",
                  "LỢI NHUẬN",
                  "THỜI GIAN",
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="text-xs font-bold uppercase text-muted-foreground py-3"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((row) => (
                <TableRow
                  key={row.code}
                  className="hover:bg-muted/30 border-b cursor-pointer"
                >
                  <TableCell className="font-bold text-primary text-sm py-3">
                    {row.code}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-primary/80 hover:underline py-3">
                    {row.customer}
                  </TableCell>
                  <TableCell className="text-sm py-3">{row.qty}</TableCell>
                  <TableCell className="py-3">
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-100 border-none font-semibold rounded text-xs">
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm py-3">
                    {formatCurrency(row.cost)}
                  </TableCell>
                  <TableCell className="text-sm py-3">
                    {formatCurrency(row.total)}
                  </TableCell>
                  <TableCell className="text-sm py-3">
                    {formatCurrency(row.received)}
                  </TableCell>
                  <TableCell className="text-sm font-semibold py-3">
                    {formatCurrency(row.profit)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground py-3">
                    {row.time}
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
