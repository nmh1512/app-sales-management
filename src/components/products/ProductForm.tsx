import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2, Calendar, Info, X, Pin, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

// Define schema
const productSchema = z.object({
  code: z.string().min(1, "Mã sản phẩm bắt buộc"),
  barcode: z.string().default(""),
  name: z.string().min(2, "Tên sản phẩm phải có ít nhất 2 ký tự"),
  brand_id: z.string().min(1, "Vui lòng chọn thương hiệu"),
  category_id: z.string().min(1, "Vui lòng chọn danh mục"),
  unit: z.string().min(1, "Vui lòng nhập đơn vị"),
  location: z.string().default(""),
  cost_price: z.number().min(0).default(0),
  price: z.number().min(0).default(0),
  stock: z.number().min(0).default(0),
  min_stock: z.number().min(0).default(0),
  max_stock: z.number().min(0).default(99999999),
  est_stock_out_date: z.string().default(""),
  status: z.enum(["active", "inactive"]),
  display_on_sale: z.enum(["show", "hide"]),
  description: z.string().default(""),
  note_template: z.string().default(""),
  order_note: z.string().default(""),
  supplier: z.string().default(""),
  attributes: z
    .array(
      z.object({
        name: z.string(),
        value: z.string(),
      }),
    )
    .default([]),
  images: z
    .array(
      z.object({
        url: z.string(),
        isPrimary: z.boolean(),
      }),
    )
    .default([]),
});

// Explicit interface
export interface ProductFormValues {
  code: string;
  barcode: string;
  name: string;
  brand_id: string;
  category_id: string;
  unit: string;
  location: string;
  cost_price: number;
  price: number;
  stock: number;
  min_stock: number;
  max_stock: number;
  est_stock_out_date: string;
  status: "active" | "inactive";
  display_on_sale: "show" | "hide";
  description: string;
  note_template: string;
  order_note: string;
  supplier: string;
  attributes: {
    name: string;
    value: string;
  }[];
  images: {
    url: string;
    isPrimary: boolean;
  }[];
}

interface ProductFormProps {
  initialData?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  isLoading?: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      code: initialData?.code || "",
      barcode: initialData?.barcode || "",
      name: initialData?.name || "",
      brand_id: initialData?.brand_id || "",
      category_id: initialData?.category_id || "",
      unit: initialData?.unit || "Cái",
      location: initialData?.location || "",
      cost_price: initialData?.cost_price ?? 0,
      price: initialData?.price ?? 0,
      stock: initialData?.stock ?? 0,
      min_stock: initialData?.min_stock ?? 0,
      max_stock: initialData?.max_stock ?? 99999999,
      est_stock_out_date: initialData?.est_stock_out_date || "",
      status: (initialData?.status as any) || "active",
      display_on_sale: (initialData?.display_on_sale as any) || "show",
      description: initialData?.description || "",
      note_template: initialData?.note_template || "",
      order_note: initialData?.order_note || "",
      supplier: initialData?.supplier || "",
      attributes: (initialData?.attributes as any) || [],
      images: initialData?.images || [],
    },
  });

  const {
    fields: attributeFields,
    append: appendAttribute,
    remove: removeAttribute,
  } = useFieldArray({
    control: form.control as any,
    name: "attributes",
  });

  const images = form.watch("images") || [];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      isPrimary: images.length === 0, // First image is primary by default if none exist
    }));

    form.setValue("images", [...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const wasPrimary = newImages[index].isPrimary;
    newImages.splice(index, 1);

    // If we removed primary, set the first one to primary
    if (wasPrimary && newImages.length > 0) {
      newImages[0].isPrimary = true;
    }

    form.setValue("images", newImages);
  };

  const setPrimaryImage = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      isPrimary: i === index,
    }));
    form.setValue("images", newImages);
  };

  return (
    <FormProvider {...(form as any)}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-10 p-0 mb-6 font-semibold">
            <TabsTrigger
              value="basic"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm"
            >
              Thông tin cơ bản
            </TabsTrigger>
            <TabsTrigger
              value="detail"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full transition-none shadow-none text-sm"
            >
              Mô tả chi tiết
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {/* Row 1 */}
              <FormField
                control={form.control as any}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Mã sản phẩm <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="cost_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Giá vốn
                    </FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="0"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 2 */}
              <FormField
                control={form.control as any}
                name="barcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Mã vạch
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập mã vạch" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Giá bán
                    </FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="0"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 3 */}
              <FormField
                control={form.control as any}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Tên sản phẩm <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên sản phẩm" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Tồn kho hiện tại
                    </FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="0"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 4 */}
              <FormField
                control={form.control as any}
                name="brand_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Thương hiệu
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-left font-medium">
                          <SelectValue placeholder="Chọn thương hiệu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1" className="cursor-pointer">
                          Apple
                        </SelectItem>
                        <SelectItem value="2" className="cursor-pointer">
                          Samsung
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="est_stock_out_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Ngày dự kiến hết hàng
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="date" {...field} />
                        <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 5 */}
              <FormField
                control={form.control as any}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Danh mục <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-left font-medium">
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1" className="cursor-pointer">
                          Điện thoại
                        </SelectItem>
                        <SelectItem value="2" className="cursor-pointer">
                          Phụ kiện
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Trạng thái <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-left font-medium">
                          <SelectValue placeholder="Kinh doanh" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active" className="cursor-pointer">
                          Kinh doanh
                        </SelectItem>
                        <SelectItem value="inactive" className="cursor-pointer">
                          Ngừng kinh doanh
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 6 */}
              <FormField
                control={form.control as any}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Đơn vị
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nhập đơn vị (cái, kg, lít...)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="display_on_sale"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-foreground">
                      Hiển thị bán <span className="text-destructive">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="text-left font-medium">
                          <SelectValue placeholder="Hiển thị bán" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="show" className="cursor-pointer">
                          Hiển thị bán
                        </SelectItem>
                        <SelectItem value="hide" className="cursor-pointer">
                          Ẩn
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 7 */}
              <FormField
                control={form.control as any}
                name="location"
                render={({ field }) => (
                  <FormItem className="col-span-1">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Vị trí
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập vị trí lưu kho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Droparea Image Upload */}
            <div className="space-y-4">
              <FormLabel className="text-sm font-medium text-foreground">
                Hình ảnh sản phẩm
              </FormLabel>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-muted/30 transition-colors bg-card/50"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold">
                    Click để chọn hoặc kéo thả nhiều ảnh
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Hỗ trợ JPG, PNG, WEBP. Dung lượng tối đa 5MB/ảnh
                  </p>
                </div>
              </div>

              {/* Image Preview List */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={cn(
                        "group aspect-square rounded-lg border relative overflow-hidden bg-muted flex items-center justify-center",
                        img.isPrimary
                          ? "border-primary border-2 border-dashed p-0.5"
                          : "border-border border-dashed p-0.5",
                      )}
                    >
                      <div className="w-full h-full rounded-[6px] overflow-hidden relative">
                        <img
                          src={img.url}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Delete Button (Top Right) */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full bg-[#ff3547] hover:bg-[#e62e3d] text-white shadow-sm z-10 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>

                      {/* Pin Button (Bottom Left) */}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute bottom-1 left-1 h-8 w-8 rounded-full shadow-sm z-10 transition-colors",
                          img.isPrimary
                            ? "bg-white text-[#ffb800]"
                            : "bg-white text-gray-400 hover:text-[#ffb800]",
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPrimaryImage(index);
                        }}
                      >
                        <Pin
                          className={cn(
                            "h-4 w-4",
                            img.isPrimary && "fill-current",
                          )}
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Attributes Accordion */}
            <Accordion
              type="single"
              collapsible
              className="border border-border rounded-lg px-4 overflow-hidden bg-card shadow-none"
            >
              <AccordionItem value="attributes" className="border-none">
                <AccordionTrigger className="hover:no-underline py-4 font-semibold text-sm">
                  <span>Thuộc tính sản phẩm</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 space-y-4">
                  <p className="text-xs text-muted-foreground">
                    Thêm các thuộc tính tùy chỉnh cho sản phẩm (VD: Màu sắc,
                    Kích thước, Chất liệu...)
                  </p>

                  <div className="space-y-3">
                    {attributeFields.map((field, index) => (
                      <div
                        key={field.id}
                        className="flex gap-3 items-start border border-border p-4 rounded-lg bg-background/50"
                      >
                        <div className="flex-1">
                          <Input
                            placeholder="Tên thuộc tính (VD: Màu sắc)"
                            {...form.register(
                              `attributes.${index}.name` as const,
                            )}
                          />
                        </div>
                        <div className="flex-1">
                          <Input
                            placeholder="Giá trị (VD: Đỏ)"
                            {...form.register(
                              `attributes.${index}.value` as const,
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 shrink-0"
                          onClick={() => removeAttribute(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 border-primary text-primary hover:bg-primary/5 rounded-lg h-10 px-4"
                      onClick={() => appendAttribute({ name: "", value: "" })}
                    >
                      <Plus className="h-4 w-4" /> Thêm thuộc tính
                    </Button>

                    <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 p-2 rounded-lg w-fit">
                      <Info className="h-4 w-4" />
                      <span>
                        Gợi ý: Màu sắc, Kích thước, Chất liệu, Trọng lượng, Xuất
                        xứ...
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="detail" className="space-y-6 mt-0">
            {/* Stock Limits Row */}
            <div className="grid grid-cols-2 gap-8">
              <FormField
                control={form.control as any}
                name="min_stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Ít nhất
                    </FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="0.00"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control as any}
                name="max_stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Nhiều nhất
                    </FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="99,999,999.00"
                        value={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Detailed Description */}
            <FormField
              control={form.control as any}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Mô tả chi tiết
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-none focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note Template */}
            <FormField
              control={form.control as any}
              name="note_template"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    Mẫu ghi chú
                  </FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[120px] w-full rounded-lg border border-input bg-card px-4 py-3 text-sm shadow-none focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-border mt-8">
          <Button
            type="button"
            variant="outline"
            className="bg-[#6c757d] hover:bg-[#5a6268] text-white border-none h-10 px-8 rounded-lg"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Làm mới
          </Button>
          <Button
            type="submit"
            className="bg-[#007bff] hover:bg-[#0069d9] text-white h-10 px-10 shadow-none font-medium rounded-lg"
            disabled={isLoading}
          >
            {isLoading
              ? "Đang xử lý..."
              : initialData
                ? "Cập nhật sản phẩm"
                : "Tạo sản phẩm"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
