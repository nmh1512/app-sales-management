import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ProductRanking } from "@/types";

interface TopProductsProps {
  products: ProductRanking[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Top sản phẩm bán chạy
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {products.map((product, index) => (
          <div key={product.id} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center text-sm font-bold text-blue-500">
                {index + 1}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium truncate w-[150px] md:w-auto">
                  {product.name}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  {product.code}
                </div>
              </div>
            </div>
            <div className="text-right shrink-0 ml-4">
              <div className="text-sm font-semibold">
                {product.total_quantity.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {product.total_revenue.toLocaleString()} VNĐ
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="p-4 text-center text-muted-foreground">
            Chưa có dữ liệu sản phẩm
          </div>
        )}
      </CardContent>
    </Card>
  );
}
