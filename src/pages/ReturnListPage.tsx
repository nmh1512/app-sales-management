import { useState, useEffect } from "react";
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
import { formatCurrency } from "@/lib/formatters";
import type { ReturnOrder, Order } from "@/types";
import { returnService } from "@/services/returnService";
import { OrderDetailModal } from "@/components/orders/OrderDetailModal";

export default function ReturnListPage() {
  const [returns, setReturns] = useState<ReturnOrder[]>([]);
  const [search, setSearch] = useState("");
  const [selectedReturn, setSelectedReturn] = useState<ReturnOrder | null>(
    null,
  );

  useEffect(() => {
    fetchReturns();
  }, []);

  const fetchReturns = async () => {
    const data = await returnService.getAll();
    setReturns(data);
  };

  const filteredReturns = returns.filter(
    (r) =>
      r.code.toLowerCase().includes(search.toLowerCase()) ||
      r.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      (r.order_code &&
        r.order_code.toLowerCase().includes(search.toLowerCase())),
  );


  // Map ReturnOrder to Order-like structure for the modal
  const mappedOrder: Partial<Order> | null = selectedReturn
    ? {
        code: selectedReturn.code,
        customer_name: selectedReturn.customer_name,
        customer_phone: selectedReturn.customer_phone,
        total_amount: selectedReturn.amount_due,
        final_amount: selectedReturn.amount_due,
        paid_amount: selectedReturn.amount_paid,
        created_at: selectedReturn.created_at,
        seller_name: selectedReturn.seller_name,
        payment_method: "Hoàn tiền",
      }
    : null;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Trả hàng</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" /> Thêm phiếu trả
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Theo mã trả, đơn hàng, khách..."
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
                  Mã trả hàng
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Khách hàng
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Cần trả khách
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Đã trả khách
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Người tạo
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Ngày tạo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReturns.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground font-medium"
                  >
                    Không tìm thấy phiếu trả hàng nào
                  </TableCell>
                </TableRow>
              ) : (
                filteredReturns.map((ret) => (
                  <TableRow
                    key={ret.id}
                    className="hover:bg-muted/30 transition-colors border-b cursor-pointer"
                    onClick={() => setSelectedReturn(ret)}
                  >
                    <TableCell className="font-bold py-4 text-sm">
                      {ret.code}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">
                          {ret.customer_name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {ret.customer_phone}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right font-bold text-sm text-[#e11d48]">
                      {formatCurrency(ret.amount_due)}
                    </TableCell>
                    <TableCell className="py-4 text-right font-bold text-sm text-[#16a34a]">
                      {formatCurrency(ret.amount_paid)}
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground text-sm">
                      {ret.seller_name}
                    </TableCell>
                    <TableCell className="py-4 text-muted-foreground text-sm">
                      {ret.created_at}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <OrderDetailModal
        order={mappedOrder}
        type="return"
        isOpen={!!selectedReturn}
        onClose={() => setSelectedReturn(null)}
      />
    </div>
  );
}
