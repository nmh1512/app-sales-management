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
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Xuất hủy</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/inventory-disposals/new">
            <Button className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4" /> Xuất hủy
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Theo mã phiếu hủy..."
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

        <div className="rounded-xl border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 border-b">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  SỐ PHIẾU
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-center">
                  NGÀY HỦY
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  TỔNG GIÁ TRỊ HỦY
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-center">
                  TRẠNG THÁI
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  NGƯỜI TẠO
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-muted/30 transition-colors border-b cursor-pointer"
                >
                  <TableCell className="font-bold py-4 text-sm text-foreground">
                    {item.code}
                  </TableCell>
                  <TableCell className="py-4 text-center text-sm text-muted-foreground text-center">
                    {item.date}
                  </TableCell>
                  <TableCell className="py-4 text-right font-bold text-sm">
                    {formatCurrency(item.total_value)}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-transparent rounded-md py-0.5 text-xs font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 inline-block"></div>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">
                        {item.creator}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {item.created_at}
                      </span>
                    </div>
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
