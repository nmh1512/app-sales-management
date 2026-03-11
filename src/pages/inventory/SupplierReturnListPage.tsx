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
import { InventoryDetailModal } from "@/components/inventory/InventoryDetailModal";
import { formatCurrency } from "@/lib/formatters";
import type { SupplierReturn } from "@/types/inventory";

export default function SupplierReturnListPage() {
  const [search, setSearch] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<SupplierReturn | null>(null);

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

  const handleRowClick = (order: SupplierReturn) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Trả hàng nhập</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/supplier-returns/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium">
              <Plus className="h-4 w-4" /> Trả hàng nhập
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo mã trả hàng, mã nhập..."
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
                  Số phiếu
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[200px]">
                  Nhà cung cấp
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[120px]">
                  Ngày trả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  Tiền hàng trả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[120px]">
                  Giảm giá
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  NCC cần trả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  NCC đã trả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[150px]">
                  Trạng thái
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  Người tạo
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[150px]">
                  Ngày tạo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData.map((item) => (
                <TableRow
                  key={item.id}
                  onClick={() => handleRowClick(item)}
                  className="cursor-pointer transition-colors hover:bg-muted/30 border-b whitespace-nowrap"
                >
                  <TableCell>
                    <div className="font-mono text-xs">{item.code}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.subId}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-sm">
                    {item.supplier}
                  </TableCell>
                  <TableCell className="text-center text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-medium text-sm">
                      {formatCurrency(item.total_amount)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatCurrency(item.discount)}
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {formatCurrency(item.due_from_supplier)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {formatCurrency(item.received_from_supplier)}
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

      <InventoryDetailModal
        open={isDetailModalOpen}
        onOpenChange={setIsDetailModalOpen}
        orderData={selectedOrder}
        type="return"
      />
    </div>
  );
}
