import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  User,
  FileText,
  CreditCard,
  History,
  RotateCcw,
  Printer,
  Copy,
  Trash2,
  Save,
  Package,
  Calendar,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Order } from "@/types";

interface OrderDetailModalProps {
  order: Partial<Order> | null;
  isOpen: boolean;
  onClose: () => void;
  type?: "order" | "return";
}

export function OrderDetailModal({
  order,
  isOpen,
  onClose,
  type = "order",
}: OrderDetailModalProps) {
  if (!order) return null;

  const formatCurrency = (amount: number = 0) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  const isReturn = type === "return";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto scrollbar-hide p-0 border-border rounded-lg gap-0 sm:top-10 sm:translate-y-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between group">
            <DialogTitle className="text-xl font-semibold">
              {isReturn ? "Chi tiết phiếu trả" : "Chi tiết đơn hàng"} #
              {order.code}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8 text-sm">
          {/* Permanent Top Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Customer Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                <User size={18} />
                <span className="text-sm uppercase tracking-wide">
                  Khách hàng
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium">
                    Tên khách:
                  </span>
                  <span className="font-semibold text-right text-sm">
                    {order.customer_name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Điện thoại:
                  </span>
                  <span className="font-semibold text-right text-sm">
                    {order.customer_phone || "---"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Email:
                  </span>
                  <span className="italic text-muted-foreground text-right text-sm">
                    Chưa có
                  </span>
                </div>
              </div>
            </div>

            {/* Order Information Column */}
            <div className="space-y-4 border-l border-r px-6">
              <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                <FileText size={18} />
                <span className="text-sm uppercase tracking-wide">
                  Thông tin {isReturn ? "trả" : "bán"}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Mã {isReturn ? "trả" : "đơn"}:
                  </span>
                  <span className="font-semibold text-right text-sm">
                    {order.code}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Trạng thái:
                  </span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none rounded font-bold h-6 text-xs">
                    Hoàn thành
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Ngày {isReturn ? "trả" : "bán"}:
                  </span>
                  <div className="flex items-center gap-2 bg-muted px-2 py-1 rounded-md text-xs">
                    <span>{order.created_at}</span>
                    <Calendar size={14} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary font-bold border-b pb-2">
                <CreditCard size={18} />
                <span className="text-sm uppercase tracking-wide">
                  Thanh toán
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Phương thức:
                  </span>
                  <span className="font-semibold text-green-600 text-right text-sm">
                    {order.payment_method || "Tiền mặt"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    {isReturn ? "Tiền đã trả khách" : "Khách đã trả"}:
                  </span>
                  <span className="font-bold text-blue-600 text-right text-sm">
                    {formatCurrency(order.paid_amount)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-medium text-sm">
                    Tiền trả lại:
                  </span>
                  <span className="font-bold text-right text-sm">
                    -
                    {formatCurrency(
                      (order.final_amount || 0) - (order.paid_amount || 0),
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-10 p-0 mb-6 font-semibold">
              <TabsTrigger
                value="basic"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm font-bold"
              >
                Thông tin chi tiết
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm font-bold flex gap-2"
              >
                <History size={14} className="text-muted-foreground" /> Lịch sử
                thanh toán{" "}
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 py-0 px-1.5 h-5 ml-1 text-xs"
                >
                  0
                </Badge>
              </TabsTrigger>
              {!isReturn && (
                <TabsTrigger
                  value="returns"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm font-bold flex gap-2"
                >
                  <RotateCcw size={14} className="text-muted-foreground" /> Lịch
                  sử trả hàng{" "}
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700 py-0 px-1.5 h-5 ml-1 text-xs"
                  >
                    0
                  </Badge>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="basic" className="mt-0 space-y-6">
              {/* Product List Section */}
              <div className="space-y-4 pt-0 text-sm">
                <div className="flex items-center gap-2 font-bold text-base">
                  <Package size={18} className="text-blue-500" />
                  Danh sách sản phẩm
                </div>

                <div className="border rounded-lg bg-card overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50 text-xs">
                      <TableRow>
                        <TableHead className="uppercase text-xs font-bold h-10">
                          Mã hàng
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold h-10">
                          Tên sản phẩm
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold text-center h-10">
                          Số lượng
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold text-center h-10">
                          Đơn vị
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold text-right h-10">
                          Đơn giá
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold text-right h-10">
                          Giảm giá
                        </TableHead>
                        <TableHead className="uppercase text-xs font-bold text-right h-10">
                          Thành tiền
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b last:border-0 hover:bg-muted/30">
                        <TableCell className="text-sm font-bold py-3">
                          k11c15plh
                        </TableCell>
                        <TableCell className="text-sm py-3">
                          Kính lưng liền cam 15plus hồng
                        </TableCell>
                        <TableCell className="text-sm py-3 text-center">
                          1.00
                        </TableCell>
                        <TableCell className="text-sm py-3 text-center">
                          cái
                        </TableCell>
                        <TableCell className="text-sm py-3 text-right">
                          190,000.00 đ
                        </TableCell>
                        <TableCell className="text-sm py-3 text-right">
                          <div className="flex flex-col">
                            <span>70,000.00 đ</span>
                            <span className="text-sm text-muted-foreground">
                              (26.92%)
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm py-3 text-right font-bold text-green-600">
                          190,000.00 đ
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Notes & Totals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-foreground block">
                    Ghi chú {isReturn ? "phiếu trả" : "đơn hàng"}
                  </label>
                  <textarea
                    className="flex min-h-[100px] w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-none focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                    placeholder="Nhập ghi chú..."
                  />
                </div>
                <div className="space-y-4">
                  <div className="space-y-2 border-b-2 border-primary/20 pb-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">
                        Tổng tiền hàng:
                      </span>
                      <span className="font-bold">
                        {formatCurrency(order.total_amount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">
                        Chiết khấu:
                      </span>
                      <span className="font-bold text-red-500">0 đ</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-base font-bold text-foreground">
                      Tổng cộng:
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {formatCurrency(order.final_amount)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-0 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 font-bold text-base">
                  <div className="bg-green-500 p-1.5 rounded text-white font-bold">
                    <CreditCard size={18} />
                  </div>
                  Lịch sử thanh toán
                </div>
                <span className="text-sm text-muted-foreground">
                  Tổng: 0 giao dịch
                </span>
              </div>
              <div className="border rounded-lg bg-card overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50 text-xs font-bold uppercase">
                    <TableRow>
                      <TableHead className="text-xs font-bold uppercase h-10">
                        Mã phiếu
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10">
                        Thời gian
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10">
                        Người tạo
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10 text-right">
                        Giá trị
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10">
                        Phương thức
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10 text-center">
                        Trạng thái
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase h-10 text-right">
                        Tiền thu/chi
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="h-24 text-center text-sm text-muted-foreground"
                      >
                        Không có dữ liệu lịch sử thanh toán
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {!isReturn && (
              <TabsContent value="returns" className="mt-0 space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <div className="bg-orange-500 p-1.5 rounded text-white font-bold">
                      <RotateCcw size={18} />
                    </div>
                    Lịch sử trả hàng
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Tổng: 0 đơn trả
                  </span>
                </div>
                <div className="border rounded-lg bg-card overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50 text-xs font-bold uppercase">
                      <TableRow>
                        <TableHead className="text-xs font-bold uppercase h-10">
                          Mã trả hàng
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase h-10">
                          Thời gian
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase h-10">
                          Người nhận trả
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase h-10 text-right">
                          Tổng cộng
                        </TableHead>
                        <TableHead className="text-xs font-bold uppercase h-10 text-center">
                          Trạng thái
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="h-24 text-center text-sm text-muted-foreground"
                        >
                          Không có đơn trả hàng nào
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Footer Actions - Matching ProductForm.tsx Style */}
        <div className="flex justify-between bg-background items-center p-6 border-t border-border sticky bottom-0">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-[#ff3547] hover:bg-[#e62e3d] text-white border-none h-10 px-6 rounded-lg font-medium shadow-none"
            >
              <Trash2 size={16} className="mr-2" /> Xóa
            </Button>
            <Button
              variant="outline"
              className="bg-[#6c757d] hover:bg-[#5a6268] text-white border-none h-10 px-6 rounded-lg font-medium shadow-none"
            >
              <Copy size={16} className="mr-2" /> Sao chép
            </Button>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="bg-[#6c757d] hover:bg-[#5a6268] text-white border-none h-10 px-8 rounded-lg font-medium shadow-none"
              onClick={onClose}
            >
              Đóng
            </Button>
            {isReturn ? null : (
              <Button className="bg-[#ffb800] hover:bg-[#e6a600] text-white border-none h-10 px-6 rounded-lg font-medium shadow-none">
                <RotateCcw size={16} className="mr-2" /> Trả hàng
              </Button>
            )}
            <Button
              variant="outline"
              className="bg-[#17a2b8] hover:bg-[#138496] text-white border-none h-10 px-6 rounded-lg font-medium shadow-none"
            >
              <Printer size={16} className="mr-2" /> In phiếu
            </Button>
            <Button
              type="submit"
              className="bg-[#007bff] hover:bg-[#0069d9] text-white h-10 px-10 shadow-none font-medium rounded-lg"
            >
              <Save size={16} className="mr-2" /> Lưu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
