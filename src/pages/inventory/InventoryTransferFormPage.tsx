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
  ArrowRightLeft,
  Terminal,
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
import { ProductModal } from "@/components/inventory/ProductModal";
import { Badge } from "@/components/ui/badge";

export default function InventoryTransferFormPage() {
  const navigate = useNavigate();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [products] = useState([
    {
      id: 1,
      code: "baodungmay",
      name: "Bao Đựng Máy (1kg)",
      unit: "kg",
      sourceStock: 10,
      destStock: 0,
      transferQty: 1,
      price: 80000,
    },
  ]);

  const totalValue = products.reduce(
    (acc, p) => acc + p.transferQty * p.price,
    0,
  );

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
      {/* Header bar */}
      <div className="h-14 border-b bg-card px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/inventory-transfers")}
            className="hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Phiếu chuyển kho
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
            <span>F7: Lưu tạm</span>
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
              <h2 className="font-semibold">Danh sách sản phẩm</h2>
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
                    Tồn kho
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-center">
                    Tồn nhận
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="text-xs font-bold uppercase text-right">
                    Đơn giá
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
                    <TableCell className="py-4 text-sm text-center font-medium">
                      {index + 1}
                    </TableCell>
                    <TableCell className="py-4 text-sm font-medium">
                      {item.code}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{item.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm">
                      {item.unit}
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm font-bold text-slate-500">
                      {item.sourceStock}
                    </TableCell>
                    <TableCell className="py-4 text-center text-sm font-bold text-primary">
                      {item.destStock}
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-center">
                        <NumberInput
                          className="w-16 h-8 text-center text-sm font-bold border-muted-foreground/20 rounded-md"
                          value={item.transferQty}
                          onValueChange={() => {}}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-right font-medium text-sm">
                      {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="py-4 text-right font-bold text-sm text-primary">
                      {(item.transferQty * item.price).toLocaleString()}
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

        {/* Right Section: Transfer Info */}
        <div className="w-[380px] flex flex-col gap-4">
          <div className="bg-card rounded-lg border shadow-none p-4 space-y-4 flex-1">
            <h2 className="font-semibold border-b pb-4">
              Thông tin phiếu chuyển kho
            </h2>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1">
                  Ngày chuyển hàng <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Input
                    type="datetime-local"
                    className="h-10 shadow-none border-border pr-8 text-sm"
                  />
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium">Kho đích</label>
                <Select>
                  <SelectTrigger className="h-10 shadow-none">
                    <SelectValue placeholder="Chọn kho đích" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cn1">Chi nhánh Quận 1</SelectItem>
                    <SelectItem value="cn2">Chi nhánh Quận 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Tổng số lượng chuyển</span>
                    <Badge
                      variant="secondary"
                      className="px-1.5 py-0.5 rounded text-xs"
                    >
                      {products.length}
                    </Badge>
                  </div>
                  <span className="font-medium text-sm">
                    {totalValue.toLocaleString()} đ
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-semibold">Tổng giá trị:</span>
                  <span className="font-bold text-lg text-primary">
                    {totalValue.toLocaleString()} đ
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                <label className="text-sm font-medium">Ghi chú</label>
                <Textarea
                  placeholder="..."
                  className="min-h-[100px] shadow-none border-border text-sm"
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
              Chuyển kho (F9)
            </Button>
          </div>
        </div>
      </div>

      <ProductModal
        open={isProductModalOpen}
        onOpenChange={setIsProductModalOpen}
        onSuccess={(p) => console.log("New product:", p)}
      />
    </div>
  );
}
