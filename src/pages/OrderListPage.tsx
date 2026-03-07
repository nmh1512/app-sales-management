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
import { Badge } from "@/components/ui/badge";
import type { Order } from "@/types";
import { orderService } from "@/services/orderService";
import { OrderDetailModal } from "@/components/orders/OrderDetailModal";

export default function OrderListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await orderService.getAll();
    setOrders(data);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.code.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_name.toLowerCase().includes(search.toLowerCase()),
  );

  const totals = orders.reduce(
    (acc, cur) => ({
      total: acc.total + cur.total_amount,
      discount: acc.discount + cur.discount,
      final: acc.final + cur.final_amount,
      paid: acc.paid + cur.paid_amount,
    }),
    { total: 0, discount: 0, final: 0, paid: 0 },
  );

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold font-sans">Đơn hàng</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2 rounded-lg border-primary/20 hover:bg-primary/5 hover:text-primary transition-all"
          >
            <Download className="h-4 w-4" /> Xuất file
          </Button>
          <Button className="gap-2 rounded-lg h-10 px-6 bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" /> Thêm đơn hàng
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-2xl border p-4 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Theo mã đơn, khách hàng..."
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
                  Mã đơn hàng
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Khách hàng
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Tổng tiền
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Giảm giá
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Thành tiền
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-right">
                  Khách đã trả
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-center">
                  Phương thức
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3 text-center">
                  Trạng thái
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Người bán
                </TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-wider text-muted-foreground py-3">
                  Ngày tạo
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Summary Row */}
              <TableRow className="bg-primary/5 hover:bg-primary/10 border-b font-bold text-[#2563eb]">
                <TableCell className="py-4 uppercase text-[12px]">
                  Tổng kết
                </TableCell>
                <TableCell className="py-4"></TableCell>
                <TableCell className="py-4 text-right text-[12px]">
                  {formatCurrency(totals.total)}
                </TableCell>
                <TableCell className="py-4 text-right text-[12px]">
                  {formatCurrency(totals.discount)}
                </TableCell>
                <TableCell className="py-4 text-right text-[12px]">
                  {formatCurrency(totals.final)}
                </TableCell>
                <TableCell className="py-4 text-right text-[12px]">
                  {formatCurrency(totals.paid)}
                </TableCell>
                <TableCell className="py-4"></TableCell>
                <TableCell className="py-4"></TableCell>
                <TableCell className="py-4"></TableCell>
                <TableCell className="py-4 text-right text-[12px] pr-4">
                  {orders.length} đơn hàng
                </TableCell>
              </TableRow>

              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="hover:bg-muted/30 transition-colors border-b cursor-pointer"
                  onClick={() => setSelectedOrder(order)}
                >
                  <TableCell className="font-bold text-primary py-4 text-sm">
                    {order.code}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {order.customer_name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.customer_phone}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right font-medium text-sm">
                    {formatCurrency(order.total_amount)}
                  </TableCell>
                  <TableCell className="py-4 text-right text-sm">
                    <div className="flex flex-col">
                      <span>{formatCurrency(order.discount)}</span>
                      <span className="text-xs text-muted-foreground">
                        (0.00%)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-right font-bold text-sm text-green-600">
                    {formatCurrency(order.final_amount)}
                  </TableCell>
                  <TableCell className="py-4 text-right font-medium text-sm text-blue-600">
                    {formatCurrency(order.paid_amount)}
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge
                      variant="outline"
                      className="font-medium bg-yellow-50 text-yellow-700 border-yellow-200 rounded-md py-0.5 text-xs"
                    >
                      {order.payment_method}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-center">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-transparent rounded-md py-0.5 text-xs">
                      Hoàn thành
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {order.seller_name}
                  </TableCell>
                  <TableCell className="py-4 text-muted-foreground text-sm">
                    {order.created_at}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
}
