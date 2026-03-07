import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
  MapPin,
  DollarSign,
  ArrowLeftRight,
  ClipboardList,
  History,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + " đ";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden flex flex-col max-h-[95vh] top-[5%] translate-y-0">
        <DialogHeader className="p-6 border-b shrink-0 flex flex-row items-center justify-between space-y-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-sm",
                type === "purchase"
                  ? "bg-primary/10 text-primary"
                  : "bg-orange-100 text-orange-600",
              )}
            >
              {type === "purchase" ? (
                <ClipboardList className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-tight text-slate-800 flex items-center gap-2">
                {type === "purchase"
                  ? "Chi tiết phiếu nhập hàng"
                  : "Chi tiết phiếu trả hàng"}
                <Badge
                  variant="outline"
                  className="text-xs border-primary/20 bg-primary/5 text-primary"
                >
                  {orderData.code}
                </Badge>
              </DialogTitle>
              <p className="text-xs font-medium text-muted-foreground mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />{" "}
                  {orderData.created_at || orderData.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" /> {orderData.creator || "Admin"}
                </span>
              </p>
            </div>
          </div>
          <Badge
            className={cn(
              "px-3 py-1 text-xs font-bold uppercase tracking-wider",
              "bg-green-100 text-green-700 hover:bg-green-100 border-none rounded-full ring-1 ring-green-500/20",
            )}
          >
            {orderData.status || "Đã xong"}
          </Badge>
        </DialogHeader>

        <div className="flex-1 overflow-auto p-0">
          {/* Summary Info Section - Always Visible */}
          <div className="p-6 bg-white border-b grid grid-cols-4 gap-6">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Nhà cung cấp
              </label>
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <User className="h-4 w-4 text-slate-400" />
                <span>{orderData.supplier}</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Kênh bán
              </label>
              <div className="flex items-center gap-2 text-slate-700 font-bold">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span>Cửa hàng trung tâm</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Tổng tiền hàng
              </label>
              <div className="flex items-center gap-2 text-primary font-black text-lg">
                <DollarSign className="h-5 w-5 text-primary/50" />
                <span>{formatCurrency(orderData.total_amount)}</span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Đã thanh toán
              </label>
              <div className="font-bold text-green-600 text-lg">
                {formatCurrency(orderData.paid_amount)}
              </div>
            </div>
          </div>

          {/* Bottom Tabs Section */}
          <div className="p-0">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-slate-50/50 p-0 h-12">
                <TabsTrigger
                  value="products"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white h-12 px-6 font-bold text-xs uppercase tracking-wider"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Thông tin hàng hóa
                </TabsTrigger>
                <TabsTrigger
                  value="payment_history"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white h-12 px-6 font-bold text-xs uppercase tracking-wider"
                >
                  <History className="h-4 w-4 mr-2" />
                  Lịch sử thanh toán
                </TabsTrigger>
                {type === "purchase" && (
                  <TabsTrigger
                    value="return_history"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-white h-12 px-6 font-bold text-xs uppercase tracking-wider"
                  >
                    <ArrowLeftRight className="h-4 w-4 mr-2" />
                    Lịch sử trả hàng
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="p-6">
                <TabsContent value="products" className="mt-0 outline-none">
                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="w-[50px] text-xs font-bold py-3 text-center">
                            STT
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider">
                            Mã hàng
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider">
                            Tên hàng
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-center">
                            ĐVT
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-right">
                            Số lượng
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-right">
                            Đơn giá
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-right">
                            Thành tiền
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="text-center py-4 text-sm font-medium text-slate-400">
                            1
                          </TableCell>
                          <TableCell className="py-4 text-sm font-bold text-primary italic underline underline-offset-4 decoration-primary/30">
                            baodungmay
                          </TableCell>
                          <TableCell className="py-4 font-bold text-sm text-slate-700">
                            Bao Đựng Máy (1kg)
                          </TableCell>
                          <TableCell className="text-center py-4 text-sm">
                            kg
                          </TableCell>
                          <TableCell className="text-right py-4 text-sm font-black">
                            10
                          </TableCell>
                          <TableCell className="text-right py-4 text-sm font-medium">
                            80.000
                          </TableCell>
                          <TableCell className="text-right py-4 text-sm font-black text-primary">
                            800.000
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-6 flex flex-col items-end gap-2 border-t pt-4">
                    <div className="flex gap-10 text-sm">
                      <span className="text-slate-500 font-medium uppercase tracking-wider text-xs">
                        Tổng số mặt hàng:
                      </span>
                      <span className="font-bold text-slate-800 w-24 text-right">
                        1
                      </span>
                    </div>
                    <div className="flex gap-10 text-sm">
                      <span className="text-slate-500 font-medium uppercase tracking-wider text-xs">
                        Tổng số lượng:
                      </span>
                      <span className="font-bold text-slate-800 w-24 text-right">
                        10
                      </span>
                    </div>
                    <div className="flex gap-10 text-sm mt-1">
                      <span className="text-slate-500 font-black uppercase tracking-wider text-xs">
                        Tổng cộng:
                      </span>
                      <span className="font-black text-xl text-primary w-24 text-right">
                        800.000
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent
                  value="payment_history"
                  className="mt-0 outline-none"
                >
                  <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider">
                            Mã thanh toán
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-center">
                            Ngày trả
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-right">
                            Giá trị
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider text-center">
                            Phương thức
                          </TableHead>
                          <TableHead className="text-xs font-bold py-3 text-slate-500 uppercase tracking-wider">
                            Ghi chú
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="py-4 text-sm font-bold text-slate-700">
                            PA12345678
                          </TableCell>
                          <TableCell className="text-center py-4 text-sm text-slate-500">
                            {orderData.date || "07/03/2026"}
                          </TableCell>
                          <TableCell className="text-right py-4 text-sm font-black text-green-600">
                            {formatCurrency(orderData.paid_amount)}
                          </TableCell>
                          <TableCell className="py-4 text-center">
                            <Badge
                              variant="secondary"
                              className="text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600"
                            >
                              Tiền mặt
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4 text-sm italic text-slate-400">
                            ---
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {type === "purchase" && (
                  <TabsContent
                    value="return_history"
                    className="mt-0 outline-none"
                  >
                    <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                      <ArrowLeftRight className="h-12 w-12 mb-3 opacity-20" />
                      <p className="font-bold text-sm uppercase tracking-widest opacity-40">
                        Chưa có lịch sử trả hàng
                      </p>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>
          </div>
        </div>

        <div className="p-6 border-t bg-slate-50 flex justify-end gap-3 shrink-0">
          <button
            onClick={() => onOpenChange(false)}
            className="px-6 py-2.5 rounded-lg border border-slate-300 font-bold text-sm text-slate-600 hover:bg-white transition-all active:scale-95"
          >
            Đóng
          </button>
          <button className="px-6 py-2.5 rounded-lg bg-primary text-white font-bold text-sm shadow-md shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            In phiếu
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
