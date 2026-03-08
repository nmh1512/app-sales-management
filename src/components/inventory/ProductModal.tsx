import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ProductForm,
  type ProductFormValues,
} from "@/components/products/ProductForm";
import type { Product } from "@/types";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSuccess?: (product: ProductFormValues) => void;
}

export function ProductModal({
  open,
  onOpenChange,
  product,
  onSuccess,
}: ProductModalProps) {
  const handleSubmit = (data: ProductFormValues) => {
    onSuccess?.(data);
    onOpenChange(false);
  };

  const getProductInitialData = (
    p: Product | null,
  ): Partial<ProductFormValues> | undefined => {
    if (!p) return undefined;

    return {
      code: p.code,
      name: p.name,
      price: p.price,
      cost_price: p.cost_price,
      stock: p.stock,
      unit: p.unit,
      barcode: p.barcode || "",
      brand_id: "1", // Mock mapping
      category_id: "1", // Mock mapping
      status: "active",
      display_on_sale: "show",
      description: p.description || "",
      note_template: p.note_template || "",
      order_note: p.order_note || "",
      supplier: p.supplier || "",
      min_stock: p.min_stock ?? 0,
      max_stock: p.max_stock ?? 99999999,
      attributes: [],
      images: p.image_url ? [{ url: p.image_url, isPrimary: true }] : [],
    };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto scrollbar-hide p-0 border-border rounded-lg">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">
            {product ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6 pt-2">
          <ProductForm
            initialData={getProductInitialData(product || null)}
            onSubmit={handleSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
