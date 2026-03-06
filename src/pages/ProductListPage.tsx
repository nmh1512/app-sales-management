import * as React from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  RefreshCw,
  FileText,
  Download,
  Upload,
  Edit2,
  Copy,
  Lock,
  Trash2,
} from "lucide-react";
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

export default function ProductListPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock products
  const mockProducts: Product[] = [
    {
      id: 1,
      code: "IP15PM-256-BLK",
      name: "iPhone 15 Pro Max 256GB Black Titanium",
      price: 33990000,
      cost_price: 30500000,
      stock: 45,
      unit: "Cái",
      category_name: "Điện thoại",
      brand_name: "Apple",
      created_at: "2024-03-01 10:00:00",
      barcode: "84030021",
      is_variant: false,
      variants_count: 0,
    },
    {
      id: 2,
      code: "SS-S24U-512-GRY",
      name: "Samsung Galaxy S24 Ultra 512GB Gray",
      price: 29990000,
      cost_price: 26000000,
      stock: 32,
      unit: "Cái",
      category_name: "Điện thoại",
      brand_name: "Samsung",
      created_at: "2024-03-02 09:30:00",
      barcode: "SS24U001",
      is_variant: false,
      variants_count: 0,
    },
    {
      id: 3,
      code: "AP-PRO-G2",
      name: "AirPods Pro Gen 2 with MagSafe Case",
      price: 5490000,
      cost_price: 4800000,
      stock: 0,
      unit: "Cái",
      category_name: "Phụ kiện",
      brand_name: "Apple",
      created_at: "2024-03-03 14:20:00",
      barcode: "APP002",
      is_variant: false,
      variants_count: 0,
    },
  ];

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (data: ProductFormValues) => {
    console.log(
      editingProduct ? "Updating product:" : "Creating product:",
      data,
    );
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const toggleExpand = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // Maps Product type to ProductFormValues
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
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2 px-6">
            <Upload className="h-4 w-4" /> Import
          </Button>
          <Button variant="outline" className="gap-2 px-6">
            <Download className="h-4 w-4" /> Export
          </Button>

          <Button
            className="gap-2 bg-primary hover:bg-primary/90 px-6 font-medium"
            onClick={handleCreateNew}
          >
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Button>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto scrollbar-hide p-0 border-border rounded-lg">
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-xl font-semibold">
                  {editingProduct ? "Cập nhật sản phẩm" : "Thêm mới sản phẩm"}
                </DialogTitle>
              </DialogHeader>
              <div className="p-6 pt-2">
                <ProductForm
                  initialData={getProductInitialData(editingProduct)}
                  onSubmit={handleSaveProduct}
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-border shadow-none rounded-lg">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã, tên sản phẩm..."
                  className="pl-9 h-10 shadow-none border-border"
                />
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger className="h-10 shadow-none border-border">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="phone">Điện thoại</SelectItem>
                  <SelectItem value="tablet">Máy tính bảng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="h-10 shadow-none border-border">
                  <SelectValue placeholder="Thương hiệu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="samsung">Samsung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select>
                <SelectTrigger className="h-10 shadow-none border-border">
                  <SelectValue placeholder="Tồn kho" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="in">Còn hàng</SelectItem>
                  <SelectItem value="out">Hết hàng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-2">
              <Button variant="default" className="flex-1 h-10 font-medium">
                Tìm kiếm
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Làm mới"
                className="h-10 w-10 border-border"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border border-border bg-card overflow-hidden shadow-none">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b">
              <TableHead className="w-[80px] text-center">Ảnh</TableHead>
              <TableHead>Mã hàng</TableHead>
              <TableHead className="w-[300px]">Tên sản phẩm</TableHead>
              <TableHead className="text-right">Giá bán</TableHead>
              <TableHead className="text-right">Giá vốn</TableHead>
              <TableHead className="text-center">Tồn kho</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((product) => (
              <React.Fragment key={product.id}>
                <TableRow
                  className={`cursor-pointer transition-colors ${expandedRow === product.id ? "bg-muted/20" : "hover:bg-muted/30"}`}
                  onClick={() => toggleExpand(product.id)}
                >
                  <TableCell className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto overflow-hidden border border-border">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="h-6 w-6 text-muted-foreground/30" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {product.code}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {product.unit}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium text-sm">
                    {product.price.toLocaleString()} ₫
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground text-xs">
                    {product.cost_price.toLocaleString()} ₫
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={product.stock > 0 ? "outline" : "destructive"}
                      className="rounded-full px-2 py-0 h-5 text-sm"
                    >
                      {product.stock.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {product.created_at.split(" ")[0]}
                    <br />
                    {product.created_at.split(" ")[1].substring(0, 5)}
                  </TableCell>
                </TableRow>

                {/* Expanded Detail Row */}
                {expandedRow === product.id && (
                  <TableRow className="bg-muted/5 border-b-0 hover:bg-muted/5">
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-6">
                        <Tabs defaultValue="info" className="w-full">
                          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-10 p-0 mb-6">
                            <TabsTrigger
                              value="info"
                              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full font-semibold text-sm transition-none shadow-none"
                            >
                              Thông tin
                            </TabsTrigger>
                            <TabsTrigger
                              value="stock"
                              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 h-full font-semibold text-sm transition-none shadow-none"
                            >
                              Thẻ kho
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="info" className="mt-0 space-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                              {/* Product Image Section */}
                              <div className="lg:col-span-4 aspect-[4/3] rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                                <FileText className="h-24 w-24 text-muted-foreground/20" />
                              </div>

                              {/* Main Info Column */}
                              <div className="lg:col-span-4 space-y-1">
                                {[
                                  { label: "Mã hàng", value: product.code },
                                  {
                                    label: "Mã vạch",
                                    value: product.barcode || "",
                                  },
                                  {
                                    label: "Nhóm hàng",
                                    value: product.category_name,
                                  },
                                  { label: "Loại hàng", value: "Hàng hóa" },
                                  {
                                    label: "Thương hiệu",
                                    value: product.brand_name,
                                  },
                                  {
                                    label: "Định mức tồn",
                                    value: "0.00 > 99,999,999.00",
                                  },
                                  {
                                    label: "Giá bán",
                                    value: product.price.toLocaleString(),
                                  },
                                  {
                                    label: "Giá vốn",
                                    value: product.cost_price.toLocaleString(),
                                  },
                                  { label: "Vị trí", value: "" },
                                ].map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm"
                                  >
                                    <span className="text-muted-foreground">
                                      {item.label}
                                    </span>
                                    <span className="font-medium text-right">
                                      {item.value}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              {/* Additional Info Column */}
                              <div className="lg:col-span-4 space-y-1">
                                {[
                                  { label: "Mô tả", value: "" },
                                  { label: "Ghi chú đặt hàng", value: "" },
                                  { label: "Nhà cung cấp", value: "" },
                                ].map((item, idx) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-center py-2.5 border-b border-border/50 text-sm"
                                  >
                                    <span className="text-muted-foreground">
                                      {item.label}
                                    </span>
                                    <span className="font-medium text-right">
                                      {item.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons Container */}
                            <div className="flex flex-wrap gap-2 justify-end pt-4">
                              <Button
                                className="bg-[#00d26a] hover:bg-[#00b95c] text-white gap-2 h-9 px-4 rounded-lg shadow-none"
                                onClick={() => handleEditProduct(product)}
                              >
                                <Edit2 className="h-4 w-4" /> Cập nhật
                              </Button>
                              <Button className="bg-[#00d26a] hover:bg-[#00b95c] text-white gap-2 h-9 px-4 rounded-lg shadow-none">
                                <Copy className="h-4 w-4" /> Sao chép
                              </Button>
                              <Button className="bg-[#ff3547] hover:bg-[#e62e3d] text-white gap-2 h-9 px-4 rounded-lg shadow-none">
                                <Lock className="h-4 w-4" /> Ngừng kinh doanh
                              </Button>
                              <Button className="bg-[#ff3547] hover:bg-[#e62e3d] text-white gap-2 h-9 px-4 rounded-lg shadow-none">
                                <Trash2 className="h-4 w-4" /> Chuyển vào thùng
                                rác
                              </Button>
                            </div>
                          </TabsContent>
                          <TabsContent value="stock" className="mt-0">
                            <div className="text-center py-20 text-sm text-muted-foreground bg-muted/20 rounded-lg border border-dashed border-border">
                              Đang tải dữ liệu thẻ kho...
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
