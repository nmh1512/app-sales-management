import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Plus, Filter, Download, Calendar } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SearchInput } from "@/components/ui/search-input";

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
      creator: "Admin",
      created_date: "07/03/2026",
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
      creator: "Admin",
      created_date: "07/03/2026",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Kiểm kho</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/inventory-audits/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium">
              <Plus className="h-4 w-4" /> Kiểm kho
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo mã kiểm kho..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="max-w-sm flex-1"
          />
          <Button
            variant="outline"
            className="h-10 gap-2 border-border font-medium"
          >
            <Calendar className="h-4 w-4" /> Thời gian
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 border-border font-medium"
          >
            <Filter className="h-4 w-4" /> Lọc thêm
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-none overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b text-xs">
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  MÃ KIỂM KHO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  THỜI GIAN
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  NGƯỜI TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  NGÀY TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  NGÀY CÂN BẰNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  SỐ LƯỢNG THỰC TẾ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  TỔNG THỰC TẾ
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  TỔNG CHÊNH LỆCH
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  SL LỆCH TĂNG
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  SL LỆCH GIẢM
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[150px]">
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
                  <TableCell className="font-mono text-xs">
                    {item.code}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.time}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.creator}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.created_date}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.balance_date}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatNumber(item.actual_qty)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatNumber(item.actual_total)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatNumber(item.total_diff)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatNumber(item.increase_qty)}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatNumber(item.decrease_qty)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 h-5 text-sm font-normal border-border bg-green-50 text-green-700 hover:bg-green-100"
                    >
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
