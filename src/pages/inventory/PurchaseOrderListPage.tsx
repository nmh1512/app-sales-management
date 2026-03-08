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

export default function PurchaseOrderListPage() {
  const [search, setSearch] = useState("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const mockData = [
    {
      id: 1,
      code: "NH1756093817",
      supplier: "AL",
      date: "07/03/2026",
      total_amount: 1290000,
      paid_amount: 1290000,
      status: "Đã nhập hàng",
      creator: "Admin",
      created_at: "07/03/2026 21:50",
    },
    {
      id: 2,
      code: "NH1756093816",
      supplier: "AL",
      date: "07/03/2026",
      total_amount: 800000,
      paid_amount: 0,
      status: "Đã nhập hàng",
      creator: "Admin",
      created_at: "07/03/2026 21:49",
    },
  ];

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Nhập hàng</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Link to="/purchase-orders/new">
            <Button className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium">
              <Plus className="h-4 w-4" /> Nhập hàng
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6 shadow-none flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <SearchInput
            placeholder="Theo mã nhập hàng..."
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
                  Số phiếu
                </TableHead>
                <TableHead className="text-xs font-bold uppercase w-[250px]">
                  Nhà cung cấp
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-center w-[150px]">
                  Ngày đặt
                </TableHead>
                <TableHead className="text-xs font-bold uppercase text-right w-[150px]">
                  Tổng tiền
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
                  className="cursor-pointer transition-colors hover:bg-muted/30 border-b"
                >
                  <TableCell className="font-mono text-xs">
                    {item.code}
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
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(item.paid_amount)} đã trả
                    </div>
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
        type="purchase"
      />
    </div>
  );
}
