import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Download, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function InventoryAuditListPage() {
  const [search, setSearch] = useState("");

  const formatNumber = (num: number) => {
    return num.toLocaleString("vi-VN", { minimumFractionDigits: 2 });
  };

  const mockData = [
    {
      id: 1,
      code: "KK000574",
      time: "07/03/2026 14:01",
      balance_date: "07/03/2026 14:01",
      actual_qty: 25.0,
      actual_total: 1584782.0,
      total_diff: 17.0,
      increase_qty: 17.0,
      decrease_qty: 0.0,
      status: "Đã cân bằng kho",
    },
    {
      id: 2,
      code: "KK000573",
      time: "07/03/2026 13:54",
      balance_date: "07/03/2026 13:54",
      actual_qty: 0.0,
      actual_total: 0.0,
      total_diff: -8.0,
      increase_qty: 0.0,
      decrease_qty: 8.0,
      status: "Đã cân bằng kho",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Kiểm kho</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/inventory-audits/new">
            <Button className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" /> Kiểm kho
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Theo mã kiểm kho..."
              className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-muted-foreground/20"
          >
            <Calendar className="h-4 w-4" /> Thời gian
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-muted-foreground/20"
          >
            <Filter className="h-4 w-4" /> Lọc thêm
          </Button>
        </div>

        <div className="rounded-xl border overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50 border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  MÃ KIỂM KHO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  THỜI GIAN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  NGÀY CÂN BẰNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  SỐ LƯỢNG THỰC TẾ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  TỔNG THỰC TẾ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  TỔNG CHÊNH LỆCH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  SL LỆCH TĂNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  SL LỆCH GIẢM
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-center">
                  TRẠNG THÁI
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors border-b cursor-pointer whitespace-nowrap"
                >
                  <TableCell className="font-bold py-4 text-sm text-foreground">
                    {item.code}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    {item.time}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-muted-foreground">
                    {item.balance_date}
                  </TableCell>
                  <TableCell className="py-4 text-right font-bold text-sm">
                    {formatNumber(item.actual_qty)}
                  </TableCell>
                  <TableCell className="py-4 text-right font-bold text-sm">
                    {formatNumber(item.actual_total)}
                  </TableCell>
                  <TableCell className="py-4 text-right font-bold text-sm">
                    {formatNumber(item.total_diff)}
                  </TableCell>
                  <TableCell className="py-4 text-right text-sm">
                    {formatNumber(item.increase_qty)}
                  </TableCell>
                  <TableCell className="py-4 text-right text-sm">
                    {formatNumber(item.decrease_qty)}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-transparent rounded-md py-0.5 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 inline-block"></div>
                      {item.status}
                    </Badge>
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
