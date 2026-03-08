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

export default function InventoryDisposalListPage() {
  const [search, setSearch] = useState("");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const mockData = [
    {
      id: 1,
      code: "XH000004",
      date: "06/01/2026",
      total_value: 40000,
      status: "Hoàn thành",
      creator: "Admin",
      created_at: "06/01/2026 16:46",
    },
    {
      id: 2,
      code: "XH000003",
      date: "05/01/2026",
      total_value: 215000,
      status: "Hoàn thành",
      creator: "Admin",
      created_at: "05/01/2026 12:44",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Xuất hủy</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/inventory-disposals/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium">
              <Plus className="h-4 w-4" /> Xuất hủy
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo mã phiếu hủy..."
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

        <div className="rounded-lg border border-border bg-card overflow-hidden shadow-none">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b text-xs">
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  SỐ PHIẾU
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[150px]">
                  NGÀY HỦY
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  TỔNG GIÁ TRỊ HỦY
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[150px]">
                  TRẠNG THÁI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  NGƯỜI TẠO
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  NGÀY TẠO
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors border-b cursor-pointer"
                >
                  <TableCell className="font-mono text-xs">
                    {item.code}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatCurrency(item.total_value)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className="rounded-full px-2 py-0 h-5 text-sm font-normal border-border"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {item.creator}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.created_at}
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
