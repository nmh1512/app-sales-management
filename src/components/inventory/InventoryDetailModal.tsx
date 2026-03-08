import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  User,
  Calendar,
  CreditCard,
  History,
  ArrowLeftRight,
  Save,
  ExternalLink,
  Upload,
  Printer,
  Trash2,
} from "lucide-react";

interface InventoryDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderData: any;
  type: "purchase" | "return";
}

export function InventoryDetailModal({
  open,
  onOpenChange,
  orderData,
  type,
}: InventoryDetailModalProps) {
  if (!orderData) return null;

  const formatCurrency = (amount: number = 0) => {
    return amount.toLocaleString("vi-VN", { minimumFractionDigits: 2 }) + " đ";
  };

  const isReturn = type === "return";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto scrollbar-hide p-0 border-border rounded-lg gap-0 sm:top-10 sm:translate-y-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between group">
            <DialogTitle className="text-xl font-semibold">
              {isReturn ? "Chi tiết phiếu trả" : "Chi tiết phiếu nhập"} #
              {orderData.code}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8 text-sm">
          {/* Permanent Top Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Supplier Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b pb-2 border-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <User size={18} />
                  <span className="text-sm uppercase tracking-wide">
                    Nhà cung cấp
                  </span>
                </div>
              </div>
              <div className="space-y-0">
                {[
                  { label: "Tên:", value: orderData.supplier },
                  { label: "Điện thoại:", value: "---" },
                  { label: "Email:", value: "Chưa có" },
                  { label: "Địa chỉ:", value: "Chưa có" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm"
                  >
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium text-right">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Information Column */}
            <div className="space-y-3 border-l border-r px-6">
              <div className="flex items-center justify-between border-b pb-2 border-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <FileText size={18} />
                  <span className="text-sm uppercase tracking-wide">
                    Thông tin phiếu {isReturn ? "trả" : "nhập"}
                  </span>
                </div>
              </div>
              <div className="space-y-0">
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Mã phiếu:</span>
                  <span className="font-medium text-right">
                    {orderData.code}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Trạng thái:</span>
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none rounded font-bold h-6 text-xs">
                    {orderData.status ||
                      (isReturn ? "Đã trả hàng" : "Đã nhập hàng")}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">
                    Ngày {isReturn ? "trả" : "đặt"}:
                  </span>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>{orderData.date || orderData.created_at}</span>
                    <Calendar size={14} />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Column */}
            <div className="space-y-3 pl-2">
              <div className="flex items-center justify-between border-b pb-2 border-border">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <CreditCard size={18} />
                  <span className="text-sm uppercase tracking-wide">
                    Thanh toán
                  </span>
                </div>
              </div>
              <div className="space-y-0">
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Chi nhánh:</span>
                  <span className="font-medium text-right">
                    Chi nhánh trung tâm
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">Người tạo:</span>
                  <span className="font-medium text-right">
                    {orderData.creator || "Admin"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm">
                  <span className="text-muted-foreground">
                    {isReturn ? "Đã hoàn rả:" : "Đã thanh toán:"}
                  </span>
                  <span className="font-bold text-blue-600 text-right">
                    {formatCurrency(
                      orderData.paid_amount || orderData.total_amount,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-10 p-0 mb-6 font-semibold">
              <TabsTrigger
                value="products"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm font-bold"
              >
                Danh sách sản phẩm
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
                  1
                </Badge>
              </TabsTrigger>
              {!isReturn && (
                <TabsTrigger
                  value="return_history"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm font-bold flex gap-2"
                >
                  <ArrowLeftRight size={14} className="text-muted-foreground" />
                  Lịch sử trả hàng{" "}
                  <Badge
                    variant="secondary"
                    className="bg-slate-100 text-slate-700 py-0 px-1.5 h-5 ml-1 text-xs"
                  >
                    0
                  </Badge>
                </TabsTrigger>
              )}
            </TabsList>

            {/* List Products Tab */}
            <TabsContent
              value="products"
              className="mt-0 outline-none space-y-6"
            >
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50 border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 w-16 text-center">
                        STT
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                        SẢN PHẨM
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase inset-y-0 text-muted-foreground py-3 text-center">
                        SỐ LƯỢNG
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                        ĐƠN GIÁ
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                        TỔNG TIỀN
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right">
                        GIẢM GIÁ
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3 text-right pr-6">
                        THÀNH TIỀN
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-transparent text-sm font-medium">
                      <TableCell className="text-center py-4">1</TableCell>
                      <TableCell className="py-4">
                        Màn Hình JK LCD 11Promax
                      </TableCell>
                      <TableCell className="text-center py-4">2.00</TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        365,000.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        730,000.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        0.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-green-600 font-bold pr-6">
                        730,000.00 ₫
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent text-sm font-medium">
                      <TableCell className="text-center py-4">2</TableCell>
                      <TableCell className="py-4">Màn Hình JK LCD X</TableCell>
                      <TableCell className="text-center py-4">2.00</TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        305,000.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        610,000.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-slate-600">
                        0.00 ₫
                      </TableCell>
                      <TableCell className="text-right py-4 text-green-600 font-bold pr-6">
                        610,000.00 ₫
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Notes & Totals */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-4">
                <div className="md:col-span-2 space-y-3">
                  <label className="text-sm font-bold text-foreground block">
                    Ghi chú {isReturn ? "phiếu trả" : "phiếu nhập"}
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
                        Số lượng mặt hàng:
                      </span>
                      <span className="font-bold">2</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">
                        Tổng tiền hàng:
                      </span>
                      <span className="font-bold">
                        {formatCurrency(1340000)}
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
                      {formatCurrency(1340000)}
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Payment History Tab */}
            <TabsContent value="payment" className="mt-0 outline-none">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50 border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground w-[200px] py-3">
                        Mã thanh toán
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground text-center py-3">
                        Ngày trả
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground text-right py-3">
                        Giá trị
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground text-center py-3">
                        Phương thức
                      </TableHead>
                      <TableHead className="text-xs font-bold uppercase text-muted-foreground py-3">
                        Ghi chú
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="font-bold text-primary hover:underline cursor-pointer text-sm">
                        PT12345678
                      </TableCell>
                      <TableCell className="text-center text-sm">
                        {orderData.date || "08/03/2026"}
                      </TableCell>
                      <TableCell className="text-right font-bold text-green-600 text-sm">
                        {formatCurrency(
                          orderData.paid_amount || orderData.total_amount,
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        Tiền mặt
                      </TableCell>
                      <TableCell className="text-muted-foreground italic text-sm">
                        ---
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Return History Tab */}
            {!isReturn && (
              <TabsContent value="return_history" className="mt-0 outline-none">
                <div className="rounded-md border overflow-hidden">
                  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground bg-slate-50/50">
                    <ArrowLeftRight className="h-12 w-12 mb-3 opacity-20" />
                    <p className="text-sm font-medium">
                      Chưa có lịch sử trả hàng
                    </p>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t flex flex-wrap justify-end gap-2 shrink-0 bg-muted/20">
          <Button className="bg-[#00d26a] hover:bg-[#00b95c] text-white gap-2 h-9 px-4 rounded-lg shadow-none">
            <Save size={16} /> Lưu
          </Button>

          <Button className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white gap-2 h-9 px-4 rounded-lg shadow-none">
            <ExternalLink size={16} /> Mở phiếu
          </Button>

          {!isReturn && (
            <Button className="bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-white gap-2 h-9 px-4 rounded-lg shadow-none">
              <Upload size={16} /> Trả hàng nhập
            </Button>
          )}

          <Button
            variant="outline"
            className="gap-2 h-9 px-4 rounded-lg shadow-none"
          >
            <Printer size={16} /> In phiếu
          </Button>

          <Button className="bg-[#ff3547] hover:bg-[#e62e3d] text-white gap-2 h-9 px-4 rounded-lg shadow-none">
            <Trash2 size={16} /> Xóa phiếu
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
