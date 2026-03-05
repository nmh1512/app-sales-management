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
} from "lucide-react";
import type { Product } from "@/types";

export default function ProductListPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // Mock products
  const mockProducts: Product[] = [
    {
      id: 1,
      sku: "IP15PM-256-BLK",
      name: "iPhone 15 Pro Max 256GB Black Titanium",
      price: 33990000,
      cost_price: 30500000,
      stock: 45,
      unit: "Cái",
      category_name: "Điện thoại",
      brand_name: "Apple",
      created_at: "2024-03-01 10:00:00",
      is_variant: false,
      variants_count: 0,
    },
    {
      id: 2,
      sku: "SS-S24U-512-GRY",
      name: "Samsung Galaxy S24 Ultra 512GB Gray",
      price: 29990000,
      cost_price: 26000000,
      stock: 32,
      unit: "Cái",
      category_name: "Điện thoại",
      brand_name: "Samsung",
      created_at: "2024-03-02 09:30:00",
      is_variant: false,
      variants_count: 0,
    },
    {
      id: 3,
      sku: "AP-PRO-G2",
      name: "AirPods Pro Gen 2 with MagSafe Case",
      price: 5490000,
      cost_price: 4800000,
      stock: 0,
      unit: "Cái",
      category_name: "Phụ kiện",
      brand_name: "Apple",
      created_at: "2024-03-03 14:20:00",
      is_variant: false,
      variants_count: 0,
    },
  ];

  const toggleExpand = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" /> Import
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Thêm sản phẩm
          </Button>
        </div>
      </div>

      <Card className="border-border shadow-none">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="col-span-1 md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm theo mã, tên sản phẩm..."
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Select>
                <SelectTrigger>
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
                <SelectTrigger>
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
                <SelectTrigger>
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
              <Button variant="default" className="flex-1">
                Tìm kiếm
              </Button>
              <Button variant="outline" size="icon" title="Làm mới">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
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
              <>
                <TableRow
                  key={product.id}
                  className={`cursor-pointer transition-colors ${expandedRow === product.id ? "bg-muted/50" : "hover:bg-muted/30"}`}
                  onClick={() => toggleExpand(product.id)}
                >
                  <TableCell className="text-center">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto overflow-hidden">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FileText className="h-6 w-6 text-muted-foreground/50" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {product.unit}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {product.price.toLocaleString()} ₫
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {product.cost_price.toLocaleString()} ₫
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={product.stock > 0 ? "outline" : "destructive"}
                      className="rounded-full"
                    >
                      {product.stock.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {product.created_at.split(" ")[0]}
                    <br />
                    {product.created_at.split(" ")[1].substring(0, 5)}
                  </TableCell>
                </TableRow>

                {/* Expanded Detail Row */}
                {expandedRow === product.id && (
                  <TableRow className="bg-muted/20 border-b-0">
                    <TableCell colSpan={7} className="p-0">
                      <div className="p-6">
                        <Tabs defaultValue="info" className="w-full">
                          <TabsList className="bg-muted/50 p-1 mb-4 h-11">
                            <TabsTrigger
                              value="info"
                              className="px-6 data-[state=active]:bg-background"
                            >
                              Thông tin
                            </TabsTrigger>
                            <TabsTrigger
                              value="stock"
                              className="px-6 data-[state=active]:bg-background"
                            >
                              Thẻ kho
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="info" className="mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              <div className="aspect-square rounded-xl bg-muted flex items-center justify-center overflow-hidden border">
                                <FileText className="h-20 w-20 text-muted-foreground/20" />
                              </div>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 text-sm border-b pb-2">
                                  <span className="text-muted-foreground">
                                    Mã hàng
                                  </span>
                                  <span className="text-right font-medium">
                                    {product.sku}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 text-sm border-b pb-2">
                                  <span className="text-muted-foreground">
                                    Danh mục
                                  </span>
                                  <span className="text-right font-medium">
                                    {product.category_name}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 text-sm border-b pb-2">
                                  <span className="text-muted-foreground">
                                    Thương hiệu
                                  </span>
                                  <span className="text-right font-medium">
                                    {product.brand_name}
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 text-sm border-b pb-2">
                                  <span className="text-muted-foreground">
                                    Đơn vị
                                  </span>
                                  <span className="text-right font-medium">
                                    {product.unit}
                                  </span>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 text-sm border-b pb-2">
                                  <span className="text-muted-foreground block mb-1">
                                    Mô tả
                                  </span>
                                  <span className="font-medium">
                                    Chưa có mô tả cho sản phẩm này.
                                  </span>
                                </div>
                                <div className="flex gap-2 justify-end mt-4">
                                  <Button size="sm" variant="outline">
                                    Cập nhật
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    Sao chép
                                  </Button>
                                  <Button size="sm" variant="destructive">
                                    Ngừng kinh doanh
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          <TabsContent value="stock" className="mt-0">
                            <div className="text-center py-10 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
                              Đang tải dữ liệu thẻ kho...
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
