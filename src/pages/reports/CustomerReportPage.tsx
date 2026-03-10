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
import { FileDown, ChevronDown, ChevronUp } from "lucide-react";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { useState } from "react";

const mockCustomers = [
  {
    id: "",
    name: "Khách lẻ",
    revenue: 570000,
    refund: 0,
    paid: 570000,
    cost: 361991.19,
    profit: 208008.81,
  },
  {
    id: "KH175601371581LLAV",
    name: "Khắc Phương -(3)",
    revenue: 4631000,
    refund: 0,
    paid: 0,
    cost: 4135826.48,
    profit: 495173.52,
  },
  {
    id: "KH17560141445HM6F6",
    name: "A Định PVT",
    revenue: 18400000,
    refund: 0,
    paid: 0,
    cost: 14882963.88,
    profit: 3517036.12,
  },
  {
    id: "KH1756014260SUQWAT",
    name: "Trần Shoppe",
    revenue: 4388950,
    refund: 0,
    paid: 0,
    cost: 4035608.96,
    profit: 353341.04,
  },
  {
    id: "KH1756014261",
    name: "Ngân Ellen-Mobile Pro",
    revenue: 910000,
    refund: 0,
    paid: 0,
    cost: 648734.75,
    profit: 261265.25,
  },
  {
    id: "KH1756014263",
    name: "C Là-Phan Thiết",
    revenue: 22300000,
    refund: 0,
    paid: 0,
    cost: 16645503.75,
    profit: 5654496.25,
  },
  {
    id: "KH1756014264",
    name: "C Hậu - MK",
    revenue: 14120000,
    refund: 0,
    paid: 0,
    cost: 10450058.45,
    profit: 3669941.55,
  },
  {
    id: "KH1756014267",
    name: "Thành Trung SG",
    revenue: 757000,
    refund: 0,
    paid: 0,
    cost: 517620.08,
    profit: 239379.92,
  },
  {
    id: "KH1756014268",
    name: "C Hải Vân KonTum (H)",
    revenue: 10135000,
    refund: 0,
    paid: 7608000,
    cost: 7848718.29,
    profit: 2286281.71,
  },
  {
    id: "KH1756014272",
    name: "Hoài Ân - Bến Tre",
    revenue: 5916000,
    refund: 0,
    paid: 5916000,
    cost: 4856178.02,
    profit: 1059821.98,
  },
  {
    id: "KH1756014273",
    name: "Hiệp NTL (H)-3",
    revenue: 479000,
    refund: 0,
    paid: 0,
    cost: 356133.97,
    profit: 122866.03,
  },
  {
    id: "KH1756014275",
    name: "A Đức SG",
    revenue: 625000,
    refund: 0,
    paid: 0,
    cost: 450031.23,
    profit: 174968.77,
  },
  {
    id: "KH1756014280",
    name: "Khắc Huy SG-(4)",
    revenue: 215000,
    refund: 0,
    paid: 0,
    cost: 107987.31,
    profit: 107012.69,
  },
];

const formatCurrency = (v: number) =>
  v.toLocaleString("vi-VN", { minimumFractionDigits: 2 }) + " VNĐ";

const SortIcon = () => (
  <div className="inline-flex flex-col ml-1 items-center justify-center translate-y-0.5">
    <ChevronUp className="h-2.5 w-2.5 text-muted-foreground/40 -mb-[3px]" />
    <ChevronDown className="h-2.5 w-2.5 text-muted-foreground/40" />
  </div>
);

export default function CustomerReportPage() {
  const [interest, setInterest] = useState("profit");

  const totalRevenue = mockCustomers.reduce((s, r) => s + r.revenue, 0);
  const totalRefund = mockCustomers.reduce((s, r) => s + r.refund, 0);
  const totalPaid = mockCustomers.reduce((s, r) => s + r.paid, 0);
  const totalCost = mockCustomers.reduce((s, r) => s + r.cost, 0);
  const totalProfit = mockCustomers.reduce((s, r) => s + r.profit, 0);

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Top Filter Section */}
      <div className="flex flex-wrap items-end gap-6 text-sm">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Kiểu hiển thị
          </label>
          <Button className="h-9 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-5 rounded-md font-semibold text-sm">
            Báo cáo
          </Button>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Mối quan tâm
          </label>
          <Select value={interest} onValueChange={setInterest}>
            <SelectTrigger className="w-56 h-9 border-border shadow-none text-sm focus:ring-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profit">Lợi nhuận</SelectItem>
              <SelectItem value="revenue">Doanh thu</SelectItem>
              <SelectItem value="items">Số lượng đã bán</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">
            Thời gian
          </label>
          <DateRangePicker />
        </div>
      </div>

      {/* Main Report Table Container */}
      <div className="bg-card rounded-lg border border-border shadow-none overflow-hidden">
        <div className="px-6 py-4 flex items-center justify-between border-b">
          <h2 className="text-lg font-bold">
            Báo cáo lợi nhuận theo khách hàng
          </h2>
          <Button className="h-9 gap-2 bg-[#00b85c] hover:bg-[#009b4d] text-white font-semibold">
            <FileDown className="h-4 w-4" /> Xuất PDF
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 w-[20%]">
                  MÃ KH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 w-[20%]">
                  TÊN KHÁCH HÀNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 text-right cursor-pointer group">
                  TỔNG TIỀN HÀNG <SortIcon />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 text-right cursor-pointer group">
                  TỔNG GIẢM GIÁ <SortIcon />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 text-right cursor-pointer group">
                  TỔNG ĐÃ TRẢ <SortIcon />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 text-right cursor-pointer group">
                  TỔNG CHI PHÍ <SortIcon />
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-muted-foreground py-4 text-right cursor-pointer group">
                  LỢI NHUẬN <SortIcon />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Highlighted Sum Row */}
              <TableRow className="bg-[#fff9e6] dark:bg-amber-900/20 hover:bg-[#fff9e6] dark:hover:bg-amber-900/20 border-b font-bold font-mono">
                <TableCell className="py-4 font-sans text-sm">
                  SL khách hàng: {mockCustomers.length}
                </TableCell>
                <TableCell className="py-4"></TableCell>
                <TableCell className="py-4 text-right">
                  {formatCurrency(totalRevenue)}
                </TableCell>
                <TableCell className="py-4 text-right">
                  {formatCurrency(totalRefund)}
                </TableCell>
                <TableCell className="py-4 text-right">
                  {formatCurrency(totalPaid)}
                </TableCell>
                <TableCell className="py-4 text-right">
                  {formatCurrency(totalCost)}
                </TableCell>
                <TableCell className="py-4 text-right text-green-600 dark:text-green-500 font-bold">
                  {formatCurrency(totalProfit)}
                </TableCell>
              </TableRow>

              {mockCustomers.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-muted/30 border-b cursor-pointer transition-colors"
                >
                  <TableCell className="text-sm font-medium text-blue-500 py-3">
                    {row.id}
                  </TableCell>
                  <TableCell className="text-sm font-medium py-3">
                    {row.name}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3 tabular-nums">
                    {formatCurrency(row.revenue)}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3 tabular-nums">
                    {formatCurrency(row.refund)}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3 tabular-nums">
                    {formatCurrency(row.paid)}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3 tabular-nums">
                    {formatCurrency(row.cost)}
                  </TableCell>
                  <TableCell className="text-sm text-right py-3 font-semibold text-green-600 dark:text-green-500 tabular-nums">
                    {formatCurrency(row.profit)}
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
