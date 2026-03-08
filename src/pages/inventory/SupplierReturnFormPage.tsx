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

export default function SupplierReturnFormPage() {
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
      purchasePrice: 13880.95,
      returnPrice: 13880.95,
      discount: 0,
    },
  ]);

  const [returnFee, setReturnFee] = useState(0);
  const [nccPaid, setNccPaid] = useState(0);

  const subtotal = products.reduce(
    (acc, p) => acc + p.quantity * p.returnPrice - p.discount,
    0,
  );

  const grandTotal = subtotal - returnFee;
  const debtAmount = grandTotal - nccPaid;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Header bar */}
      <div className="h-14 border-b bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/supplier-returns")}
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            Phiếu trả hàng nhập
            <Badge variant="outline" className="font-normal">
              Draft
            </Badge>
          </h1>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Terminal className="h-3 w-3" />
            <span>F3: Tìm hàng</span>
            <span className="opacity-30">|</span>
            <span>F4: NCC</span>
            <span className="opacity-30">|</span>
            <span>F7: Lưu tạm</span>
            <span className="opacity-30">|</span>
            <span>F8: Nhận tiền</span>
            <span className="opacity-30">|</span>
            <span>F9: Hoàn thành</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        {/* Left Section: Product List */}
        <div className="flex-1 bg-card rounded-lg border shadow-none flex flex-col overflow-hidden">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Danh sách sản phẩm trả lại</h2>
              <div className="flex items-center gap-2 w-1/2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm và chọn sản phẩm... (F3)"
                    className="pl-9 h-10 shadow-none border-border"
                  />
                </div>
                <Button
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  onClick={() => setIsProductModalOpen(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0 z-10">
                <TableRow className="hover:bg-transparent text-xs border-b">
                  <TableHead className="w-[50px] text-xs font-bold uppercase text-center">
                    STT
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Mã hàng
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase">
                    Tên hàng
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-center">
                    ĐVT
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">
                    Giá nhập
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">
                    Giá trả lại
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">
                    Giảm giá
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">
                    Thành tiền
                  </TableHead>
                  <TableHead className="w-[80px] text-xs font-bold uppercase text-center">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((item, index) => (
                  <TableRow key={item.id} className="hover:bg-muted/20">
                    <TableCell className="py-4 text-xs text-center font-medium text-slate-500">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium">
                      {item.code}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold ">
                          {item.name}
                        </span>
                        <span className="text-xs text-muted-foreground italic">
                          Tồn kho: 10 {item.unit}
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
                    <TableCell className="py-4 text-right text-sm font-medium text-slate-500">
                      {item.purchasePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4 text-right">
                      <div className="flex justify-end">
                        <NumberInput
                          className="h-8 text-right text-sm font-bold border-muted-foreground/20 rounded-md w-24"
                          value={item.returnPrice}
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
                        item.quantity * item.returnPrice -
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

        {/* Right Section: Return Info */}
        <div className="w-[380px] flex flex-col gap-4">
          <div className="bg-card rounded-lg border shadow-none p-4 space-y-4 flex-1 flex flex-col">
            <h2 className="font-semibold border-b pb-4">Thông tin phiếu trả</h2>

            <div className="space-y-4 pt-2 flex-1 overflow-auto px-0.5">
              <div className="space-y-1.5">
                <label className="text-sm font-medium  flex items-center gap-1">
                  Nhà cung cấp
                  <span className="text-xs text-muted-foreground font-normal">
                    (F4)
                  </span>
                </label>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="h-10 shadow-none">
                      <SelectValue placeholder="Chọn nhà cung cấp" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="al">Nhà cung cấp AL</SelectItem>
                      <SelectItem value="imax">Nhà cung cấp IMAX</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 shrink-0"
                    onClick={() => setIsSupplierModalOpen(true)}
                  >
                    <UserPlus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium  flex items-center gap-1">
                    Ngày trả hàng <span className="text-destructive">*</span>
                  </label>
                  <div className="relative">
                    <Input
                      type="datetime-local"
                      className="h-10 shadow-none border-border pr-8 text-sm"
                      defaultValue={new Date().toISOString().slice(0, 16)}
                    />
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium ">
                    Dự kiến trả
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      className="h-10 shadow-none border-border pr-8 text-sm"
                    />
                    <CalendarIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Tổng tiền trả</span>
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0.5 rounded text-xs"
                    >
                      {products.length}
                    </Badge>
                  </div>
                  <span className="font-medium text-sm">
                    {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Phí trả hàng</span>
                  <NumberInput
                    className="h-8 w-32 text-right text-sm shadow-none"
                    value={returnFee}
                    onValueChange={(val) => setReturnFee(val || 0)}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-semibold">NCC cần trả:</span>
                  <span className="font-bold text-lg text-primary">
                    {grandTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium flex flex-col">
                    Tiền NCC trả:
                    <span className="text-xs text-muted-foreground font-normal">
                      (Phím tắt F8)
                    </span>
                  </span>
                  <NumberInput
                    className="h-10 w-32 text-right text-sm font-medium shadow-none"
                    value={nccPaid}
                    onValueChange={(val) => setNccPaid(val || 0)}
                  />
                </div>

                <div
                  className={cn(
                    "rounded-lg p-3 border",
                    debtAmount > 0
                      ? "bg-blue-50 border-blue-200"
                      : "bg-green-50 border-green-200",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Calculator
                        className={cn(
                          "h-4 w-4",
                          debtAmount > 0 ? "text-blue-600" : "text-green-600",
                        )}
                      />
                      <span
                        className={cn(
                          debtAmount > 0 ? "text-blue-600" : "text-green-600",
                        )}
                      >
                        {debtAmount > 0
                          ? "Tính vào công nợ"
                          : "Tiền thừa NCC trả"}
                      </span>
                    </div>
                    <span
                      className={cn(
                        "font-medium text-sm",
                        debtAmount > 0 ? "text-blue-700" : "text-green-700",
                      )}
                    >
                      {Math.abs(debtAmount).toLocaleString()} đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium ">
                  Ghi chú
                </label>
                <Textarea
                  placeholder="Nhập ghi chú phiếu trả..."
                  className="min-h-[80px] shadow-none border-border text-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
            <Button variant="outline" className="h-10 rounded-lg gap-2">
              <Save className="h-4 w-4" />
              Lưu tạm (F7)
            </Button>
            <Button className="h-10 rounded-lg gap-2 bg-primary">
              <CheckCircle2 className="h-4 w-4" />
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
