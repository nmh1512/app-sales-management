import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImagePlus, Plus, Trash2, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const productSchema = z.object({
  sku: z.string().min(1, "Mã SKU không được để trống"),
  barcode: z.string(),
  name: z.string().min(1, "Tên sản phẩm không được để trống"),
  brand_id: z.string(),
  category_id: z.string(),
  unit: z.string(),
  location: z.string(),
  cost_price: z.number().min(0),
  price: z.number().min(0),
  stock_quantity: z.number().min(0),
  min_stock_quantity: z.number().min(0),
  max_stock_quantity: z.number().min(0),
  is_sellable: z.string(),
  status: z.string(),
  description: z.string(),
  note_template: z.string(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (product: any) => void;
}

export function ProductModal({
  open,
  onOpenChange,
  onSuccess,
}: ProductModalProps) {
  const [properties, setProperties] = React.useState<
    { key: string; value: string }[]
  >([]);
  const [isPropertiesOpen, setIsPropertiesOpen] = React.useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      sku: "",
      barcode: "",
      name: "",
      brand_id: "",
      category_id: "",
      unit: "Cái",
      location: "",
      cost_price: 0,
      price: 0,
      stock_quantity: 0,
      min_stock_quantity: 0,
      max_stock_quantity: 99999999,
      is_sellable: "1",
      status: "1",
      description: "",
      note_template: "",
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    console.log("Submit product:", { ...data, properties });
    onSuccess?.({ ...data, properties });
    onOpenChange(false);
    form.reset();
    setProperties([]);
  };

  const addProperty = () => {
    setProperties([...properties, { key: "", value: "" }]);
  };

  const removeProperty = (index: number) => {
    setProperties(properties.filter((_, i) => i !== index));
  };

  const updateProperty = (
    index: number,
    field: "key" | "value",
    val: string,
  ) => {
    const newProps = [...properties];
    newProps[index][field] = val;
    setProperties(newProps);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 border-b shrink-0">
          <DialogTitle className="text-xl font-bold uppercase tracking-tight text-slate-700">
            Thêm hàng hóa mới
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-1 overflow-hidden flex flex-col"
          >
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="mb-4 bg-muted/50 p-1">
                <TabsTrigger
                  value="basic"
                  className="px-6 font-bold text-xs uppercase tracking-wider"
                >
                  Thông tin cơ bản
                </TabsTrigger>
                <TabsTrigger
                  value="detail"
                  className="px-6 font-bold text-xs uppercase tracking-wider"
                >
                  Mô tả chi tiết
                </TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                            Mã SKU *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập mã SKU"
                              {...field}
                              className="h-10 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="barcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                            Mã vạch
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập mã vạch"
                              {...field}
                              className="h-10 rounded-lg"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                            Tên sản phẩm *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nhập tên sản phẩm"
                              {...field}
                              className="h-10 rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Đơn vị
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Cái, Kg..."
                                {...field}
                                className="h-10 rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Vị trí
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Kệ A1..."
                                {...field}
                                className="h-10 rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cost_price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Giá vốn
                            </FormLabel>
                            <FormControl>
                              <NumberInput
                                placeholder="0"
                                value={field.value}
                                onValueChange={field.onChange}
                                className="h-10 rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Giá bán
                            </FormLabel>
                            <FormControl>
                              <NumberInput
                                placeholder="0"
                                value={field.value}
                                onValueChange={field.onChange}
                                className="h-10 rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="stock_quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                            Tồn kho hiện tại
                          </FormLabel>
                          <FormControl>
                            <NumberInput
                              placeholder="0"
                              value={field.value}
                              onValueChange={field.onChange}
                              className="h-10 rounded-lg"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="is_sellable"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Trạng thái
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 rounded-lg">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Kinh doanh</SelectItem>
                                <SelectItem value="0">
                                  Ngừng kinh doanh
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                              Hiển thị bán
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="h-10 rounded-lg">
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Hiển thị</SelectItem>
                                <SelectItem value="0">Ẩn</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Properties Section */}
                <div className="border rounded-xl overflow-hidden bg-muted/20">
                  <button
                    type="button"
                    onClick={() => setIsPropertiesOpen(!isPropertiesOpen)}
                    className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-muted/50 transition-colors border-b"
                  >
                    <span className="text-sm font-bold text-slate-700">
                      Thuộc tính sản phẩm
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform",
                        isPropertiesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  {isPropertiesOpen && (
                    <div className="p-4 space-y-4">
                      <p className="text-xs text-muted-foreground italic">
                        Thêm các thuộc tính tùy chỉnh cho sản phẩm (VD: Màu sắc,
                        Kích thước, Chất liệu...)
                      </p>
                      <div className="space-y-3">
                        {properties.map((prop, index) => (
                          <div key={index} className="flex gap-3">
                            <Input
                              placeholder="Tên thuộc tính (VD: Màu sắc)"
                              value={prop.key}
                              onChange={(e) =>
                                updateProperty(index, "key", e.target.value)
                              }
                              className="flex-1 h-9"
                            />
                            <Input
                              placeholder="Giá trị (VD: Đỏ)"
                              value={prop.value}
                              onChange={(e) =>
                                updateProperty(index, "value", e.target.value)
                              }
                              className="flex-1 h-9"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProperty(index)}
                              className="h-9 w-9 text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addProperty}
                        className="gap-2 h-9 rounded-lg border-primary/20 text-primary hover:bg-primary/5"
                      >
                        <Plus className="h-4 w-4" /> Thêm thuộc tính
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    Hình ảnh
                  </label>
                  <div className="grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="border-2 border-dashed rounded-lg aspect-square flex flex-col items-center justify-center bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors group"
                      >
                        <ImagePlus className="h-8 w-8 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
                        <span className="text-[10px] text-muted-foreground mt-1 font-bold">
                          Chọn ảnh
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="detail" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="min_stock_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground text-destructive">
                          Định mức ít nhất
                        </FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="0"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="h-10 rounded-lg text-destructive border-destructive/20"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="max_stock_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-bold uppercase text-muted-foreground text-primary">
                          Định mức nhiều nhất
                        </FormLabel>
                        <FormControl>
                          <NumberInput
                            placeholder="99,999,999"
                            value={field.value}
                            onValueChange={field.onChange}
                            className="h-10 rounded-lg text-primary border-primary/20"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                        Mô tả chi tiết
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả sản phẩm..."
                          {...field}
                          className="min-h-[150px] rounded-xl border-muted-foreground/20 italic"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note_template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase text-muted-foreground">
                        Mẫu ghi chú
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Mẫu ghi chú khi in đơn hàng..."
                          {...field}
                          className="min-h-[80px] rounded-xl border-muted-foreground/20 italic"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>
          </form>
        </Form>
        <DialogFooter className="p-6 border-t gap-3 bg-muted/10 shrink-0">
          <Button
            variant="ghost"
            onClick={() => form.reset()}
            className="px-8 rounded-lg h-11 font-bold text-slate-500 hover:text-slate-700"
          >
            Làm mới
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="px-10 rounded-lg h-11 font-bold bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-none transition-all active:scale-95"
          >
            Tạo sản phẩm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
