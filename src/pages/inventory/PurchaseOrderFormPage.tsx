import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  ChevronLeft,
  Calendar as CalendarIcon,
  UserPlus,
  Terminal,
  Calculator,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { NumberInput } from "@/components/ui/number-input";
import { SupplierModal } from "@/components/inventory/SupplierModal";
import { ProductModal } from "@/components/inventory/ProductModal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PurchaseOrderFormPage() {
  const navigate = useNavigate();
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products] = useState([
    {
      id: 1,
      code: "bangkeocachnhiet1cm",
      name: "Băng keo cách nhiệt 1cm",
      unit: "Cái",
      quantity: 1,
      price: 13880.95,
      discount: 0,
    },
    {
      id: 2,
      code: "baodungmay",
      name: "Bao Đựng Máy (1kg)",
      unit: "kg",
      quantity: 1,
      price: 80000,
      discount: 0,
    },
  ]);

  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<"vnd" | "percent">("vnd");
  const [paidAmount, setPaidAmount] = useState(0);

  const subtotal = products.reduce(
    (acc, p) => acc + p.quantity * p.price - p.discount,
    0,
  );

  const discountAmount =
    discountType === "percent"
      ? (subtotal * discountValue) / 100
      : discountValue;
  const grandTotal = subtotal - discountAmount;
  const debtAmount = grandTotal - paidAmount;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-muted/10 font-sans text-sm">
      {/* Header bar */}
      <div className="h-14 border-b bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/purchase-orders")}
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="font-bold text-lg text-slate-700 flex items-center gap-2 uppercase tracking-tight">
            Phiếu nhập hàng
            <Badge
              variant="outline"
              className="text-xs font-bold uppercase tracking-widest text-primary border-primary/20 bg-primary/5"
            >
              Draft
            </Badge>
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/50 border text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <Terminal className="h-3 w-3" />
            <span>F3: Tìm hàng</span>
            <span className="opacity-30">|</span>
            <span>F4: NCC</span>
            <span className="opacity-30">|</span>
            <span>F7: Lưu tạm</span>
            <span className="opacity-30">|</span>
            <span>F8: Trả tiền</span>
            <span className="opacity-30">|</span>
            <span>F9: Hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left Section: Product List */}
        <div className="flex-1 bg-card rounded-xl border shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
                Danh sách sản phẩm
              </h2>
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm và chọn sản phẩm... (F3)"
                    className="pl-10 h-10 rounded-lg border-primary/20 bg-primary/[0.02]"
                  />
                </div>
                <Button
                  size="icon"
                  className="h-10 w-10 shrink-0 bg-primary hover:bg-primary/90 shadow-md shadow-primary/20"
                  onClick={() => setIsProductModalOpen(true)}
                >
                  <Plus className="h-5 w-5 text-white" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-muted/30 sticky top-0 z-10">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[50px] text-xs font-bold py-3 text-center uppercase">
                    STT
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 uppercase">
                    Mã hàng
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 uppercase">
                    Tên hàng
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 text-center uppercase">
                    ĐVT
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 text-center uppercase">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 text-right uppercase">
                    Đơn giá
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 text-right uppercase">
                    Giảm giá
                  </TableHead>
                  <TableHead className="text-xs font-bold py-3 text-right uppercase">
                    Thành tiền
                  </TableHead>
                  <TableHead className="w-[80px] text-xs font-bold py-3 text-center uppercase">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="py-4 text-sm text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium">
                      {item.code}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground italic truncate max-w-[200px]">
                          Ghi chú...
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm">
                      {item.unit}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-center">
                        <NumberInput
                          className="w-16 h-8 text-center text-sm font-bold border-muted-foreground/20 rounded-md"
                          value={item.quantity}
                          onValueChange={() => {}}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end">
                        <NumberInput
                          className="h-8 text-right text-sm font-bold border-muted-foreground/20 rounded-md w-24"
                          value={item.price}
                          onValueChange={() => {}}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <NumberInput
                          className="h-8 text-right text-sm font-bold border-muted-foreground/20 rounded-md w-16"
                          value={item.discount}
                          onValueChange={() => {}}
                        />
                        <span className="text-xs font-bold text-muted-foreground uppercase">
                          đ
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right font-bold text-sm text-primary">
                      {(
                        item.quantity * item.price -
                        item.discount
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Right Section: Purchase Info */}
        <div className="w-[380px] flex flex-col gap-4">
          <div className="bg-card rounded-xl border shadow-sm p-4 space-y-4 flex-1 flex flex-col">
            <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">
              Thông tin phiếu nhập
            </h2>

            <div className="space-y-4 pt-2 flex-1 overflow-auto px-0.5">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                    Nhà cung cấp{" "}
                    <span className="text-xs text-muted-foreground lowercase font-normal">
                      (F4)
                    </span>
                  </label>
                  <Button
                    variant="link"
                    className="h-auto p-0 text-xs font-bold text-primary uppercase tracking-wider hover:no-underline"
                  >
                    Lịch sử nhập
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="rounded-lg h-10 border-primary/20 bg-primary/[0.02]">
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="al">Nhà cung cấp AL</SelectItem>
                      <SelectItem value="imax">Nhà cung cấp IMAX</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    className="h-10 w-10 shrink-0 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                    onClick={() => setIsSupplierModalOpen(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground flex items-center gap-1 uppercase tracking-wider">
                    Ngày đặt <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      className="h-10 rounded-lg border-muted-foreground/20 pr-8 text-xs px-2"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                    />
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Dự kiến giao
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="h-10 rounded-lg border-muted-foreground/20 pr-8 text-xs px-2"
                    />
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">
                      Tổng tiền hàng
                    </span>
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-xs font-black">
                      {products.length}
                    </span>
                  </div>
                  <span className="font-bold text-sm tracking-tight text-slate-700 font-mono">
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    Giảm giá
                  </span>
                  <div className="flex items-center gap-2">
                    <NumberInput
                      className="h-8 w-24 text-right text-sm font-bold rounded-md"
                      value={discountValue}
                      onValueChange={(val) => setDiscountValue(val || 0)}
                    />
                    <Select
                      value={discountType}
                      onValueChange={(val: any) => setDiscountType(val)}
                    >
                      <SelectTrigger className="w-14 h-8 text-xs font-bold rounded-md">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vnd">đ</SelectItem>
                        <SelectItem value="percent">%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-dashed">
                  <span className="text-sm font-black uppercase text-slate-700">
                    Tổng cộng:
                  </span>
                  <span className="font-black text-lg text-primary tracking-tight font-mono">
                    {grandTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-bold flex flex-col text-slate-600 uppercase tracking-tight">
                    Trả cho NCC:
                    <span className="text-xs text-muted-foreground font-normal lowercase italic">
                      (Phím tắt F8)
                    </span>
                  </span>
                  <NumberInput
                    className="h-10 w-32 text-right text-sm font-bold border-primary/20 bg-primary/[0.02] rounded-lg"
                    value={paidAmount}
                    onValueChange={(val) => setPaidAmount(val || 0)}
                  />
                </div>

                <div
                  className={cn(
                    "rounded-xl p-3 border transition-colors",
                    debtAmount > 0
                      ? "bg-amber-50 border-amber-200"
                      : "bg-green-50 border-green-200",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calculator
                        className={cn(
                          "h-4 w-4",
                          debtAmount > 0 ? "text-amber-600" : "text-green-600",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-bold uppercase",
                          debtAmount > 0 ? "text-amber-600" : "text-green-600",
                        )}
                      >
                        {debtAmount > 0
                          ? "Tính vào công nợ"
                          : "Tiền thừa trả khách"}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "font-black text-sm font-mono",
                        debtAmount > 0 ? "text-amber-700" : "text-green-700",
                      )}
                    >
                      {Math.abs(debtAmount).toLocaleString()} đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Ghi chú
                </label>
                <Textarea
                  placeholder="Nhập ghi chú phiếu nhập..."
                  className="min-h-[80px] rounded-xl border-muted-foreground/20 text-sm italic bg-muted/5 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="h-12 rounded-xl gap-2 font-bold shadow-sm bg-slate-600 text-white hover:bg-slate-700 hover:text-white border-none group transition-all"
            >
              <Save className="h-4 w-4 transition-transform group-hover:scale-110" />{" "}
              Lưu tạm (F7)
            </Button>
            <Button className="h-12 rounded-xl gap-2 font-bold shadow-lg shadow-green-500/20 bg-green-500 hover:bg-green-600 text-white border-none group transition-all">
              <CheckCircle2 className="h-4 w-4 transition-transform group-hover:scale-110" />{" "}
              Hoàn thành (F9)
            </Button>
          </div>
        </div>
      </div>

      <SupplierModal
        open={isSupplierModalOpen}
        onOpenChange={setIsSupplierModalOpen}
        onSuccess={(s) => console.log("New supplier:", s)}
      />
      <ProductModal
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        onSuccess={(p) => console.log("New product:", p)}
      />
    </div>
  );
}
