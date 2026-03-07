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
import { InventoryDetailModal } from "@/components/inventory/InventoryDetailModal";

export default function SupplierReturnListPage() {
  const [search, setSearch] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const mockData = [
    {
      id: 1,
      code: "THN000222",
      subId: "ID: 2731",
      supplier: "IMAX",
      date: "07/03/2026",
      total_amount: 3224657.45,
      paid_amount: 0,
      discount: 0,
      due_from_supplier: 3224657.45,
      received_from_supplier: 0,
      status: "Đã trả hàng",
      creator: "Admin",
      created_at: "07/03/2026 00:25",
    },
  ];

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-800">
          Trả hàng nhập
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-slate-200 hover:bg-slate-50 transition-all font-bold text-slate-600"
          >
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/supplier-returns/new">
            <Button className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 font-black uppercase tracking-wider text-xs">
              <Plus className="h-4 w-4" /> Trả hàng nhập
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/50 border-b border-dashed flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Theo mã trả hàng, mã nhập..."
              className="pl-10 h-10 rounded-lg border-muted-foreground/20 focus:border-primary focus:ring-primary/20 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-slate-200 bg-white font-bold text-slate-600 shadow-sm"
          >
            <Calendar className="h-4 w-4 text-slate-400" /> Thời gian
          </Button>
          <Button
            variant="outline"
            className="h-10 gap-2 rounded-lg border-slate-200 bg-white font-bold text-slate-600 shadow-sm"
          >
            <Filter className="h-4 w-4 text-slate-400" /> Lọc thêm
          </Button>
        </div>

        <div className="overflow-hidden overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-100/50">
              <TableRow className="hover:bg-transparent">
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500">
                  Số phiếu
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500">
                  Nhà cung cấp
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-center">
                  Ngày trả
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-right">
                  Tiền hàng trả
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-right">
                  Giảm giá
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-right">
                  NCC cần trả
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-right">
                  NCC đã trả
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500 text-center">
                  Trạng thái
                </TableHead>
                <TableHead className="text-xs font-black uppercase tracking-widest py-4 text-slate-500">
                  Người tạo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="hover:bg-primary/[0.02] active:bg-primary/[0.05] transition-colors border-b cursor-pointer group whitespace-nowrap"
                >
                  <TableCell className="py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-sm text-primary underline underline-offset-4 decoration-primary/20 group-hover:decoration-primary/50">
                        {item.code}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
                        {item.subId}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-sm font-bold text-slate-600">
                    {item.supplier}
                  </TableCell>
                  <TableCell className="py-5 text-center text-sm text-slate-500 font-medium">
                    {item.date}
                  </TableCell>
                  <TableCell className="py-5 text-right">
                    <div className="flex flex-col font-black text-sm text-slate-700">
                      <span>{formatCurrency(item.total_amount)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-5 text-right text-sm font-medium text-slate-500">
                    {formatCurrency(item.discount)}
                  </TableCell>
                  <TableCell className="py-5 text-right font-black text-sm text-orange-600">
                    {formatCurrency(item.due_from_supplier)}
                  </TableCell>
                  <TableCell className="py-5 text-right text-sm font-bold text-green-600">
                    {formatCurrency(item.received_from_supplier)}
                  </TableCell>
                  <TableCell className="py-5 text-center">
                    <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-none rounded-full px-3 py-1 text-xs font-bold ring-1 ring-orange-500/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2 inline-block"></div>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-600">
                        {item.creator}
                      </span>
                      <span className="text-xs text-slate-400 font-normal">
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

      <InventoryDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        orderData={selectedOrder}
        type="return"
      />
    </div>
  );
}
